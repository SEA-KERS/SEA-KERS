import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import ResponsiveImage from "../ui/ResponsiveImage";
import { WINS_DATA } from "../../data/wins";
import { formatPrizeHeadline, topByPrize } from "../../utils/prize";
import type { WinRecord } from "../../types";

const TOP_WINS = topByPrize(WINS_DATA, 3);

const formatIndex = (index: number) => String(index).padStart(2, "0");

export default function WinsSection() {
  return (
    <section
      id="wins"
      aria-labelledby="wins-title"
      className="px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker">Track record</p>
            <h2
              id="wins-title"
              className="mt-4 font-headline text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl"
            >
              The strongest wins
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-(--muted-foreground)">
              Three of {WINS_DATA.length} challenges, ranked by the stakes we
              walked away with.
            </p>
          </div>
          <Link
            to="/wins"
            className="index-link"
            aria-label={`View all ${WINS_DATA.length} win records`}
          >
            View all {WINS_DATA.length} records
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {TOP_WINS.map((win, index) => (
            <PodiumCard
              key={win.id}
              win={win}
              rank={index + 1}
              isMiddle={index === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PodiumCardProps {
  win: WinRecord;
  rank: number;
  isMiddle: boolean;
}

function PodiumCard({ win, rank, isMiddle }: PodiumCardProps) {
  const { ref: revealRef, isVisible } = useReveal<HTMLAnchorElement>();
  const prizeHeadline = formatPrizeHeadline(win.prize);

  return (
    <Link
      to="/wins"
      ref={revealRef}
      aria-label={`${win.hackathon}: ${win.title}. View the full win record.`}
      className={`reveal group block border-t-2 border-(--primary) pt-6 ${
        isVisible ? "is-visible" : ""
      } ${isMiddle ? "md:translate-y-10" : ""}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-headline text-5xl font-black tracking-[-0.02em] text-(--muted-foreground) md:text-6xl">
          {formatIndex(rank)}
        </span>
        {prizeHeadline ? (
          <span className="font-headline text-lg font-bold text-(--primary) md:text-xl">
            {prizeHeadline}
          </span>
        ) : (
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-(--accent-text)">
            {win.award}
          </span>
        )}
      </div>

      <div className="relative mt-6">
        <div
          aria-hidden="true"
          className={`absolute -right-2 -top-2 h-16 w-16 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 ${
            rank % 2 === 0 ? "bg-(--accent)" : "bg-(--primary)"
          }`}
        />
        {win.images.length > 0 ? (
          <ResponsiveImage
            src={win.images[0]}
            sizes="(min-width: 768px) 33vw, 100vw"
            width="960"
            height="540"
            loading="lazy"
            decoding="async"
            alt={`Presentation of ${win.title}`}
            className="relative aspect-[16/10] w-full object-cover"
          />
        ) : (
          <div className="relative flex aspect-[16/10] w-full flex-col items-center justify-center bg-(--muted) p-6 text-center text-(--muted-foreground)">
            <span className="text-xs font-bold uppercase tracking-[0.16em]">
              {win.award}
            </span>
          </div>
        )}
      </div>

      <h3 className="mt-6 font-headline text-2xl font-bold leading-tight md:text-3xl">
        {win.hackathon}
      </h3>
      <p className="mt-1.5 text-sm font-bold uppercase tracking-[0.14em] text-(--accent-text)">
        {win.title}
      </p>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-(--muted-foreground)">
        <span className="inline-flex items-center gap-1">
          <MapPin aria-hidden="true" className="h-4 w-4" />
          {win.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Calendar aria-hidden="true" className="h-4 w-4" />
          {win.date}
        </span>
      </p>
      <p className="index-link mt-4 border-b-2 border-transparent transition-colors group-hover:border-(--primary) group-hover:text-(--primary)">
        View record
      </p>
    </Link>
  );
}
