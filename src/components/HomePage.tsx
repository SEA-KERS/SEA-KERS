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
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  useEffect(() => {
    const syncActiveTabWithHash = () => {
      setActiveTab(getSectionIdFromHash(window.location.hash));
    };

    syncActiveTabWithHash();
    window.addEventListener("hashchange", syncActiveTabWithHash);

    return () => {
      window.removeEventListener("hashchange", syncActiveTabWithHash);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === "light" ? "dark" : "light"));
  };

  const handleSelectSection = (sectionId: SectionId) => {
    setActiveTab(sectionId);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab("projects");
    const element = document.getElementById("projects-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-page) text-(--text-main) font-headline relative selection:bg-[#da261c] selection:text-white transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSelectSection}
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main>
        {/* 1. Landing First Page */}
        <Hero />

        {/* 2. Track Record Section (20+ Wins) */}
        <WinsSection onSelectProject={handleSelectProject} />

        {/* 3. Repositories Section (Projects) */}
        <ProjectsSection selectedProjectId={selectedProjectId} />

        {/* 4. Engineering Roster Section (Core Team & Team Members) */}
        <TeamSection />

        {/* 5. About Us Section (Our Mission) - Moved to bottom after Team */}
        <MissionSection />
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleSelectSection} />

      {/* Intake Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}
