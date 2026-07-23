const replaceWidth = (url: string, width: number) => {
  const parsed = new URL(url);
  parsed.searchParams.set("w", String(width));
  parsed.searchParams.set("auto", "format");
  parsed.searchParams.set("fit", "crop");
  return parsed.toString();
};

export const getImageSrcSet = (url: string) =>
  [400, 640, 960]
    .map((width) => `${replaceWidth(url, width)} ${width}w`)
    .join(", ");