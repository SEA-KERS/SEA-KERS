import React from 'react';
import { Award, Code2, Users, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme }) {
  const navItems = [
    { id: 'wins', label: 'Wins', icon: Award },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'team', label: 'Team', icon: Users }
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 md:px-8 z-50 transition-all">
      <div className="w-full bg-[var(--bg-surface)]/95 backdrop-blur-md border-2 border-[var(--border-main)] px-4 md:px-6 h-14 md:h-16 flex items-center justify-between shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
        
        {/* Left: Team SEA-KERS (Red) */}
        <div 
          onClick={() => setActiveTab('all')} 
          className="flex items-center cursor-pointer group shrink-0"
        >
          <span className="font-headline font-black tracking-tight text-base md:text-lg text-[#da261c] uppercase hover:opacity-90 transition-opacity">
            Team SEA-KERS
          </span>
        </div>

        {/* Middle: Nav Tabs */}
        <div className="flex items-center gap-1 md:gap-2 bg-[var(--bg-surface-subtle)] p-1 border-2 border-[var(--border-main)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1 font-headline text-xs md:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#da261c] text-white border border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.9)]'
                    : 'text-[var(--text-main)] hover:bg-[var(--bg-surface-high)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Dark / Light Mode Toggle */}
        <div className="flex items-center shrink-0">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-high)] text-[var(--text-main)] px-3 py-1.5 font-mono text-xs font-bold uppercase border-2 border-[var(--border-main)] shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.15)] active:translate-y-0.5 transition-all"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-3.5 h-3.5 text-[#001dc2]" />
                <span>DARK</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>LIGHT</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
