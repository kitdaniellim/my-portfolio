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

export interface ProjectFile {
  name: string;
  /** Language / platform; drives the colour dot on the file tab. */
  lang: string;
  /** One-line summary, used for the link's accessible name and tooltip. */
  note: string;
  href: string;
  /** Pinned on the GitHub profile. */
  pinned?: boolean;
}

export interface ProjectFolder {
  id: string;
  title: string;
  files: ProjectFile[];
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
  greeting: "Hello, I'm Kit",
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
  headingLines: ["Full-stack developer"],
  headingSerif: "based in Cebu City.",
  paragraphs: [
    "I like turning real problems into software that is simple to use. I've worked on projects of different sizes, and I enjoy the ones where I have to learn something new along the way.",
    "Over the past six years I've worked with mobile, enterprise and SaaS teams in the Philippines and abroad, on both the frontend and the backend. I try to communicate clearly, stay calm when things get busy, and build things that are useful to the people who rely on them.",
  ],
  stats: [
    { count: 6, suffix: "+", label: "Years of experience" },
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

const repo = (name: string, owner = "kitdaniellim") => `https://github.com/${owner}/${name}`;

// Public repositories only. Within each folder, repos pinned on the GitHub
// profile come first.
export const projectFolders: ProjectFolder[] = [
  {
    id: "ai",
    title: "AI & Agents",
    files: [
      {
        name: "claude-village",
        lang: "TypeScript",
        note: "Claude Code sessions visualised as a pixel-art fantasy world",
        href: repo("claude-village"),
        pinned: true,
      },
      {
        name: "ai-support-app",
        lang: "TypeScript",
        note: "AI-assisted customer support app",
        href: repo("ai-support-app"),
        pinned: true,
      },
      {
        name: "lang-chain-app",
        lang: "Python",
        note: "LangChain application",
        href: repo("lang-chain-app"),
      },
    ],
  },
  {
    id: "web",
    title: "Web Apps",
    files: [
      {
        name: "momma-mia-catering-website",
        lang: "TypeScript",
        note: "Public website for Momma Mia Catering",
        href: repo("momma-mia-catering-website", "mommamiacaters"),
        pinned: true,
      },
      {
        name: "my-portfolio",
        lang: "TypeScript",
        note: "This site, built with React, Vite and GSAP",
        href: repo("my-portfolio"),
        pinned: true,
      },
      {
        name: "user-directory-viewer",
        lang: "TypeScript",
        note: "User directory viewer built for a tech test",
        href: repo("user-directory-viewer"),
      },
      {
        name: "weather-app",
        lang: "JavaScript",
        note: "React weather app from a 24-hour coding challenge",
        href: repo("weather-app"),
      },
    ],
  },
  {
    id: "mobile",
    title: "Mobile & Games",
    files: [
      {
        name: "doc-app",
        lang: "React Native",
        note: "SetMeApp, a doctor and patient appointment app for Doctors Epic",
        href: repo("doc-app"),
        pinned: true,
      },
      {
        name: "alab-unity-game",
        lang: "C#",
        note: "ALAB, a 2D e-learning game for the University of San Carlos",
        href: repo("alab-unity-game"),
        pinned: true,
      },
    ],
  },
  {
    id: "practice",
    title: "Practice & Training",
    files: [
      {
        name: "cafe-management-ojt",
        lang: "ServiceNow",
        note: "Cafe management internship project at ROCOCO Global Technologies",
        href: repo("cafe-management-ojt"),
      },
      {
        name: "payment-app",
        lang: "TypeScript",
        note: "React app for repayment frequencies and dates",
        href: repo("payment-app"),
      },
      {
        name: "vue-crud",
        lang: "Vue",
        note: "Vue CRUD application",
        href: repo("vue-crud"),
      },
      {
        name: "JS-cert",
        lang: "JavaScript",
        note: "JavaScript training and certification project",
        href: repo("JS-cert"),
      },
    ],
  },
];

export const githubCard = {
  href: "https://github.com/kitdaniellim",
  title: "More on GitHub",
  handle: "github.com/kitdaniellim",
};

export const contact = {
  eyebrow: "Get in touch",
  headingLead: "Have a project in mind?",
  headingTrailPrefix: "Let's ",
  headingTrailSerif: "talk.",
  email: "kitdaniellim@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/kitdaniellim" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kitdaniellim" },
  ] satisfies NamedLink[],
};
