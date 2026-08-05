import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import type { ImageFormat, R2Config } from "./types.js";
import type { R2Credentials } from "./config.js";

const MIME: Record<ImageFormat, string> = {
  avif: "image/avif",
  webp: "image/webp",
  jpeg: "image/jpeg",
};

export interface R2ClientHandle {
  readonly bucket: string;
  readonly client: S3Client;
}

export function createR2Client(
  config: R2Config,
  credentials: R2Credentials,
): R2ClientHandle | null {
  if (!config.accountId || !credentials.accessKeyId || !credentials.secretAccessKey) {
    return null;
  }
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
    },
    maxAttempts: 3,
  });
  return { bucket: config.bucketName, client };
}

export async function ensureBucket(handle: R2ClientHandle): Promise<void> {
  const { client, bucket } = handle;
  try {
    await client.send(new HeadBucketCommand({ Bucket: bucket }));
  } catch {
    await client.send(new CreateBucketCommand({ Bucket: bucket }));
  }
}

export interface UploadedVariant {
  key: string;
  etag: string | undefined;
  uploadedAt: string;
}

export async function uploadVariant(
  handle: R2ClientHandle,
  key: string,
  body: Buffer,
  format: ImageFormat,
  width: number,
  height: number,
): Promise<UploadedVariant> {
  const response = await handle.client.send(
    new PutObjectCommand({
      Bucket: handle.bucket,
      Key: key,
      Body: body,
      ContentType: MIME[format],
      CacheControl: "public, max-age=31536000, immutable",
      Metadata: {
        "x-encoded-width": String(width),
        "x-encoded-height": String(height),
      },
    }),
  );
  return { key, etag: response.ETag, uploadedAt: new Date().toISOString() };
}
