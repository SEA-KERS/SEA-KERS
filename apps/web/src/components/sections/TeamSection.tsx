import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Dialog } from "../ui/Dialog";
import { CORE_TEAM_DATA, TEAM_DATA } from "../../data/team";
import { MemberSpotlight } from "../team/MemberSpotlight";
import { RosterCard } from "../team/RosterCard";
import type { TeamMember } from "../../types";

const ROSTER_COLUMNS = 6;

/** Row-wise stagger: parity is based on the column position within each row,
 *  not the whole-list index, so every row offsets independently. Only applies
 *  from the sm breakpoint so the mobile roster stays a clean grid. */
const getStaggerClass = (index: number): string => {
  const column = index % ROSTER_COLUMNS;
  return column % 2 === 0 ? "sm:-translate-y-8" : "sm:translate-y-8";
};

export default function TeamSection() {
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
        id="team"
        aria-labelledby="team-title"
        className="border-t border-(--border) px-4 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-2 xl:col-span-1">
              <p className="kicker">Engineering roster</p>
              <h2
                id="team-title"
                className="mt-4 font-headline text-5xl font-black uppercase leading-[0.95] tracking-[-0.02em] md:text-6xl xl:text-5xl"
              >
                Master minds
              </h2>
              <p className="mt-5 text-base leading-7 text-(--muted-foreground)">
                What you seek is seeking you. We choose harder problems and build
                the systems we want to see in the world.
              </p>
              <Link
                to="/team"
                className="index-link mt-6"
                aria-label="View the full team roster"
              >
                View full team
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 lg:col-span-3 lg:mt-0 xl:col-span-4">
              <div className="bg-(--muted) p-2 sm:p-3">
                <ul className="grid grid-cols-2 gap-3 gap-y-12 sm:gap-y-16 md:grid-cols-6 md:gap-x-4 md:gap-y-24">
                  {CORE_TEAM_DATA.map((member, index) => (
                    <li key={member.id} className={getStaggerClass(index)}>
                      <RosterCard member={member} onOpen={setActiveMember} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {activeMember ? (
          <MemberSpotlight
            member={activeMember}
            spotlightNumber={spotlightNumber}
            total={TEAM_DATA.length}
          />
        ) : null}
      </section>
    </Dialog.Root>
  );
}
