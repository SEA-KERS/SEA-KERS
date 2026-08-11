import { ArrowDown } from "lucide-react";
import CyberDotMatrix from "./CyberDotMatrix";
import { useTheme } from "../../hooks/useTheme";

interface HeroProps {
  onOpenRecord: () => void;
}

export default function Hero({ onOpenRecord }: HeroProps) {
  const { theme } = useTheme();
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="px-4 pb-10 pt-36 md:px-8 md:pt-44"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1
              id="hero-title"
              className="font-headline text-[2.75rem] font-bold leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
            >
              Curious minds.
              <br />
              <span className="text-(--primary)">
                Persistent
                <br />
                builders.
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-(--muted-foreground) md:text-xl">
              Team SEA-KERS builds rigorous open technology and competes on the
              world stage across AI, computer vision, and robotics.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button type="button" onClick={onOpenRecord} className="button-primary">
                See the record
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute -right-3 -top-8 h-32 w-32 bg-(--primary) md:-right-8 md:h-44 md:w-44"
              />
              <div
                aria-hidden="true"
                className="absolute -left-5 bottom-12 h-14 w-14 bg-(--accent) md:-left-9"
              />
              <div className="brand-tile relative p-4 md:p-5">
                <CyberDotMatrix theme={theme} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-(--border) pt-5 md:mt-24">
          <span className="kicker">Engineering collective / India</span>
          <span className="meta-label hidden sm:inline">
            AI · Computer Vision · Robotics
          </span>
          <span className="meta-label">Open technology, world stage</span>
        </div>
      </div>
    </section>
  );
}
