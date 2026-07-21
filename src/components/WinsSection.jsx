import React, { useState } from 'react';
import { Award, Search, Hash, ChevronRight } from 'lucide-react';
import { WINS_DATA } from '../data/teamData';

export default function WinsSection({ onSelectProject }) {
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWinModal, setActiveWinModal] = useState(null);
  const [copiedHash, setCopiedHash] = useState(null);

  const tracks = ['All', 'DePIN', 'ZK-Proofs', 'AI & Autonomous', 'Cross-Chain', 'FinTech & Systems', 'Robotics & Edge AI'];

  const filteredWins = WINS_DATA.filter((win) => {
    const matchesTrack =
      selectedTrack === 'All' ||
      win.track.toLowerCase().includes(selectedTrack.toLowerCase()) ||
      win.techStack.some((t) => t.toLowerCase().includes(selectedTrack.toLowerCase()));

    const matchesSearch =
      win.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      win.hackathon.toLowerCase().includes(searchQuery.toLowerCase()) ||
      win.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      win.hash.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTrack && matchesSearch;
  });

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <section id="wins-section" className="py-16 px-4 md:px-8 bg-[var(--bg-surface-subtle)] border-b-2 border-[var(--border-main)] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 border-b-2 border-[var(--border-main)] pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#001dc2] font-bold uppercase tracking-widest mb-2">
              <Award className="w-4 h-4 text-[#da261c]" />
              <span>EXECUTION EXCELLENCE // 20+ GLOBAL VICTORIES</span>
            </div>
            <h2 className="font-headline font-black text-3xl md:text-5xl uppercase text-[var(--text-main)] tracking-tight">
              Remarkable Track Record
            </h2>
            <p className="font-headline text-[var(--text-muted)] text-base md:text-lg max-w-2xl mt-2 font-normal">
              20+ international hackathon wins across Solana, ETHIndia, AI Safety, Cosmos, MIT, and NVIDIA challenges.
            </p>
          </div>

          {/* Search bar */}
          <div className="flex items-center bg-[var(--bg-surface)] border-2 border-[var(--border-main)] px-3 py-2 w-full lg:w-80 shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
            <Search className="w-4 h-4 text-[var(--text-muted)] mr-2" />
            <input
              type="text"
              placeholder="Search hackathon, stack, or hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-[var(--text-main)] placeholder:[var(--text-muted)] outline-none w-full font-mono font-bold"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
          {tracks.map((track) => (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-all ${
                selectedTrack === track
                  ? 'bg-[#da261c] text-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-main)] border-2 border-[var(--border-main)] hover:bg-[var(--bg-surface-high)]'
              }`}
            >
              {track === 'All' ? `ALL WINS (${WINS_DATA.length})` : track}
            </button>
          ))}
        </div>

        {/* Victory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWins.map((win, idx) => (
            <div
              key={win.id}
              className={`bg-[var(--bg-surface)] border-2 border-[var(--border-main)] p-6 transition-all duration-200 flex flex-col justify-between group relative shadow-[4px_4px_0px_rgba(0,0,0,0.15)] ${
                idx % 2 === 0 ? 'border-t-4 border-t-[#da261c]' : 'border-t-4 border-t-[#001dc2]'
              }`}
            >
              {/* Corner badge */}
              <div className="absolute top-0 right-0 bg-[#da261c] text-white font-mono text-[10px] font-bold px-2 py-1 uppercase border-b border-l border-black">
                {win.award}
              </div>

              <div>
                <div className="font-mono text-xs text-[var(--text-muted)] mb-2 flex items-center justify-between font-bold">
                  <span>{win.date}</span>
                  <span className="text-[#da261c]">{win.prize}</span>
                </div>

                <h3 className="font-headline font-bold text-xl text-[var(--text-main)] group-hover:text-[#da261c] transition-colors mb-2 leading-snug">
                  {win.title}
                </h3>

                <p className="font-mono text-xs text-[#001dc2] mb-4 font-bold">
                  {win.hackathon}
                </p>

                <p className="font-headline text-sm text-[var(--text-muted)] mb-6 font-normal leading-relaxed line-clamp-3">
                  {win.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {win.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] bg-[var(--bg-surface-high)] text-[var(--text-main)] border border-[var(--border-main)] px-2 py-0.5 font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hash verification & Details button */}
                <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-between font-mono text-xs">
                  <button
                    onClick={() => handleCopyHash(win.hash)}
                    className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[#da261c] transition-colors text-[11px] font-bold"
                    title="Click to copy proof hash"
                  >
                    <Hash className="w-3 h-3 text-[#da261c]" />
                    <span>{copiedHash === win.hash ? 'COPIED!' : win.hash}</span>
                  </button>

                  <button
                    onClick={() => setActiveWinModal(win)}
                    className="text-[#da261c] font-bold hover:underline flex items-center gap-1 uppercase"
                  >
                    <span>DETAILS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Win Details Modal */}
      {activeWinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[var(--bg-surface)] border-2 border-black max-w-xl w-full p-6 md:p-8 relative shadow-[8px_8px_0px_rgba(0,0,0,0.9)]">
            <button
              onClick={() => setActiveWinModal(null)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-main)] font-mono text-lg font-bold"
            >
              ✕
            </button>

            <div className="font-mono text-xs text-[#da261c] font-bold uppercase mb-2">
              VERIFIED RECORD // {activeWinModal.award}
            </div>

            <h3 className="font-headline font-black text-2xl text-[var(--text-main)] mb-2">
              {activeWinModal.title}
            </h3>

            <p className="font-mono text-sm text-[#001dc2] mb-4 font-bold">
              {activeWinModal.hackathon} • {activeWinModal.date}
            </p>

            <div className="bg-[var(--bg-surface-subtle)] p-4 border-2 border-[var(--border-main)] mb-6">
              <div className="flex justify-between items-center font-mono text-xs text-[var(--text-muted)] mb-2 font-bold">
                <span>PRIZE POOL:</span>
                <span className="text-[#da261c] text-sm">{activeWinModal.prize}</span>
              </div>
              <div className="flex justify-between items-center font-mono text-xs text-[var(--text-muted)] font-bold">
                <span>ON-CHAIN PROOF HASH:</span>
                <span className="text-[var(--text-main)]">{activeWinModal.hash}</span>
              </div>
            </div>

            <p className="font-headline text-base text-[var(--text-muted)] mb-6 font-normal leading-relaxed">
              {activeWinModal.description}
            </p>

            <div className="mb-6">
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase block mb-2 font-bold">TECHNOLOGY STACK:</span>
              <div className="flex flex-wrap gap-2">
                {activeWinModal.techStack.map((tech) => (
                  <span key={tech} className="font-mono text-xs bg-[var(--bg-surface-high)] text-[var(--text-main)] border border-[var(--border-main)] px-3 py-1 font-bold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setActiveWinModal(null);
                  if (onSelectProject) onSelectProject(activeWinModal.projectRef);
                }}
                className="flex-1 bg-[#da261c] hover:bg-[#b50004] text-white py-3 font-mono text-xs font-bold uppercase text-center border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)]"
              >
                VIEW PROJECT BUILD
              </button>
              <button
                onClick={() => setActiveWinModal(null)}
                className="bg-[var(--bg-surface-high)] text-[var(--text-main)] px-6 py-3 font-mono text-xs font-bold uppercase border-2 border-[var(--border-main)]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
