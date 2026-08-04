const replaceWidth = (url: string, width: number) => {
  try {
    const isAbsolute = url.startsWith("http://") || url.startsWith("https://");
    const parsed = isAbsolute
      ? new URL(url)
      : new URL(url, "http://localhost");
    parsed.searchParams.set("w", String(width));
    parsed.searchParams.set("auto", "format");
    parsed.searchParams.set("fit", "crop");
    return isAbsolute ? parsed.toString() : `${parsed.pathname}${parsed.search}`;
  } catch {
    return url;
  }
};

export const getImageSrcSet = (url: string) =>
  [400, 640, 960]
    .map((width) => `${replaceWidth(url, width)} ${width}w`)
    .join(", ");