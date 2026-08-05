import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import type { Manifest, ManifestImage, TeamSeed, Variant } from "./types.js";

export const emptyManifest = (): Manifest => ({
  version: 1,
  baseUrl: "",
  images: [],
});

export function loadManifest(path: string): Manifest {
  if (!existsSync(path)) return emptyManifest();
  let parsed: Manifest;
  try {
    parsed = JSON.parse(readFileSync(path, "utf8")) as Manifest;
  } catch (error) {
    throw new Error(
      `failed to read or parse CMS manifest at ${path}: ${
        error instanceof Error ? error.message : String(error)
      }`,
      { cause: error },
    );
  }
  return {
    version: 1,
    baseUrl: typeof parsed.baseUrl === "string" ? parsed.baseUrl : "",
    images: Array.isArray(parsed.images) ? parsed.images : [],
  };
}

export function saveManifest(path: string, manifest: Manifest): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

/** Turns a project-relative source path into a stable id, e.g.
 *  public/images/wins/win-01/img-1.jpg -> wins/win-01/img-1 */
export function sourceToId(sourceRel: string, sourceRoot: string): string {
  const normalized = sourceRel.split(sep).join("/");
  const prefix = `${sourceRoot.replace(/\/+$/, "")}/`;
  const withoutRoot = normalized.startsWith(prefix)
    ? normalized.slice(prefix.length)
    : normalized;
  return withoutRoot.replace(/\.[^.]+$/, "");
}

export function legacyPathFor(sourceRel: string, sourceRoot: string): string {
  const normalized = sourceRel.split(sep).join("/");
  const prefix = `${sourceRoot.replace(/\/+$/, "")}/`;
  const withoutRoot = normalized.startsWith(prefix)
    ? normalized.slice(prefix.length)
    : normalized;
  return `/images/${withoutRoot}`;
}

export function idKey(id: string, width: number, format: string, contentHash?: string): string {
  return contentHash ? `${id}-${contentHash}-${width}.${format}` : `${id}-${width}.${format}`;
}

export function findImage(manifest: Manifest, id: string): ManifestImage | undefined {
  return manifest.images.find((image) => image.id === id);
}

export function collections(manifest: Manifest): string[] {
  const seen = new Set<string>();
  for (const image of manifest.images) seen.add(image.collection);
  return [...seen].sort();
}

export function collectionImages(manifest: Manifest, collection: string): ManifestImage[] {
  return manifest.images
    .filter((image) => image.collection === collection)
    .sort((a, b) => a.id.localeCompare(b.id));
}

export interface NewImageInput {
  id: string;
  collection: string;
  sourcePath: string | null;
  remoteUrl?: string;
  ref?: string;
  alt: string;
  width: number;
  height: number;
  variants: Variant[];
}

export function upsertImage(manifest: Manifest, input: NewImageInput): ManifestImage {
  const now = new Date().toISOString();
  const existing = findImage(manifest, input.id);
  const next: ManifestImage = {
    id: input.id,
    collection: input.collection,
    sourcePath: input.sourcePath,
    alt: input.alt || existing?.alt || "",
    width: input.width,
    height: input.height,
    variants: input.variants,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    ...(input.remoteUrl || existing?.remoteUrl
      ? { remoteUrl: input.remoteUrl || existing?.remoteUrl }
      : {}),
    ...(input.ref || existing?.ref ? { ref: input.ref || existing?.ref } : {}),
  };
  if (existing) {
    const index = manifest.images.indexOf(existing);
    manifest.images[index] = next;
  } else {
    manifest.images.push(next);
  }
  return next;
}

export function seedTeam(manifest: Manifest, seeds: readonly TeamSeed[]): number {
  let added = 0;
  const now = new Date().toISOString();
  for (const seed of seeds) {
    const id = `team/${seed.memberId}`;
    if (findImage(manifest, id)) continue;
    manifest.images.push({
      id,
      collection: "team",
      sourcePath: null,
      alt: seed.name,
      ref: seed.memberId,
      width: 0,
      height: 0,
      variants: [],
      createdAt: now,
      updatedAt: now,
    });
    added += 1;
  }
  return added;
}

/** Strips the manifest of images whose source file no longer exists and which
 *  were never uploaded. Returns the number of entries pruned. */
export function pruneStale(manifest: Manifest, manifestPath: string): number {
  let removed = 0;
  manifest.images = manifest.images.filter((image) => {
    if (!image.sourcePath) return true;
    const hasVariantUploaded = image.variants.some((variant) => variant.uploadedAt);
    if (hasVariantUploaded) return true;
    if (existsSync(resolve(dirname(manifestPath), image.sourcePath))) return true;
    removed += 1;
    return false;
  });
  return removed;
}

/** Relative path of a source file against the project root (always using /). */
export function projectRelative(projectPath: string, file: string): string {
  return relative(projectPath, file).split(sep).join("/");
}
