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
import { lazy, Suspense } from "react";
import Hero from "../hero/Hero";
import StatsBand from "../sections/StatsBand";

const WinsSection = lazy(() => import("../sections/WinsSection"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const TeamSection = lazy(() => import("../sections/TeamSection"));
const MissionSection = lazy(() => import("../sections/MissionSection"));

export default function HomePage() {
  const handleOpenRecord = () => {
    document.getElementById("wins")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <>
      <Hero onOpenRecord={handleOpenRecord} />
      <StatsBand />
      <Suspense fallback={<div id="wins" className="min-h-16" aria-hidden="true" />}>
        <WinsSection />
      </Suspense>
      <Suspense fallback={<div id="projects" className="min-h-16" aria-hidden="true" />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<div id="team" className="min-h-16" aria-hidden="true" />}>
        <TeamSection />
      </Suspense>
      <Suspense fallback={<div id="about" className="min-h-16" aria-hidden="true" />}>
        <MissionSection />
      </Suspense>
    </>
  );
}
