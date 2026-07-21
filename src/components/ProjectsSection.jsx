import React, { useState } from 'react';
import { Code2, GitFork, Star, ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { PROJECTS_DATA } from '../data/teamData';

export default function ProjectsSection({ selectedProjectId }) {
  const [activeProjectModal, setActiveProjectModal] = useState(
    selectedProjectId ? PROJECTS_DATA.find((p) => p.id === selectedProjectId) : null
  );

  return (
    <section id="projects-section" className="py-16 px-4 md:px-8 bg-[var(--bg-page)] border-b-2 border-[var(--border-main)] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 border-b-2 border-[var(--border-main)] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#da261c] font-bold uppercase tracking-widest mb-2">
              <Code2 className="w-4 h-4 text-[#da261c]" />
              <span>PROJECT REPOSITORY</span>
            </div>
            <h2 className="font-headline font-black text-3xl md:text-5xl uppercase text-[var(--text-main)] tracking-tight">
              Our Projects
            </h2>
            <p className="font-headline text-[var(--text-muted)] text-base md:text-lg max-w-2xl mt-2 font-normal">
              High-throughput protocols, AI security frameworks, and zero-knowledge identity shields shipped during competitive hackathon sprints.
            </p>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-[#001dc2] hover:underline flex items-center gap-2 font-bold uppercase"
          >
            <span>VIEW ALL REPOS ON GITHUB</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="bg-[var(--bg-surface)] border-2 border-[var(--border-main)] hover:border-[#da261c] transition-all duration-200 flex flex-col justify-between group relative shadow-[4px_4px_0px_rgba(0,0,0,0.15)]"
            >
              {/* Badge Header */}
              <div className="bg-[var(--bg-surface-subtle)] border-b-2 border-[var(--border-main)] p-4 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#da261c] font-bold border border-[#da261c] px-2 py-0.5 uppercase bg-[var(--bg-surface)]">
                  {project.badge}
                </span>
                <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-muted)] font-bold">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500" />
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-[#001dc2]" />
                    {project.forks}
                  </span>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6">
                <h3 className="font-headline font-black text-xl text-[var(--text-main)] group-hover:text-[#da261c] transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="font-mono text-xs text-[#001dc2] mb-4 font-bold">
                  {project.tagline}
                </p>

                <p className="font-headline text-sm text-[var(--text-muted)] font-normal leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 bg-[var(--bg-surface-subtle)] p-3 border-2 border-[var(--border-main)] mb-6 font-mono text-center">
                  {Object.entries(project.metrics).map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold">{key}</span>
                      <span className="text-xs text-[var(--text-main)] font-black">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] bg-[var(--bg-surface-high)] text-[var(--text-main)] border border-[var(--border-main)] px-2 py-0.5 font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-[var(--bg-surface-subtle)] border-t-2 border-[var(--border-main)] p-4 flex items-center justify-between">
                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="font-mono text-xs font-bold text-[#da261c] hover:underline uppercase flex items-center gap-1"
                >
                  <span>TECHNICAL SPECS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-[var(--text-muted)] hover:text-[#001dc2] flex items-center gap-1.5 uppercase font-bold"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>FORK REPO</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Specs Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[var(--bg-surface)] border-2 border-black max-w-2xl w-full p-6 md:p-8 relative shadow-[8px_8px_0px_rgba(0,0,0,0.9)]">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-main)] font-mono text-lg font-bold"
            >
              ✕
            </button>

            <div className="font-mono text-xs text-[#da261c] font-bold uppercase mb-2">
              PROJECT REPOSITORY // {activeProjectModal.category}
            </div>

            <h3 className="font-headline font-black text-3xl text-[var(--text-main)] mb-2">
              {activeProjectModal.title}
            </h3>

            <p className="font-mono text-sm text-[#001dc2] mb-4 font-bold">
              {activeProjectModal.tagline}
            </p>

            <p className="font-headline text-base text-[var(--text-muted)] mb-6 font-normal leading-relaxed">
              {activeProjectModal.description}
            </p>

            {/* Metrics */}
            <div className="bg-[var(--bg-surface-subtle)] p-4 border-2 border-[var(--border-main)] mb-6">
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase block mb-3 font-bold">
                BENCHMARK METRICS & PERFORMANCE TELEMETRY:
              </span>
              <div className="grid grid-cols-3 gap-4 font-mono text-center">
                {Object.entries(activeProjectModal.metrics).map(([key, val]) => (
                  <div key={key} className="bg-[var(--bg-surface)] p-3 border border-[var(--border-main)]">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase block font-bold">{key}</span>
                    <span className="text-sm text-[#da261c] font-black">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase block mb-2 font-bold">
                COMPONENTS & DEPENDENCIES:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProjectModal.techStack.map((tech) => (
                  <span key={tech} className="font-mono text-xs bg-[var(--bg-surface-high)] text-[var(--text-main)] border border-[var(--border-main)] px-3 py-1 font-bold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={activeProjectModal.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#da261c] hover:bg-[#b50004] text-white py-3 font-mono text-xs font-bold uppercase text-center border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] flex items-center justify-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB REPOSITORY</span>
              </a>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="bg-[var(--bg-surface-high)] text-[var(--text-main)] px-6 py-3 font-mono text-xs font-bold uppercase border-2 border-[var(--border-main)]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
