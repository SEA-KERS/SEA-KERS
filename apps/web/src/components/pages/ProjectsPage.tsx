/* oxlint-disable react/only-export-components */
import { useReveal } from "../../hooks/useReveal";
import type { Project } from "../../types";

export const FILTER_GROUPS = [
  {
    label: "All",
    matches: () => true,
  },
  {
    label: "Infrastructure",
    matches: (project: Project) =>
      project.category === "DePIN Infrastructure" ||
      project.category === "Cross-Chain" ||
      project.category === "FinTech & Systems",
  },
  {
    label: "AI & Robotics",
    matches: (project: Project) =>
      project.category === "AI & Security" ||
      project.category === "ZK & Privacy" ||
      project.category === "Robotics & Edge AI",
  },
] as const;

export type FilterGroup = (typeof FILTER_GROUPS)[number];

interface ProjectsPageProps {
  group?: FilterGroup;
  q?: string;
  expandedId?: string | null;
  onGroupChange?: (group: FilterGroup) => void;
  onSearchChange?: (q: string) => void;
  onToggleExpand?: (id: string | null) => void;
}

export default function ProjectsPage(_props: ProjectsPageProps = {}) {
  const { ref: revealRef, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div className="px-4 pb-24 pt-28 md:px-8 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-6xl w-full">
        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="kicker">Projects & Artifacts</p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#da261c]/40 bg-[#da261c]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#da261c]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#da261c] animate-pulse" />
              Coming Soon
            </span>
          </div>
          <h1 className="mt-4 font-headline text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl text-neutral-900 dark:text-white">
            Showcase
          </h1>
        </header>

        {/* Prominent Coming Soon Showcase Banner */}
        <div
          ref={revealRef}
          className={`relative mt-12 overflow-hidden rounded-2xl border border-neutral-300 dark:border-neutral-800/90 bg-neutral-50 dark:bg-[#0c0d12] p-8 sm:p-12 md:p-16 shadow-2xl reveal ${
            isVisible ? "is-visible" : ""
          }`}
        >

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#da261c]/40 bg-[#da261c]/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#da261c]">
              <span className="h-2 w-2 rounded-full bg-[#da261c] animate-pulse" />
              Coming Soon
            </div>

            <h2 className="mt-6 font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              Public Repositories & Interactive Demos Under Preparation
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              We are packaging and auditing the source code, technical documentation, and interactive live demos for our hackathon-winning MVPs and proof of concepts. Everything will be released open-source right here.
            </p>


          </div>
        </div>
      </div>
    </div>
  );
}
