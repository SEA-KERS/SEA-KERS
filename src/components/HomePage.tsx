import { useEffect, useState } from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import JoinModal from "./JoinModal";
import MissionSection from "./MissionSection";
import Navbar from "./Navbar";
import ProjectsSection from "./ProjectsSection";
import TeamSection from "./TeamSection";
import WinsSection from "./WinsSection";
import type { SectionId, Theme } from "../types";

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
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-(--background) text-(--foreground)">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main id="main-content" tabIndex={-1}>
        <Hero theme={theme} />
        <WinsSection onSelectProject={handleSelectProject} />
        <ProjectsSection selectedProjectId={selectedProjectId} />
        <TeamSection />
        <MissionSection />
      </main>
      <Footer setActiveTab={setActiveTab} />
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}