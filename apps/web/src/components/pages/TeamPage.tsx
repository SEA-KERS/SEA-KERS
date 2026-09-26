import { useEffect, useRef, type ComponentType } from "react";
import { useReveal } from "../../hooks/useReveal";
import { TEAM_AVATAR_IDS } from "../../data/imageRegistry";
import { CORE_TEAM_DATA, TEAM_MEMBERS_DATA } from "../../data/team";
import ResponsiveImage from "../ui/ResponsiveImage";
import { LinkedinIcon } from "../ui/SocialIcons";
import {
  Brain,
  Cpu,
  Cog,
  Eye,
  Bot,
  CircuitBoard,
  Network,
  Workflow,
  type LucideProps,
} from "lucide-react";
import type { TeamMember } from "../../types";

const MEMBER_GRAPHICS: Record<string, ComponentType<LucideProps>> = {
  "kashvi-v": Brain,
  "spoorthi-r": Eye,
  "anusha-rao": Network,
  "fardeen-s-khadri": Cpu,
  "pramoda-s-r": CircuitBoard,
  "manoj-gowda-r": Cog,
  "reddy": Bot,
  "sujan": Workflow,
  "afnaan": Cpu,
  "swathi": Brain,
  "manasa-r": Eye,
  "priya": Cog,
};

interface TeamPageProps {
  /** Member id from the URL hash (#member-id) to scroll to and highlight. */
  activeMemberId?: string | null;
}

export default function TeamPage({ activeMemberId }: TeamPageProps) {
  return (
    <div className="px-4 pb-24 pt-28 md:px-8 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-6xl w-full">
        {/* OUR STORY SECTION */}
        <section id="our-story" aria-labelledby="story-title" className="mb-14 md:mb-20">
          <p className="kicker text-[#da261c] font-bold text-xs uppercase tracking-[0.2em] font-mono">
            Our story
          </p>
          <h1
            id="story-title"
            className="mt-4 font-headline text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl text-neutral-900 dark:text-white"
          >
            Seek farther. Build better.
          </h1>
          <p className="mt-5 max-w-4xl text-lg sm:text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 text-justify">
            SEA-KERS a multidisciplinary team with deep hands-on experience building production ready systems across Edge AI, Computer Vision, and Assistive Technology.
          </p>
        </section>

        {/* CORE TEAM */}
        <section aria-label="Core Team" className="border-t border-(--border) pt-12 md:pt-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2.5 w-2.5 rounded-full bg-[#da261c]" />
            <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Core Team
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {CORE_TEAM_DATA.map((member) => (
              <HorizontalMemberCard
                key={member.id}
                member={member}
                isActive={member.id === activeMemberId}
              />
            ))}
          </div>
        </section>

        {/* MEMBERS */}
        <section aria-label="Team Members" className="mt-14 sm:mt-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Members
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {TEAM_MEMBERS_DATA.map((member) => (
              <HorizontalMemberCard
                key={member.id}
                member={member}
                isActive={member.id === activeMemberId}
              />
            ))}
          </div>
        </section>

        {/* OUR MISSION */}
        <div className="mt-24 sm:mt-28 border-t border-(--border) pt-12">
          <p className="kicker text-[#da261c] font-bold text-xs uppercase tracking-[0.2em] font-mono">
            Our mission
          </p>
          <p className="mt-4 max-w-4xl font-headline text-3xl font-bold leading-tight md:text-5xl text-neutral-900 dark:text-white">
            Young minds innovating from{" "}
            <span className="text-[#da261c]">India</span> to the world.
          </p>
        </div>
      </div>
    </div>
  );
}

interface HorizontalMemberCardProps {
  member: TeamMember;
  isActive: boolean;
}

function HorizontalMemberCard({
  member,
  isActive,
}: HorizontalMemberCardProps) {
  const { ref: revealRef, isVisible } = useReveal<HTMLElement>();
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;
    cardRef.current?.scrollIntoView?.({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  }, [isActive]);

  const GraphicIcon = MEMBER_GRAPHICS[member.id] ?? Cog;

  return (
    <article
      ref={(node) => {
        revealRef.current = node;
        cardRef.current = node;
      }}
      id={member.id}
      className={`group relative flex items-center gap-4 sm:gap-5 overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-300 reveal ${
        isVisible ? "is-visible" : ""
      } ${
        isActive
          ? "border-[#da261c] bg-(--card) shadow-lg ring-1 ring-[#da261c]"
          : "border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-[#0c0d12]/90 hover:border-neutral-400 dark:hover:border-neutral-700 hover:shadow-md"
      }`}
    >
      {/* Engineering Graphic Accent */}
      <div
        aria-hidden="true"
        className="absolute right-3.5 top-3.5 text-neutral-400/50 dark:text-neutral-600/50 group-hover:text-[#da261c] group-hover:scale-110 transition-all duration-300 pointer-events-none select-none"
      >
        <GraphicIcon className="h-5 w-5 stroke-[1.5]" />
      </div>

      {/* Member Avatar Thumbnail */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700/80 bg-neutral-100 dark:bg-neutral-900 shadow-inner">
        <ResponsiveImage
          src={member.avatar}
          registryId={TEAM_AVATAR_IDS[member.id]}
          sizes="96px"
          width="480"
          height="640"
          loading="lazy"
          decoding="async"
          alt={`Portrait of ${member.name}`}
          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Member Info */}
      <div className="flex-1 min-w-0 z-10">
        <h3 className="font-headline text-base sm:text-lg font-bold leading-tight text-neutral-900 dark:text-white truncate group-hover:text-[#da261c] transition-colors">
          {member.name}
        </h3>

        <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-1">
          Team SEA-KERS
        </p>

        <div className="mt-3">
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Connect on LinkedIn"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700/70 bg-white/80 dark:bg-neutral-800/80 px-2.5 py-1 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 hover:border-[#da261c] hover:text-[#da261c] dark:hover:text-[#da261c] transition-colors shadow-xs"
            >
              <LinkedinIcon className="h-3.5 w-3.5 fill-current text-[#0077b5]" />
              <span>LinkedIn</span>
            </a>
          ) : (
            <span className="text-[11px] font-mono text-neutral-400">
              No public profile
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
