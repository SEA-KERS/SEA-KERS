import { useState } from "react";
import { X } from "lucide-react";
import { CORE_TEAM_DATA, TEAM_MEMBERS_DATA } from "../../data/team";
import { TEAM_AVATAR_IDS } from "../../data/imageRegistry";
import { useAccessibleDialog } from "../../hooks/useAccessibleDialog";
import ResponsiveImage from "../ui/ResponsiveImage";
import { LinkedinIcon } from "../ui/SocialIcons";
import type { TeamMember } from "../../types";

export default function TeamSection() {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const { dialogRef, rememberTrigger } = useAccessibleDialog(
    activeMember !== null,
    () => setActiveMember(null),
  );

  return (
    <section
      id="team-section"
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
          </div>

          <div className="mt-12 lg:col-span-3 lg:mt-0 xl:col-span-4">
            <div className="bg-(--muted) p-2 sm:p-3">
              <ul className="grid grid-cols-2 gap-3 gap-y-12 sm:gap-y-16 md:grid-cols-6 md:gap-x-4 md:gap-y-24">
                {CORE_TEAM_DATA.map((member, index) => (
                  <li key={member.id} className={getStaggerClass(index)}>
                    <RosterCard
                      member={member}
                      onOpen={(event) => {
                        rememberTrigger(event.currentTarget);
                        setActiveMember(member);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 border-b border-(--border)">
          <p className="kicker">Team members</p>
          <div className="mt-4">
            {TEAM_MEMBERS_DATA.map((member) => (
              <IndexRow
                key={member.id}
                member={member}
                onOpen={(event) => {
                  rememberTrigger(event.currentTarget);
                  setActiveMember(member);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {activeMember ? (
        <div
          className="dialog-backdrop"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setActiveMember(null)
          }
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-dialog-title"
            tabIndex={-1}
            className="dialog-panel max-w-xl"
          >
            <button
              type="button"
              onClick={() => setActiveMember(null)}
              aria-label="Close member spotlight"
              className="icon-button absolute right-4 top-4"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            <div className="flex flex-col gap-5 pr-12 sm:flex-row sm:items-center">
              <ResponsiveImage
                src={activeMember.avatar}
                registryId={TEAM_AVATAR_IDS[activeMember.id]}
                sizes="8rem"
                width="128"
                height="128"
                decoding="async"
                alt={`Portrait of ${activeMember.name}`}
                className="h-32 w-32 rounded-lg object-cover"
              />
              <div>
                <p className="kicker">Team spotlight</p>
                <h2
                  id="member-dialog-title"
                  className="mt-2 font-headline text-3xl font-bold"
                >
                  {activeMember.name}
                </h2>
                <p className="mt-1 text-sm text-(--muted-foreground)">
                  Team SEA-KERS collective
                </p>
              </div>
            </div>
            <div className="mt-6">
              {activeMember.linkedin ? (
                <a
                  href={activeMember.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-(--primary) px-5 text-sm font-semibold text-(--primary-foreground) transition-colors hover:bg-(--primary-hover)"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
              ) : (
                <p className="text-sm text-(--muted-foreground)">
                  No public profile yet.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setActiveMember(null)}
              className="button-primary mt-8 w-full"
            >
              Close spotlight
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

const ROSTER_COLUMNS = 6;

/** Row-wise stagger: parity is based on the column position within each row,
 *  not the whole-list index, so every row offsets independently. Only applies
 *  from the sm breakpoint so the mobile roster stays a clean grid. */
const getStaggerClass = (index: number): string => {
  const column = index % ROSTER_COLUMNS;
  return column % 2 === 0 ? "sm:-translate-y-8" : "sm:translate-y-8";
};

interface RosterCardProps {
  member: TeamMember;
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function RosterCard({ member, onOpen }: RosterCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open spotlight for ${member.name}`}
      className="group relative block aspect-[9/16] w-full cursor-pointer border-0 bg-transparent p-0 text-left [clip-path:polygon(0_6%,100%_0,100%_94%,0_100%)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[82%] bg-(--primary) transition-colors duration-300 group-hover:bg-(--primary-hover)"
      />
      <ResponsiveImage
        src={member.avatar}
        registryId={TEAM_AVATAR_IDS[member.id]}
        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
        width="480"
        height="640"
        loading="lazy"
        decoding="async"
        alt={`Portrait of ${member.name}`}
        className="absolute bottom-0 right-0 h-[92%] w-[86%] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-8 left-4 top-8 z-10 flex items-start font-headline text-xl font-black uppercase leading-none tracking-[0.2em] text-(--primary-foreground) [writing-mode:vertical-rl] rotate-180 sm:text-2xl"
      >
        {member.name}
      </span>
    </button>
  );
}

interface IndexRowProps {
  member: TeamMember;
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function IndexRow({ member, onOpen }: IndexRowProps) {
  return (
    <article className="grid gap-4 border-t border-(--border) py-7 md:grid-cols-12 md:items-center">
      <ResponsiveImage
        src={member.avatar}
        registryId={TEAM_AVATAR_IDS[member.id]}
        sizes="4rem"
        width="64"
        height="64"
        loading="lazy"
        decoding="async"
        alt=""
        className="h-16 w-16 rounded-lg object-cover md:col-span-1"
      />
      <div className="md:col-span-4">
        <h3 className="font-headline text-xl font-bold">{member.name}</h3>
      </div>
      <div className="flex items-center md:col-span-3">
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`Connect on LinkedIn - ${member.name}`}
            className="index-link inline-flex items-center gap-2"
          >
            <LinkedinIcon className="h-4 w-4" />
            Connect on LinkedIn
          </a>
        ) : (
          <span className="meta-label">No public profile yet</span>
        )}
      </div>
      <p className="meta-label md:col-span-2">Team member</p>
      <div className="flex justify-start md:col-span-2 md:justify-end">
        <button
          type="button"
          onClick={onOpen}
          className="index-link"
          aria-label={`Open spotlight for ${member.name}`}
        >
          Spotlight
        </button>
      </div>
    </article>
  );
}
