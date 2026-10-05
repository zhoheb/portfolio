// All site text lives in this file. Edit here; the components just render it.

export interface Link {
  label: string
  href: string
}

export interface ExperienceItem {
  role: string
  organization: string
  // Optional line under the heading, e.g. the project or team name.
  subtitle?: string
  dates: string
  location: string
  bullets: string[]
}

export interface Project {
  name: string
  description: string
  tech: string[]
  inProgress?: boolean
  // Repo URL. Leave empty to render the project name without a link.
  github: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export const hero = {
  name: 'Zachary Hoheb',
  intro:
    'CS + Math at the University of Michigan and full-stack engineer, looking for Summer 2027 software engineering internships.',
}

export const email = 'zhoheb@umich.edu'

export const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/zhoheb' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zachary-hoheb' },
  { label: 'Email', href: `mailto:${email}` },
  // Served from public/resume.pdf
  { label: 'Resume', href: '/resume.pdf' },
]

export const about = {
  paragraphs: [
    "I'm a Computer Science and Mathematics student in the LSA Honors Program at the University of Michigan, where I've kept a 4.0 GPA and been recognized with the Branstrom Freshman Prize and as a James B. Angell Scholar. As a full-stack intern at Altheros Capital, I built and shipped production features for the Midwest Health telehealth platform, including a provider availability system now used by 80 therapists. I also do systems and performance research on ArchSAT, a framework for analyzing how SAT solvers use hardware.",
  ],
  education: {
    school: 'University of Michigan',
    location: 'Ann Arbor, MI',
    degree: 'B.S. Computer Science and Mathematics, LSA Honors Program',
    dates: 'May 2028',
    gpa: '4.0/4.0',
    honors: [
      'Branstrom Freshman Prize (top 5%)',
      'James B. Angell Scholar',
      'University Honors',
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Computer Organization',
      'Foundations of Computer Science',
      'Web Systems',
      'Machine Learning',
      'Discrete Math',
      'Probability',
      'Linear Algebra',
    ],
  },
}

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
    description:
      "A web app that aggregates 100+ free-food events per week across the University of Michigan campus into one searchable, time- and location-based feed so students don't miss them. Backed by a REST API and PostgreSQL schema for events, locations, and sources, with a scraper that ingests postings from campus event feeds.",
    tech: ['React', 'TypeScript', 'Express', 'PostgreSQL'],
    inProgress: true,
    github: '', // TODO: add repo link
  },
  {
    name: 'SuperSnakes',
    description:
      'An event-driven game with real-time input, collisions, and power-ups at a 10ms input response time, sustaining 60 FPS through controlled frame timing and decoupled rendering in a modular object-oriented design.',
    tech: ['Python', 'PyGame'],
    github: '', // TODO: add repo link
  },
  {
    name: 'Chat485',
    description:
      'A full-stack, ChatGPT-style LLM chat app built for EECS 485. The Flask backend has a 4-table SQLite schema, database-backed UUID session cookies, salted SHA-512 password hashing, and an OpenAI-compatible LLM API integration with a 20-message sliding context window.',
    tech: ['Python', 'Flask', 'SQLite', 'React'],
    github: '', // TODO: add repo link
  },
  {
    name: 'Pipelined CPU & Cache Simulator',
    description:
      'A cycle-accurate 5-stage pipelined processor simulator with data forwarding, load-use stalls, and branch flushes, along with a two-pass assembler and a multi-file linker, built for EECS 370. Includes a configurable cache (block size, sets, associativity) with LRU replacement and write-back, write-allocate policies.',
    tech: ['C'],
    github: '', // TODO: add repo link
  },
]

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: [
      'Python',
      'C++',
      'C',
      'TypeScript',
      'JavaScript',
      'Java',
      'SQL',
      'HTML/CSS',
      'Bash',
    ],
  },
  {
    label: 'Frameworks & Libraries',
    items: [
      'React',
      'Node.js',
      'Express.js',
      'Flask',
      'Tailwind CSS',
      'Dash',
      'Plotly',
      'NumPy',
      'Pandas',
      'scikit-learn',
    ],
  },
  {
    label: 'Tools & Platforms',
    items: [
      'Git',
      'Docker',
      'PostgreSQL',
      'SQLite',
      'AWS Cognito',
      'Stripe',
      'Postman',
      'pytest',
      'Cypress',
      'Linux',
      'VTune',
    ],
  },
]

export const contact = {
  blurb:
    "If you're recruiting for Summer 2027 software engineering internships, I'd be glad to hear from you. Email is the best way to reach me.",
}
