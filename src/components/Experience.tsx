import { experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experience">
      <h2>Experience</h2>
      {experience.map((item) => (
        <div className="item" key={`${item.role}-${item.organization}`}>
          <div className="item-header">
            <h3>
              {item.role}, {item.organization}
            </h3>
            <span className="dates">
              {item.dates} · {item.location}
            </span>
          </div>
          {item.subtitle && <p className="subtitle">{item.subtitle}</p>}
          <ul>
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
