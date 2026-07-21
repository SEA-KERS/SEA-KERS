import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WinsSection from './components/WinsSection';
import ProjectsSection from './components/ProjectsSection';
import TeamSection from './components/TeamSection';
import JoinModal from './components/JoinModal';
import Footer from './components/Footer';

export default function App() {
  // Light Mode is the DEFAULT STARTING POINT per user request
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSelectSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    setActiveTab('projects');
    const element = document.getElementById('projects-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] font-headline relative selection:bg-[#da261c] selection:text-white transition-colors duration-200">
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
        <Hero
          onSelectSection={handleSelectSection}
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
        />

        <div id="wins-section">
          <WinsSection onSelectProject={handleSelectProject} />
        </div>

        <div id="projects-section">
          <ProjectsSection selectedProjectId={selectedProjectId} />
        </div>

        <div id="team-section">
          <TeamSection />
        </div>
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
