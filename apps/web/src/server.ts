import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { SITE_CONFIG } from "./config/site";
import { IMAGE_BASE_URL } from "./data/imageRegistry";

const imageSources = ["'self'", "data:", "blob:", "https://images.unsplash.com"];
if (IMAGE_BASE_URL) {
  imageSources.push(new URL(IMAGE_BASE_URL).origin);
}

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self' https://cloudflareinsights.com",
  "font-src 'self' data:",
  "form-action 'self'",
  "frame-ancestors 'none'",
  `img-src ${imageSources.join(" ")}`,
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "upgrade-insecure-requests",
].join("; ");

const withSecurityHeaders = (response: Response, isHttps: boolean) => {
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", CONTENT_SECURITY_POLICY);
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  if (isHttps) {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export default createServerEntry({
  async fetch(request) {
    const requestUrl = new URL(request.url);
    const siteUrl = SITE_CONFIG.url ?? requestUrl.origin;

    if (requestUrl.pathname === "/robots.txt") {
      return withSecurityHeaders(
        new Response(`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
        requestUrl.protocol === "https:",
      );
    }

    if (requestUrl.pathname === "/sitemap.xml") {
      const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc></url></urlset>`;
      return withSecurityHeaders(
        new Response(body, {
          headers: {
            "Cache-Control": "public, max-age=3600",
            "Content-Type": "application/xml; charset=utf-8",
          },
        }),
        requestUrl.protocol === "https:",
      );
    }

    return withSecurityHeaders(
      await handler.fetch(request),
      requestUrl.protocol === "https:",
    );
  },
});