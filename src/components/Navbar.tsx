import { Award, Moon, Sun, Target, Users } from "lucide-react";
import brandIcon from "../assets/brand/sea-kers-icon-color.svg";
import type { SectionId, Theme } from "../types";

interface NavbarProps {
  activeTab: SectionId;
  setActiveTab: (sectionId: SectionId) => void;
  onOpenJoinModal: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const navItems = [
  { id: "wins", label: "Wins", icon: Award },
  { id: "team", label: "Team", icon: Users },
  { id: "about", label: "About", icon: Target },
] as const;

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenJoinModal,
  theme,
  toggleTheme,
}: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-(--border) bg-(--background)/95">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 md:flex-nowrap md:px-8">
        <a
          href="#hero-section"
          onClick={() => setActiveTab("all")}
          className="flex min-h-11 items-center gap-2 rounded-lg pr-2 font-headline font-bold tracking-tight"
          aria-label="Team SEA-KERS home"
        >
          <span className="brand-logo-tile h-9 w-9">
            <img src={brandIcon} width="28" height="28" alt="" />
          </span>
          <span className="hidden sm:inline">SEA-KERS</span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="order-3 flex w-full items-center gap-1 overflow-x-auto rounded-lg bg-(--muted) p-1 md:order-none md:ml-auto md:w-auto"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}-section`}
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`flex min-h-10 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-(--card) text-(--primary-text)"
                    : "text-(--muted-foreground) hover:bg-(--card) hover:text-(--foreground)"
                }`}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <button type="button" onClick={onOpenJoinModal} className="button-primary">
            Join
          </button>
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
      </div>
    </header>
  );
}