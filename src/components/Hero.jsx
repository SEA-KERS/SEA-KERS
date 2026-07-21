import React from 'react';
import CyberDotMatrix from './CyberDotMatrix';

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center px-4 md:px-8 overflow-hidden pt-24 pb-8 border-b-2 border-[var(--border-main)]">
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-center">
        
        {/* Top Grid: Left Headline & Subtitle + Right Animated Logo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
          {/* Left Column: Headline & Subtitle */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h1 className="font-headline font-black text-4xl sm:text-6xl md:text-7xl text-[#da261c] leading-[1.05] uppercase tracking-tight mb-4">
              OPEN INNOVATION.<br />
              <span className="text-[var(--text-main)]">FROM INDIA, FOR THE WORLD.</span>
            </h1>

            <p className="font-headline text-base sm:text-lg text-[var(--text-muted)] max-w-2xl font-normal leading-relaxed">
              We are <strong className="text-[var(--text-main)] font-bold">Team SEA_KERS</strong>—a high-performance engineering crew born in 48-hour hackathon sprints. Out-engineering international competition, building Web3, AI, and DePIN infrastructure.
            </p>
          </div>

          {/* Right Column: Animated Logo Canvas */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center w-full">
            <CyberDotMatrix />
          </div>
        </div>

        {/* Stats Box: Spans exact width (max-w-7xl) to align left & right edges perfectly with Navbar and Hero */}
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-2 border-[var(--border-main)] bg-[var(--bg-surface)] p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] text-center">
            <div className="flex flex-col items-center p-2 border-r-2 border-[var(--border-main)] last:border-r-0">
              <span className="font-headline font-black text-2xl sm:text-3xl text-[#da261c]">20+</span>
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold mt-0.5">Hackathon Wins</span>
            </div>

            <div className="flex flex-col items-center p-2 border-r-2 border-[var(--border-main)] last:border-r-0">
              <span className="font-headline font-black text-2xl sm:text-3xl text-[var(--text-main)]">$350K+</span>
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold mt-0.5">Grants & Prizes</span>
            </div>

            <div className="flex flex-col items-center p-2 border-r-2 border-[var(--border-main)] last:border-r-0">
              <span className="font-headline font-black text-2xl sm:text-3xl text-[#001dc2]">12.4K+</span>
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold mt-0.5">Active Nodes</span>
            </div>

            <div className="flex flex-col items-center p-2">
              <span className="font-headline font-black text-2xl sm:text-3xl text-[#da261c]">100%</span>
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold mt-0.5">Open Source</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
