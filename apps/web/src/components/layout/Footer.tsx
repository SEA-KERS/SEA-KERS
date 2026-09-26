import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../ui/SocialIcons";

interface NavLink {
  label: string;
  to: string;
  hash?: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Wins", to: "/wins" },
  { label: "Showcase", to: "/projects" },
  { label: "About Us", to: "/team" },
  { label: "Contact Us", to: "/", hash: "contact" },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0a0d17] text-neutral-400 border-t border-neutral-800/80">
      <div className="mx-auto max-w-7xl px-6 pt-16 md:px-12 md:pt-20">
        {/* Top Info Bar */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
          {/* Left: Copyright */}
          <div className="shrink-0">
            <p className="text-sm font-medium text-neutral-400">
              © {new Date().getFullYear()} SEA-KERS Inc
            </p>
          </div>

          {/* Right Group: Navigation, Legal, Socials */}
          <div className="flex flex-wrap items-start gap-8 sm:gap-12 lg:gap-16">
            {/* Horizontal Nav Links */}
            <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-5 sm:gap-8 pt-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  hash={link.hash}
                  className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Legal Links */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-white">Legal</span>
              <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-neutral-400">
                <a
                  href="#privacy"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#terms"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-neutral-400 pt-0.5">
              <a
                href="https://www.linkedin.com/company/team-sea-kers/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter"
                className="hover:text-white transition-colors"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-white transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:ogmanoja@gmail.com"
                aria-label="Email SEA-KERS"
                className="hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Giant Watermark: SEA-KERS in ALL CAPITAL on ONE SINGLE LINE with TOP-TO-BOTTOM FADE */}
        <div className="mt-14 sm:mt-20 flex justify-center items-end select-none pointer-events-none overflow-hidden w-full">
          <p
            aria-hidden="true"
            className="font-headline font-black tracking-tight uppercase text-center leading-[0.85] text-[13.5vw] whitespace-nowrap bg-gradient-to-b from-white/20 via-white/8 to-transparent bg-clip-text text-transparent [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)] translate-y-[6%]"
          >
            SEA-KERS
          </p>
        </div>
      </div>
    </footer>
  );
}
