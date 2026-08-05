import { Moon, Sun } from "lucide-react";
import brandIcon from "../../assets/brand/sea-kers-icon-color.svg";
import type { SectionId, Theme } from "../../types";

interface NavbarProps {
  activeTab: SectionId;
  setActiveTab: (sectionId: SectionId) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const navItems = [
  { id: "wins", label: "Wins" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
  { id: "about", label: "About" },
] as const;

export default function Navbar({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
}: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-(--border) bg-(--background)">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 md:px-8">
        <a
          href="#hero-section"
          onClick={() => setActiveTab("all")}
          className="flex min-h-11 items-center gap-2.5 rounded-lg pr-2 font-headline font-bold tracking-tight"
          aria-label="Team SEA-KERS home"
        >
          <span className="brand-logo-tile h-9 w-9">
            <img src={brandIcon} width="28" height="28" alt="" />
          </span>
          <span className="hidden sm:inline">SEA-KERS</span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="ml-auto flex items-center gap-1 overflow-x-auto"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}-section`}
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`flex min-h-11 shrink-0 items-center border-b-2 px-3 text-[0.6875rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                  isActive
                    ? "border-(--primary) text-(--accent-text)"
                    : "border-transparent text-(--muted-foreground) hover:text-(--foreground)"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          className="icon-button"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Sun aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
}
