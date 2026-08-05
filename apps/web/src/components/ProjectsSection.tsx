import { useEffect, useState } from "react";
import { Activity, ExternalLink, X } from "lucide-react";
import { PROJECTS_DATA, WINS_DATA } from "../data/teamData";
import { useAccessibleDialog } from "../hooks/useAccessibleDialog";
import { useReveal } from "../hooks/useReveal";
import ResponsiveImage from "./ResponsiveImage";
import type { Project } from "../types";

interface ProjectsSectionProps {
  selectedProjectId: string | null;
  onClose: () => void;
}

const metricLine = (project: Project) =>
  Object.entries(project.metrics)
    .map(([key, value]) => `${value} ${key}`)
    .join("  ·  ");

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

  const featured = PROJECTS_DATA.filter((project) => project.featured);
  const indexProjects = PROJECTS_DATA.filter((project) => !project.featured);

  return (
    <section
      id="projects-section"
      aria-labelledby="projects-title"
      className="border-t border-(--border) px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker">Code artifacts</p>
            <h2
              id="projects-title"
              className="mt-4 font-headline text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl"
            >
              Our repositories
            </h2>
          </div>
          <p className="meta-label">
            {PROJECTS_DATA.length} project specifications
          </p>
        </div>

        <div className="mt-12 grid gap-6 bg-(--band) px-6 py-7 text-(--band-foreground) md:grid-cols-12 md:items-center md:px-8">
          <p className="kicker text-(--band-accent) md:col-span-3">
            Publishing soon
          </p>
          <p className="text-sm leading-6 text-(--band-muted) md:col-span-9 md:text-base">
            Public access and source code releases are currently undergoing
            final documentation and preparation.
          </p>
        </div>

        <div className="mt-20 space-y-28 md:space-y-36">
          {featured.map((project, index) => (
            <FeaturedSpread
              key={project.id}
              project={project}
              isEven={index % 2 === 0}
              onOpen={(event) => {
                rememberTrigger(event.currentTarget);
                setActiveProject(project);
              }}
            />
          ))}
        </div>

        <div className="mt-20">
          <p className="kicker">Specification index</p>
          <div className="mt-6">
            {indexProjects.map((project, index) => (
              <IndexRow
                key={project.id}
                project={project}
                index={index}
                onOpen={(event) => {
                  rememberTrigger(event.currentTarget);
                  setActiveProject(project);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {activeProject ? (
        <div
          className="dialog-backdrop"
          onMouseDown={(event) =>
            event.target === event.currentTarget && closeActiveProject()
          }
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            aria-describedby="project-dialog-description"
            tabIndex={-1}
            className="dialog-panel"
          >
            <button
              type="button"
              onClick={closeActiveProject}
              aria-label="Close project specification"
              className="icon-button absolute right-4 top-4"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            <p className="kicker pr-12">
              <Activity aria-hidden="true" className="h-4 w-4" />
              Technical specification / {activeProject.category}
            </p>
            <h2
              id="project-dialog-title"
              className="mt-3 pr-12 font-headline text-3xl font-bold md:text-4xl"
            >
              {activeProject.title}
            </h2>
            <p className="mt-2 font-semibold text-(--primary)">
              {activeProject.badge}
            </p>
            <p
              id="project-dialog-description"
              className="mt-5 leading-7 text-(--muted-foreground)"
            >
              {activeProject.description}
            </p>

            <p className="meta-label mt-6">{metricLine(activeProject)}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {activeProject.techStack.map((technology) => (
                <span key={technology} className="tag">
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-(--border) pt-6">
              <p className="text-sm text-(--muted-foreground)">
                {activeProject.stars} stars / {activeProject.forks} forks
              </p>
              {activeProject.githubUrl ? (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary"
                >
                  Open repository
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                </a>
              ) : (
                <span className="meta-label">
                  Repository link coming soon
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

interface SpreadProps {
  project: Project;
  isEven: boolean;
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function FeaturedSpread({ project, isEven, onOpen }: SpreadProps) {
  const revealRef = useReveal<HTMLElement>();

  return (
    <article
      ref={revealRef}
      className="reveal grid gap-10 lg:grid-cols-12 lg:items-center"
    >
      <div className={`lg:col-span-8 ${isEven ? "" : "lg:order-2"}`}>
        <div className="relative">
          <div
            aria-hidden="true"
            className={`absolute h-20 w-20 md:h-28 md:w-28 ${
              isEven
                ? "-right-4 -top-4 bg-(--primary) md:-right-6 md:-top-6"
                : "-bottom-4 -left-4 bg-(--accent) md:-bottom-6 md:-left-6"
            }`}
          />
          <ResponsiveImage
            src={projectBadgeImage(project)}
            sizes="(min-width: 1024px) 60vw, 100vw"
            width="960"
            height="540"
            loading="lazy"
            decoding="async"
            alt=""
            className="relative aspect-[16/9] w-full object-cover"
          />
        </div>
      </div>
      <div className={`lg:col-span-4 ${isEven ? "" : "lg:order-1"}`}>
        <p className="kicker">{project.badge}</p>
        <h3 className="mt-3 font-headline text-3xl font-bold leading-tight md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 leading-7 text-(--muted-foreground)">
          {project.tagline}
        </p>
        <p className="meta-label mt-5">{metricLine(project)}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((technology) => (
            <span key={technology} className="tag">
              {technology}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="button-secondary mt-8"
          aria-label={`Open specification for ${project.title}`}
        >
          Open specification
        </button>
      </div>
    </article>
  );
}

interface IndexRowProps {
  project: Project;
  index: number;
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function IndexRow({ project, index, onOpen }: IndexRowProps) {
  return (
    <article className="grid gap-4 border-t border-(--border) py-8 md:grid-cols-12 md:items-center">
      <p className="meta-label md:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="md:col-span-5">
        <h4 className="font-headline text-2xl font-bold">{project.title}</h4>
        <p className="mt-2 text-sm leading-6 text-(--muted-foreground)">
          {project.tagline}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 md:col-span-3">
        {project.techStack.slice(0, 3).map((technology) => (
          <span key={technology} className="tag">
            {technology}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
        <span className="meta-label hidden md:inline">{project.badge}</span>
        <button
          type="button"
          onClick={onOpen}
          className="index-link"
          aria-label={`Open specification for ${project.title}`}
        >
          Spec
        </button>
      </div>
    </article>
  );
}

const projectBadgeImage = (project: Project) =>
  WINS_DATA.find((win) => win.projectRef === project.id)?.images[0] ??
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=960&q=80";
