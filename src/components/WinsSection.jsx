import React, { useState } from 'react';
import { Award, Search, ExternalLink, Copy, Check, Info, MapPin, Calendar } from 'lucide-react';
import { WINS_DATA } from '../data/teamData';

export default function WinsSection({ onSelectProject }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [activeWinModal, setActiveWinModal] = useState(null);
  const [copiedHashId, setCopiedHashId] = useState(null);

  const tracks = ['ALL', 'DePIN', 'ZK-Proofs', 'AI & Autonomous', 'Cross-Chain', 'FinTech & Web3', 'Edge AI'];

  const filteredWins = WINS_DATA.filter((win) => {
    const matchesSearch =
      win.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      win.hackathon.toLowerCase().includes(searchQuery.toLowerCase()) ||
      win.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrack = selectedTrack === 'ALL' || win.track === selectedTrack;
    return matchesSearch && matchesTrack;
  });

  const handleCopyHash = (hash, id) => {
    navigator.clipboard.writeText(hash);
    setCopiedHashId(id);
    setTimeout(() => setCopiedHashId(null), 2000);
  };

  return (
    <section id="wins-section" className="py-16 px-4 md:px-8 bg-[var(--bg-surface)] border-b-2 border-[var(--border-main)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-2 border-[var(--border-main)] pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#001dc2] font-bold uppercase tracking-widest mb-2 border-2 border-[var(--border-main)] px-3 py-1 bg-[var(--bg-surface-subtle)]">
              <Award className="w-4 h-4 text-[#da261c]" />
              <span>OUR TRACK RECORD // 20+ GLOBAL VICTORIES</span>
            </div>
            <h2 className="font-headline font-black text-3xl md:text-5xl uppercase text-[var(--text-main)] tracking-tight">
              Hackathon Victories
            </h2>
            <p className="font-headline text-[var(--text-muted)] text-base md:text-lg max-w-2xl mt-2 font-normal">
              Empirical proof of engineering capability. On-chain verified hackathon wins spanning global web3 and deep-tech hackathons.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search victories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg-surface-subtle)] border-2 border-[var(--border-main)] pl-9 pr-4 py-2 font-mono text-xs text-[var(--text-main)] focus:outline-none focus:border-[#da261c] transition-colors placeholder:text-[var(--text-muted)] font-bold"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <span className="font-mono text-xs font-bold text-[var(--text-muted)] uppercase shrink-0 mr-2">
            TRACK FILTER:
          </span>
          {tracks.map((track) => (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`font-mono text-xs px-3 py-1 font-bold border-2 transition-all shrink-0 ${
                selectedTrack === track
                  ? 'bg-[#da261c] text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]'
                  : 'bg-[var(--bg-surface-subtle)] text-[var(--text-main)] border-[var(--border-main)] hover:bg-[var(--bg-surface-high)]'
              }`}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Wins Grid: Image -> Place/Date & Red Award Tag -> Title -> One Line Summary -> Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWins.map((win) => (
            <div
              key={win.id}
              className="bg-[var(--bg-surface-subtle)] border-2 border-[var(--border-main)] hover:border-[#da261c] transition-all duration-200 group flex flex-col justify-between shadow-[4px_4px_0px_rgba(0,0,0,0.15)] overflow-hidden"
            >
              <div>
                {/* 1. Image Preview */}
                <div className="relative w-full h-44 border-b-2 border-[var(--border-main)] overflow-hidden bg-black">
                  <img
                    src={win.image}
                    alt={win.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 bg-[#da261c] text-white px-2.5 py-1 font-mono text-[11px] font-black uppercase border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.9)]">
                    {win.award}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-0.5 font-mono text-[10px] font-bold border border-white/20 backdrop-blur-sm">
                    {win.prize}
                  </div>
                </div>

                <div className="p-5">
                  {/* 2. Place & Date Info */}
                  <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)] font-bold mb-3 pb-2 border-b border-[var(--border-main)]">
                    <div className="flex items-center gap-1 text-[#001dc2]">
                      <MapPin className="w-3.5 h-3.5 text-[#da261c]" />
                      <span>{win.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>{win.date}</span>
                    </div>
                  </div>

                  {/* 3. Title & Hackathon */}
                  <h3 className="font-headline font-black text-lg text-[var(--text-main)] group-hover:text-[#da261c] transition-colors uppercase leading-tight mb-1">
                    {win.title}
                  </h3>
                  <div className="font-mono text-xs text-[var(--text-muted)] font-bold mb-3">
                    {win.hackathon}
                  </div>

                  {/* 4. One Line Project Summary */}
                  <p className="font-headline text-xs text-[var(--text-muted)] font-normal leading-relaxed mb-4">
                    {win.tagline || win.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {win.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] bg-[var(--bg-surface-high)] text-[var(--text-main)] border border-[var(--border-main)] px-2 py-0.5 font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. More Details Button */}
              <div className="p-5 pt-0 border-t border-[var(--border-main)] flex items-center justify-between mt-auto">
                <button
                  onClick={() => handleCopyHash(win.hash, win.id)}
                  className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] font-bold flex items-center gap-1"
                  title="Copy Verification Hash"
                >
                  {copiedHashId === win.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-500 font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{win.hash}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveWinModal(win)}
                  className="bg-[#da261c] hover:bg-[#b50004] text-white px-3 py-1.5 font-mono text-xs font-bold uppercase border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] active:translate-y-0.5 transition-all flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>MORE DETAILS</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Win Record Details Modal */}
      {activeWinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[var(--bg-surface)] border-2 border-black max-w-xl w-full p-6 md:p-8 relative shadow-[8px_8px_0px_rgba(0,0,0,0.9)]">
            <button
              onClick={() => setActiveWinModal(null)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-main)] font-mono text-lg font-bold"
            >
              ✕
            </button>

            <div className="relative w-full h-48 border-2 border-black mb-6 overflow-hidden bg-black">
              <img
                src={activeWinModal.image}
                alt={activeWinModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#da261c] text-white px-3 py-1 font-mono text-xs font-black uppercase border border-black">
                {activeWinModal.award}
              </div>
              <div className="absolute bottom-3 right-3 bg-black/90 text-white px-3 py-1 font-mono text-xs font-bold border border-white/20">
                {activeWinModal.prize}
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#001dc2] font-bold uppercase mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#da261c]" />
              <span>{activeWinModal.location} • {activeWinModal.date}</span>
            </div>

            <h3 className="font-headline font-black text-2xl text-[var(--text-main)] uppercase mb-1">
              {activeWinModal.title}
            </h3>
            <div className="font-mono text-xs text-[var(--text-muted)] font-bold mb-4">
              {activeWinModal.hackathon}
            </div>

            <p className="font-headline text-sm text-[var(--text-muted)] leading-relaxed mb-6 bg-[var(--bg-surface-subtle)] p-4 border-2 border-[var(--border-main)] font-normal">
              {activeWinModal.description}
            </p>

            <div className="mb-6">
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase block mb-2 font-bold">
                TECHNOLOGY STACK:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeWinModal.techStack.map((tech) => (
                  <span key={tech} className="font-mono text-xs bg-[var(--bg-surface-high)] text-[var(--text-main)] border border-[var(--border-main)] px-3 py-1 font-bold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t-2 border-[var(--border-main)]">
              <div className="font-mono text-xs text-[var(--text-muted)] font-bold">
                PROOFTASH: <span className="text-[var(--text-main)]">{activeWinModal.hash}</span>
              </div>

              <button
                onClick={() => {
                  setActiveWinModal(null);
                  if (activeWinModal.projectRef) {
                    onSelectProject(activeWinModal.projectRef);
                  }
                }}
                className="bg-[#da261c] hover:bg-[#b50004] text-white px-4 py-2 font-mono text-xs font-bold uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] flex items-center gap-1.5"
              >
                <span>VIEW REPOSITORY</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
