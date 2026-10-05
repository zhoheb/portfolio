import { projects } from '../data/content'

export default function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      {projects.map((project) => (
        <div className="item" key={project.name}>
          <h3>
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer">
                {project.name}
              </a>
            ) : (
              project.name
            )}
            {project.inProgress && <span className="status">In progress</span>}
          </h3>
          <p>{project.description}</p>
          <p className="tech">{project.tech.join(' · ')}</p>
        </div>
      ))}
    </section>
  )
}
