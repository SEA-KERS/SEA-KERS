const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();

export const SITE_CONFIG = {
  name: "Team SEA-KERS",
  description:
    "A collegiate engineering collective building open technology across AI, Web3, and DePIN.",
  url: configuredUrl ? configuredUrl.replace(/\/$/, "") : null,
  cloudflareAnalyticsToken:
    import.meta.env.VITE_CLOUDFLARE_ANALYTICS_TOKEN?.trim() || null,
} as const;