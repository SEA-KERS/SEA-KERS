import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { basename, dirname, extname, join, relative, resolve, sep } from "node:path";
import { FORMATS, type CmsConfig, type ManifestImage, type Variant } from "./types.js";
import { hasR2, r2Credentials } from "./config.js";
import { inspectDimensions, previewDimensions, processImage } from "./pipeline.js";
import {
  contentDigest,
  createR2Client,
  ensureBucket,
  uploadVariant,
  type R2ClientHandle,
} from "./storage.js";
import {
  findImage,
  idKey,
  loadManifest,
  pruneStale,
  saveManifest,
  seedTeam,
  sourceToId,
  upsertImage,
} from "./manifest.js";
import { writeRegistry } from "./registry.js";

export type LogFn = (message: string) => void;

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"]);

export interface RunSummary {
  total: number;
  uploaded: number;
  added: number;
  failed: number;
}

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const slash = (path: string): string => path.split(sep).join("/");

async function walkImages(dir: string, out: string[]): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkImages(full, out);
    } else if (entry.isFile() && IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
}

const manifestDir = (manifestPath: string): string => dirname(manifestPath);

const resolveSource = (manifestPath: string, sourcePath: string): string =>
  resolve(manifestDir(manifestPath), sourcePath);

const relativeToManifest = (manifestPath: string, file: string): string =>
  slash(relative(manifestDir(manifestPath), file));

const isWithin = (base: string, target: string): boolean => {
  const rel = relative(base, target);
  return rel === "" || (rel !== ".." && !rel.startsWith(`..${sep}`));
};

/** Copies a source file into the CMS originals library (next to the manifest)
 *  and returns the new absolute path. Keeps originals out of the web app. */
const adoptOriginal = (manifestPath: string, imageId: string, source: string): string => {
  const ext = extname(source) || ".jpg";
  const target = join(manifestDir(manifestPath), "originals", `${imageId}${ext}`);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
  return target;
};

interface ScanStats {
  total: number;
  added: number;
  updated: number;
  failed: number;
  pruned: number;
}

/** Scans the configured source folder (public/images) and registers every image
 *  as a manifest entry with variant metadata. Does not encode or upload. */
export async function runScan(
  config: CmsConfig,
  manifestPath: string,
  onLog: LogFn,
): Promise<ScanStats> {
  const manifest = loadManifest(manifestPath);
  const sourceRoot = join(config.projectPath, config.sourceRoot);
  const stats: ScanStats = { total: 0, added: 0, updated: 0, failed: 0, pruned: 0 };

  if (existsSync(sourceRoot)) {
    const files: string[] = [];
    await walkImages(sourceRoot, files);
    for (const file of files) {
      const rel = slash(relative(config.projectPath, file));
      const id = sourceToId(rel, config.sourceRoot);
      try {
        const existing = findImage(manifest, id);
        const dimensions = await inspectDimensions(file);
        const variants: Variant[] = [];
        const seenWidths = new Set<number>();
        for (const size of config.sizes) {
          const preview = await previewDimensions(file, size.width);
          if (seenWidths.has(preview.width)) continue;
          seenWidths.add(preview.width);
          for (const format of FORMATS) {
            variants.push({
              format,
              width: preview.width,
              height: preview.height,
              bytes: 0,
              key: idKey(id, preview.width, format),
              uploadedAt: null,
            });
          }
        }
        upsertImage(manifest, {
          id,
          collection: id.split("/")[0] ?? "misc",
          sourcePath: relativeToManifest(manifestPath, file),
          alt: existing?.alt ?? "",
          width: dimensions.width,
          height: dimensions.height,
          ref:
            id.split("/")[0] === "team"
              ? id.slice("team/".length)
              : existing?.ref,
          variants: carryUploadState(existing?.variants ?? [], variants),
        });
        if (existing) stats.updated += 1;
        else stats.added += 1;
      } catch (error) {
        stats.failed += 1;
        onLog(`skip ${id}: ${errorMessage(error)}`);
      }
    }
    stats.total = files.length;
  } else {
    onLog(`source folder not found: ${sourceRoot}`);
  }

  stats.pruned = pruneStale(manifest, manifestPath);
  const seeded = seedTeam(manifest, config.teamSeeds);
  if (seeded > 0) onLog(`seeded ${seeded} team avatar placeholders`);

  manifest.baseUrl = config.r2.publicUrl;
  saveManifest(manifestPath, manifest);
  const output = writeRegistry(config, manifest);
  onLog(`registry -> ${output}`);
  return stats;
}

