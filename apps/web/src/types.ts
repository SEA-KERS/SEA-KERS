export type Theme = "light" | "dark";

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

export interface TeamMember {
  id: string;
  name: string;
  linkedin?: string;
  avatar: string;
}