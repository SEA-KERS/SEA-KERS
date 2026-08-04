import { useEffect, useState } from "react";
import { Activity, Code2, ExternalLink, GitFork, Star, Terminal, X } from "lucide-react";
import { PROJECTS_DATA } from "../data/teamData";
import { useAccessibleDialog } from "../hooks/useAccessibleDialog";
import type { Project } from "../types";

interface ProjectsSectionProps {
  selectedProjectId: string | null;
  onClose: () => void;
}

export default function ProjectsSection({
  selectedProjectId,
  onClose,
}: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const closeActiveProject = () => {
    setActiveProject(null);
    onClose();
  };
  const { dialogRef, rememberTrigger } = useAccessibleDialog(
    activeProject !== null,
    closeActiveProject,
  );

  useEffect(() => {
    if (!selectedProjectId) return;
    setActiveProject(
      PROJECTS_DATA.find((project) => project.id === selectedProjectId) ?? null,
    );
  }, [selectedProjectId]);

  return (
    <section
      id="projects-section"
      aria-labelledby="projects-title"
      className="border-b border-(--border) bg-(--muted) px-4 py-20 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">
              <Code2 aria-hidden="true" className="h-4 w-4" />
              Code artifacts
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h2 id="projects-title" className="font-headline text-4xl font-bold md:text-5xl">
                Our repositories
              </h2>
              <span className="rounded-full bg-red-500/15 border border-red-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                Publishing Soon
              </span>
            </div>
            <p className="mt-4 max-w-3xl leading-7 text-(--muted-foreground)">
              Focused proofs of concept, designed, validated, and shipped within
              demanding time constraints.
            </p>
          </div>
          <p className="text-sm font-semibold text-(--muted-foreground)">
            {PROJECTS_DATA.length} project specifications
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-600 dark:text-red-400">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
          </span>
          <p className="text-sm font-semibold">
            Repositories coming soon! Public access and source code releases are currently undergoing final documentation and preparation.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS_DATA.map((project) => (
            <article key={project.id} className="surface-card flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wider text-(--primary-text)">
                  {project.category}
                </p>
                <span className="rounded-full bg-(--accent-soft) px-2.5 py-1 text-xs font-bold text-(--accent-text)">
                  {project.badge}
                </span>
              </div>
              <h3 className="mt-4 font-headline text-2xl font-bold">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-(--muted-foreground)">
                {project.tagline}
              </p>

              <dl className="mt-5 grid grid-cols-3 gap-2 rounded-lg bg-(--muted) p-3 text-center">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-[0.65rem] uppercase text-(--muted-foreground)">{key}</dt>
                    <dd className="mt-1 font-headline font-bold">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.techStack.map((technology) => (
                  <span key={technology} className="tag">{technology}</span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-(--border) pt-5">
                <div className="flex gap-4 text-sm text-(--muted-foreground)" aria-label="Project popularity">
                  <span className="inline-flex items-center gap-1">
                    <Star aria-hidden="true" className="h-4 w-4" /> {project.stars}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork aria-hidden="true" className="h-4 w-4" /> {project.forks}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    rememberTrigger(event.currentTarget);
                    setActiveProject(project);
                  }}
                  className="button-secondary"
                  aria-label={`Open specification for ${project.title}`}
                >
                  <Terminal aria-hidden="true" className="h-4 w-4" />
                  Spec
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject ? (
        <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeActiveProject()}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            aria-describedby="project-dialog-description"
            tabIndex={-1}
            className="dialog-panel"
          >
            <button type="button" onClick={closeActiveProject} aria-label="Close project specification" className="icon-button absolute right-4 top-4">
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            <p className="section-kicker pr-12">
              <Activity aria-hidden="true" className="h-4 w-4" />
              Technical specification / {activeProject.category}
            </p>
            <h2 id="project-dialog-title" className="mt-3 pr-12 font-headline text-3xl font-bold">
              {activeProject.title}
            </h2>
            <p id="project-dialog-description" className="mt-4 leading-7 text-(--muted-foreground)">
              {activeProject.description}
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-3 rounded-lg bg-(--muted) p-4 text-center">
              {Object.entries(activeProject.metrics).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-xs uppercase text-(--muted-foreground)">{key}</dt>
                  <dd className="mt-1 font-headline text-lg font-bold text-(--primary-text)">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              {activeProject.techStack.map((technology) => (
                <span key={technology} className="tag">{technology}</span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-(--border) pt-5">
              <p className="text-sm text-(--muted-foreground)">
                {activeProject.stars} stars / {activeProject.forks} forks
              </p>
              {activeProject.githubUrl ? (
                <a href={activeProject.githubUrl} target="_blank" rel="noreferrer" className="button-primary">
                  Open repository
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                </a>
              ) : (
                <span className="text-sm font-semibold text-(--muted-foreground)">Repository link coming soon</span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}