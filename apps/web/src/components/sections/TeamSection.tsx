import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { Dialog } from "../ui/Dialog";
import { CORE_TEAM_DATA, TEAM_DATA } from "../../data/team";
import { MemberSpotlight } from "../team/MemberSpotlight";
import { RosterCard } from "../team/RosterCard";
import type { TeamMember } from "../../types";

const ROSTER_COLUMNS = 6;

const getStaggerClass = (index: number): string => {
  const column = index % ROSTER_COLUMNS;
  return column % 2 === 0 ? "sm:-translate-y-8" : "sm:translate-y-8";
};

export default function TeamSection() {
  const { ref, isVisible } = useReveal<HTMLElement>();
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  const spotlightNumber = activeMember
    ? TEAM_DATA.findIndex((member) => member.id === activeMember.id) + 1
    : 0;

  return (
    <Dialog.Root
      open={activeMember !== null}
      onOpenChange={(open) => {
        if (!open) setActiveMember(null);
      }}
    >
      <section
        ref={ref}
        id="team"
        aria-labelledby="team-title"
        className={`relative flex flex-col w-full items-center justify-center bg-white text-neutral-900 px-4 py-20 md:px-8 md:py-32 border-t border-neutral-200 snap-section reveal ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <div className="mx-auto max-w-6xl w-full">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <h2
                id="team-title"
                className="font-headline text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.08] text-neutral-900"
              >
                The <span className="text-[#da261c]">Masterminds</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-neutral-600 max-w-xl">
                What you seek is seeking you. We choose harder problems and build the systems we want to see in the world.
              </p>
            </div>
            <Link
              to="/team"
              className="button-primary cursor-pointer !text-white hover:!text-white shadow-md shadow-[#da261c]/25 shrink-0 group font-mono text-xs sm:text-sm uppercase tracking-wider"
              aria-label="Meet our team"
            >
              <span className="text-white">Meet Our Team</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Roster Cards Grid */}
          <div className="py-8 sm:py-12">
            <ul className="grid grid-cols-2 gap-4 gap-y-12 sm:grid-cols-3 sm:gap-y-16 md:grid-cols-6 md:gap-x-4 md:gap-y-24">
              {CORE_TEAM_DATA.map((member, index) => (
                <li key={member.id} className={getStaggerClass(index)}>
                  <RosterCard member={member} onOpen={setActiveMember} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {activeMember && (
          <MemberSpotlight
            member={activeMember}
            spotlightNumber={spotlightNumber}
            total={TEAM_DATA.length}
          />
        )}
      </section>
    </Dialog.Root>
  );
}
