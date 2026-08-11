import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Dialog } from "../ui/Dialog";
import { TEAM_AVATAR_IDS } from "../../data/imageRegistry";
import ResponsiveImage from "../ui/ResponsiveImage";
import { LinkedinIcon } from "../ui/SocialIcons";
import type { TeamMember } from "../../types";

interface MemberSpotlightProps {
  member: TeamMember;
  spotlightNumber: number;
  total: number;
}

export function MemberSpotlight({
  member,
  spotlightNumber,
  total,
}: MemberSpotlightProps) {
  return (
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
            src={member.avatar}
            registryId={TEAM_AVATAR_IDS[member.id]}
            sizes="(min-width: 768px) 22rem, 100vw"
            width="480"
            height="640"
            decoding="async"
            alt={`Portrait of ${member.name}`}
            className="h-full w-full object-cover object-top"
          />
          <SpotlightGlimmer />
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-4 font-headline text-sm font-black uppercase tracking-[0.16em] text-(--primary-foreground) drop-shadow-md"
          >
            {member.name}
          </span>
        </div>

        <div className="flex flex-col px-6 py-10 md:px-10 md:py-14">
          <div className="flex flex-wrap items-baseline justify-between gap-3 pr-10">
            <p className="kicker">Team spotlight</p>
            <p className="meta-label">
              {String(spotlightNumber).padStart(2, "0")} / {total}
            </p>
          </div>
          <Dialog.Title className="mt-6 font-headline text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] md:text-5xl">
            {member.name}
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
            {member.linkedin ? (
              <a
                href={member.linkedin}
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
