import { lazy, Suspense } from "react";
import Hero from "../hero/Hero";
import StatsBand from "../sections/StatsBand";

const NewsroomSection = lazy(() => import("../sections/NewsroomSection"));
const TeamSection = lazy(() => import("../sections/TeamSection"));
const ContactSection = lazy(() => import("../sections/ContactSection"));

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
      <Suspense fallback={<div id="newsroom" className="min-h-16" aria-hidden="true" />}>
        <NewsroomSection />
      </Suspense>
      <Suspense fallback={<div id="team" className="min-h-16" aria-hidden="true" />}>
        <TeamSection />
      </Suspense>
      <Suspense fallback={<div id="contact" className="min-h-16" aria-hidden="true" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
