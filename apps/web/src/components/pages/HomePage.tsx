/*
 * SEA-KERS home — Magazine cover split.
 * THESIS: A world-stage engineering collective on a magazine cover, not a
 *   product dashboard: white ground, hairline rules, one crimson accent,
 *   oversized Archivo headlines, the particle caret mark as the
 *   centerpiece. Refuses the SaaS hero-metric template and card grids.
 * OWN-WORLD: White page; thin #EAEAEA hairline rules; Archivo display
 *   to 96px; uppercase labels at 0.16em tracking; deep crimson #DA261C as
 *   the only saturated accent; cinematic navy #030624 for the particle tile
 *   and closing dark chapters; editorial floats, image bleeds, asymmetry.
 * STORY: The visitor reads the team like a cover story — who they are,
 *   what they won, what they build, who builds it (a magazine roster:
 *   parallelogram cutout columns, vertical white names, alternating
 *   up/down stagger on a muted band), why it matters — then acts by
 *   opening records and specifications.
 * FIRST VIEWPORT: White canvas. Left: two-line oversized headline, a plain
 *   subline, and a single record CTA. Right: navy particle tile floating
 *   over an offset crimson block and a small accent-blue square. Meta row
 *   beneath: collective label, disciplines, open-technology tagline. No
 *   stats, no kicker above the heading.
 * FORM: Magazine cover split — user's second of three proposed hero
 *   concepts; direction pinned by the owner's design reference (DESIGN.md).
 * FINISH: unreviewed and undocumented is unfinished; this build ends with
 *   the finish review, the verdict, and DESIGN.md.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import Footer from "../layout/Footer";
import Hero from "../hero/Hero";
import Navbar from "../layout/Navbar";
import StatsBand from "../sections/StatsBand";
import type { SectionId, Theme } from "../../types";

const WinsSection = lazy(() => import("../sections/WinsSection"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const TeamSection = lazy(() => import("../sections/TeamSection"));
const MissionSection = lazy(() => import("../sections/MissionSection"));

const getSectionIdFromHash = (hash: string): SectionId => {
  switch (hash) {
    case "#wins-section":
      return "wins";
    case "#projects-section":
      return "projects";
    case "#team-section":
      return "team";
    case "#about-section":
      return "about";
    default:
      return "all";
  }
};

export default function HomePage() {
  const [theme, setTheme] = useState<Theme>("light");
  const [activeTab, setActiveTab] = useState<SectionId>("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const syncActiveTabWithHash = () => {
      setActiveTab(getSectionIdFromHash(window.location.hash));
    };

    syncActiveTabWithHash();
    window.addEventListener("hashchange", syncActiveTabWithHash);
    return () => window.removeEventListener("hashchange", syncActiveTabWithHash);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = window.localStorage.getItem("sea-kers-theme");
    setTheme(
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : media.matches
          ? "dark"
          : "light",
    );

    const syncSystemTheme = (event: MediaQueryListEvent) => {
      if (!window.localStorage.getItem("sea-kers-theme")) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", syncSystemTheme);
    return () => media.removeEventListener("change", syncSystemTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      window.localStorage.setItem("sea-kers-theme", nextTheme);
      return nextTheme;
    });
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab("projects");
    document.getElementById("projects-section")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const handleOpenRecord = () => {
    setActiveTab("wins");
    document.getElementById("wins-section")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-(--background) text-(--foreground)">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main id="main-content" tabIndex={-1}>
        <Hero theme={theme} onOpenRecord={handleOpenRecord} />
        <StatsBand />
        <Suspense fallback={<div className="min-h-16" aria-hidden="true" />}>
          <WinsSection onSelectProject={handleSelectProject} />
        </Suspense>
        <Suspense fallback={<div className="min-h-16" aria-hidden="true" />}>
          <ProjectsSection
            selectedProjectId={selectedProjectId}
            onClose={() => setSelectedProjectId(null)}
          />
        </Suspense>
        <Suspense fallback={<div className="min-h-16" aria-hidden="true" />}>
          <TeamSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-16" aria-hidden="true" />}>
          <MissionSection />
        </Suspense>
      </main>
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
