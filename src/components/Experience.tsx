import { experience } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading>Experience</SectionHeading>
      <div className="experience-list">
        {experience.map((item) => (
          <article
            className="experience-card"
            key={`${item.role}-${item.organization}`}
          >
            <div className="experience-header">
              <div>
                <h3>{item.role}</h3>
                <p className="secondary">
                  {item.organization}
                  {item.subtitle && ` · ${item.subtitle}`}
                </p>
              </div>
              <p className="secondary experience-dates">
                <span>{item.dates}</span>
                <span>{item.location}</span>
              </p>
            </div>
            <ul>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
