import type { TeamMember } from "../types";

// CORE TEAM (6 Members)
export const CORE_TEAM_DATA: readonly TeamMember[] = [
  {
    id: "kashvi-v",
    name: "Kashvi V",
    linkedin: "https://www.linkedin.com/in/kashvi-v-8a740b260/",
    avatar: "/images/team/kashvi-v.jpg",
  },
  {
    id: "spoorthi-r",
    name: "Spoorthi R",
    linkedin: "https://www.linkedin.com/in/spoorthi-r-c/",
    avatar: "/images/team/spoorthi-r.jpg",
  },
  {
    id: "anusha-rao",
    name: "Anusha Rao",
    linkedin: "https://www.linkedin.com/in/anusha-rao-m-3ab3711b3/",
    avatar: "/images/team/anusha-rao.jpg",
  },
  {
    id: "fardeen-s-khadri",
    name: "Fardeen S Khadri",
    linkedin: "https://www.linkedin.com/in/fardeenkhadri/",
    avatar: "/images/team/fardeen-s-khadri.jpg",
  },
  {
    id: "pramoda-s-r",
    name: "Pramoda S R",
    linkedin: "https://www.linkedin.com/in/pramoda-s-r-1957382b0/",
    avatar: "/images/team/pramoda-s-r.jpg",
  },
  {
    id: "manoj-gowda-r",
    name: "Manoj Gowda R",
    linkedin: "https://www.linkedin.com/in/ogmanoj/",
    avatar: "/images/team/manoj-gowda-r.jpg",
  },
];

export const TEAM_MEMBERS_DATA: readonly TeamMember[] = [
  {
    id: "reddy",
    name: "Sharan Reddy",
    linkedin: "https://www.linkedin.com/in/sharan-reddy-0719b5246/",
    avatar: "/images/team/reddy.jpg",
  },
  {
    id: "sujan",
    name: "Sujan P",
    linkedin: "https://www.linkedin.com/in/sujan-p-443745244/",
    avatar: "/images/team/sujan.jpg",
  },
  {
    id: "afnaan",
    name: "Afnaan Ayub",
    linkedin: "https://www.linkedin.com/in/afnaan-ayub/",
    avatar: "/images/team/afnaan.jpg",
  },
  {
    id: "swathi",
    name: "Swathi",
    linkedin: "https://www.linkedin.com/in/s-n-swathi-bb35172a9/",
    avatar: "/images/team/swathi.jpg",
  },
  {
    id: "manasa-r",
    name: "Manasa G",
    linkedin: "https://www.linkedin.com/in/manasa-g-61ab57315/",
    avatar: "/images/team/manasa-r.jpg",
  },
  {
    id: "priya",
    name: "Shree Priya V",
    linkedin: "https://www.linkedin.com/in/shree-priya-v/",
    avatar: "/images/team/priya.jpg",
  },
];

export const TEAM_DATA: readonly TeamMember[] = [
  ...CORE_TEAM_DATA,
  ...TEAM_MEMBERS_DATA,
];
