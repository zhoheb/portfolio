import { useEffect, useRef } from 'react'
import { projects, type Project } from '../data/content'
import SectionHeading from './SectionHeading'

function ProjectRow({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null)

  // Fade/slide the row in the first time it scrolls into view.
  useEffect(() => {
    const row = ref.current
    if (!row) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          row.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  const projectLinks = [
    { label: 'GitHub', href: project.github },
    { label: 'Live App', href: project.live },
  ].filter((link) => link.href)

  return (
    <article className="project" ref={ref}>
      <div className="project-frame">
        {project.image ? (
          <img src={project.image} alt={`${project.name} screenshot`} />
        ) : (
          <div className="project-placeholder">{project.name}</div>
        )}
      </div>
      <div className="project-text">
        <h3>
          <span>{project.name}</span>
          <span>{project.subtitle}</span>
        </h3>
        {project.inProgress && <p className="status">In progress</p>}
        <p className="project-description">{project.description}</p>
        <p className="secondary project-tech">{project.tech.join(' · ')}</p>
        {projectLinks.length > 0 && (
          <div className="project-links">
            {projectLinks.map((link) => (
              <a
                className="bar-link"
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
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
