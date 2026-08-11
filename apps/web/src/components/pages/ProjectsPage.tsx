import { useState } from "react";
import {
  Activity,
  ChevronDown,
  ExternalLink,
  Search,
} from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { usePresence } from "../../hooks/usePresence";
import { PROJECTS_DATA } from "../../data/projects";
import { GithubIcon } from "../ui/SocialIcons";
import type { Project } from "../../types";

const FILTER_GROUPS = [
  {
    label: "All",
    matches: () => true,
  },
  {
    label: "Infrastructure",
    matches: (project: Project) =>
      project.category === "DePIN Infrastructure" ||
      project.category === "Cross-Chain" ||
      project.category === "FinTech & Systems",
  },
  {
    label: "AI & Robotics",
    matches: (project: Project) =>
      project.category === "AI & Security" ||
      project.category === "ZK & Privacy" ||
      project.category === "Robotics & Edge AI",
  },
] as const;

type FilterGroup = (typeof FILTER_GROUPS)[number];

const formatIndex = (index: number) => String(index + 1).padStart(2, "0");

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<FilterGroup>(FILTER_GROUPS[0]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      activeGroup.matches(project) &&
      [project.title, project.tagline, project.description, ...project.techStack].some(
        (value) => value.toLowerCase().includes(query),
      )
    );
  });

  return (
    <div className="px-4 pb-24 pt-32 md:px-8 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="kicker">Code artifacts</p>
            <h1 className="mt-4 font-headline text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl">
              What we build
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-(--muted-foreground)">
              Systems engineered with intent — infrastructure, security, and
              robotics, documented to specification.
            </p>
          </div>
          <div className="md:col-span-4">
            <label htmlFor="project-search" className="meta-label block">
              Search projects
            </label>
            <div className="relative mt-3">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-(--muted-foreground)"
              />
              <input
                id="project-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="input-control search-control"
                placeholder="Project, stack, or spec"
              />
            </div>
          </div>
        </header>

        <div className="mt-12 flex items-center gap-4 overflow-x-auto border-b border-(--border) sm:gap-7">
          {FILTER_GROUPS.map((group) => (
            <button
              key={group.label}
              type="button"
              onClick={() => setActiveGroup(group)}
              aria-pressed={activeGroup === group}
              className={`min-h-11 shrink-0 border-b-2 pb-3 text-[0.6875rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                activeGroup === group
                  ? "border-(--primary) text-(--accent-text)"
                  : "border-transparent text-(--muted-foreground) hover:text-(--foreground)"
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>

        <p className="meta-label mt-4" aria-live="polite">
          {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "specification" : "specifications"}
        </p>

        <div className="mt-12 grid gap-6 bg-(--band) px-6 py-7 text-(--band-foreground) md:grid-cols-12 md:items-center md:px-8">
          <p className="kicker text-(--band-accent) md:col-span-3">
            Publishing soon
          </p>
          <p className="max-w-xl text-sm leading-6 text-(--band-muted) md:col-span-9 md:text-base">
            Public access and source code releases are currently undergoing
            final documentation and preparation.
          </p>
        </div>

        <div className="mt-14">
          {filteredProjects.map((project, index) => (
            <ProjectArchiveRow
              key={project.id}
              project={project}
              index={index}
              expanded={expandedId === project.id}
              onToggle={() =>
                setExpandedId((current) =>
                  current === project.id ? null : project.id,
                )
              }
            />
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="border-t border-(--border) py-20 text-center">
            <p className="font-headline text-2xl font-bold">No specs found</p>
            <p className="mt-3 text-sm text-(--muted-foreground)">
              Try a different category or search term.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface ProjectArchiveRowProps {
  project: Project;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}

function ProjectArchiveRow({
  project,
  index,
  expanded,
  onToggle,
}: ProjectArchiveRowProps) {
  const revealRef = useReveal<HTMLElement>();
  const { mounted, enter } = usePresence(expanded);

  return (
    <article
      ref={revealRef}
      className={`reveal border-t border-(--border) ${expanded ? "bg-(--card)" : ""}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`project-detail-${project.id}`}
        className="grid w-full gap-3 py-7 text-left md:grid-cols-12 md:items-center md:gap-6"
      >
        <p className="meta-label md:col-span-1">{formatIndex(index)}</p>
        <div className="md:col-span-4">
          <h2 className="font-headline text-2xl font-bold leading-tight md:text-3xl">
            {project.title}
          </h2>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-(--accent-text)">
            {project.category}
          </p>
        </div>
        <p className="max-w-md text-sm leading-6 text-(--muted-foreground) md:col-span-3">
          {project.tagline}
        </p>
        <div className="md:col-span-2">
          <span className="rounded-md bg-(--primary-soft) px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-(--primary-text)">
            {project.badge}
          </span>
          <p className="mt-2 text-sm font-semibold text-(--muted-foreground)">
            {project.stars} stars
          </p>
        </div>
        <span className="md:col-span-1 md:justify-self-end">
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 text-(--muted-foreground) transition-transform duration-300 ${
              expanded ? "rotate-180 text-(--primary)" : ""
            }`}
          />
        </span>
      </button>

      {mounted ? (
        <div
          id={`project-detail-${project.id}`}
          aria-hidden={!enter}
          className={`grid gap-8 overflow-hidden border-t border-(--border) pb-10 pt-8 md:grid-cols-12 md:gap-10 ${
            enter ? "detail-enter" : "detail-exit"
          }`}
        >
          <div className="md:col-span-5">
            <p className="kicker">
              <Activity aria-hidden="true" className="h-4 w-4" />
              Technical specification
            </p>
            <h3 className="mt-2 font-headline text-3xl font-bold leading-[1.05] tracking-[-0.02em]">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm font-bold uppercase tracking-[0.14em] text-(--accent-text)">
              {project.badge}
            </p>
            <p className="mt-5 leading-7 text-(--muted-foreground)">
              {project.description}
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="border border-(--border) p-6 md:p-8">
              <p className="meta-label">Measured</p>
              <dl className="mt-4 grid grid-cols-3 gap-6">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="flex flex-col-reverse gap-1">
                    <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-(--muted-foreground)">
                      {key}
                    </dt>
                    <dd className="font-headline text-2xl font-bold tracking-[-0.02em]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-(--border) pt-6">
                <p className="text-sm text-(--muted-foreground)">
                  {project.stars} stars / {project.forks} forks
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button-primary"
                    >
                      <GithubIcon className="h-4 w-4" />
                      Open repository
                    </a>
                  ) : (
                    <span className="meta-label">Repository link coming soon</span>
                  )}
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button-secondary"
                    >
                      View demo
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
