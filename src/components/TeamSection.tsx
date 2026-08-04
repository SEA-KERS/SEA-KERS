import { useEffect, useState } from "react";
import { Quote, Shield, UserCheck } from "lucide-react";
import { CORE_TEAM_DATA, TEAM_MEMBERS_DATA } from "../data/teamData";
import { getImageSrcSet } from "../utils/images";
import { LinkedinIcon } from "./SocialIcons";
import type { TeamMember } from "../types";

function shuffleArray<T>(array: readonly T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function TeamSection() {
  const [coreTeam, setCoreTeam] = useState<readonly TeamMember[]>(CORE_TEAM_DATA);
  const [teamMembers, setTeamMembers] = useState<readonly TeamMember[]>(TEAM_MEMBERS_DATA);

  useEffect(() => {
    setCoreTeam(shuffleArray(CORE_TEAM_DATA));
    setTeamMembers(shuffleArray(TEAM_MEMBERS_DATA));
  }, []);

  const renderMemberCard = (member: TeamMember) => {
    return (
      <article key={member.id} className="surface-card flex flex-col overflow-hidden">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-(--muted)">
          <img
            src={member.avatar}
            srcSet={getImageSrcSet(member.avatar)}
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
            width="480"
            height="320"
            loading="lazy"
            decoding="async"
            alt={`Portrait of ${member.name}`}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="hidden h-full w-full flex-col items-center justify-center p-6 text-center text-(--muted-foreground) [img[style*='display: none'] ~ &]:flex">
            <span className="font-headline text-3xl font-bold text-(--primary-text)">{member.name.charAt(0)}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h4 className="font-headline text-xl font-bold">{member.name}</h4>
          <div className="mt-auto border-t border-(--border) pt-4">
            {member.linkedin ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-md text-xs font-semibold text-(--primary-text) transition-colors hover:text-(--foreground)"
                aria-label={`${member.name} on LinkedIn`}
              >
                <LinkedinIcon className="h-4 w-4 text-(--primary-text)" />
                <span>Connect on LinkedIn</span>
              </a>
            ) : (
              <span className="inline-flex min-h-10 items-center gap-2 text-xs font-medium text-(--muted-foreground)">
                <LinkedinIcon className="h-4 w-4 opacity-50" />
                <span>LinkedIn coming soon</span>
              </span>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <section
      id="team-section"
      aria-labelledby="team-title"
      className="border-b border-(--border) px-4 py-20 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p className="section-kicker">Engineering roster</p>
        <h2 id="team-title" className="mt-3 font-headline text-4xl font-bold md:text-5xl">Master minds</h2>
        <p className="mt-4 max-w-3xl leading-7 text-(--muted-foreground)">A multidisciplinary team united by curiosity, craft, and the persistence to keep building.</p>

        <blockquote className="surface-card mt-10 flex gap-4 p-6 text-lg leading-8">
          <Quote aria-hidden="true" className="h-7 w-7 shrink-0 text-(--accent-text)" />
          <p>
            <strong className="font-headline">What you seek is seeking you.</strong>{" "}
            We choose harder problems and build the systems we want to see in the world.
          </p>
        </blockquote>

        <div className="mt-14">
          <h3 className="flex items-center gap-2 font-headline text-2xl font-bold">
            <Shield aria-hidden="true" className="h-5 w-5 text-(--primary-text)" />
            Core team
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreTeam.map(renderMemberCard)}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="flex items-center gap-2 font-headline text-2xl font-bold">
            <UserCheck aria-hidden="true" className="h-5 w-5 text-(--secondary-text)" />
            Team members
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map(renderMemberCard)}
          </div>
        </div>
      </div>
    </section>
  );
}