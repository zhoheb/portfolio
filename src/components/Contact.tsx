import { contact, email, links } from '../data/content'
import LinkList from './LinkList'

export default function Contact() {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <p>{contact.blurb}</p>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <LinkList links={links.filter((link) => !link.href.startsWith('mailto:'))} />
    </section>
  )
}