/** Carries uploadedAt/etag across regenerated variant lists by format+width. */
function carryUploadState(existing: readonly Variant[], next: readonly Variant[]): Variant[] {
  const uploaded = new Map(
    existing.map((variant) => [`${variant.format}@${variant.width}`, variant]),
  );
  return next.map((variant) => {
    const prior = uploaded.get(`${variant.format}@${variant.width}`);
    return prior?.uploadedAt
      ? { ...variant, uploadedAt: prior.uploadedAt, etag: prior.etag, bytes: prior.bytes || variant.bytes }
      : variant;
  });
}

export interface UploadOptions {
  /** When true, skip images that already have every variant uploaded. */
  onlyMissing?: boolean;
  concurrency?: number;
}

/** Encodes and uploads every variant of every registered image to R2. */
export async function runUpload(
  config: CmsConfig,
  manifestPath: string,
  options: UploadOptions,
  onLog: LogFn,
): Promise<RunSummary> {
  const manifest = loadManifest(manifestPath);
  const summary: RunSummary = { total: 0, uploaded: 0, added: 0, failed: 0 };

  if (!hasR2(config)) {
    onLog("R2 is not configured - set R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_PUBLIC_URL and the key pair (tools/cms/.env).");
    return summary;
  }

  const handle = createR2Client(config.r2, r2Credentials());
  if (!handle) return summary;
  await ensureBucket(handle);

  const targets = manifest.images.filter((image) => {
    if (!image.sourcePath) return false;
    if (options.onlyMissing) return image.variants.some((variant) => !variant.uploadedAt);
    return true;
  });
  summary.total = targets.length;

  await mapLimit(targets, options.concurrency ?? 2, async (image) => {
    try {
      await uploadOne(config, manifestPath, handle, image, onLog);
      summary.uploaded += 1;
    } catch (error) {
      summary.failed += 1;
      onLog(`x ${image.id}: ${errorMessage(error)}`);
    }
  });

  manifest.baseUrl = config.r2.publicUrl;
  saveManifest(manifestPath, manifest);
  const output = writeRegistry(config, manifest);
  onLog(`registry -> ${output}`);
  return summary;
}

async function uploadOne(
  config: CmsConfig,
  manifestPath: string,
  handle: R2ClientHandle,
  image: ManifestImage,
  onLog: LogFn,
): Promise<void> {
  const sourcePath = image.sourcePath;
  if (!sourcePath) return;

  let source = resolveSource(manifestPath, sourcePath);
  if (!existsSync(source)) throw new Error(`source missing: ${source}`);

  if (isWithin(config.projectPath, source)) {
    source = adoptOriginal(manifestPath, image.id, source);
    image.sourcePath = slash(relative(manifestDir(manifestPath), source));
  }

  const result = await processImage(source, config.sizes, config.qualities);
  const variants: Variant[] = [];
  for (const variant of result.variants) {
    const key = idKey(image.id, variant.width, variant.format, contentDigest(variant.buffer));
    const uploaded = await uploadVariant(handle, key, variant.buffer, variant.format, variant.width, variant.height);
    variants.push({
      format: variant.format,
      width: variant.width,
      height: variant.height,
      bytes: variant.bytes,
      key,
      uploadedAt: uploaded.uploadedAt,
      etag: uploaded.etag,
    });
  }

  image.variants = variants;
  image.updatedAt = new Date().toISOString();
  onLog(`up ${image.id} (${variants.length} variants)`);
}

export interface ImportInput {
  path: string;
  collection?: string;
  id?: string;
  alt?: string;
}

/** Registers an image (or a folder of images) with the CMS: adopts the original
 *  into the CMS library, runs the pipeline, and uploads when R2 is configured. */
