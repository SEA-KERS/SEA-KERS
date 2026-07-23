import { useEffect, useState } from 'react';
import { Code2, GitFork, Star, ExternalLink, Activity, Terminal } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { PROJECTS_DATA } from '../data/teamData';
import type { Project } from '../types'

interface ProjectsSectionProps {
  selectedProjectId: string | null
}

export default function ProjectsSection({
  selectedProjectId,
}: ProjectsSectionProps) {
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(
    () =>
      selectedProjectId
        ? (PROJECTS_DATA.find((project) => project.id === selectedProjectId) ?? null)
        : null,
  )

  useEffect(() => {
    if (!selectedProjectId) return

    setActiveProjectModal(
      PROJECTS_DATA.find((project) => project.id === selectedProjectId) ?? null,
    )
  }, [selectedProjectId])

  return (
    <section id="projects-section" className="py-16 px-4 md:px-8 bg-[var(--bg-surface-subtle)] border-b-2 border-[var(--border-main)]">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-[var(--border-main)] pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#001dc2] font-bold uppercase tracking-widest mb-2 border-2 border-[var(--border-main)] px-3 py-1 bg-[var(--bg-surface)]">
              <Code2 className="w-4 h-4 text-[#da261c]" />
              <span>CODE ARTIFACTS</span>
            </div>
            <h2 className="font-headline font-black text-3xl md:text-5xl uppercase text-[var(--text-main)] tracking-tight">
              Our Repositories
            </h2>
            <p className="font-headline text-[var(--text-muted)] text-base md:text-lg max-w-2xl mt-2 font-normal leading-relaxed">
              Complete proofs of concept, engineered from scratch within brutal time constraints. Every Product here was ideated, built, validated and shipped in hours.
            </p>
          </div>

          <div className="font-mono text-xs text-[var(--text-muted)] font-bold uppercase border-2 border-[var(--border-main)] px-3 py-1.5 bg-[var(--bg-surface)]">
            6 ACTIVE REPOSITORIES
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="bg-[var(--bg-surface)] border-2 border-[var(--border-main)] hover:border-[#da261c] p-6 transition-all duration-200 group flex flex-col justify-between shadow-[4px_4px_0px_rgba(0,0,0,0.15)]"
            >
              <div>
                {/* Header Badge & Category */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs text-[#001dc2] font-bold uppercase">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] bg-[#da261c] text-white px-2 py-0.5 font-black uppercase border border-black shadow-[1px_1px_0px_rgba(0,0,0,0.8)]">
                    {project.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline font-black text-xl text-[var(--text-main)] group-hover:text-[#da261c] transition-colors uppercase leading-tight mb-2">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="font-headline text-xs text-[var(--text-muted)] font-normal leading-relaxed mb-4">
                  {project.tagline}
                </p>

                {/* Metrics Box */}
                {project.metrics && (
                  <div className="bg-[var(--bg-surface-subtle)] p-3 border border-[var(--border-main)] font-mono text-[11px] mb-4 grid grid-cols-3 gap-1 text-center">
                    {Object.entries(project.metrics).map(([key, val]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[var(--text-main)] font-black">{val}</span>
                        <span className="text-[9px] text-[var(--text-muted)] uppercase">{key}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 mb-6">
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

              {/* GitHub Stats & Actions */}
              <div className="pt-4 border-t-2 border-[var(--border-main)] flex items-center justify-between font-mono text-xs mt-auto">
                <div className="flex items-center gap-3 text-[var(--text-muted)] font-bold">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{project.stars}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{project.forks}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-[var(--text-muted)] hover:text-[#da261c] transition-colors"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="bg-[#da261c] hover:bg-[#b50004] text-white px-3 py-1 font-mono text-xs font-bold uppercase border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] active:translate-y-0.5 transition-all flex items-center gap-1"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>SPEC</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Spec Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[var(--bg-surface)] border-2 border-black max-w-xl w-full p-6 md:p-8 relative shadow-[8px_8px_0px_rgba(0,0,0,0.9)]">
            <button
              onClick={() => setActiveProjectModal(null)}
              aria-label="Close project specification"
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-main)] font-mono text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 font-mono text-xs text-[#001dc2] font-bold uppercase mb-2">
              <Activity className="w-3.5 h-3.5 text-[#da261c]" />
              <span>TECHNICAL SPECIFICATION // {activeProjectModal.category}</span>
            </div>

            <h3 className="font-headline font-black text-2xl text-[var(--text-main)] uppercase mb-2">
              {activeProjectModal.title}
            </h3>

            <p className="font-headline text-sm text-[var(--text-muted)] leading-relaxed mb-6 bg-[var(--bg-surface-subtle)] p-4 border-2 border-[var(--border-main)] font-normal">
              {activeProjectModal.description}
            </p>

            <div className="mb-6">
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase block mb-2 font-bold">
                BENCHMARK METRICS:
              </span>
              <div className="grid grid-cols-3 gap-2 bg-[var(--bg-surface-subtle)] p-4 border-2 border-[var(--border-main)] font-mono text-xs text-center">
                {Object.entries(activeProjectModal.metrics || {}).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-[#da261c] font-black text-sm block">{val}</span>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold">{key}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t-2 border-[var(--border-main)]">
              <div className="flex items-center gap-3 font-mono text-xs font-bold text-[var(--text-muted)]">
                <span>⭐ {activeProjectModal.stars} STARS</span>
                <span>🍴 {activeProjectModal.forks} FORKS</span>
              </div>

              <a
                href={activeProjectModal.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#da261c] hover:bg-[#b50004] text-white px-4 py-2 font-mono text-xs font-bold uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] flex items-center gap-1.5"
              >
                <span>OPEN REPOSITORY</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
