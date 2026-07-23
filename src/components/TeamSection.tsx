import { useState } from "react";
import { Award, Quote, Shield, Sparkles, UserCheck, X } from "lucide-react";
import { CORE_TEAM_DATA, TEAM_MEMBERS_DATA } from "../data/teamData";
import { useAccessibleDialog } from "../hooks/useAccessibleDialog";
import { getImageSrcSet } from "../utils/images";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./SocialIcons";
import type { TeamMember } from "../types";

export default function TeamSection() {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const { dialogRef, rememberTrigger } = useAccessibleDialog(
    activeMember !== null,
    () => setActiveMember(null),
  );

  const renderMemberCard = (member: TeamMember) => {
    const socialLinks = [
      { href: member.github, label: `${member.name} on GitHub`, Icon: GithubIcon },
      { href: member.twitter, label: `${member.name} on X`, Icon: TwitterIcon },
      { href: member.linkedin, label: `${member.name} on LinkedIn`, Icon: LinkedinIcon },
    ].filter((item) => Boolean(item.href));

    return (
      <article key={member.id} className="surface-card flex flex-col overflow-hidden">
        <img
          src={member.avatar}
          srcSet={getImageSrcSet(member.avatar)}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
          width="480"
          height="320"
          loading="lazy"
          decoding="async"
          alt={`Portrait of ${member.name}`}
          className="aspect-[3/2] w-full object-cover"
        />
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-(--primary-text)">{member.role}</p>
          <h4 className="mt-1 font-headline text-xl font-bold">{member.name}</h4>
          <p className="mt-1 text-sm text-(--muted-foreground)">{member.handle}</p>
          <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-(--secondary-text)">
            <Award aria-hidden="true" className="h-4 w-4" />
            {member.winsCount} victories
          </p>
          <p className="mt-3 flex-1 text-sm leading-6 text-(--muted-foreground)">{member.bio}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {member.skills.map((skill) => <span key={skill} className="tag">{skill}</span>)}
          </div>
          <div className="mt-5 flex min-h-11 items-center justify-between gap-3 border-t border-(--border) pt-4">
            <div className="flex gap-1">
              {socialLinks.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="icon-button" aria-label={label}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={(event) => {
                rememberTrigger(event.currentTarget);
                setActiveMember(member);
              }}
              className="button-quiet"
              aria-label={`Open spotlight for ${member.name}`}
            >
              <Sparkles aria-hidden="true" className="h-4 w-4" />
              Spotlight
            </button>
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
            {CORE_TEAM_DATA.map(renderMemberCard)}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="flex items-center gap-2 font-headline text-2xl font-bold">
            <UserCheck aria-hidden="true" className="h-5 w-5 text-(--secondary-text)" />
            Team members
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS_DATA.map(renderMemberCard)}
          </div>
        </div>
      </div>

      {activeMember ? (
        <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setActiveMember(null)}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-dialog-title"
            aria-describedby="member-dialog-description"
            tabIndex={-1}
            className="dialog-panel max-w-xl"
          >
            <button type="button" onClick={() => setActiveMember(null)} aria-label="Close member spotlight" className="icon-button absolute right-4 top-4">
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            <div className="flex flex-col gap-5 pr-12 sm:flex-row sm:items-center">
              <img
                src={activeMember.avatar}
                srcSet={getImageSrcSet(activeMember.avatar)}
                sizes="8rem"
                width="128"
                height="128"
                decoding="async"
                alt={`Portrait of ${activeMember.name}`}
                className="h-32 w-32 rounded-lg object-cover"
              />
              <div>
                <p className="section-kicker">{activeMember.role}</p>
                <h2 id="member-dialog-title" className="mt-2 font-headline text-3xl font-bold">{activeMember.name}</h2>
                <p className="mt-1 text-(--primary-text)">{activeMember.handle}</p>
                <p className="mt-2 text-sm text-(--muted-foreground)">{activeMember.specialization}</p>
              </div>
            </div>
            <p id="member-dialog-description" className="mt-6 leading-7 text-(--muted-foreground)">{activeMember.bio}</p>
            <p className="mt-5 font-semibold text-(--secondary-text)">{activeMember.winsCount} hackathon victories</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {activeMember.skills.map((skill) => <span key={skill} className="tag">{skill}</span>)}
            </div>
            <button type="button" onClick={() => setActiveMember(null)} className="button-primary mt-7 w-full">Close spotlight</button>
          </div>
        </div>
      ) : null}
    </section>
  );
}