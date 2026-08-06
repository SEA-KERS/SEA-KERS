import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    firstLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const navigate = (sectionId: SectionId) => {
    setActiveTab(sectionId);
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-(--border) bg-(--background)"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 md:px-8">
        <a
          href="#hero-section"
          onClick={() => navigate("all")}
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
          className="ml-auto hidden items-center gap-1 sm:flex"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}-section`}
                onClick={() => navigate(item.id)}
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

        <div className="ml-auto flex items-center gap-1 sm:ml-0">
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
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="icon-button sm:hidden!"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-(--border) bg-(--background) px-4 pb-4 sm:hidden!"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navItems.map((item, index) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={`#${item.id}-section`}
                  onClick={() => navigate(item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex min-h-11 items-center gap-3 border-b border-(--border) py-3 text-sm font-bold uppercase tracking-[0.16em] transition-colors ${
                    isActive
                      ? "text-(--accent-text)"
                      : "text-(--muted-foreground) hover:text-(--foreground)"
                  }`}
                >
                  <span className="meta-label">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
