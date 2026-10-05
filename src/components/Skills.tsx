import { skills } from '../data/content'

export default function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <dl className="details">
        {skills.map((group) => (
          <div key={group.label}>
            <dt>{group.label}</dt>
            <dd>{group.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
