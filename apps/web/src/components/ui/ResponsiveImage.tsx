import type { ImgHTMLAttributes } from "react";
import {
  getImageRecord,
  imageUrl,
  type ImageFormat,
  type ImageRecord,
  type ImageVariant,
} from "../../data/imageRegistry";
import { getImageSrcSet } from "../../utils/images";

type ResponsiveImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "alt"
> & {
  src: string;
  alt: string;
  /** Explicit registry id, e.g. "team/arjun-s". Tried before the legacy-path lookup. */
  registryId?: string;
};

const FORMAT_ORDER: readonly ImageFormat[] = ["avif", "webp", "jpeg"];

/** Converts a legacy public path like /images/wins/win-01/img-1.jpg into a registry id. */
const toRegistryId = (src: string): string | null => {
  if (!src.startsWith("/images/")) return null;
  return src.slice("/images/".length).replace(/\.[a-zA-Z0-9]+$/, "");
};

const resolveRecord = (
  src: string,
  registryId?: string,
): ImageRecord | undefined => {
  const id = registryId ?? toRegistryId(src);
  if (!id) return undefined;
  const record = getImageRecord(id);
  if (!record) return undefined;
  return record.variants.some((variant) => variant.uploaded)
    ? record
    : undefined;
};

const uploadedVariants = (record: ImageRecord, format: ImageFormat) =>
  record.variants
    .filter((variant) => variant.format === format && variant.uploaded)
    .sort((a, b) => a.width - b.width)
    .filter(
      (variant, index, all) =>
        index === 0 || all[index - 1].width !== variant.width,
    );

const variantSrc = (variant: ImageVariant) => imageUrl(variant.key);

const variantSrcSet = (variants: ImageVariant[]) =>
  variants
    .map((variant) => `${variantSrc(variant)} ${variant.width}w`)
    .join(", ");

/**
 * Renders an image from the CMS image registry as a <picture> with avif/webp
 * <source> elements and a jpeg fallback. Falls back to a plain <img> using the
 * legacy srcSet pipeline when the registry has no uploaded record yet, so the
 * site keeps working before the CMS has been run.
 */
export default function ResponsiveImage({
  src,
  alt,
  registryId,
  sizes,
  className,
  ...rest
}: ResponsiveImageProps) {
  const record = resolveRecord(src, registryId);

  if (!record) {
    return (
      <img
        {...rest}
        src={src}
        srcSet={getImageSrcSet(src)}
        sizes={sizes}
        alt={alt}
        className={className}
      />
    );
  }

  const jpeg = uploadedVariants(record, "jpeg");
  const widestJpeg = jpeg[jpeg.length - 1];

  return (
    <picture>
      {FORMAT_ORDER.filter((format) => format !== "jpeg").map((format) => {
        const variants = uploadedVariants(record, format);
        if (variants.length === 0) return null;
        return (
          <source
            key={format}
            type={`image/${format}`}
            srcSet={variantSrcSet(variants)}
            sizes={sizes}
          />
        );
      })}
      <img
        {...rest}
        src={widestJpeg ? variantSrc(widestJpeg) : src}
        srcSet={jpeg.length > 0 ? variantSrcSet(jpeg) : undefined}
        sizes={sizes}
        alt={alt}
        className={className}
      />
    </picture>
  );
}
