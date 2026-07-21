import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './SocialIcons';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="w-full py-16 px-4 md:px-8 border-t-2 border-[var(--border-main)] bg-[var(--bg-surface-subtle)] text-[var(--text-main)] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Col 1: Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 font-headline font-black text-xl text-[#da261c] mb-4 uppercase">
            <span className="w-6 h-6 bg-[#da261c] text-white flex items-center justify-center font-mono text-xs font-bold border border-black">
              SK
            </span>
            <span>SEA_KERS</span>
          </div>
          <p className="font-headline text-sm text-[var(--text-muted)] font-normal leading-relaxed mb-4">
            High-performance collegiate engineering collective. Winning global hackathons and building production Web3, AI, and DePIN protocols.
          </p>
          <div className="font-mono text-[11px] text-[var(--text-muted)] font-bold">
            COORD_LAT: 12.9716° N • COORD_LONG: 77.5946° E
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h5 className="font-mono text-xs text-[#da261c] font-black uppercase tracking-wider mb-4">
            NAVIGATION
          </h5>
          <ul className="flex flex-col gap-2.5 font-headline text-sm text-[var(--text-muted)] font-bold">
            <li>
              <button onClick={() => setActiveTab('wins')} className="hover:text-[#da261c] transition-colors">
                Hackathon Victories (20+)
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('projects')} className="hover:text-[#da261c] transition-colors">
                Open Source Projects
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('team')} className="hover:text-[#da261c] transition-colors">
                Engineering Roster
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Community & Networks */}
        <div>
          <h5 className="font-mono text-xs text-[#da261c] font-black uppercase tracking-wider mb-4">
            CHANNELS & NETWORKS
          </h5>
          <ul className="flex flex-col gap-2.5 font-headline text-sm text-[var(--text-muted)] font-bold">
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#001dc2] transition-colors flex items-center gap-2">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repositories</span>
                <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
              </a>
            </li>
            <li>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#001dc2] transition-colors flex items-center gap-2">
                <TwitterIcon className="w-3.5 h-3.5" />
                <span>X (Twitter)</span>
                <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#001dc2] transition-colors flex items-center gap-2">
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn Collective</span>
                <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal & System Protocol */}
        <div>
          <h5 className="font-mono text-xs text-[#da261c] font-black uppercase tracking-wider mb-4">
            PROTOCOL STATUS
          </h5>
          <div className="bg-[var(--bg-surface)] p-4 border-2 border-[var(--border-main)] font-mono text-xs leading-relaxed text-[var(--text-muted)] shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
            <p className="text-[var(--text-main)] font-black mb-1">© 2026 SEA_KERS COLLECTIVE.</p>
            <p className="text-[11px] mb-2 font-bold">PRECISION ENGINEERED. FROM INDIA, FOR THE WORLD.</p>
            <div className="pt-2 border-t border-[var(--border-main)] text-[10px] text-[#001dc2] font-bold">
              LICENSED UNDER MIT OPEN SOURCE PROTOCOL.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t-2 border-[var(--border-main)] flex flex-col sm:flex-row justify-between items-center font-mono text-xs text-[var(--text-muted)] font-bold">
        <span>TECHNICAL PRECISION // SYSTEM ACTIVE</span>
        <span className="mt-2 sm:mt-0 flex items-center gap-1 text-emerald-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          ALL NODES OPERATIONAL
        </span>
      </div>
    </footer>
  );
}
