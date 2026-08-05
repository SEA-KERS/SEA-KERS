import brandIcon from "../../assets/brand/sea-kers-icon-color.svg";
import type { SectionId } from "../../types";

interface FooterProps {
  setActiveTab: (sectionId: SectionId) => void;
}

const footerLinks = [
  ["Mission", "about"],
  ["Wins", "wins"],
  ["Team", "team"],
] as const;

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-(--band) px-4 pb-12 pt-2 text-(--band-foreground) md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-t border-(--band-border) pt-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <a
              href="#hero-section"
              onClick={() => setActiveTab("all")}
              className="inline-flex min-h-11 items-center gap-2.5 rounded-lg font-headline text-xl font-bold"
            >
              <span className="brand-logo-tile h-10 w-10">
                <img src={brandIcon} width="32" height="32" alt="" />
              </span>
              SEA-KERS
            </a>
            <p className="mt-5 max-w-sm text-sm leading-6 text-(--band-muted)">
              An engineering collective pursuing open technology across AI,
              Web3, and decentralized infrastructure.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-3">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-(--band-muted)">
              Explore
            </h2>
            <ul className="mt-4 space-y-1 text-sm">
              {footerLinks.map(([label, id]) => (
                <li key={id}>
                  <a
                    href={`#${id}-section`}
                    onClick={() => setActiveTab(id)}
                    className="inline-flex min-h-11 items-center text-(--band-muted) transition-colors hover:text-(--band-foreground)"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-(--band-muted)">
              Colophon
            </h2>
            <p className="mt-4 text-sm leading-6 text-(--band-muted)">
              Precision engineered in India for the world.
            </p>
          </div>
        </div>
        <p className="mt-14 border-t border-(--band-border) pt-6 text-xs text-(--band-muted)">
          © 2026 SEA-KERS Collective
        </p>
      </div>
    </footer>
  );
}
