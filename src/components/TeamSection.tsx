import { useState } from "react";
import { Award, Sparkles, Shield, UserCheck, Quote } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "./SocialIcons";
import { CORE_TEAM_DATA, TEAM_MEMBERS_DATA } from "../data/teamData";
import { useAccessibleDialog } from "../hooks/useAccessibleDialog";
import type { TeamMember } from "../types";

export default function TeamSection() {
  const [activeMemberModal, setActiveMemberModal] = useState<TeamMember | null>(
    null,
  );
  const { dialogRef, rememberTrigger } = useAccessibleDialog(
    activeMemberModal !== null,
    () => setActiveMemberModal(null),
  );

  const renderMemberCard = (member: TeamMember) => (
    <div
      key={member.id}
      className="bg-(--bg-surface) border-2 border-(--border-main) hover:border-[#da261c] p-5 transition-all duration-200 group flex flex-col justify-between shadow-[4px_4px_0px_rgba(0,0,0,0.15)] rounded-none"
    >
      <div>
        {/* Avatar Image */}
        <div className="w-full h-48 border-2 border-black mb-4 overflow-hidden bg-(--bg-surface-subtle) shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Role & Name */}
        <span className="font-mono text-[10px] text-[#da261c] font-black tracking-widest uppercase block mb-0.5">
          {member.role}
        </span>
        <h3 className="font-headline font-black text-lg text-(--text-main) group-hover:text-[#da261c] transition-colors uppercase leading-tight mb-1">
          {member.name}
        </h3>
        <span className="font-mono text-xs text-(--text-muted) font-bold block mb-2">
          {member.handle}
        </span>

        {/* Hackathon Wins Counter */}
        <div className="inline-flex items-center gap-1 font-mono text-[11px] text-[#001dc2] font-black mb-3">
          <Award className="w-3.5 h-3.5 text-[#da261c]" />
          <span>{member.winsCount} VICTORIES</span>
        </div>

        {/* Bio */}
        <p className="font-headline text-xs text-(--text-muted) font-normal leading-relaxed mb-4 line-clamp-3">
          {member.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-[10px] bg-(--bg-surface-high) text-(--text-main) border border-(--border-main) px-2 py-0.5 font-bold"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links & Spotlight */}
      <div className="pt-3 border-t-2 border-(--border-main) flex items-center justify-between font-mono text-xs mt-auto">
        <div className="flex gap-2.5 text-(--text-muted)">
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#da261c] transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={member.twitter}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#da261c] transition-colors"
            title="X / Twitter"
          >
            <TwitterIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#da261c] transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        <button
          onClick={(event) => {
            rememberTrigger(event.currentTarget);
            setActiveMemberModal(member);
          }}
          className="text-[#da261c] font-black hover:underline uppercase text-[10px] flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-[#da261c]" />
          <span>SPOTLIGHT</span>
        </button>
      </div>
    </div>
  );

  return (
    <section
      id="team-section"
      className="py-16 px-4 md:px-8 bg-(--bg-surface-subtle) border-b-2 border-(--border-main)"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-2 border-(--border-main) pb-6 gap-4">
          <div>
            <h2 className="font-headline font-black text-3xl md:text-5xl uppercase text-(--text-main) tracking-tight">
              Master Minds
            </h2>
            <p className="font-headline text-(--text-muted) text-base md:text-lg mt-2 font-bold">
              Young, Hungry, and Building
            </p>
          </div>
        </div>

        {/* Quote Block */}
        <div className="bg-(--bg-surface) border-2 border-(--border-main) p-6 mb-12 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-start md:items-center gap-4">
          <Quote className="w-8 h-8 text-[#da261c] shrink-0" />
          <p className="font-headline text-sm md:text-base text-(--text-main) leading-relaxed italic font-medium">
            <strong className="text-[#da261c] not-italic font-bold">
              "What you seek is seeking you."
            </strong>{" "}
            We seek greater heights, harder problems, innovations that push
            human potential forward and build a better future for everyone.
            We're Innovators who aren't waiting for permission to create.
          </p>
        </div>

        {/* SUBSECTION 1: CORE TEAM (8 Members - 4 Grid Columns x 2 Rows) */}
        <div className="mb-14">
          <div className="flex items-center gap-2 font-mono text-xs font-black text-[#da261c] uppercase tracking-wider mb-6 pb-2 border-b-2 border-[#da261c] w-fit">
            <Shield className="w-4 h-4 text-[#da261c]" />
            <span>CORE TEAM (8 MEMBERS)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_TEAM_DATA.map(renderMemberCard)}
          </div>
        </div>

        {/* SUBSECTION 2: TEAM MEMBERS (4 Members - 4 Grid Columns x 1 Row) */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-black text-[#001dc2] uppercase tracking-wider mb-6 pb-2 border-b-2 border-[#001dc2] w-fit">
            <UserCheck className="w-4 h-4 text-[#001dc2]" />
            <span>TEAM MEMBERS (4 MEMBERS)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS_DATA.map(renderMemberCard)}
          </div>
        </div>
      </div>

      {/* Member Spotlight Modal */}
      {activeMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-spotlight-dialog-title"
            tabIndex={-1}
            className="bg-(--bg-surface) border-2 border-black max-w-xl w-full p-6 md:p-8 relative shadow-[8px_8px_0px_rgba(0,0,0,0.9)]"
          >
            <button
              onClick={() => setActiveMemberModal(null)}
              aria-label="Close member spotlight"
              className="absolute top-4 right-4 text-(--text-muted) hover:text-(--text-main) font-mono text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={activeMemberModal.avatar}
                alt={activeMemberModal.name}
                className="w-24 h-24 border-2 border-black object-cover shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
              />
              <div>
                <span className="font-mono text-xs text-[#da261c] font-black uppercase">
                  {activeMemberModal.role}
                </span>
                <h3
                  id="member-spotlight-dialog-title"
                  className="font-headline font-black text-2xl text-(--text-main) uppercase"
                >
                  {activeMemberModal.name}
                </h3>
                <span className="font-mono text-sm text-[#001dc2] font-bold block">
                  {activeMemberModal.handle}
                </span>
                <span className="font-mono text-xs text-(--text-muted) mt-1 block font-bold">
                  SPECIALIZATION: {activeMemberModal.specialization}
                </span>
              </div>
            </div>

            <div className="bg-(--bg-surface-subtle) p-4 border-2 border-(--border-main) mb-6 font-mono text-xs">
              <div className="flex justify-between items-center text-(--text-muted) mb-2 font-bold">
                <span>HACKATHON VICTORIES:</span>
                <span className="text-[#da261c] font-black text-sm">
                  {activeMemberModal.winsCount} WINS
                </span>
              </div>
              <p className="font-headline text-sm text-(--text-muted) font-normal leading-relaxed mt-2">
                {activeMemberModal.bio}
              </p>
            </div>

            <div className="mb-6">
              <span className="font-mono text-xs text-(--text-muted) uppercase block mb-2 font-bold">
                TECHNICAL SKILLS & TOOLING:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeMemberModal.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs bg-(--bg-surface-high) text-(--text-main) border border-(--border-main) px-3 py-1 font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveMemberModal(null)}
              className="w-full bg-[#da261c] hover:bg-[#b50004] text-white py-3 font-mono text-xs font-bold uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)]"
            >
              CLOSE SPOTLIGHT
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
