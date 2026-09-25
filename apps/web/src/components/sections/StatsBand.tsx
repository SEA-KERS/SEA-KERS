import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Trophy } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";

const PARTNER_LOGOS = [
  { name: "UST", src: "/logos/1.png" },
  { name: "MSME, Government of India", src: "/logos/2.png" },
  { name: "Hindustan Aeronautics Limited (HAL)", src: "/logos/3.png" },
  { name: "E-Cell IIT Bombay", src: "/logos/4.png" },
  { name: "IEEE", src: "/logos/5.png" },
  { name: "RV College of Engineering", src: "/logos/6.png" },
];

export default function StatsBand() {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="wins"
      aria-label="Team record"
      className={`relative flex min-h-screen w-full items-center justify-center bg-[#0a0d17] dark:bg-[#0e111a] px-4 py-16 text-white md:px-8 md:py-24 border-t border-neutral-800/80 snap-section reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl w-full">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.08]">
            <span className="text-white">Our Track </span>
            <span className="text-[#da261c]">Records.</span>
          </h2>
        </div>

        {/* Structured Grid: Expanded Image & Snug Stat Cards without empty right-side void */}
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 lg:items-stretch justify-between">
          {/* Left Column: Expanded Photo Collage taking the majority of width */}
          <div className="flex-1 flex flex-col">
            <div className="relative w-full h-full overflow-hidden rounded-2xl border border-neutral-800 bg-[#0d0f17] shadow-2xl flex flex-col justify-center group min-h-[350px] sm:min-h-[420px]">
              {/* Sleek edge highlights */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#da261c]/40 to-transparent z-10"
              />
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-10"
              />

              <img
                src="/images/untitled-design.png"
                alt="Team SEA-KERS Hackathon Wins and Achievements"
                className="w-full h-full object-cover rounded-2xl opacity-95 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-500"
                loading="eager"
              />
            </div>
          </div>

          {/* Right Column: Snug, perfectly-sized stat cards with zero right-side dead space */}
          <div className="w-full lg:w-[275px] xl:w-[290px] shrink-0 flex flex-col justify-between gap-4">
            {/* Stat Card 1: Competitive Wins */}
            <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-[#18181c] via-[#111114] to-[#0a0a0d] p-5 sm:p-6 shadow-xl backdrop-blur-md hover:border-[#da261c]/60 transition-all flex flex-col justify-center items-center text-center flex-1">
              <div
                aria-hidden="true"
                className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-[#da261c]/10 blur-2xl group-hover:bg-[#da261c]/20 transition-all pointer-events-none"
              />

              <div className="flex flex-col items-center text-center w-full">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#da261c]/10 border border-[#da261c]/30 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#da261c]">
                  <Trophy className="h-3 w-3" />
                  <span>Track Record</span>
                </span>

                <div className="mt-3 sm:mt-4 flex items-baseline justify-center gap-1">
                  <p className="font-mono text-5xl sm:text-6xl font-black tracking-tight text-[#da261c] leading-none">
                    20+
                  </p>
                </div>

                <h3 className="mt-2 font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
                  Competitive Wins
                </h3>
              </div>
            </div>

            {/* Stat Card 2: Grants & Prizes */}
            <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-[#18181c] via-[#111114] to-[#0a0a0d] p-5 sm:p-6 shadow-xl backdrop-blur-md hover:border-[#da261c]/60 transition-all flex flex-col justify-center items-center text-center flex-1">
              <div
                aria-hidden="true"
                className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-[#da261c]/10 blur-2xl group-hover:bg-[#da261c]/20 transition-all pointer-events-none"
              />

              <div className="flex flex-col items-center text-center w-full">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#da261c]/10 border border-[#da261c]/30 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#da261c]">
                  <Award className="h-3 w-3" />
                  <span>Funding & Prizes</span>
                </span>

                <div className="mt-3 sm:mt-4 flex items-baseline justify-center gap-2">
                  <p className="font-mono text-5xl sm:text-6xl font-black tracking-tight text-[#da261c] leading-none">
                    20+
                  </p>
                  <span className="font-mono text-2xl sm:text-3xl font-bold lowercase text-[#da261c]">
                    lakhs
                  </span>
                </div>

                <h3 className="mt-2 font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
                  Grants & Prizes
                </h3>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/wins"
              className="group inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl bg-[#da261c] px-4 py-3.5 font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-xl shadow-[#da261c]/20 transition-all hover:bg-[#b91c1c] hover:shadow-[#da261c]/35 active:scale-[0.99] cursor-pointer"
            >
              <span>Explore our wall of Fame</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Static Partner Logos Row */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-neutral-800/80">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
            <div className="shrink-0 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#da261c]" aria-hidden="true" />
              <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-neutral-300">
                <span className="text-[#da261c] font-black">VICTORIES</span> secured at
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 flex-1 max-w-4xl lg:ml-auto">
              {PARTNER_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  className="flex h-12 sm:h-14 items-center justify-center rounded-xl bg-white/95 hover:bg-white px-3 py-1.5 transition-all duration-200 shadow-xs hover:scale-[1.03]"
                  title={logo.name}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-7 sm:max-h-8 w-auto max-w-full object-contain filter contrast-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
