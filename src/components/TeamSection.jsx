import React, { useState, useEffect } from 'react';
import { Users, Award, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './SocialIcons';
import { TEAM_DATA } from '../data/teamData';

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeMemberModal, setActiveMemberModal] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const total = TEAM_DATA.length;
  // Duplicate team array to support infinite smooth sliding
  const displayTeam = [...TEAM_DATA, ...TEAM_DATA, ...TEAM_DATA];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  return (
    <section id="team-section" className="py-16 px-4 md:px-8 bg-[var(--bg-surface-subtle)] border-b-2 border-[var(--border-main)] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-[var(--border-main)] pb-6 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#001dc2] font-bold uppercase tracking-widest mb-2 border-2 border-[var(--border-main)] px-3 py-1 bg-[var(--bg-surface)]">
              <Users className="w-4 h-4 text-[#da261c]" />
              <span>THE HUMAN LAYER // CORE ROSTER (4 VISIBLE)</span>
            </div>
            <h2 className="font-headline font-black text-3xl md:text-5xl uppercase text-[var(--text-main)] tracking-tight">
              Engineering Roster
            </h2>
            <p className="font-headline text-[var(--text-muted)] text-base md:text-lg mt-2 font-normal">
              Architects of the collective. Lead engineers, cryptographers, and systems hackers who ship under pressure.
            </p>
          </div>

          <div className="font-mono text-xs text-[var(--text-muted)] font-bold uppercase">
            ACTIVE PROFILE <span className="text-[#da261c]">{String((currentIndex % total) + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </div>
        </div>

        {/* Carousel Container with Side Navigation Arrows */}
        <div className="relative px-2 sm:px-10">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => {
              setIsAutoPlaying(false);
              prevSlide();
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 bg-[var(--bg-surface)] hover:bg-[#da261c] hover:text-white text-[var(--text-main)] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.9)] active:translate-y-0.5 transition-all flex items-center justify-center font-mono font-bold"
            aria-label="Previous Member"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => {
              setIsAutoPlaying(false);
              nextSlide();
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 bg-[var(--bg-surface)] hover:bg-[#da261c] hover:text-white text-[var(--text-main)] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.9)] active:translate-y-0.5 transition-all flex items-center justify-center font-mono font-bold"
            aria-label="Next Member"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Viewport Window */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 25}%)`
              }}
            >
              {displayTeam.map((member, idx) => (
                <div
                  key={`${member.id}-${idx}`}
                  className="w-full min-w-full sm:min-w-[50%] md:min-w-[33.333%] lg:min-w-[25%] px-2 shrink-0"
                >
                  <div className="bg-[var(--bg-surface)] border-2 border-[var(--border-main)] hover:border-[#da261c] p-4 h-full flex flex-col justify-between shadow-[4px_4px_0px_rgba(0,0,0,0.15)] transition-all group">
                    <div>
                      {/* Avatar & Basic Info */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-14 h-14 border-2 border-black p-0.5 bg-[var(--bg-surface-subtle)] shrink-0 overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <span className="font-mono text-[9px] text-[#da261c] font-black tracking-wider uppercase truncate">
                            {member.role}
                          </span>
                          <h3 className="font-headline font-black text-base text-[var(--text-main)] group-hover:text-[#da261c] transition-colors uppercase leading-tight truncate">
                            {member.name}
                          </h3>
                          <span className="font-mono text-[10px] text-[var(--text-muted)] font-bold truncate">
                            {member.handle}
                          </span>
                          <div className="inline-flex items-center gap-1 mt-0.5 font-mono text-[10px] text-[#001dc2] font-black">
                            <Award className="w-3 h-3 text-[#da261c]" />
                            <span>{member.winsCount} WINS</span>
                          </div>
                        </div>
                      </div>

                      <p className="font-headline text-xs text-[var(--text-muted)] font-normal leading-relaxed mb-3 line-clamp-3">
                        {member.bio}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {member.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="font-mono text-[9px] bg-[var(--bg-surface-high)] text-[var(--text-main)] border border-[var(--border-main)] px-1.5 py-0.5 font-bold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Profiles & Spotlight Button */}
                    <div className="pt-3 border-t-2 border-[var(--border-main)] flex items-center justify-between font-mono text-xs">
                      <div className="flex gap-2 text-[var(--text-muted)]">
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
                        onClick={() => setActiveMemberModal(member)}
                        className="text-[#da261c] font-black hover:underline uppercase text-[10px] flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-[#da261c]" />
                        <span>SPOTLIGHT</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {TEAM_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(idx);
              }}
              className={`h-2.5 transition-all border border-black ${
                currentIndex % total === idx
                  ? 'w-8 bg-[#da261c]'
                  : 'w-2.5 bg-[var(--bg-surface-high)] hover:bg-[var(--text-muted)]'
              }`}
              aria-label={`Go to profile ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Member Spotlight Modal */}
      {activeMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[var(--bg-surface)] border-2 border-black max-w-xl w-full p-6 md:p-8 relative shadow-[8px_8px_0px_rgba(0,0,0,0.9)]">
            <button
              onClick={() => setActiveMemberModal(null)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-main)] font-mono text-lg font-bold"
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
                <h3 className="font-headline font-black text-2xl text-[var(--text-main)] uppercase">
                  {activeMemberModal.name}
                </h3>
                <span className="font-mono text-sm text-[#001dc2] font-bold block">
                  {activeMemberModal.handle}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)] mt-1 block font-bold">
                  SPECIALIZATION: {activeMemberModal.specialization}
                </span>
              </div>
            </div>

            <div className="bg-[var(--bg-surface-subtle)] p-4 border-2 border-[var(--border-main)] mb-6 font-mono text-xs">
              <div className="flex justify-between items-center text-[var(--text-muted)] mb-2 font-bold">
                <span>HACKATHON WINS CONTRIBUTED:</span>
                <span className="text-[#da261c] font-black text-sm">{activeMemberModal.winsCount} VICTORIES</span>
              </div>
              <p className="font-headline text-sm text-[var(--text-muted)] font-normal leading-relaxed mt-2">
                {activeMemberModal.bio}
              </p>
            </div>

            <div className="mb-6">
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase block mb-2 font-bold">
                TECHNICAL SKILLS & TOOLING:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeMemberModal.skills.map((skill) => (
                  <span key={skill} className="font-mono text-xs bg-[var(--bg-surface-high)] text-[var(--text-main)] border border-[var(--border-main)] px-3 py-1 font-bold">
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
