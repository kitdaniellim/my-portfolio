import profileImage from "../img/profile.webp";
import { blurPlaceholders } from "../img/blur-placeholders";

export interface HeadlineWord {
  text: string;
  serif?: boolean;
}

export const SECTIONS = {
  home: "home",
  about: "about",
  experience: "experience",
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

export type Stat =
  | { label: string; count: number; suffix?: string }
  | { label: string; display: string };

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  place: string;
  blurb: string;
  tags: string[];
  side: "l" | "r";
  mark?: string;
}

export interface Project {
  id: number;
  year: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
}

export interface NamedLink {
  label: string;
  href: string;
}

export const profile = {
  name: "Kit Daniel Lim",
  initials: "KDL",
  role: "Full-stack Developer",
  location: "Cebu City",
  greeting: "Hello, I'm Kit Daniel Lim",
  headline: [
    { text: "Crafting" },
    { text: "digital" },
    { text: "experiences", serif: true },
    { text: "that" },
    { text: "matter." },
  ] satisfies HeadlineWord[],
  intro:
    "Based in Cebu City. I build high-end web & mobile applications with a focus on performance, aesthetics, and the people on the other side of the screen.",
  photo: profileImage,
  photoPlaceholder: blurPlaceholders.profile,
} as const;

export const navItems: NavItem[] = [
  { id: SECTIONS.home, label: "Home" },
  { id: SECTIONS.about, label: "About" },
  { id: SECTIONS.experience, label: "Experience" },
  { id: SECTIONS.projects, label: "Projects" },
  { id: SECTIONS.contact, label: "Contact" },
];

export const about = {
  headingLines: ["From Cebu City,", "Philippines."],
  headingSerif: "Building for the world.",
  paragraphs: [
    "To me, code is a craft, not just syntax — it's how a real problem becomes a clean solution. I'm drawn to work of every scale, especially the projects that demand curiosity, a fresh approach, and the willingness to learn something new fast.",
    "Across six-plus years I've shipped for mobile, enterprise, full-stack and SaaS teams — local and international — and I'm at home on both sides of the stack. I communicate clearly, stay steady under pressure, and care that what I build doesn't just work, but actually means something to the people who use it.",
  ],
  stats: [
    { count: 6, suffix: "+", label: "Years of experience" },
    { count: 6, label: "Companies shipped for" },
    { display: "Full·stack", label: "Frontend & backend" },
  ] satisfies Stat[],
  skills: [
    {
      title: "Frontend",
      items: ["React / Next.js", "Vue.js", "React Native", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Backend",
      items: ["Node.js", "Express", "MongoDB", "Python / Django", "Firebase", "SQL"],
    },
    {
      title: "Tools & Platforms",
      items: ["Zoho CRM", "ServiceNow", "Git & GitLab", "Jira", "Claude Code"],
    },
  ] satisfies SkillGroup[],
};

export const experience = {
  eyebrow: "Experience · 2020 — Now",
  headingLead: "Six years,",
  headingSerif: "one through-line.",
  lead: "Every role added a layer — mobile, enterprise, full-stack, going international, SaaS at scale. Scroll to trace the line.",
  items: [
    {
      year: "2020",
      role: "Frontend Mobile App Developer",
      company: "Doctors Epic",
      place: "Cebu City",
      blurb:
        "Designed and shipped a cross-platform Android & iOS app from end to end — my first taste of building software real people depend on.",
      tags: ["React Native", "Expo", "Firebase"],
      mark: "The first line",
      side: "l",
    },
    {
      year: "2021",
      role: "Software Developer Intern",
      company: "ROCOCO Global Technologies",
      place: "Cebu City",
      blurb:
        "Implemented and updated enterprise modules on ServiceNow under senior engineers — and learned how large systems really run.",
      tags: ["ServiceNow", "Enterprise"],
      side: "r",
    },
    {
      year: "2022",
      role: "Full-Stack Web Developer",
      company: "BPOSeats",
      place: "Cebu City",
      blurb:
        "Shipped features and bug-fixes across Django and Vue stacks, pairing daily with senior developers on production software.",
      tags: ["Django", "Vue", "Python"],
      side: "l",
    },
    {
      year: "2022",
      role: "Software Engineer",
      company: "GOLOG",
      place: "Malaysia",
      blurb:
        "Went international — engineered logistics web apps with Vue.js, Bootstrap and the Vuexy framework across distributed, multicultural teams.",
      tags: ["Vue.js", "Bootstrap", "Vuexy"],
      side: "r",
    },
    {
      year: "2023",
      role: "Front End Developer",
      company: "Inchcape Digital Delivery Center",
      place: "Cebu City",
      blurb:
        "Two-plus years delivering B2B SaaS features and fixes to markets worldwide inside a disciplined Agile environment.",
      tags: ["React", "TypeScript", "B2B SaaS", "Agile"],
      side: "l",
    },
    {
      year: "2025",
      role: "Tech Support Specialist & Developer",
      company: "Habits365Greek, LLC",
      place: "Remote",
      blurb:
        "Built the Company Portal from scratch — driving operational efficiency up 130% — and own Zoho CRM, Shopify builds and multi-platform automation.",
      tags: ["Zoho CRM", "Shopify", "Automation", "Node.js"],
      mark: "Where I am now",
      side: "r",
    },
  ] satisfies ExperienceItem[],
};

export const projects: Project[] = [
  {
    id: 1,
    year: "2025",
    title: "Company Portal",
    org: "Habits365Greek, LLC",
    description:
      "An internal operations portal built from the ground up — automating workflows and lifting operational efficiency by 130%.",
    tags: ["React", "Node.js", "Zoho CRM", "Automation"],
  },
  {
    id: 2,
    year: "2023–25",
    title: "B2B SaaS Platform",
    org: "Inchcape Digital",
    description:
      "Production features and fixes shipped across multiple international markets in fast-moving Agile teams.",
    tags: ["React", "TypeScript", "Agile"],
  },
  {
    id: 3,
    year: "2022",
    title: "Logistics Web App",
    org: "GOLOG, Malaysia",
    description:
      "Operational dashboards for a logistics platform, engineered with Vue and the Vuexy framework alongside global teams.",
    tags: ["Vue.js", "Bootstrap", "Vuexy"],
  },
  {
    id: 4,
    year: "2020",
    title: "Healthcare Mobile App",
    org: "Doctors Epic",
    description:
      "A cross-platform iOS & Android patient app designed and shipped end-to-end with React Native and Firebase.",
    tags: ["React Native", "Expo", "Firebase"],
  },
];

export const githubCard = {
  href: "https://github.com/kitdaniellim?tab=repositories",
  title: "More on GitHub",
  description:
    "Side projects, experiments and open-source work — browse the full repository list.",
  handle: "github.com/kitdaniellim",
};

export const contact = {
  eyebrow: "Get in touch",
  headingLead: "Let's build something",
  headingTrailPrefix: "that ",
  headingTrailSerif: "matters.",
  blurb:
    "Open to roles and collaborations where software gets to do real work. If that's you, it'll just make sense.",
  email: "kitdaniellim@gmail.com",
  phone: { display: "0932 236 8116", href: "tel:+639322368116" },
  locationLabel: "Lahug, Cebu City, PH",
  links: [
    { label: "GitHub", href: "https://github.com/kitdaniellim" },
    { label: "Portfolio", href: "https://kitdaniellim.dev" },
  ] satisfies NamedLink[],
  footerNote: "Crafted with intent.",
};
