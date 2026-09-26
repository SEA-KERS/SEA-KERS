import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import brandIcon from "../../assets/brand/sea-kers-icon-color.svg";
import type { Theme } from "../../types";

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

const navItems: readonly {
  id: string;
  label: string;
  to: string;
  hash?: string;
}[] = [
  { id: "home", label: "Home", to: "/" },
  { id: "wins", label: "Wins", to: "/wins" },
  { id: "projects", label: "Projects", to: "/projects" },
  { id: "team", label: "About Us", to: "/team" },
  { id: "contact", label: "Contact Us", to: "/", hash: "contact" },
];

type NavItem = (typeof navItems)[number];

const isActiveItem = (
  item: NavItem,
  pathname: string,
  hash: string,
): boolean => {
  if (item.id === "home") {
    return pathname === "/" && !hash;
  }
  if (item.hash) {
    return (
      pathname === item.to &&
      (hash === item.hash || hash === `#${item.hash}`)
    );
  }
  return pathname === item.to;
};

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const { pathname, hash } = useLocation();

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

  const navigate = () => {
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-5"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-neutral-300/90 dark:border-neutral-800 bg-(--background)/95 px-4 py-2.5 shadow-sm backdrop-blur-md md:px-6">
        <Link
          to="/"
          onClick={navigate}
          className="flex min-h-10 items-center gap-2.5 rounded-lg pr-2 font-headline font-bold tracking-tight text-(--foreground)"
          aria-label="Team SEA-KERS home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 p-1">
            <img src={brandIcon} width="26" height="26" alt="" className="h-6 w-6 object-contain" />
          </span>
          <span className="hidden font-mono text-xs font-bold uppercase tracking-[0.16em] sm:inline">SEA-KERS</span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="ml-auto hidden items-center gap-2 sm:flex md:gap-5"
        >
          {navItems.map((item) => {
            const isActive = isActiveItem(item, pathname, hash);
            return (
              <Link
                key={item.id}
                to={item.to}
                hash={item.hash}
                onClick={navigate}
                aria-current={isActive ? "location" : undefined}
                className={`flex min-h-10 shrink-0 items-center px-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                  isActive
                    ? "text-(--primary) underline decoration-2 underline-offset-8"
                    : "text-(--muted-foreground) hover:text-(--foreground)"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:ml-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="icon-button"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Sun aria-hidden="true" className="h-4 w-4" />
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
          className="mx-auto mt-2 max-w-6xl rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-(--background)/95 px-5 py-4 shadow-lg backdrop-blur-md sm:hidden!"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navItems.map((item, index) => {
              const isActive = isActiveItem(item, pathname, hash);
              return (
                <Link
                  key={item.id}
                  ref={index === 0 ? firstLinkRef : undefined}
                  to={item.to}
                  hash={item.hash}
                  onClick={navigate}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex min-h-11 items-center gap-3 border-b border-(--border) py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors last:border-b-0 ${
                    isActive
                      ? "text-(--primary) font-bold"
                      : "text-(--muted-foreground) hover:text-(--foreground)"
                  }`}
                >
                  <span className="meta-label text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
