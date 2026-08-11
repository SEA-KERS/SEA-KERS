import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { SITE_CONFIG } from "./config/site";
import { IMAGE_BASE_URL } from "./data/imageRegistry";

const imageSources = ["'self'", "data:", "blob:", "https://images.unsplash.com"];
if (IMAGE_BASE_URL) {
  const origin = URL.parse(IMAGE_BASE_URL)?.origin;
  if (origin) imageSources.push(origin);
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
      const body = [
        "User-agent: *",
        "Allow: /",
        "",
        "# Team SEA-KERS crawler policy",
        "# Allow search engines to index and follow the whole site.",
        "# AI crawlers are allowed: they may cite and link public records.",
        "User-agent: GPTBot",
        "Allow: /",
        "User-agent: OAI-SearchBot",
        "Allow: /",
        "User-agent: ChatGPT-User",
        "Allow: /",
        "User-agent: PerplexityBot",
        "Allow: /",
        "User-agent: Google-Extended",
        "Allow: /",
        "User-agent: ClaudeBot",
        "Allow: /",
        "User-agent: Claude-Web",
        "Allow: /",
        "",
        `Sitemap: ${siteUrl}/sitemap.xml`,
      ].join("\n");
      return withSecurityHeaders(
        new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
        requestUrl.protocol === "https:",
      );
    }

    if (requestUrl.pathname === "/sitemap.xml") {
      const pages = [
        { path: "/", priority: "1.0", changefreq: "weekly" },
        { path: "/wins", priority: "0.9", changefreq: "monthly" },
        { path: "/projects", priority: "0.8", changefreq: "monthly" },
        { path: "/team", priority: "0.7", changefreq: "monthly" },
      ];
      const lastmod = new Date().toISOString().slice(0, 10);
      const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
        .map(
          (page) =>
            `<url><loc>${siteUrl}${page.path}</loc><lastmod>${lastmod}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>`,
        )
        .join("")}</urlset>`;
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

    if (requestUrl.pathname === "/.well-known/security.txt" ||
        requestUrl.pathname === "/security.txt") {
      const body = [
        "Contact: https://github.com/SEA-KERS/SEA-KERS/issues",
        "Expires: 2027-01-01T00:00:00.000Z",
        "Preferred-Languages: en",
        "",
        "# Team SEA-KERS security contact",
        "# Please report vulnerabilities privately via a GitHub issue.",
      ].join("\n");
      return withSecurityHeaders(
        new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
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