export async function runImport(
  config: CmsConfig,
  manifestPath: string,
  input: ImportInput,
  onLog: LogFn,
): Promise<RunSummary> {
  const manifest = loadManifest(manifestPath);
  const summary: RunSummary = { total: 0, uploaded: 0, added: 0, failed: 0 };
  const isDirectory = existsSync(input.path) && statSync(input.path).isDirectory();

  const files: string[] = [];
  if (isDirectory) {
    await walkImages(input.path, files);
  } else {
    if (!existsSync(input.path)) throw new Error(`path not found: ${input.path}`);
    files.push(input.path);
  }
  summary.total = files.length;

  const handle = hasR2(config) ? createR2Client(config.r2, r2Credentials()) : null;
  if (handle) await ensureBucket(handle);

  if (isDirectory && input.id?.trim()) {
    onLog("note: explicit id is ignored for directory imports");
  }

  for (const file of files) {
    const rel = slash(relative(config.projectPath, file));
    const id = isDirectory
      ? sourceToId(rel, config.sourceRoot)
      : input.id?.trim() ||
        (input.collection
          ? `${input.collection}/${basename(file, extname(file))}`
          : basename(file, extname(file)));
    try {
      const adopted = adoptOriginal(manifestPath, id, file);
      const result = await processImage(adopted, config.sizes, config.qualities);
      const variants: Variant[] = [];
      for (const variant of result.variants) {
        const key = idKey(id, variant.width, variant.format, contentDigest(variant.buffer));
        const uploaded = handle
          ? await uploadVariant(handle, key, variant.buffer, variant.format, variant.width, variant.height)
          : null;
        variants.push({
          format: variant.format,
          width: variant.width,
          height: variant.height,
          bytes: variant.bytes,
          key,
          uploadedAt: uploaded?.uploadedAt ?? null,
          etag: uploaded?.etag,
        });
      }
      const existing = findImage(manifest, id);
      upsertImage(manifest, {
        id,
        collection: input.collection?.trim() || id.split("/")[0] || "misc",
        sourcePath: slash(relative(manifestDir(manifestPath), adopted)),
        alt: input.alt?.trim() || existing?.alt || "",
        width: result.width,
        height: result.height,
        variants,
      });
      summary.uploaded += handle ? 1 : 0;
      summary.added += existing ? 0 : 1;
      onLog(`+ ${id} (${variants.length} variants${handle ? ", uploaded" : ", local only"})`);
    } catch (error) {
      summary.failed += 1;
      onLog(`x ${id}: ${errorMessage(error)}`);
    }
  }

  manifest.baseUrl = config.r2.publicUrl;
  saveManifest(manifestPath, manifest);
  const output = writeRegistry(config, manifest);
  onLog(`registry -> ${output}`);
  return summary;
}

/** Regenerates the web app registry from the current manifest. */
export async function runGenerate(
  config: CmsConfig,
  manifestPath: string,
  onLog: LogFn,
): Promise<string> {
  const manifest = loadManifest(manifestPath);
  manifest.baseUrl = config.r2.publicUrl;
  saveManifest(manifestPath, manifest);
  const output = writeRegistry(config, manifest);
  onLog(`registry -> ${output}`);
  return output;
}

/** Encodes and uploads a single registered image. Used by the TUI library. */
export async function runUploadImage(
  config: CmsConfig,
  manifestPath: string,
  id: string,
  onLog: LogFn,
): Promise<boolean> {
  const manifest = loadManifest(manifestPath);
  const image = findImage(manifest, id);
  if (!image?.sourcePath) {
    onLog(`${id}: no local source registered`);
    return false;
  }
  if (!hasR2(config)) {
    onLog("R2 is not configured - set R2_* vars in tools/cms/.env");
    return false;
  }
  const handle = createR2Client(config.r2, r2Credentials());
  if (!handle) return false;
  await ensureBucket(handle);
  await uploadOne(config, manifestPath, handle, image, onLog);
  manifest.baseUrl = config.r2.publicUrl;
  saveManifest(manifestPath, manifest);
  const output = writeRegistry(config, manifest);
  onLog(`registry -> ${output}`);
  return true;
}

async function mapLimit<T>(
  items: readonly T[],
  limit: number,
  fn: (item: T) => Promise<void>,
): Promise<void> {
  let index = 0;
  const workerCount = Number.isFinite(limit) ? Math.max(1, Math.floor(limit)) : 1;
  const workers = Array.from({ length: Math.min(workerCount, items.length) }, async () => {
    while (index < items.length) {
      const current = index;
      index += 1;
      await fn(items[current]);
    }
  });
  await Promise.all(workers);
}
