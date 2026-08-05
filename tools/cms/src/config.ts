import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { FORMATS, type CmsConfig, type ImageFormat, type R2Config } from "./types.js";

const CMS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_DIR = join(CMS_ROOT, "config");
const CONFIG_PATH = join(CONFIG_DIR, "cms.config.json");
const ENV_PATH = join(CMS_ROOT, ".env");
export const DEFAULT_MANIFEST_PATH = join(CMS_ROOT, "data", "manifest.json");

/** Loads tools/cms/.env into process.env without overriding existing vars. */
function loadDotEnv(): void {
  if (!existsSync(ENV_PATH)) return;
  const raw = readFileSync(ENV_PATH, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const key = match[1];
    const value = match[2].trim().replace(/^["']|["']$/g, "");
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadDotEnv();

interface RawConfig {
  projectPath?: string;
  registryOut?: string;
  sourceRoot?: string;
  sizes?: Array<{ name?: string; width?: number; device?: string }>;
  qualities?: Partial<Record<ImageFormat, number>>;
  r2?: Partial<R2Config>;
  teamSeeds?: Array<{ memberId?: string; name?: string }>;
}

const readRawConfig = (): RawConfig => {
  if (!existsSync(CONFIG_PATH)) return {};
  return JSON.parse(readFileSync(CONFIG_PATH, "utf8")) as RawConfig;
};

const env = (key: string): string => process.env[key]?.trim() ?? "";

export function loadConfig(): CmsConfig {
  const raw = readRawConfig();

  const projectPath =
    process.env.SEA_KERS_PROJECT_PATH?.trim() ||
    resolve(CONFIG_DIR, raw.projectPath ?? "../../../apps/web");

  const sizes = (raw.sizes?.length ? raw.sizes : []).map((size) => ({
    name: size.name ?? `w${size.width ?? 480}`,
    width: size.width ?? 480,
    device: size.device ?? `${size.width ?? 480}px`,
  }));
  if (sizes.length === 0) {
    sizes.push(
      { name: "mobile", width: 480, device: "Phones (max-width: 640px)" },
      { name: "tablet", width: 960, device: "Tablets (641px-1024px)" },
      { name: "desktop", width: 1920, device: "Desktops (min-width: 1025px)" },
    );
  }

  const qualities = { avif: 55, webp: 80, jpeg: 82 };
  for (const format of FORMATS) {
    if (typeof raw.qualities?.[format] === "number") qualities[format] = raw.qualities[format] as number;
  }

  return {
    projectPath,
    registryOut: raw.registryOut ?? "src/data/imageRegistry.ts",
    sourceRoot: raw.sourceRoot ?? "public/images",
    sizes,
    qualities,
    r2: {
      accountId: env("R2_ACCOUNT_ID") || raw.r2?.accountId?.trim() || "",
      bucketName: env("R2_BUCKET_NAME") || raw.r2?.bucketName?.trim() || "",
      publicUrl: env("R2_PUBLIC_URL") || raw.r2?.publicUrl?.trim() || "",
    },
    teamSeeds: (raw.teamSeeds ?? [])
      .filter((seed) => seed.memberId && seed.name)
      .map((seed) => ({ memberId: seed.memberId as string, name: seed.name as string })),
  };
}

export interface R2Credentials {
  accessKeyId: string;
  secretAccessKey: string;
}

export function r2Credentials(): R2Credentials {
  return { accessKeyId: env("R2_ACCESS_KEY_ID"), secretAccessKey: env("R2_SECRET_ACCESS_KEY") };
}

export function hasR2(config: CmsConfig): boolean {
  const creds = r2Credentials();
  return Boolean(
    config.r2.accountId &&
      config.r2.bucketName &&
      config.r2.publicUrl &&
      creds.accessKeyId &&
      creds.secretAccessKey,
  );
}
