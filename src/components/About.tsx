import type { ReactNode } from 'react'
import { FaAws } from 'react-icons/fa'
import {
  SiCplusplus,
  SiDocker,
  SiFlask,
  SiGit,
  SiJavascript,
  SiLinux,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from 'react-icons/si'
import { about, skillTiles, type SkillTile } from '../data/content'
import SectionHeading from './SectionHeading'

// Logos in their brand colors, keyed by SkillTile.icon.
const skillIcons: Record<SkillTile['icon'], ReactNode> = {
  python: <SiPython color="#3776ab" />,
  cplusplus: <SiCplusplus color="#00599c" />,
  typescript: <SiTypescript color="#3178c6" />,
  javascript: <SiJavascript color="#f7df1e" />,
  react: <SiReact color="#61dafb" />,
  nodejs: <SiNodedotjs color="#5fa04e" />,
  flask: <SiFlask color="#3babc3" />,
  postgresql: <SiPostgresql color="#4169e1" />,
  docker: <SiDocker color="#2496ed" />,
  git: <SiGit color="#f05032" />,
  aws: <FaAws color="#ff9900" />,
  linux: <SiLinux color="#fcc624" />,
}

function Avatar() {
  return (
    <svg
      className="avatar"
      viewBox="0 0 120 120"
      fill="none"
      stroke="url(#avatar-gradient)"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="avatar-gradient"
          gradientUnits="userSpaceOnUse"
          x1="60"
          y1="0"
          x2="60"
          y2="120"
        >
          <stop offset="0" stopColor="var(--blue)" />
          <stop offset="0.55" stopColor="#b55bb0" />
          <stop offset="1" stopColor="var(--coral)" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" />
      <circle cx="60" cy="46" r="18" />
      <path d="M24 103c4-20 18-30 36-30s32 10 36 30" />
    </svg>
  )
}

export default function About() {
  const { photo, paragraphs, education } = about
  return (
    <section id="about" className="section">
      <SectionHeading>About</SectionHeading>
      <div className="about-columns">
        <div className="about-bio">
          {photo ? (
            <img className="avatar avatar-photo" src={photo} alt="" />
          ) : (
            <Avatar />
          )}
          {paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <ul className="skill-grid">
          {skillTiles.map((skill) => (
            <li className="skill-tile" key={skill.label}>
              {skillIcons[skill.icon]}
              <span>{skill.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="education">
        <p>
          <strong>{education.school}</strong> · {education.degree} ·{' '}
          {education.dates} · GPA {education.gpa}
        </p>
        <p className="secondary">{education.honors.join(' · ')}</p>
      </div>
    </section>
  )
}
