import brandIcon from "../assets/brand/sea-kers-icon-color.svg";
import type { SectionId } from "../types";

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
    <footer className="px-4 py-14 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <a href="#hero-section" onClick={() => setActiveTab("all")} className="inline-flex items-center gap-3 rounded-lg font-headline text-xl font-bold">
            <span className="brand-logo-tile h-11 w-11">
              <img src={brandIcon} width="34" height="34" alt="" />
            </span>
            SEA-KERS
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-(--muted-foreground)">
            An engineering collective building open technology across AI,
            Web3, and decentralized infrastructure.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="font-headline text-base font-bold">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm text-(--muted-foreground)">
            {footerLinks.map(([label, id]) => (
              <li key={id}>
                <a href={`#${id}-section`} onClick={() => setActiveTab(id)} className="inline-flex min-h-11 items-center hover:text-(--foreground)">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-headline text-base font-bold">Protocol status</h2>
          <div className="surface-card mt-4 p-4 text-sm text-(--muted-foreground)">
            <p className="font-semibold text-(--foreground)">System active</p>
            <p className="mt-2 leading-6">Precision engineered in India for the world.</p>
            <p className="mt-3 border-t border-(--border) pt-3 text-xs">MIT open-source protocol</p>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-(--border) pt-6 text-xs text-(--muted-foreground)">
        © 2026 SEA-KERS Collective
      </p>
    </footer>
  );
}