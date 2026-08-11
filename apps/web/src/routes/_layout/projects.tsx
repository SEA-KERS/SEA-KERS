/* oxlint-disable react/only-export-components */
import { createFileRoute, useLocation } from "@tanstack/react-router";
import ProjectsPage, {
  FILTER_GROUPS,
  type FilterGroup,
} from "../../components/pages/ProjectsPage";
import { SITE_CONFIG } from "../../config/site";

const title = "Projects | Team SEA-KERS";
const description =
  "What Team SEA-KERS builds: edge compute, AI security, zero-knowledge identity, and robotics infrastructure documented to specification.";
const pageUrl = SITE_CONFIG.url ? `${SITE_CONFIG.url}/projects` : null;

const findGroup = (label: unknown): FilterGroup =>
  FILTER_GROUPS.find((group) => group.label === label) ?? FILTER_GROUPS[0];

export const Route = createFileRoute("/_layout/projects")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { group?: string; q?: string } => ({
    group: findGroup(search.group).label,
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: ProjectsRoute,
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

function ProjectsRoute() {
  const { group: groupLabel, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const hash = useLocation().hash;
  const group = findGroup(groupLabel);

  const searchFor = (overrides: {
    group?: string;
    q?: string;
  }): { group?: string; q?: string } => {
    const nextGroup = overrides.group ?? groupLabel ?? FILTER_GROUPS[0].label;
    const nextQ = overrides.q ?? q ?? "";
    return nextQ ? { group: nextGroup, q: nextQ } : { group: nextGroup };
  };

  return (
    <ProjectsPage
      group={group}
      q={q ?? ""}
      expandedId={hash || null}
      onGroupChange={(next) =>
        navigate({ search: searchFor({ group: next.label }), replace: true })
      }
      onSearchChange={(next) =>
        navigate({ search: searchFor({ q: next }), replace: true })
      }
      onToggleExpand={(id) =>
        navigate({
          search: searchFor({}),
          hash: id ?? "",
          replace: true,
          resetScroll: false,
        })
      }
    />
  );
}
