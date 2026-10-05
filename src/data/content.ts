// All site text lives in this file. Edit here; the components just render it.

export interface NavItem {
  label: string
  // Must match a section id: home, about, experience, projects, contact.
  href: string
}

export interface Link {
  label: string
  href: string
  // Picks the footer icon.
  icon: 'github' | 'linkedin' | 'email' | 'resume'
}

export interface SkillTile {
  label: string
  // Picks the logo; see the icon map in src/components/About.tsx.
  icon:
    | 'python'
    | 'cplusplus'
    | 'typescript'
    | 'javascript'
    | 'react'
    | 'nodejs'
    | 'flask'
    | 'postgresql'
    | 'docker'
    | 'git'
    | 'aws'
    | 'linux'
}

export interface ExperienceItem {
  role: string
  organization: string
  // Optional line next to the organization, e.g. the project or team name.
  subtitle?: string
  dates: string
  location: string
  bullets: string[]
}

export interface Project {
  name: string
  // Project type, shown as the second line of the title.
  subtitle: string
  description: string
  tech: string[]
  inProgress?: boolean
  // Screenshot path under public/, e.g. '/projects/free-food-tracker.png'.
  // Leave empty to show a placeholder panel with the project name.
  image: string
  // Links are hidden while their URL is empty.
  github: string
  live: string
}

export const siteName = 'Zachary Hoheb'

export const nav: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  // Rendered as: {greeting}{firstName}{greetingEnd}, with firstName in the accent color.
  greeting: "Hello, I'm ",
  firstName: 'Zach',
  greetingEnd: '.',
  tagline: "I'm a full-stack software engineer.",
  cta: 'View my work',
}

export const email = 'zhoheb@umich.edu'

export const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/zhoheb', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/zachary-hoheb',
    icon: 'linkedin',
  },
  { label: 'Email', href: `mailto:${email}`, icon: 'email' },
  // Served from public/resume.pdf
  { label: 'Resume', href: '/resume.pdf', icon: 'resume' },
]

export const about = {
  // TODO (optional): add a photo under public/ (e.g. '/photo.jpg') to replace the avatar icon.
  photo: '',
  paragraphs: [
    "I'm a Computer Science and Mathematics student in the LSA Honors Program at the University of Michigan, where I've kept a 4.0 GPA and been recognized with the Branstrom Freshman Prize and as a James B. Angell Scholar. As a full-stack intern at Altheros Capital, I built and shipped production features for the Midwest Health telehealth platform, including a provider availability system now used by 80 therapists. I also do systems and performance research on ArchSAT, a framework for analyzing how SAT solvers use hardware.",
  ],
  education: {
    school: 'University of Michigan',
    degree: 'B.S. Computer Science and Mathematics, LSA Honors Program',
    dates: 'May 2028',
    gpa: '4.0',
    honors: [
      'Branstrom Freshman Prize (top 5%)',
      'James B. Angell Scholar',
      'University Honors',
    ],
  },
}

export const skillTiles: SkillTile[] = [
  { label: 'Python', icon: 'python' },
  { label: 'C++', icon: 'cplusplus' },
  { label: 'TypeScript', icon: 'typescript' },
  { label: 'JavaScript', icon: 'javascript' },
  { label: 'React', icon: 'react' },
  { label: 'Node.js', icon: 'nodejs' },
  { label: 'Flask', icon: 'flask' },
  { label: 'PostgreSQL', icon: 'postgresql' },
  { label: 'Docker', icon: 'docker' },
  { label: 'Git', icon: 'git' },
  { label: 'AWS', icon: 'aws' },
  { label: 'Linux', icon: 'linux' },
]

