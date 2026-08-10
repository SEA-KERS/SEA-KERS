import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Dialog } from "../ui/Dialog";
import { CORE_TEAM_DATA, TEAM_DATA, TEAM_MEMBERS_DATA } from "../../data/team";
import { TEAM_AVATAR_IDS } from "../../data/imageRegistry";
import ResponsiveImage from "../ui/ResponsiveImage";
import { LinkedinIcon } from "../ui/SocialIcons";
import type { TeamMember } from "../../types";

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

          <div className="mt-24 border-b border-(--border)">
            <p className="kicker">Team members</p>
            <div className="mt-4">
              {TEAM_MEMBERS_DATA.map((member) => (
                <IndexRow key={member.id} member={member} onOpen={setActiveMember} />
              ))}
            </div>
          </div>
        </div>

        {activeMember ? (
          <Dialog.Content className="modal-scroll max-h-[calc(100vh-2rem)] w-full max-w-[48rem] overflow-x-hidden overflow-y-auto rounded-[1rem] bg-(--card) text-(--foreground)">
            <Dialog.Close
              className="icon-button absolute right-4 top-4 z-20"
              aria-label="Close spotlight"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Dialog.Close>

            <div className="flex flex-col md:grid md:grid-cols-[5fr_6fr]">
              <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto">
                <ResponsiveImage
                  src={activeMember.avatar}
                  registryId={TEAM_AVATAR_IDS[activeMember.id]}
                  sizes="(min-width: 768px) 22rem, 100vw"
                  width="480"
                  height="640"
                  decoding="async"
                  alt={`Portrait of ${activeMember.name}`}
                  className="h-full w-full object-cover object-top"
                />
                <SpotlightGlimmer />
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 left-4 font-headline text-sm font-black uppercase tracking-[0.16em] text-(--primary-foreground) drop-shadow-md"
                >
                  {activeMember.name}
                </span>
              </div>

              <div className="flex flex-col px-6 py-10 md:px-10 md:py-14">
                <div className="flex flex-wrap items-baseline justify-between gap-3 pr-10">
                  <p className="kicker">Team spotlight</p>
                  <p className="meta-label">
                    {String(spotlightNumber).padStart(2, "0")} / {TEAM_DATA.length}
                  </p>
                </div>
                <Dialog.Title className="mt-6 font-headline text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] md:text-5xl">
                  {activeMember.name}
                </Dialog.Title>
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-(--accent-text)">
                  Team SEA-KERS collective
                </p>
                <div
                  aria-hidden="true"
                  className="mt-8 h-px w-20 bg-(--primary)"
                />
                <p className="mt-8 max-w-md text-base leading-8 text-(--muted-foreground) md:text-lg">
                  &ldquo;What you seek is seeking you. We choose harder problems
                  and build the systems we want to see in the world.&rdquo;
                </p>
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  {activeMember.linkedin ? (
                    <a
                      href={activeMember.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="button-primary"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                      Connect on LinkedIn
                    </a>
                  ) : (
                    <span className="meta-label">No public profile yet</span>
                  )}
                  <Dialog.Close className="button-secondary">Close</Dialog.Close>
                </div>
              </div>
            </div>
          </Dialog.Content>
        ) : null}
      </section>
    </Dialog.Root>
  );
}

/** Entry reveal for the spotlight portrait. The image starts hidden behind a
 *  card-coloured cover; two solid red stripes sweep down and the cover is
 *  clipped away from the top in sync, so the photograph is revealed as the
 *  stripes pass. When they clear the bottom they are gone and the image stays
 *  fully visible. */
function SpotlightGlimmer() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let frame = 0;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setActive(true));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-(--card) transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{
          clipPath: active ? "inset(100% 0 0 0)" : "inset(0 0 0 0)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      >
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            active ? "translate-y-[100%]" : "translate-y-0"
          }`}
        >
          <div className="absolute -inset-x-[15%] top-[2%] h-[14%] -rotate-6 bg-(--primary)" />
          <div className="absolute -inset-x-[15%] top-[30%] h-[14%] -rotate-6 bg-(--primary)" />
        </div>
      </div>
    </>
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
  onOpen: (member: TeamMember) => void;
}

function RosterCard({ member, onOpen }: RosterCardProps) {
  return (
    <Dialog.Trigger
      onClick={() => onOpen(member)}
      aria-label={`Open spotlight for ${member.name}`}
      className="group relative block aspect-19/44 w-full cursor-pointer border-0 bg-transparent p-0 text-left [clip-path:polygon(0_6%,100%_0,100%_94%,0_100%)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[82%] bg-(--primary) transition-colors duration-300 group-hover:bg-(--primary-hover) group-focus-visible:w-full group-focus-visible:bg-(--primary-hover)"
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
        className="absolute bottom-0 right-0 h-[82%] w-[86%] object-cover object-top"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-2 top-8 z-10 flex items-start font-headline text-2xl font-black uppercase leading-none tracking-[-0.02em] text-(--primary-foreground) [writing-mode:vertical-rl] rotate-180 scale-x-[1.25] scale-y-[0.9] sm:text-3xl"
      >
        {member.name}
      </span>
    </Dialog.Trigger>
  );
}

interface IndexRowProps {
  member: TeamMember;
  onOpen: (member: TeamMember) => void;
}

function IndexRow({ member, onOpen }: IndexRowProps) {
  return (
    <article className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 border-t border-(--border) py-7 md:grid-cols-12 md:items-center">
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
      <div className="flex min-w-0 flex-col gap-3 md:contents">
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
          <Dialog.Trigger
            onClick={() => onOpen(member)}
            className="index-link"
            aria-label={`Open spotlight for ${member.name}`}
          >
            Spotlight
          </Dialog.Trigger>
        </div>
      </div>
    </article>
  );
}
