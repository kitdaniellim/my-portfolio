import { Github, Linkedin, type LucideIcon } from "lucide-react";
import profileImage from "../img/personal-image.jpg";

/** A single word in the hero headline; `accent` words get the gradient treatment. */
export interface HeadlineWord {
  text: string;
  accent?: boolean;
}

/** The four page sections — one source of truth for ids shared by nav + sections. */
export const SECTIONS = {
  home: "home",
  about: "about",
  projects: "projects",
  contact: "contact",
} as const;

export type SectionId = (typeof SECTIONS)[keyof typeof SECTIONS];

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

/**
 * A stat is either an animated count-up (`count`, optional `suffix`) or a
 * static `display` string — never both. The discriminated union makes the
 * invalid "neither / both" states unrepresentable.
 */
export type Stat =
  | { label: string; count: number; suffix?: string }
  | { label: string; display: string };

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string;
  image: string;
  github: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const profile = {
  name: "Kit Daniel Lim",
  initials: "KDL",
  role: "Full-stack Developer",
  location: "Cebu City",
  greeting: "Hello, I'm Kit Daniel Lim",
  headline: [
    { text: "Crafting" },
    { text: "Digital", accent: true },
    { text: "Experiences", accent: true },
    { text: "that" },
    { text: "matter." },
  ] satisfies HeadlineWord[],
  intro:
    "Based in Cebu City. I build high-end web applications with a focus on performance, aesthetics, and user experience.",
  photo: profileImage,
} as const;

export const navItems: NavItem[] = [
  { id: SECTIONS.home, label: "Home" },
  { id: SECTIONS.about, label: "About" },
  { id: SECTIONS.projects, label: "Projects" },
  { id: SECTIONS.contact, label: "Contact" },
];

export const about = {
  headingLead: "From Cebu City, Philippines.",
  headingTrail: "At home everywhere.",
  paragraphs: [
    "For me, coding is more than just writing lines—it's about crafting solutions. I'm eager to connect with projects of all sizes, particularly those that spark creativity and demand a fresh approach or leverage the latest tech.",
    "With over five years of software development experience, I'm highly proficient in the technical aspects of frontend and backend web development. I thrive under pressure, consistently exceeding expectations to achieve both personal and company goals.",
  ],
  stats: [
    { count: 5, suffix: "+", label: "Years of experience" },
    { count: 4, label: "Featured projects" },
    { display: "Full·stack", label: "Frontend & backend" },
  ] satisfies Stat[],
  skills: [
    {
      title: "Frontend",
      items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion / GSAP"],
    },
    {
      title: "Backend",
      items: ["Node.js", "Python", "PostgreSQL", "Firebase"],
    },
  ] satisfies SkillGroup[],
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Alab",
    subtitle: "Game Development",
    description:
      "An immersive game development project built with Unity — a world crafted with C# and pure imagination.",
    tech: "C#, Unity Engine",
    image:
      "https://user-images.githubusercontent.com/60454465/163956138-90ba7d41-00b2-43a8-b858-dbc476233c44.png",
    github: "https://github.com/kitdaniellim/alab-unity-game",
  },
  {
    id: 2,
    title: "SetMeApp",
    subtitle: "Productivity",
    description:
      "A robust client-consumer appointment application designed to streamline scheduling and management.",
    tech: "React Native, React, Expo, Firebase",
    image:
      "https://user-images.githubusercontent.com/60454465/132158692-4a6dd6a5-42b1-4959-91ef-d19f7dd986a4.jpg",
    github: "https://github.com/kitdaniellim/doc-app",
  },
  {
    id: 3,
    title: "Small Talk",
    subtitle: "UI/UX Design",
    description:
      "Modern interfaces for communication platforms, focusing on clean lines and intuitive user experiences.",
    tech: "Dart, Figma",
    image:
      "https://user-images.githubusercontent.com/60454465/182025950-10e3c168-3ced-4333-9291-6dc51767e24c.png",
    github: "https://github.com/kitdaniellim/smalltalk",
  },
  {
    id: 4,
    title: "Weather App",
    subtitle: "Data Visualization",
    description:
      "Real-time weather data visualization using modern web technologies and public APIs.",
    tech: "JavaScript, HTML, CSS",
    image:
      "https://user-images.githubusercontent.com/60454465/200169282-3c1cdedd-a6da-4168-b407-35fd87e5066b.png",
    github: "https://github.com/kitdaniellim/weather-app",
  },
];

export const contact = {
  email: "kitdaniellim@gmail.com",
  phone: { display: "(+63) 932-236-8116", href: "tel:+639322368116" },
  blurb:
    "Ready to bring your vision to life? I'm available for freelance projects and open to new opportunities.",
};

export const socials: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/kitdaniellim", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/kitdaniellim", icon: Github },
];
