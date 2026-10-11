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
  // Small uppercase label above the name, e.g. 'Personal project · Game'.
  label: string
  // Optional highlight stat, shown as a badge next to the label.
  badge?: string
  // One sentence, about 120 characters at most.
  description: string
  // Up to 3 short bullet points under the description.
  highlights: string[]
  tech: string[]
  // Image path under public/, e.g. '/projects/cache-simulator.png'. Use a
  // 16:10 image; other shapes are cropped to fit, keeping the top.
  // Leave empty to show a placeholder panel with the project name.
  image: string
  // Alt text for the image. Defaults to '{name} screenshot'.
  imageAlt?: string
  // Buttons are hidden while their URL is empty.
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
  // Photo under public/. Leave empty to show the avatar icon instead.
  photo: '/profile-photo.jpg',
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
    name: 'Maize Bites',
    label: 'Personal project · Full-stack',
    badge: '100+ daily users',
    description:
      'A web app that maps free food across the University of Michigan campus in real time.',
    highlights: [
      'Official access to the Happening @ Michigan feed via U-M Student Life; a scheduled pipeline classifies and geolocates events across 73 buildings',
      'TypeScript monorepo: React 19 PWA, Express 5 API, and a 16-table PostgreSQL schema',
      'Runs at $0/month on Vercel, Render, and Neon, with 1,079 tests in CI',
    ],
    tech: ['TypeScript', 'React', 'Express', 'PostgreSQL', 'GitHub Actions'],
    image: '/projects/maize-bites.png',
    github: 'https://github.com/zhoheb/maize-bites',
    live: 'https://maizebites.zachhoheb.dev',
  },
  {
    name: 'SuperSnakes',
    label: 'Personal project · Game',
    description:
      'An arcade snake game in Python with power-ups, upgrades, and an in-game shop.',
    highlights: [
      '5 power-up types with a 10ms input response time',
      'Steady 60 FPS through controlled frame timing and decoupled rendering',
      '12 encapsulated classes (~2,000 lines) of modular, object-oriented code',
    ],
    tech: ['Python', 'PyGame'],
    image: '/projects/supersnakes.png',
    github: 'https://github.com/zhoheb/super_snakes',
    live: '',
  },
  {
    name: 'Configurable Cache Simulator',
    label: 'EECS 370 · Systems',
    description:
      'A configurable cache simulator in C between a processor simulator and main memory.',
    highlights: [
      'Direct-mapped through fully associative designs, up to 65,536 words',
      'True LRU replacement with write-back, write-allocate policies',
      'Validated across 8 cache geometries with 10 test programs',
    ],
    tech: ['C'],
    image: '/projects/cache-simulator.png',
    imageAlt:
      'Diagram of a 16-bit address split into tag, set, and offset fields, mapped onto a 2-way set-associative cache',
    // Course code covered by the honor code: no links.
    github: '',
    live: '',
  },
]

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maeqjydk'

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
