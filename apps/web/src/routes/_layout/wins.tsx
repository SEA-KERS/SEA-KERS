import { createFileRoute } from "@tanstack/react-router";
import WinsPage from "../../components/pages/WinsPage";
import { SITE_CONFIG } from "../../config/site";

const title = "Wins | Team SEA-KERS";
const description =
  "The Team SEA-KERS track record: hackathon wins, grand prizes, and grants won on the world stage across AI, computer vision, and robotics.";
const pageUrl = SITE_CONFIG.url ? `${SITE_CONFIG.url}/wins` : null;

export const Route = createFileRoute("/_layout/wins")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:site_name", content: SITE_CONFIG.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      ...(pageUrl ? [{ property: "og:url", content: pageUrl }] : []),
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: pageUrl ? [{ rel: "canonical", href: pageUrl }] : [],
  }),
  component: WinsPage,
});
