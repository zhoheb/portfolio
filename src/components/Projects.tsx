import { useEffect, useRef, type CSSProperties } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { projects, type Project } from '../data/content'
import SectionHeading from './SectionHeading'

// Position in the text column's staggered scroll-in cascade.
const step = (index: number) => ({ '--i': index }) as CSSProperties

// Keep hyphenated terms like "write-back" on one line.
function noHyphenBreaks(text: string) {
  return text.split(/(\S+-\S+)/).map((part, index) =>
    index % 2 ? (
      <span className="nowrap" key={index}>
        {part}
      </span>
    ) : (
      part
    ),
  )
}

function ProjectRow({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null)

  // Slide the row in the first time it scrolls into view. The hidden start
  // state only applies under html.js (set in main.tsx), so the row still
  // shows if this never runs.
  useEffect(() => {
    const row = ref.current
    if (!row) return
    if (!('IntersectionObserver' in window)) {
      row.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          row.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  return (
    <article className="project" ref={ref}>
      <div className="project-media">
        <div className="project-frame">
          {project.image ? (
            <img
              src={project.image}
              alt={project.imageAlt ?? `${project.name} screenshot`}
            />
          ) : (
            <div className="project-placeholder">{project.name}</div>
          )}
        </div>
      </div>
      <div className="project-text">
        <p className="project-meta" style={step(0)}>
          <span className="project-label">{project.label}</span>
          {project.badge && (
            <span className="project-badge">{project.badge}</span>
          )}
        </p>
        <h3 style={step(1)}>{project.name}</h3>
        <p className="project-description" style={step(2)}>
          {noHyphenBreaks(project.description)}
        </p>
        <ul className="project-highlights" style={step(3)}>
          {project.highlights.map((highlight) => (
            <li key={highlight}>{noHyphenBreaks(highlight)}</li>
          ))}
        </ul>
        <ul className="project-tech" style={step(4)}>
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        {(project.live || project.github) && (
          <div className="project-links" style={step(5)}>
            {project.live && (
              <a
                className="button button-filled"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live site
                <FiExternalLink aria-hidden="true" />
              </a>
            )}
            {project.github && (
              <a
                className="button button-outlined"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub aria-hidden="true" />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section section-wide">
      <SectionHeading>Projects</SectionHeading>
      {projects.map((project) => (
        <ProjectRow project={project} key={project.name} />
      ))}
    </section>
  )
}
