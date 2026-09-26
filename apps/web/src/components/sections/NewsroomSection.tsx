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
  link?: string;
}

const ARTICLES: NewsArticle[] = [
  {
    id: "msme-grant",
    number: "01",
    badge: "GRANT",
    badgeColor: "bg-[#da261c] text-white",
    source: "MINISTRY OF MSME",
    date: "Jul 13, 2026",
    title: "Awarded ₹15 Lakh Grant by Ministry of MSME for Edge AI Hardware Development",
    summary:
      "The funding is accelerating the development of stealth, surveillance and cyber defence technology.",
    fullContent:
      "The Ministry of Micro, Small and Medium Enterprises (MSME), Government of India, officially sanctioned a ₹15 Lakh prototyping grant to Team SEA-KERS. The funding is accelerating the development of stealth, surveillance and cyber defence technology.",
    gridClass: "lg:col-span-7",
    link: "https://www.dcmsme.gov.in/Results_Hackathon5.0.pdf",
  },
  {
    id: "ust-sight",
    badge: "PRESS",
    badgeColor: "bg-neutral-800 text-neutral-200 border border-neutral-700",
    source: "PASSIONATE IN MARKETING",
    date: "2025",
    title: "Team SEA-KERS Places 2nd Nationally at UST SIGHT 2.0 Among 1,000+ Teams",
    summary:
      "Competing against over 1,000 teams from professional colleges across India, Team SEA-KERS secured 2nd place at UST SIGHT 2.0.",
    fullContent:
      "Team SEA-KERS from Dr. Ambedkar Institute of Technology, Bengaluru secured 2nd prize at UST SIGHT 2.0, competing against over 1,000 teams from professional colleges across India. The competition, organized by UST, challenged student teams to build innovative technology solutions for real-world problems.",
    gridClass: "lg:col-span-5",
    link: "https://www.passionateinmarketing.com/1000-teams-from-professional-colleges-across-india-vie-for-top-honours-at-ust-sight-2-0-competition/",
  },
  {
    id: "hal-aerothon",
    number: "02",
    badge: "FEATURED",
    badgeColor: "bg-neutral-800 text-neutral-200 border border-neutral-700",
    source: "PSU KHABAR",
    date: "Jul 19, 2025",
    title: "Team SEA-KERS Wins National HAL Aerothon'25",
    summary:
      "Demonstrated real-time autonomous drone navigation with spatial visual obstacle avoidance in simulated GPS-denied environments.",
    fullContent:
      "Competing against top aerospace and engineering institutions across India, Team SEA-KERS took home the top robotics award at HAL Aerothon'25 organized by Hindustan Aeronautics Limited. The team built an autonomous drone perception stack utilizing real-time edge TensorRT pipelines for collision-free trajectory generation.",
    gridClass: "lg:col-span-5",
    link: "https://www.psukhabar.com/2025/07/19/hal-in-association-with-pes-university-has-organized-aerothon-2025-at-bangalore/",
  },
  {
    id: "namma-suraksha",
    number: "03",
    badge: "WINNER",
    badgeColor: "bg-[#da261c] text-white",
    source: "KARNATAKA STATE POLICE",
    date: "2025",
    title: "Winner at Namma Suraksha Hackathon by Karnataka State Police",
    summary:
      "Secured top honors at the Namma Suraksha Hackathon organized by Karnataka State Police for innovative public safety and security technology.",
    fullContent:
      "Team SEA-KERS emerged as winners at the prestigious Namma Suraksha Hackathon organized by Karnataka State Police, recognized for building cutting-edge technology solutions addressing real-world public safety and surveillance challenges.",
    gridClass: "lg:col-span-7",
    link: "https://www.linkedin.com/posts/sameerirfan_nammasuraksha-hackathon-innovation-ugcPost-7327618781126582272-spPD/",
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
              onClick={() => article.link ? window.open(article.link, "_blank", "noopener noreferrer") : setActiveArticle(article)}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 cursor-pointer min-h-[180px] sm:min-h-[200px] ${article.gridClass} bg-gradient-to-br from-[#18181b] via-[#111113] to-[#09090b] border border-neutral-800 text-white hover:border-[#da261c]/80 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] hover:from-[#202024] hover:to-[#0d0d0f]`}
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

                <h3 className="mt-3 font-headline text-lg sm:text-xl font-bold leading-snug text-white group-hover:text-neutral-100 transition-colors">
                  {article.title}
                </h3>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-800/80">
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
