export type Theme = "light" | "dark";

export type SectionId = "all" | "wins" | "projects" | "team" | "about";

export interface WinRecord {
  id: string;
  title: string;
  prize?: string;
  hackathon: string;
  location: string;
  track: string;
  award: string;
  date: string;
  projectRef: string;
  tagline: string;
  techStack: readonly string[];
  description: string;
  images: readonly string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  techStack: readonly string[];
  stars: number;
  forks: number;
  githubUrl?: string;
  demoUrl?: string;
  badge: string;
  featured: boolean;
  metrics: Readonly<Record<string, string>>;
}

export interface TeamMember {
  id: string;
  name: string;
  linkedin?: string;
  avatar: string;
}