import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";

interface NewsArticle {
  id: string;
  number?: string;
  badge: string;
  badgeColor?: string;
  source: string;
  date: string;
  title: string;
  summary: string;
  fullContent: string;
  gridClass: string;
}

const ARTICLES: NewsArticle[] = [
  {
    id: "bmsit-code-red",
    number: "01",
    badge: "FEATURED",
    badgeColor: "bg-[#da261c] text-white",
    source: "BMSIT CODE RED",
    date: "Jul 8, 2026",
    title: "Team SEA-KERS Takes 1st Place for Moondream Vision & Voice LLM",
    summary:
      "Engineered an ultra low-latency on-device multimodal assistant combining Moondream LLM, Whisper Turbo STT, and Kokoro TTS with 0 cloud dependency.",
    fullContent:
      "At BMSIT Code Red 2025, Team SEA-KERS secured 1st place in the AI track by developing an entirely offline, on-device spatial multimodal assistant. The team compressed Moondream Vision LLM alongside Whisper Turbo STT and Kokoro TTS into an integrated inference pipeline running with sub-100ms response times on embedded hardware without sending any data to external cloud servers.",
    gridClass: "lg:col-span-7",
  },
  {
    id: "economic-times",
    badge: "PRESS",
    badgeColor: "bg-neutral-800 text-neutral-200 border border-neutral-700",
    source: "ECONOMIC TIMES",
    date: "Feb 17, 2026",
    title: "Recognising Team SEA-KERS as India's Emerging Collegiate AI Collective",
    summary:
      "National coverage highlighting student engineering collectives building production-ready on-device spatial intelligence.",
    fullContent:
      "The Economic Times featured Team SEA-KERS in their spotlight on next-generation deep tech talent emerging from Indian universities. The collective was lauded for moving past theoretical academic research directly into battle-tested hackathon builds, production-grade robotics firmware, and high-throughput zero-knowledge architecture.",
    gridClass: "lg:col-span-5",
  },
  {
    id: "msme-grant",
    number: "02",
    badge: "GRANT",
    badgeColor: "bg-neutral-800 text-neutral-200 border border-neutral-700",
    source: "MINISTRY OF MSME",
    date: "Jul 13, 2026",
    title: "Awarded ₹15 Lakh Grant by Govt. of India for Edge AI Hardware",
    summary:
      "Selected under the MSME Innovative Scheme to design high-efficiency micro-agent compute firmware for localized embedded edge hardware.",
    fullContent:
      "The Ministry of Micro, Small and Medium Enterprises (MSME), Government of India, officially sanctioned a ₹15 Lakh prototyping grant to Team SEA-KERS. The funding accelerates research into decentralized micro-agent coordination and spatial intelligence firmware optimized for low-power edge compute microprocessors.",
    gridClass: "lg:col-span-5",
  },
  {
    id: "hal-aerothon",
    number: "03",
    badge: "FEATURED",
    badgeColor: "bg-[#da261c] text-white",
    source: "HAL AEROTHON",
    date: "Recent",
    title: "Team SEA-KERS Wins National HAL Aerothon'25 Robotics Trophy",
    summary:
      "Demonstrated real-time autonomous drone navigation with spatial visual obstacle avoidance in simulated GPS-denied environments.",
    fullContent:
      "Competing against top aerospace and engineering institutions across India, Team SEA-KERS took home the top robotics award at HAL Aerothon'25 organized by Hindustan Aeronautics Limited. The team built an autonomous drone perception stack utilizing real-time edge TensorRT pipelines for collision-free trajectory generation.",
    gridClass: "lg:col-span-7",
  },
];

export default function NewsroomSection() {
  const { ref, isVisible } = useReveal<HTMLElement>();
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

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
        {/* Section Header: 'Our Newsroom.' with 'Newsroom.' in crimson red */}
        <div className="mb-8 sm:mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="newsroom-title"
              className="font-headline text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.08]"
            >
              <span className="text-neutral-900 dark:text-white">Our </span>
              <span className="text-[#da261c]">Newsroom.</span>
            </h2>
          </div>
          
        </div>

        {/* Asymmetrical Staggered Bento Grid: Row 1 (7+5), Row 2 (5+7) with Pure Black Gradient Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-300 cursor-pointer min-h-[250px] sm:min-h-[280px] ${article.gridClass} bg-gradient-to-br from-[#18181b] via-[#111113] to-[#09090b] border border-neutral-800 text-white hover:border-[#da261c]/80 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] hover:from-[#202024] hover:to-[#0d0d0f]`}
            >
              {/* Giant Watermark Number */}
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
                  
                </div>

                <h3 className="mt-4 font-headline text-xl sm:text-2xl font-bold leading-snug text-white group-hover:text-neutral-100 transition-colors">
                  {article.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-neutral-300 max-w-xl">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-800/80">
                <span className="text-xs font-mono font-bold tracking-wider text-neutral-300 group-hover:text-[#da261c] transition-colors">
                  Read full article
                </span>
                <span className="h-8 w-8 rounded-full border border-neutral-700 flex items-center justify-center text-white group-hover:bg-[#da261c] group-hover:border-[#da261c] transition-all">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Accessible Interactive Article Modal */}
      {activeArticle ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl bg-gradient-to-b from-[#18181b] to-[#09090b] border border-neutral-800 p-6 sm:p-8 shadow-2xl text-white animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
              aria-label="Close article modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#da261c]">
              <span>{activeArticle.source}</span>
              <span>•</span>
              <span className="text-neutral-400">{activeArticle.date}</span>
            </div>

            <h3 id="modal-article-title" className="mt-3 font-headline text-2xl font-bold leading-tight text-white">
              {activeArticle.title}
            </h3>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-300">
              {activeArticle.fullContent}
            </p>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center text-xs font-mono text-neutral-400">
              <span>SEA-KERS Press Release</span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="font-bold text-[#da261c] hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
