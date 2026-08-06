import { useState } from "react";
import {
  ArrowRight,
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { Dialog } from "../ui/Dialog";
import { Carousel } from "../ui/Carousel";
import { ScrollArea } from "../ui/ScrollArea";
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
  const [showText, setShowText] = useState(false);
  const [spinBoost, setSpinBoost] = useState(false);

  const filteredWins = WINS_DATA.filter((win) => {
    const query = searchQuery.toLowerCase();
    return (
      (selectedTrack === "ALL" || win.track === selectedTrack) &&
      [win.title, win.hackathon, win.description].some((value) =>
        value.toLowerCase().includes(query),
      )
    );
  });

  const openWin = (win: WinRecord) => {
    setShowText(false);
    setActiveWin(win);
  };

  const handleSelectProject = () => {
    if (!activeWin) return;
    const projectId = activeWin.projectRef;
    setActiveWin(null);
    onSelectProject(projectId);
  };

  return (
    <Dialog.Root
      open={activeWin !== null}
      onOpenChange={(open) => {
        if (!open) setActiveWin(null);
      }}
    >
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
        <Dialog.Content className="modal-scroll max-h-[calc(100vh-2rem)] w-full max-w-[52rem] overflow-x-hidden overflow-y-auto rounded-lg bg-(--card) text-(--foreground)">
          <div className="modal-stage">
            <div className="absolute right-3 top-3 z-40 rounded-full bg-(--card)/80 p-0.5">
              <Dialog.Close className="icon-button" aria-label="Close win details">
                <X aria-hidden="true" className="h-5 w-5" />
              </Dialog.Close>
            </div>

            <div
              className={`modal-stage-image ${showText ? "is-hidden" : ""}`}
            >
              {activeWin.images.length > 0 ? (
                <Carousel.Root
                  aria-label={`${activeWin.hackathon} images`}
                  className="relative h-full w-full overflow-hidden bg-(--muted)"
                >
                  <Carousel.Content className="h-full">
                    {activeWin.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <ResponsiveImage
                          src={image}
                          sizes="(min-width: 768px) 52rem, 100vw"
                          width="960"
                          height="540"
                          decoding="async"
                          alt={`${activeWin.title}, image ${index + 1} of ${activeWin.images.length}`}
                          className="h-full w-full object-cover"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel.Content>
                  {activeWin.images.length > 1 ? (
                    <>
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
                    </>
                  ) : null}
                </Carousel.Root>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-(--muted) p-6 text-center text-(--muted-foreground)">
                  <Award aria-hidden="true" className="h-12 w-12 text-(--primary-text) opacity-60" />
                  <span className="mt-2 text-sm font-semibold uppercase tracking-wider">No Preview Photo Available</span>
                </div>
              )}
            </div>

            <div className="modal-stage-text">
              <div className="px-5 pb-5 pt-6 md:px-10 md:pb-6 md:pt-8">
                <p className="kicker">
                  {activeWin.location} / {activeWin.date}
                </p>
                <Dialog.Title className="mt-2 pr-10 font-headline text-3xl font-bold leading-[1.05] tracking-[-0.02em] md:mt-3 md:text-4xl">
                  {activeWin.hackathon}
                </Dialog.Title>
                <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.14em] text-(--accent-text) md:mt-2 md:text-sm">
                  {activeWin.title}
                </p>

                {activeWin.prize ? (
                  <div className="mt-4 border-t border-(--border) pt-3 md:mt-5 md:pt-4">
                    <p className="meta-label">Awarded</p>
                    <p className="mt-1 font-headline text-base font-bold tracking-[-0.01em] md:text-lg">
                      {activeWin.prize}
                    </p>
                  </div>
                ) : null}

                <Dialog.Description className="mt-4 max-w-[34rem] text-sm leading-6 text-(--muted-foreground) md:mt-5 md:text-[15px] md:leading-7">
                  {activeWin.description}
                </Dialog.Description>

                <div className="mt-5 border-t border-(--border) md:mt-6" />

                <ScrollArea.Root className="modal-footer-scroll-root">
                  <ScrollArea.Viewport className="modal-footer-scroll-viewport">
                    <div className="pt-4 md:pt-5">
                      <div className="flex flex-wrap gap-2">
                        {activeWin.techStack.map((tech) => (
                          <TechChip key={tech}>{tech}</TechChip>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center md:mt-6">
                        <button
                          type="button"
                          onClick={handleSelectProject}
                          className="group inline-flex items-center gap-2 border-b-2 border-(--primary) pb-1 font-headline text-sm font-bold uppercase tracking-[0.16em] text-(--primary) transition-colors hover:text-(--primary-hover)"
                        >
                          View matching project
                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </div>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="modal-footer-scrollbar"
                  >
                    <ScrollArea.Thumb className="modal-footer-scroll-thumb" />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowText((value) => !value);
                setSpinBoost(true);
                window.setTimeout(() => setSpinBoost(false), 500);
              }}
              aria-pressed={showText}
              aria-label={showText ? "Switch to image view" : "Switch to text view"}
              className="absolute bottom-4 right-4 z-30 hidden items-center gap-2.5 rounded-full border border-(--border)/60 bg-(--card)/85 py-2 pl-3 pr-4 font-headline text-xs font-bold uppercase tracking-[0.14em] text-(--foreground) shadow-sm transition-colors hover:border-(--primary) hover:text-(--primary) md:inline-flex"
            >
              <span
                aria-hidden="true"
                className={`voxel-cube ${showText ? "is-text" : "is-image"} ${
                  spinBoost ? "is-fast" : ""
                }`}
              >
                <span className="voxel-cube__face voxel-cube__face--front" />
                <span className="voxel-cube__face voxel-cube__face--back" />
                <span className="voxel-cube__face voxel-cube__face--right" />
                <span className="voxel-cube__face voxel-cube__face--left" />
                <span className="voxel-cube__face voxel-cube__face--top" />
                <span className="voxel-cube__face voxel-cube__face--bottom" />
              </span>
              <span>View</span>
            </button>
          </div>
        </Dialog.Content>
      ) : null}
      </section>
    </Dialog.Root>
  );
}

interface WinRowProps {
  win: WinRecord;
  index: number;
  isEven: boolean;
  onOpen: (win: WinRecord) => void;
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
            <Dialog.Trigger
              onClick={() => onOpen(win)}
              aria-label={`View images of ${win.title}`}
              className="relative block w-full cursor-pointer border-0 bg-transparent p-0"
            >
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
            </Dialog.Trigger>
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
          <Dialog.Trigger
            onClick={() => onOpen(win)}
            className="index-link mt-4"
            aria-label={`View details for ${win.hackathon}: ${win.title}`}
          >
            View details
          </Dialog.Trigger>
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

function TechChip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-(--border) px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-(--muted-foreground) transition-colors hover:border-(--primary) hover:text-(--primary)">
      {children}
    </span>
  );
}
