/* oxlint-disable react/only-export-components */
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
} from "lucide-react";
import { Carousel } from "../ui/Carousel";
import { useReveal } from "../../hooks/useReveal";
import { usePresence } from "../../hooks/usePresence";
import ResponsiveImage from "../ui/ResponsiveImage";
import { WINS_DATA } from "../../data/wins";
import { topByPrize } from "../../utils/prize";
import type { WinRecord } from "../../types";

export const tracks = [
  { label: "All", value: "ALL" },
  { label: "E-Cell", value: "ecell" },
  { label: "IEEE", value: "IEEE" },
  { label: "IISc", value: "IISc" },
  { label: "MSME", value: "MSME" },
  { label: "HAL", value: "HAL" },
] as const;

export type TrackFilter = (typeof tracks)[number]["value"];

const RANKED_WINS = topByPrize(WINS_DATA, WINS_DATA.length);

const formatIndex = (index: number) => String(index + 1).padStart(2, "0");

interface WinsPageProps {
  track: TrackFilter;
  q: string;
  expandedId: string | null;
  onTrackChange: (track: TrackFilter) => void;
  onSearchChange: (q: string) => void;
  onToggleExpand: (id: string | null) => void;
}

export default function WinsPage({
  track,
  q,
  expandedId,
  onTrackChange,
  onSearchChange,
  onToggleExpand,
}: WinsPageProps) {
  const filteredWins = RANKED_WINS.filter((win) => {
    const query = q.toLowerCase();
    return (
      (track === "ALL" || win.track === track) &&
      [win.title, win.hackathon, win.description, win.location].some((value) =>
        value.toLowerCase().includes(query),
      )
    );
  });

  return (
    <div className="px-4 pb-24 pt-32 md:px-8 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="kicker">Track record</p>
            <h1 className="mt-4 font-headline text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl">
              Challenges conquered
            </h1>
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
                value={q}
                onChange={(event) => onSearchChange(event.target.value)}
                className="input-control search-control"
                placeholder="Project or hackathon"
              />
            </div>
          </div>
        </header>

        <div
          className="mt-12 flex items-center gap-4 overflow-x-auto border-b border-(--border) sm:gap-7"
          role="group"
          aria-label="Filter wins by track"
        >
          {tracks.map((trackOption) => (
            <button
              key={trackOption.value}
              type="button"
              onClick={() => onTrackChange(trackOption.value)}
              aria-pressed={track === trackOption.value}
              className={`min-h-11 shrink-0 border-b-2 pb-3 text-[0.6875rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                track === trackOption.value
                  ? "border-(--primary) text-(--accent-text)"
                  : "border-transparent text-(--muted-foreground) hover:text-(--foreground)"
              }`}
            >
              {trackOption.label}
            </button>
          ))}
        </div>

        <p className="meta-label mt-4" aria-live="polite">
          {filteredWins.length} {filteredWins.length === 1 ? "record" : "records"}
        </p>

        <div className="mt-14">
          {filteredWins.map((win, index) => (
            <WinArchiveRow
              key={win.id}
              win={win}
              index={index}
              expanded={expandedId === win.id}
              onToggle={() =>
                onToggleExpand(expandedId === win.id ? null : win.id)
              }
            />
          ))}
        </div>

        {filteredWins.length === 0 ? (
          <div className="border-t border-(--border) py-20 text-center">
            <p className="font-headline text-2xl font-bold">No records found</p>
            <p className="mt-3 text-sm text-(--muted-foreground)">
              Try a different track or search term.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface WinArchiveRowProps {
  win: WinRecord;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}

function WinArchiveRow({
  win,
  index,
  expanded,
  onToggle,
}: WinArchiveRowProps) {
  const { ref: revealRef, isVisible } = useReveal<HTMLElement>();
  const { mounted, enter } = usePresence(expanded);

  return (
    <article
      ref={revealRef}
      id={win.id}
      className={`reveal scroll-mt-28 border-t border-(--border) ${isVisible ? "is-visible" : ""} ${
        expanded ? "bg-(--card)" : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`win-detail-${win.id}`}
        className="grid w-full gap-3 py-7 px-5 text-left md:grid-cols-12 md:items-center md:gap-6"
      >
        <p className="meta-label md:col-span-1">{formatIndex(index)}</p>
        <div className="md:col-span-4">
          <h2 className="font-headline text-2xl font-bold leading-tight md:text-3xl">
            {win.hackathon}
          </h2>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-(--accent-text)">
            {win.title}
          </p>
        </div>
        <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-(--muted-foreground) md:col-span-3">
          <span className="inline-flex items-center gap-1">
            <MapPin aria-hidden="true" className="h-4 w-4" />
            {win.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar aria-hidden="true" className="h-4 w-4" />
            {win.date}
          </span>
        </p>
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-(--accent-text) md:col-span-2">
          {win.award}
        </p>
        <p className="text-sm font-semibold text-(--muted-foreground) md:col-span-1 md:text-right">
          {win.prize}
        </p>
        <span className="md:col-span-1 md:justify-self-end">
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 text-(--muted-foreground) transition-transform duration-300 ${
              expanded ? "rotate-180 text-(--primary)" : ""
            }`}
          />
        </span>
      </button>

      {mounted ? (
        <div
          id={`win-detail-${win.id}`}
          aria-hidden={!enter}
          className={`grid gap-8 overflow-hidden border-t border-(--border) pb-10 pt-8 px-5 md:grid-cols-12 md:gap-10 ${
            enter ? "detail-enter" : "detail-exit"
          }`}
        >
          <div className="md:col-span-7">
            <WinImages win={win} />
          </div>
          <div className="md:col-span-5">
            <p className="kicker">
              {win.location} / {win.date}
            </p>
            <h3 className="mt-2 font-headline text-3xl font-bold leading-[1.05] tracking-[-0.02em]">
              {win.hackathon}
            </h3>
            <p className="mt-1.5 text-sm font-bold uppercase tracking-[0.14em] text-(--accent-text)">
              {win.title}
            </p>

            {win.prize ? (
              <div className="mt-5 border-t border-(--border) pt-4">
                <p className="meta-label">Awarded</p>
                <p className="mt-1 font-headline text-lg font-bold tracking-[-0.01em]">
                  {win.prize}
                </p>
              </div>
            ) : null}

            <p className="mt-5 leading-7 text-(--muted-foreground)">
              {win.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {win.techStack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>

            <Link
              to="/projects"
              className="group mt-6 inline-flex items-center gap-2 border-b-2 border-(--primary) pb-1 font-headline text-sm font-bold uppercase tracking-[0.16em] text-(--primary) transition-colors hover:text-(--primary-hover)"
            >
              View matching project
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function WinImages({ win }: { win: WinRecord }) {
  if (win.images.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full flex-col items-center justify-center bg-(--muted) p-6 text-center text-(--muted-foreground)">
        <Award
          aria-hidden="true"
          className="h-12 w-12 text-(--primary-text) opacity-60"
        />
        <span className="mt-2 text-sm font-semibold uppercase tracking-wider">
          No Preview Photo Available
        </span>
      </div>
    );
  }

  if (win.images.length === 1) {
    return (
      <ResponsiveImage
        src={win.images[0]}
        sizes="(min-width: 768px) 58vw, 100vw"
        width="960"
        height="540"
        loading="lazy"
        decoding="async"
        alt={`Presentation of ${win.title}`}
        className="aspect-[16/10] w-full object-cover"
      />
    );
  }

  return (
    <Carousel.Root
      aria-label={`${win.hackathon} images`}
      className="relative aspect-[16/10] w-full overflow-hidden bg-(--muted)"
    >
      <Carousel.Content className="h-full">
        {win.images.map((image, imageIndex) => (
          <Carousel.Item key={imageIndex}>
            <ResponsiveImage
              src={image}
              sizes="(min-width: 768px) 58vw, 100vw"
              width="960"
              height="540"
              decoding="async"
              alt={`${win.title}, image ${imageIndex + 1} of ${win.images.length}`}
              className="h-full w-full object-cover"
            />
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-(--border)/60 bg-(--card)/80 text-(--foreground) transition-colors hover:bg-(--card) hover:text-(--primary)">
        <ChevronLeft aria-hidden="true" className="h-5 w-5" />
      </Carousel.Previous>
      <Carousel.Next className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-(--border)/60 bg-(--card)/80 text-(--foreground) transition-colors hover:bg-(--card) hover:text-(--primary)">
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </Carousel.Next>
      <Carousel.Dots
        className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2 rounded-full bg-(--card)/70 p-2"
        dotClassName="h-1.5 w-1.5 rounded-full bg-(--muted-foreground)/50 transition-all data-active:w-4 data-active:bg-(--primary)"
      />
    </Carousel.Root>
  );
}
