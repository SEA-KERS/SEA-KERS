import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { PROJECTS_DATA } from "../../data/projects";
import type { Project } from "../../types";

const FEATURED_PROJECTS = PROJECTS_DATA.filter((project) => project.featured);

const metricLine = (project: Project) =>
  Object.entries(project.metrics)
    .map(([key, value]) => `${value} ${key}`)
    .join("  ·  ");

const formatIndex = (index: number) => String(index).padStart(2, "0");

export default function ProjectsSection() {
  return (
    <section
      id="projects"
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
              What we build
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-(--muted-foreground)">
              Systems engineered with intent — from edge compute to
              zero-knowledge protocols, three flagship builds open now.
            </p>
          </div>
          <Link
            to="/projects"
            className="index-link"
            aria-label={`View all ${PROJECTS_DATA.length} project specifications`}
          >
            View all {PROJECTS_DATA.length} specifications
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectIndexRow
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectIndexRowProps {
  project: Project;
  index: number;
}

function ProjectIndexRow({ project, index }: ProjectIndexRowProps) {
  const { ref: revealRef, isVisible } = useReveal<HTMLAnchorElement>();

  return (
    <Link
      to="/projects"
      ref={revealRef}
      aria-label={`${project.title}: ${project.tagline}. View the specification.`}
      className={`reveal group grid gap-4 border-t border-(--border) py-9 md:grid-cols-12 md:items-center md:gap-6 ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <p className="font-headline text-3xl font-black tracking-[-0.02em] text-(--muted-foreground) md:col-span-1">
        {formatIndex(index + 1)}
      </p>
      <div className="md:col-span-5">
        <h3 className="font-headline text-3xl font-bold leading-tight md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-(--muted-foreground) md:max-w-md">
          {project.tagline}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 md:col-span-3">
        {project.techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>
      <div className="md:col-span-2">
        <span className="rounded-md bg-(--primary-soft) px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-(--primary-text)">
          {project.badge}
        </span>
        <p className="mt-3 text-sm font-semibold text-(--muted-foreground)">
          {metricLine(project)}
        </p>
      </div>
      <div className="flex justify-end md:col-span-1">
        <span className="index-link border-b-2 border-transparent transition-colors group-hover:border-(--primary) group-hover:text-(--primary)">
          Spec
        </span>
      </div>
    </Link>
  );
}
