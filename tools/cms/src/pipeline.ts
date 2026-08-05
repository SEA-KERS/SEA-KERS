import sharp from "sharp";
import { FORMATS, type ImageFormat, type SizePreset } from "./types.js";

export interface ProcessedVariant {
  format: ImageFormat;
  width: number;
  height: number;
  bytes: number;
  buffer: Buffer;
}

export interface ProcessResult {
  width: number;
  height: number;
  variants: ProcessedVariant[];
}

export interface Dimensions {
  width: number;
  height: number;
}

/** Reads original dimensions without doing pixel work. */
export async function inspectDimensions(sourcePath: string): Promise<Dimensions> {
  const metadata = await sharp(sourcePath, { failOn: "none" }).rotate().metadata();
  return { width: metadata.width ?? 0, height: metadata.height ?? 0 };
}

/** Computes the resized width/height for a given target without encoding. */
export async function previewDimensions(
  sourcePath: string,
  width: number,
): Promise<Dimensions> {
  const { width: sourceWidth = 0, height: sourceHeight = 0 } = await sharp(
    sourcePath,
    { failOn: "none" },
  )
    .rotate()
    .metadata();
  if (sourceWidth <= 0 || sourceHeight <= 0) return { width, height: width };
  const targetWidth = Math.min(width, sourceWidth);
  return {
    width: targetWidth,
    height: Math.round((sourceHeight / sourceWidth) * targetWidth),
  };
}

function encode(
  image: sharp.Sharp,
  format: ImageFormat,
  quality: number,
): Promise<Buffer> {
  switch (format) {
    case "avif":
      return image.avif({ quality, effort: 6 }).toBuffer();
    case "webp":
      return image.webp({ quality }).toBuffer();
    case "jpeg":
      return image.jpeg({ quality, mozjpeg: true }).toBuffer();
  }
}

/**
 * Runs the pipeline: resize the source into every SizePreset, encode each size
 * as avif/webp/jpeg (9 variants per source). Orientation is honoured.
 */
export async function processImage(
  sourcePath: string,
  sizes: SizePreset[],
  qualities: Record<ImageFormat, number>,
): Promise<ProcessResult> {
  const source = sharp(sourcePath, { failOn: "none" }).rotate();
  const sourceMetadata = await source.metadata();
  const sourceWidth = sourceMetadata.width ?? 0;
  const sourceHeight = sourceMetadata.height ?? 0;

  const variants: ProcessedVariant[] = [];
  const seenWidths = new Set<number>();
  for (const size of sizes) {
    const targetWidth = Math.min(size.width, sourceWidth || size.width);
    if (seenWidths.has(targetWidth)) continue;
    seenWidths.add(targetWidth);
    const resized = source.clone().resize({ width: targetWidth, withoutEnlargement: true });
    for (const format of FORMATS) {
      const buffer = await encode(resized.clone(), format, qualities[format]);
      const encoded = await sharp(buffer).metadata();
      variants.push({
        format,
        width: encoded.width ?? targetWidth,
        height: encoded.height ?? sourceHeight,
        bytes: buffer.byteLength,
        buffer,
      });
    }
  }

  return { width: sourceWidth, height: sourceHeight, variants };
}
