import { useReveal } from "../../hooks/useReveal";
import { TEAM_AVATAR_IDS } from "../../data/imageRegistry";
import { TEAM_DATA } from "../../data/team";
import ResponsiveImage from "../ui/ResponsiveImage";
import { LinkedinIcon } from "../ui/SocialIcons";
import type { TeamMember } from "../../types";

const formatIndex = (index: number) => String(index).padStart(2, "0");

export default function TeamPage() {
  return (
    <div className="px-4 pb-24 pt-32 md:px-8 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-7xl">
          <header className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-headline text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl">
                The crew
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-(--muted-foreground)">
                Twelve engineers, one collective. Every member of the SEA-KERS
                crew, one by one.
              </p>
            </div>
            <p className="meta-label">
              Engineering roster / {TEAM_DATA.length} members
            </p>
          </header>

        <div className="mt-16">
          {TEAM_DATA.map((member, index) => (
            <MemberRow key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface MemberRowProps {
  member: TeamMember;
  index: number;
}

function MemberRow({ member, index }: MemberRowProps) {
  const { ref: revealRef, isVisible } = useReveal<HTMLElement>();
  const isEven = index % 2 === 0;

  return (
    <article
      ref={revealRef}
      className={`reveal grid gap-8 border-t border-(--border) py-10 md:grid-cols-12 md:items-center md:gap-10 md:py-14 ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className={`relative md:col-span-4 ${isEven ? "" : "md:order-2"}`}>
        <div
          aria-hidden="true"
          className={`absolute h-12 w-12 md:h-16 md:w-16 ${
            isEven
              ? "-right-2 -top-2 bg-(--primary) md:-right-4 md:-top-4"
              : "-bottom-2 -left-2 bg-(--accent) md:-bottom-4 md:-left-4"
          }`}
        />
        <ResponsiveImage
          src={member.avatar}
          registryId={TEAM_AVATAR_IDS[member.id]}
          sizes="(min-width: 768px) 34vw, 100vw"
          width="480"
          height="640"
          loading="lazy"
          decoding="async"
          alt={`Portrait of ${member.name}`}
          className="relative aspect-[4/5] w-full object-cover object-top"
        />
      </div>

      <div className={`md:col-span-8 ${isEven ? "" : "md:order-1"}`}>
        <p className="font-headline text-3xl font-black tracking-[-0.02em] text-(--muted-foreground) md:text-5xl">
          {formatIndex(index + 1)}
        </p>
        <h2 className="mt-2 font-headline text-2xl font-black uppercase leading-[0.95] tracking-[-0.02em] md:text-3xl">
          {member.name}
        </h2>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-(--accent-text)">
          Team SEA-KERS collective
        </p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-(--muted-foreground) md:text-base md:leading-8">
          &ldquo;What you seek is seeking you. We choose harder problems and
          build the systems we want to see in the world.&rdquo;
        </p>

        <div className="mt-5">
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
            >
              <LinkedinIcon className="h-4 w-4" />
              Connect on LinkedIn
            </a>
          ) : (
            <span className="meta-label">No public profile yet</span>
          )}
        </div>
      </div>
    </article>
  );
}
