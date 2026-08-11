/* oxlint-disable react/only-export-components */
import { createFileRoute, useLocation } from "@tanstack/react-router";
import TeamPage from "../../components/pages/TeamPage";
import { SITE_CONFIG } from "../../config/site";

const title = "Team | Team SEA-KERS";
const description =
  "The Team SEA-KERS roster: the engineers and builders behind twenty hackathon wins across AI, computer vision, and robotics.";
const pageUrl = SITE_CONFIG.url ? `${SITE_CONFIG.url}/team` : null;

export const Route = createFileRoute("/_layout/team")({
  component: TeamRoute,
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
});

function TeamRoute() {
  const hash = useLocation().hash;
  return <TeamPage activeMemberId={hash || null} />;
}
