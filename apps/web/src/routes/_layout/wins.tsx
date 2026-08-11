/* oxlint-disable react/only-export-components */
import { createFileRoute, useLocation } from "@tanstack/react-router";
import WinsPage, { tracks, type TrackFilter } from "../../components/pages/WinsPage";
import { SITE_CONFIG } from "../../config/site";

const title = "Wins | Team SEA-KERS";
const description =
  "The Team SEA-KERS track record: hackathon wins, grand prizes, and grants won on the world stage across AI, computer vision, and robotics.";
const pageUrl = SITE_CONFIG.url ? `${SITE_CONFIG.url}/wins` : null;

const findTrack = (value: unknown): TrackFilter =>
  tracks.some((track) => track.value === value)
    ? (value as TrackFilter)
    : "ALL";

export const Route = createFileRoute("/_layout/wins")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { track?: TrackFilter; q?: string } => {
    const track = findTrack(search.track);
    const q = typeof search.q === "string" ? search.q : "";
    return q ? { track, q } : { track };
  },
  component: WinsRoute,
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

function WinsRoute() {
  const { track, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const hash = useLocation().hash;

  const searchFor = (overrides: {
    track?: TrackFilter;
    q?: string;
  }): { track?: TrackFilter; q?: string } => {
    const nextTrack = overrides.track ?? track ?? "ALL";
    const nextQ = overrides.q ?? q ?? "";
    return nextQ ? { track: nextTrack, q: nextQ } : { track: nextTrack };
  };

  return (
    <WinsPage
      track={track ?? "ALL"}
      q={q ?? ""}
      expandedId={hash || null}
      onTrackChange={(next) =>
        navigate({ search: searchFor({ track: next }), replace: true })
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
