import { about } from '../data/content'

export default function About() {
  const { paragraphs, education } = about
  return (
    <section id="about">
      <h2>About</h2>
      {paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
      <div className="item">
        <div className="item-header">
          <h3>{education.school}</h3>
          <span className="dates">
            {education.dates} · {education.location}
          </span>
        </div>
        <p>{education.degree}</p>
        <dl className="details">
          <dt>GPA</dt>
          <dd>{education.gpa}</dd>
          <dt>Honors</dt>
          <dd>{education.honors.join(', ')}</dd>
          <dt>Coursework</dt>
          <dd>{education.coursework.join(', ')}</dd>
        </dl>
      </div>
    </section>
  )
}
