import { createFileRoute } from "@tanstack/react-router";
import brandIcon from "../assets/brand/sea-kers-icon-color.svg";
import HomePage from "../components/HomePage";
import { SITE_CONFIG } from "../config/site";

const title = "Team SEA-KERS | Engineering Collective in India";
const description =
  "Meet Team SEA-KERS, a collegiate engineering collective with 20+ hackathon wins building open technology across AI, Web3, and DePIN.";
const pageUrl = SITE_CONFIG.url ? `${SITE_CONFIG.url}/` : null;
const logoUrl = SITE_CONFIG.url ? new URL(brandIcon, SITE_CONFIG.url).href : brandIcon;

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
      { property: "og:image", content: logoUrl },
      { property: "og:image:alt", content: "Team SEA-KERS caret and wave logo" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: logoUrl },
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
          logo: logoUrl,
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