export const experience: ExperienceItem[] = [
  {
    role: 'Full-Stack Software Engineering Intern',
    organization: 'Altheros Capital – Midwest Health',
    subtitle: 'Telehealth platform',
    dates: 'Dec 2025 – Aug 2026',
    location: 'Remote',
    bullets: [
      'Architected and shipped a Provider Availability Management system from scratch: a RESTful Node.js/Express API (bulk scheduling, recurring windows, out-of-office blocking), a PostgreSQL schema, and a React/TypeScript calendar UI. It is used in production by 80 therapists and replaced a manual process that took 10+ hours per week.',
      'Implemented authentication and authorization with AWS Cognito MFA and role-based access control across API routes and UI views, and integrated Stripe Elements for secure in-app payments in the patient billing flow.',
      'Resolved a 2-day production outage blocking all patient logins, tracing it through Docker logs, Postman, and PostgreSQL to UUID validation errors, unregistered routes, port mismatches, and a Cognito token bug.',
      "Stabilized the team's Dockerized development environment by fixing devDependency, platform-binary, and bind-mount conflicts, cutting setup time for a 10-person team from a full day to under 30 minutes.",
    ],
  },
  {
    role: 'Undergraduate Research Assistant',
    organization: 'University of Michigan',
    subtitle: 'ArchSAT: Hardware Performance Analysis for SAT Solvers',
    dates: 'May 2026 – Present',
    location: 'Ann Arbor, MI',
    bullets: [
      'Co-developed ArchSAT, a hardware performance framework profiling 3 SAT solvers (Kissat, ParaFROST-CPU/GPU) across 470+ benchmarks with Intel VTune and Linux perf; work targeted for SAT 2027.',
      'Found that absolute memory-operation volume, not cache-efficiency percentage, best predicts solver runtime, surfacing benchmarks where the fastest solver had 6x worse cache miss rates than slower solvers.',
      'Built the end-to-end pipeline from raw profiler traces to an interactive Python/Dash/Plotly dashboard, parsing cache, branch, and BCP metrics and joining them with a SQLite benchmark database for SAT/UNSAT labeling.',
    ],
  },
]

// Rendered in this order.
export const projects: Project[] = [
  {
    name: 'Free Food Tracker',
    subtitle: 'Campus Events Web App',
    description:
      'A web app that aggregates 100+ free-food events per week across the University of Michigan campus into one searchable, time- and location-based feed.',
    tech: ['React', 'TypeScript', 'Express', 'PostgreSQL'],
    inProgress: true,
    image: '', // TODO: add screenshot, e.g. '/projects/free-food-tracker.png'
    github: '', // TODO: add repo link
    live: '', // TODO: add live app link, if any
  },
  {
    name: 'SuperSnakes',
    subtitle: 'PyGame Snake Game',
    description:
      'An event-driven game with real-time input, collisions, and power-ups that sustains 60 FPS through controlled frame timing and decoupled rendering.',
    tech: ['Python', 'PyGame'],
    image: '', // TODO: add screenshot, e.g. '/projects/supersnakes.png'
    github: '', // TODO: add repo link
    live: '',
  },
  {
    name: 'Chat485',
    subtitle: 'Full-Stack LLM Chat App',
    description:
      'A ChatGPT-style chat app with a Flask backend, a 4-table SQLite schema, salted SHA-512 password hashing, and an OpenAI-compatible LLM API with a 20-message sliding context window.',
    tech: ['Python', 'Flask', 'SQLite', 'React'],
    image: '', // TODO: add screenshot, e.g. '/projects/chat485.png'
    github: '', // TODO: add repo link
    live: '',
  },
  {
    name: 'Pipelined CPU & Cache Simulator',
    subtitle: 'C Systems Project',
    description:
      'A cycle-accurate 5-stage pipelined processor simulator with data forwarding, load-use stalls, and branch flushes, plus a configurable cache with LRU replacement.',
    tech: ['C'],
    image: '', // TODO: add screenshot, e.g. '/projects/cpu-simulator.png'
    github: '', // TODO: add repo link
    live: '',
  },
]

// TODO: create a form at https://formspree.io and paste its endpoint here,
// e.g. 'https://formspree.io/f/abcdwxyz'. While this is empty, the contact
// form falls back to opening a mailto: link with the fields filled in.
export const FORMSPREE_ENDPOINT = ''

export const contact = {
  blurb:
    "If you're recruiting for Summer 2027 software engineering internships, I'd be glad to hear from you.",
  namePlaceholder: 'Name',
  emailPlaceholder: 'Email',
  messagePlaceholder: 'Message',
  submit: 'Submit',
  sending: 'Sending…',
  success: "Thanks for reaching out. I'll get back to you soon.",
  error: `Something went wrong. Please email me directly at ${email}.`,
  mailtoNotice:
    'Your email app should open with the message filled in. Send it from there.',
  mailtoSubject: 'Portfolio contact from',
}
