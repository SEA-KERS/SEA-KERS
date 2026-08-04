import { useState } from "react";
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { WINS_DATA } from "../data/teamData";
import { useAccessibleDialog } from "../hooks/useAccessibleDialog";
import { getImageSrcSet } from "../utils/images";
import type { WinRecord } from "../types";

interface WinsSectionProps {
  onSelectProject: (projectId: string) => void;
}

const tracks = [
  { label: "All", value: "ALL" },
  { label: "E-Cell", value: "ecell" },
  { label: "IEEE", value: "IEEE" },
  { label: "IISc", value: "IISc" },
  { label: "MSME", value: "MSME" },
  { label: "HAL", value: "HAL" },
] as const;

type TrackFilter = (typeof tracks)[number]["value"];

/**
 * Displays searchable, filterable team win records with expandable details and project links.
 *
 * @param onSelectProject - Handles navigation to the project associated with a selected win.
 */
export default function WinsSection({ onSelectProject }: WinsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<TrackFilter>("ALL");
  const [activeWin, setActiveWin] = useState<WinRecord | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { dialogRef, rememberTrigger } = useAccessibleDialog(
    activeWin !== null,
    () => setActiveWin(null),
  );

  const filteredWins = WINS_DATA.filter((win) => {
    const query = searchQuery.toLowerCase();
    return (
      (selectedTrack === "ALL" || win.track === selectedTrack) &&
      [win.title, win.hackathon, win.description].some((value) =>
        value.toLowerCase().includes(query),
      )
    );
  });

  const openWin = (win: WinRecord, trigger: HTMLElement) => {
    rememberTrigger(trigger);
    setActiveImageIndex(0);
    setActiveWin(win);
  };

  const moveImage = (direction: -1 | 1) => {
    if (!activeWin) return;
    setActiveImageIndex(
      (current) =>
        (current + direction + activeWin.images.length) % activeWin.images.length,
    );
  };

  return (
    <section
      id="wins-section"
      aria-labelledby="wins-title"
      className="border-b border-(--border) px-4 py-20 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1fr_18rem] md:items-end">
          <div>
            <p className="section-kicker">
              <Award aria-hidden="true" className="h-4 w-4" />
              Track record
            </p>
            <h2 id="wins-title" className="mt-3 font-headline text-4xl font-bold md:text-5xl">
              Challenges conquered
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-(--muted-foreground)">
              Every record represents a working system built under pressure,
              tested against a deadline, and presented to expert judges.
            </p>
          </div>
          <div>
            <label htmlFor="win-search" className="mb-1.5 block text-sm font-semibold">
              Search challenges
            </label>
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-(--muted-foreground)" />
              <input
                id="win-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="input-control search-control"
                placeholder="Project or hackathon"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter wins by track">
          {tracks.map((track) => (
            <button
              key={track.value}
              type="button"
              onClick={() => setSelectedTrack(track.value)}
              aria-pressed={selectedTrack === track.value}
              className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${
                selectedTrack === track.value
                  ? "bg-(--primary) text-(--primary-foreground)"
                  : "bg-(--muted) text-(--muted-foreground) hover:text-(--foreground)"
              }`}
            >
              {track.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-(--muted-foreground)" aria-live="polite">
          {filteredWins.length} {filteredWins.length === 1 ? "result" : "results"}
        </p>

        <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWins.map((win) => (
            <article
              key={win.id}
              onClick={(event) => openWin(win, event.currentTarget)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openWin(win, event.currentTarget);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${win.hackathon}: ${win.title}`}
              className="surface-card flex overflow-hidden flex-col cursor-pointer transition-all duration-200 hover:border-(--primary) focus-visible:outline-2 focus-visible:outline-(--ring)"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-(--muted)">
                <img
                  src={win.images[0]}
                  srcSet={getImageSrcSet(win.images[0])}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                  width="640"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  alt={`Presentation of ${win.title}`}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-(--accent) px-3 py-1 text-xs font-bold text-(--accent-foreground)">
                  {win.award}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-(--muted-foreground)">
                  <span className="inline-flex items-center gap-1">
                    <MapPin aria-hidden="true" className="h-4 w-4" />
                    {win.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar aria-hidden="true" className="h-4 w-4" />
                    {win.date}
                  </span>
                </div>
                <h3 className="mt-4 font-headline text-xl font-bold">{win.hackathon}</h3>
                <p className="mt-1 text-sm font-medium text-(--primary-text)">{win.title}</p>
                <p className="mt-3 flex-1 text-sm leading-6 text-(--muted-foreground)">
                  {win.tagline || win.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {win.techStack.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
                <div className="button-secondary mt-5 w-full text-center">
                  <Info aria-hidden="true" className="h-4 w-4" />
                  View details
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredWins.length === 0 ? (
          <div className="surface-card mt-6 p-8 text-center text-(--muted-foreground)">
            No challenges match those filters.
          </div>
        ) : null}
      </div>

      {activeWin ? (
        <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setActiveWin(null)}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="win-dialog-title"
            aria-describedby="win-dialog-description"
            tabIndex={-1}
            className="dialog-panel"
          >
            <button type="button" onClick={() => setActiveWin(null)} aria-label="Close win details" className="icon-button absolute right-4 top-4 z-10">
              <X aria-hidden="true" className="h-5 w-5" />
            </button>

            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg bg-(--muted)">
              <img
                src={activeWin.images[activeImageIndex]}
                srcSet={getImageSrcSet(activeWin.images[activeImageIndex])}
                sizes="(min-width: 768px) 42rem, 100vw"
                width="960"
                height="540"
                decoding="async"
                alt={`${activeWin.title}, image ${activeImageIndex + 1} of ${activeWin.images.length}`}
                className="h-full w-full object-cover"
              />
              {activeWin.images.length > 1 ? (
                <>
                  <button type="button" onClick={() => moveImage(-1)} aria-label="Previous image" className="icon-button absolute left-3 top-1/2 -translate-y-1/2 bg-(--card)">
                    <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => moveImage(1)} aria-label="Next image" className="icon-button absolute right-3 top-1/2 -translate-y-1/2 bg-(--card)">
                    <ChevronRight aria-hidden="true" className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-(--card) p-2" role="group" aria-label="Choose image">
                    {activeWin.images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        aria-label={`Show image ${index + 1}`}
                        aria-current={activeImageIndex === index ? "true" : undefined}
                        className={`h-3 w-3 rounded-full ${activeImageIndex === index ? "bg-(--primary)" : "bg-(--input)"}`}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <p className="section-kicker mt-6">{activeWin.location} / {activeWin.date}</p>
            <h2 id="win-dialog-title" className="mt-2 pr-12 font-headline text-3xl font-bold">{activeWin.hackathon}</h2>
            <p className="mt-1 text-sm font-semibold text-(--primary-text)">{activeWin.title}</p>
            <p id="win-dialog-description" className="mt-4 leading-7 text-(--muted-foreground)">{activeWin.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {activeWin.techStack.map((tech) => <span key={tech} className="tag">{tech}</span>)}
            </div>
            <button
              type="button"
              onClick={() => {
                const projectId = activeWin.projectRef;
                setActiveWin(null);
                onSelectProject(projectId);
              }}
              className="button-primary mt-6"
            >
              View matching project
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}