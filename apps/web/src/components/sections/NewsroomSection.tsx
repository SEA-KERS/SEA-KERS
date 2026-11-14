import { ArrowRight } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";

interface NewsArticle {
  id: string;
  number?: string;
  badge: string;
  badgeColor?: string;
  source: string;
  title: string;
  gridClass: string;
  link: string;
}

const ARTICLES: readonly NewsArticle[] = [
  {
    id: "ust-sight",
    badge: "PRESS",
    badgeColor: "bg-neutral-800 text-neutral-200 border border-neutral-700",
    source: "Passionate in Marketing",
    title: "Team SEA-KERS Places 2nd Nationally at UST SIGHT 2.0 Among 1,000+ Teams",
    gridClass: "lg:col-span-5",
    link: "https://www.passionateinmarketing.com/1000-teams-from-professional-colleges-across-india-vie-for-top-honours-at-ust-sight-2-0-competition/",
  },
  {
    id: "hal-aerothon",
    number: "01",
    badge: "FEATURED",
    badgeColor: "bg-neutral-800 text-neutral-200 border border-neutral-700",
    source: "PSU Khabar",
    title: "Team SEA-KERS Wins National HAL Aerothon'25",
    gridClass: "lg:col-span-7",
    link: "https://www.psukhabar.com/2025/07/19/hal-in-association-with-pes-university-has-organized-aerothon-2025-at-bangalore/",
  },
  {
    id: "namma-suraksha",
    number: "02",
    badge: "WINNER",
    badgeColor: "bg-[#da261c] text-white",
    source: "Karnataka State Police",
    title: "Winner at Namma Suraksha Hackathon by Karnataka State Police",
    gridClass: "lg:col-span-12",
    link: "https://www.linkedin.com/posts/sameerirfan_nammasuraksha-hackathon-innovation-ugcPost-7327618781126582272-spPD/",
  },
];

export default function NewsroomSection() {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="newsroom"
      aria-labelledby="newsroom-title"
      className={`relative w-full bg-white text-neutral-900 dark:bg-[#06080e] dark:text-white px-4 py-16 md:px-8 md:py-24 border-t border-neutral-200 dark:border-neutral-800/80 reveal ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl w-full">
        <div className="mb-8 sm:mb-10">
          <h2
            id="newsroom-title"
            className="font-headline text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.08]"
          >
            <span className="text-neutral-900 dark:text-white">Our </span>
            <span className="text-[#da261c]">Newsroom.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {ARTICLES.map((article) => (
            <a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 min-h-[180px] sm:min-h-[200px] ${article.gridClass} bg-gradient-to-br from-[#18181b] via-[#111113] to-[#09090b] border border-neutral-800 text-white hover:border-[#da261c]/80 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] hover:from-[#202024] hover:to-[#0d0d0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#da261c]`}
            >
              {article.number ? (
                <span
                  aria-hidden="true"
                  className="absolute right-6 bottom-4 select-none pointer-events-none font-mono text-7xl sm:text-8xl font-black text-white/5 group-hover:text-[#da261c]/15 transition-colors"
                >
                  {article.number}
                </span>
              ) : null}

              <div>
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-bold ${article.badgeColor ?? "bg-[#da261c] text-white"}`}
                  >
                    {article.badge}
                  </span>
                  <span className="text-neutral-400">{article.source}</span>
                </div>

                <h3 className="mt-3 font-headline text-lg sm:text-xl font-bold leading-snug text-white group-hover:text-neutral-100 transition-colors">
                  {article.title}
                </h3>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-800/80">
                <span className="text-xs font-mono font-bold tracking-wider text-neutral-300 group-hover:text-[#da261c] transition-colors">
                  Read full article
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
                <span
                  aria-hidden="true"
                  className="h-8 w-8 rounded-full border border-neutral-700 flex items-center justify-center text-white group-hover:bg-[#da261c] group-hover:border-[#da261c] transition-all"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
