import CyberDotMatrix from "./CyberDotMatrix";
import type { Theme } from "../types";

interface HeroProps {
  theme: Theme;
}

const stats = [
  ["15+", "Hackathon wins"],
  ["$350K+", "Grants and prizes"],
  ["5", "Indian states"],
] as const;

export default function Hero({ theme }: HeroProps) {
  return (
    <section
      id="hero-section"
      aria-labelledby="hero-title"
      className="border-b border-(--border) px-4 pb-16 pt-44 md:px-8 md:pt-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1
              id="hero-title"
              className="mt-4 max-w-4xl font-headline text-5xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-6xl md:text-7xl"
            >
              We Are,
              <br />
              <span className="text-(--primary-text)">Team SEA-KERS.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-(--muted-foreground) md:text-xl">
              Young engineers. Hungry builders. Innovating from India to the World
            </p>
          </div>
          <div className="lg:col-span-5">
            <CyberDotMatrix theme={theme} />
          </div>
        </div>

        <dl className="surface-card mt-12 grid grid-cols-1 divide-y divide-(--border) overflow-hidden sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map(([value, label]) => (
            <div key={label} className="p-5 sm:p-6">
              <dt className="text-sm text-(--muted-foreground)">{label}</dt>
              <dd className="mt-1 font-headline text-2xl font-bold text-(--foreground)">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}