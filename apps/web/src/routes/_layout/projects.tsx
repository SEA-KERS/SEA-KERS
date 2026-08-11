import { createFileRoute } from "@tanstack/react-router";
import ProjectsPage from "../../components/pages/ProjectsPage";
import { SITE_CONFIG } from "../../config/site";

const title = "Projects | Team SEA-KERS";
const description =
  "What Team SEA-KERS builds: edge compute, AI security, zero-knowledge identity, and robotics infrastructure documented to specification.";
const pageUrl = SITE_CONFIG.url ? `${SITE_CONFIG.url}/projects` : null;

export const Route = createFileRoute("/_layout/projects")({
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
  component: ProjectsPage,
});
