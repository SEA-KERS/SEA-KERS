export const FORMATS = ["avif", "webp", "jpeg"] as const;
export type ImageFormat = (typeof FORMATS)[number];

export interface SizePreset {
  name: string;
  width: number;
  device: string;
}

export interface R2Config {
  accountId: string;
  bucketName: string;
  publicUrl: string;
}

export interface TeamSeed {
  memberId: string;
  name: string;
}

export interface CmsConfig {
  /** Absolute path to the web app that consumes the generated registry. */
  projectPath: string;
  /** Registry output path, relative to projectPath. */
  registryOut: string;
  /** Folder scanned for images, relative to projectPath. */
  sourceRoot: string;
  sizes: SizePreset[];
  qualities: Record<ImageFormat, number>;
  r2: R2Config;
  teamSeeds: TeamSeed[];
}

export interface Variant {
  format: ImageFormat;
  width: number;
  height: number;
  bytes: number;
  /** Full R2 object key, e.g. wins/win-01/img-1-960.webp */
  key: string;
  /** ISO timestamp once the variant has been uploaded to R2. */
  uploadedAt: string | null;
  etag?: string;
}

export interface ManifestImage {
  /** Stable slug used as the R2 key prefix, e.g. wins/win-01/img-1. */
  id: string;
  collection: string;
  /** Path to the local source file, relative to projectPath. Null for remote placeholders. */
  sourcePath: string | null;
  /** Original remote URL for placeholder entries (e.g. Unsplash avatars). */
  remoteUrl?: string;
  /** Cross-reference, e.g. the team member id for team avatars. */
  ref?: string;
  alt: string;
  width: number;
  height: number;
  variants: Variant[];
  createdAt: string;
  updatedAt: string;
}

export interface Manifest {
  version: 1;
  /** Public R2 base URL that the generated registry is built against. */
  baseUrl: string;
  images: ManifestImage[];
}
