import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../components/HomePage";
import { SITE_CONFIG } from "../config/site";

const title = "Team SEA-KERS | Engineering Collective in India";
const description =
  "Meet Team SEA-KERS, a collegiate engineering collective with 20+ hackathon wins building open technology across AI, Web3, and DePIN.";
const pageUrl = SITE_CONFIG.url ? `${SITE_CONFIG.url}/` : null;
const socialPreviewUrl = SITE_CONFIG.url
  ? new URL("/social-preview.jpg", SITE_CONFIG.url).href
  : null;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_CONFIG.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      ...(pageUrl ? [{ property: "og:url", content: pageUrl }] : []),
      ...(socialPreviewUrl
        ? [
            { property: "og:image", content: socialPreviewUrl },
            { property: "og:image:type", content: "image/jpeg" },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            {
              property: "og:image:alt",
              content: "Team SEA-KERS engineering collective",
            },
          ]
        : []),
      {
        name: "twitter:card",
        content: socialPreviewUrl ? "summary_large_image" : "summary",
      },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(socialPreviewUrl
        ? [
            { name: "twitter:image", content: socialPreviewUrl },
            {
              name: "twitter:image:alt",
              content: "Team SEA-KERS engineering collective",
            },
          ]
        : []),
    ],
    links: pageUrl ? [{ rel: "canonical", href: pageUrl }] : [],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_CONFIG.name,
          description,
          ...(pageUrl ? { url: pageUrl } : {}),
          ...(socialPreviewUrl ? { logo: socialPreviewUrl } : {}),
          areaServed: "Worldwide",
          knowsAbout: [
            "Artificial intelligence",
            "Decentralized physical infrastructure networks",
            "Open-source software",
            "Web3",
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});