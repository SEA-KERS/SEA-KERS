import { useState } from "react";
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { useAccessibleDialog } from "../../hooks/useAccessibleDialog";
import { useReveal } from "../../hooks/useReveal";
import ResponsiveImage from "../ui/ResponsiveImage";
import { WINS_DATA } from "../../data/wins";
import type { WinRecord } from "../../types";

const tracks = [
  { label: "All", value: "ALL" },
  { label: "E-Cell", value: "ecell" },
  { label: "IEEE", value: "IEEE" },
  { label: "IISc", value: "IISc" },
  { label: "MSME", value: "MSME" },
  { label: "HAL", value: "HAL" },
] as const;

type TrackFilter = (typeof tracks)[number]["value"];

const formatIndex = (index: number) => String(index + 1).padStart(2, "0");

interface WinsSectionProps {
  onSelectProject: (projectId: string) => void;
}

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
    if (!activeWin || activeWin.images.length === 0) return;
    setActiveImageIndex(
      (current) =>
        (current + direction + activeWin.images.length) % activeWin.images.length,
    );
  };

  return (
    <section
      id="wins-section"
      aria-labelledby="wins-title"
      className="px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="kicker">Track record</p>
            <h2
              id="wins-title"
              className="mt-4 font-headline text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl"
            >
              Challenges conquered
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-(--muted-foreground)">
              Every record represents a working system built under pressure,
              tested against a deadline, and presented to expert judges.
            </p>
          </div>
          <div className="md:col-span-4">
            <label htmlFor="win-search" className="meta-label block">
              Search challenges
            </label>
            <div className="relative mt-3">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-(--muted-foreground)"
              />
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

        <div
          className="mt-12 flex items-center gap-4 overflow-x-auto border-b border-(--border) sm:gap-7"
          role="group"
          aria-label="Filter wins by track"
        >
          {tracks.map((track) => (
            <button
              key={track.value}
              type="button"
              onClick={() => setSelectedTrack(track.value)}
              aria-pressed={selectedTrack === track.value}
              className={`min-h-11 shrink-0 border-b-2 pb-3 text-[0.6875rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                selectedTrack === track.value
                  ? "border-(--primary) text-(--accent-text)"
                  : "border-transparent text-(--muted-foreground) hover:text-(--foreground)"
              }`}
            >
              {track.label}
            </button>
          ))}
        </div>

        <p className="meta-label mt-4" aria-live="polite">
          {filteredWins.length} {filteredWins.length === 1 ? "record" : "records"}
        </p>

        <div className="mt-16 space-y-24 md:space-y-32">
          {filteredWins.map((win, index) => {
            const isEven = index % 2 === 0;
            const stableIndex = WINS_DATA.indexOf(win);
            return (
              <WinRow
                key={win.id}
                win={win}
                index={stableIndex}
                isEven={isEven}
                onOpen={openWin}
              />
            );
          })}
        </div>

        {filteredWins.length === 0 ? (
          <div className="mt-16 border-t border-(--border) py-20 text-center">
            <p className="font-headline text-2xl font-bold">
              No records found
            </p>
            <p className="mt-3 text-sm text-(--muted-foreground)">
              Try a different track or search term.
            </p>
          </div>
        ) : null}
      </div>

      {activeWin ? (
        <div
          className="dialog-backdrop"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setActiveWin(null)
          }
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="win-dialog-title"
            aria-describedby="win-dialog-description"
            tabIndex={-1}
            className="dialog-panel"
          >
            <button
              type="button"
              onClick={() => setActiveWin(null)}
              aria-label="Close win details"
              className="icon-button absolute right-4 top-4 z-10"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>

            {activeWin.images.length > 0 ? (
              <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg bg-(--muted)">
                <ResponsiveImage
                  src={activeWin.images[activeImageIndex]}
                  sizes="(min-width: 768px) 42rem, 100vw"
                  width="960"
                  height="540"
                  decoding="async"
                  alt={`${activeWin.title}, image ${activeImageIndex + 1} of ${activeWin.images.length}`}
                  className="h-full w-full object-cover"
                />
                {activeWin.images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => moveImage(-1)}
                      aria-label="Previous image"
                      className="icon-button absolute left-3 top-1/2 -translate-y-1/2 bg-(--card)"
                    >
                      <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(1)}
                      aria-label="Next image"
                      className="icon-button absolute right-3 top-1/2 -translate-y-1/2 bg-(--card)"
                    >
                      <ChevronRight aria-hidden="true" className="h-5 w-5" />
                    </button>
                    <div
                      className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-(--card) p-2"
                      role="group"
                      aria-label="Choose image"
                    >
                      {activeWin.images.map((_, imageIndex) => (
                        <button
                          key={imageIndex}
                          type="button"
                          onClick={() => setActiveImageIndex(imageIndex)}
                          aria-label={`Show image ${imageIndex + 1}`}
                          aria-current={
                            activeImageIndex === imageIndex ? "true" : undefined
                          }
                          className={`h-3 w-3 rounded-full ${
                            activeImageIndex === imageIndex
                              ? "bg-(--primary)"
                              : "bg-(--input)"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            ) : (
              <div className="mt-10 flex aspect-[16/9] w-full flex-col items-center justify-center rounded-lg bg-(--muted) p-6 text-center text-(--muted-foreground)">
                <Award aria-hidden="true" className="h-12 w-12 text-(--primary-text) opacity-60" />
                <span className="mt-2 text-sm font-semibold uppercase tracking-wider">No Preview Photo Available</span>
              </div>
            )}

            <p className="kicker mt-8">
              {activeWin.location} / {activeWin.date}
            </p>
            <h2
              id="win-dialog-title"
              className="mt-3 pr-12 font-headline text-3xl font-bold md:text-4xl"
            >
              {activeWin.hackathon}
            </h2>
            <p className="mt-2 font-semibold text-(--accent-text)">
              {activeWin.title}
            </p>
            {activeWin.prize ? (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-(--primary-soft) px-3 py-1 text-xs font-bold text-(--primary-text)">
                Awarded: {activeWin.prize}
              </div>
            ) : null}
            <p
              id="win-dialog-description"
              className="mt-4 leading-7 text-(--muted-foreground)"
            >
              {activeWin.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {activeWin.techStack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                const projectId = activeWin.projectRef;
                setActiveWin(null);
                onSelectProject(projectId);
              }}
              className="button-primary mt-8"
            >
              View matching project
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

interface WinRowProps {
  win: WinRecord;
  index: number;
  isEven: boolean;
  onOpen: (win: WinRecord, trigger: HTMLElement) => void;
}

function WinRow({ win, index, isEven, onOpen }: WinRowProps) {
  const revealRef = useReveal<HTMLElement>();

  return (
    <article
      ref={revealRef}
      className="reveal grid gap-10 lg:grid-cols-12 lg:items-center"
    >
      <div className={`lg:col-span-8 ${isEven ? "" : "lg:order-2"}`}>
        <div className="relative">
          <div
            aria-hidden="true"
            className={`absolute h-16 w-16 sm:h-24 sm:w-24 md:h-36 md:w-36 ${
              isEven
                ? "-right-3 -top-3 bg-(--accent) sm:-right-5 sm:-top-5 md:-right-8 md:-top-8"
                : "-bottom-3 -left-3 bg-(--primary) sm:-bottom-5 sm:-left-5 md:-bottom-8 md:-left-8"
            }`}
          />
          {win.images.length > 0 ? (
            <ResponsiveImage
              src={win.images[0]}
              sizes="(min-width: 1024px) 60vw, 100vw"
              width="960"
              height="540"
              loading="lazy"
              decoding="async"
              alt={`Presentation of ${win.title}`}
              className="relative aspect-[16/9] w-full object-cover"
            />
          ) : (
            <div className="relative flex aspect-[16/9] w-full flex-col items-center justify-center bg-(--muted) p-6 text-center text-(--muted-foreground)">
              <Award aria-hidden="true" className="h-12 w-12 text-(--primary-text) opacity-60" />
              <span className="mt-2 text-sm font-semibold uppercase tracking-wider">No Photo Available</span>
            </div>
          )}
        </div>
        <div className="editorial-panel editorial-panel--translucent mt-4 p-6 sm:absolute sm:-bottom-10 sm:left-8 sm:right-auto sm:mt-0 sm:max-w-md md:p-7">
          <p className="kicker">{win.award}</p>
          <h3 className="mt-2 font-headline text-2xl font-bold md:text-3xl">
            {win.hackathon}
          </h3>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-(--muted-foreground)">
            <span className="inline-flex items-center gap-1">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              {win.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar aria-hidden="true" className="h-4 w-4" />
              {win.date}
            </span>
            {win.prize ? (
              <span className="inline-flex items-center rounded-md bg-(--primary-soft) px-2 py-0.5 text-xs font-bold text-(--primary-text)">
                {win.prize}
              </span>
            ) : null}
          </p>
          <button
            type="button"
            onClick={(event) => onOpen(win, event.currentTarget)}
            className="index-link mt-4"
            aria-label={`View details for ${win.hackathon}: ${win.title}`}
          >
            View details
          </button>
        </div>
      </div>
      <div className={`lg:col-span-4 ${isEven ? "" : "lg:order-1"}`}>
        <p className="meta-label">{formatIndex(index)}</p>
        <h3 className="mt-3 font-headline text-3xl font-bold leading-tight">
          {win.title}
        </h3>
        <p className="mt-4 leading-7 text-(--muted-foreground)">
          {win.tagline || win.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {win.techStack.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
