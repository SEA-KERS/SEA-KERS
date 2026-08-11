import { Dialog } from "../ui/Dialog";
import { TEAM_AVATAR_IDS } from "../../data/imageRegistry";
import ResponsiveImage from "../ui/ResponsiveImage";
import type { TeamMember } from "../../types";

interface RosterCardProps {
  member: TeamMember;
  onOpen: (member: TeamMember) => void;
}

export function RosterCard({ member, onOpen }: RosterCardProps) {
  return (
    <Dialog.Trigger
      onClick={() => onOpen(member)}
      aria-label={`Open spotlight for ${member.name}`}
      className="group relative block aspect-19/44 w-full cursor-pointer border-0 bg-transparent p-0 text-left"
    >
      <span className="absolute inset-0 block [clip-path:polygon(0_6%,100%_0,100%_94%,0_100%)]">
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
      </span>
    </Dialog.Trigger>
  );
}
