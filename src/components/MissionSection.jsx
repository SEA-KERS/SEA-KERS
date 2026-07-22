import React from 'react';
import { Target, Zap, Shield, Globe } from 'lucide-react';

export default function MissionSection() {
  return (
    <section id="about-section" className="py-16 px-4 md:px-8 bg-[var(--bg-surface)] border-b-2 border-[var(--border-main)] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 border-b-2 border-[var(--border-main)] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#001dc2] font-bold uppercase tracking-widest mb-2">
              <Target className="w-4 h-4 text-[#da261c]" />
              <span>THE FOUNDATIONAL DIRECTIVE</span>
            </div>
            <h2 className="font-headline font-black text-3xl md:text-5xl uppercase text-[#da261c] tracking-tight">
              Our Mission
            </h2>
            <p className="font-headline text-[var(--text-muted)] text-base md:text-lg max-w-2xl mt-2 font-normal">
              Accelerating technical frontiers through collaborative engineering, zero rent extraction, and high-speed protocol deployment.
            </p>
          </div>
          <div className="font-mono text-xs text-[#001dc2] font-bold uppercase border-2 border-[var(--border-main)] px-3 py-1.5 bg-[var(--bg-surface-subtle)]">
            MISSION STATEMENT // ACTIVE
          </div>
        </div>

        {/* Mission Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1 */}
          <div className="bg-[var(--bg-surface-subtle)] border-2 border-[var(--border-main)] p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-[#da261c] font-black uppercase">
                  01 // SPEED & INTENSITY
                </span>
                <Zap className="w-5 h-5 text-[#001dc2]" />
              </div>
              <h3 className="font-headline font-black text-xl text-[var(--text-main)] mb-3 uppercase">
                48-Hour Sprint Mastery
              </h3>
              <p className="font-headline text-sm text-[var(--text-muted)] leading-relaxed">
                We thrive in high-pressure hackathon sprints, taking complex ideas from theoretical whitepapers to functional production code in under 48 hours.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border-main)] font-mono text-[11px] text-[var(--text-muted)] font-bold">
              PROTOCOL: EXTREME_VELOCITY
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[var(--bg-surface-subtle)] border-2 border-[var(--border-main)] p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] flex flex-col justify-between group border-t-4 border-t-[#da261c]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-[#da261c] font-black uppercase">
                  02 // DEEP TECHNOLOGY
                </span>
                <Shield className="w-5 h-5 text-[#da261c]" />
              </div>
              <h3 className="font-headline font-black text-xl text-[var(--text-main)] mb-3 uppercase">
                Hardcore Infrastructure
              </h3>
              <p className="font-headline text-sm text-[var(--text-muted)] leading-relaxed">
                We engineer core Web3 primitives, zero-knowledge privacy circuits, DePIN edge-compute nodes, and agentic AI security auditors that scale globally.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border-main)] font-mono text-[11px] text-[var(--text-muted)] font-bold">
              FOCUS: WEBSPEC_DEPIN_ZK
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[var(--bg-surface-subtle)] border-2 border-[var(--border-main)] p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-[#da261c] font-black uppercase">
                  03 // GLOBAL IMPACT
                </span>
                <Globe className="w-5 h-5 text-[#001dc2]" />
              </div>
              <h3 className="font-headline font-black text-xl text-[var(--text-main)] mb-3 uppercase">
                From India, For The World
              </h3>
              <p className="font-headline text-sm text-[var(--text-muted)] leading-relaxed">
                Born as a collegiate collective, our goal is to build world-class open-source software with zero rent-extraction and maximum developer utility.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border-main)] font-mono text-[11px] text-[var(--text-muted)] font-bold">
              IMPACT: OPEN_SOURCE_GLOBAL
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
