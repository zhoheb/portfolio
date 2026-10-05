import type { Link } from '../data/content'

export default function LinkList({ links }: { links: Link[] }) {
  return (
    <ul className="link-list">
      {links.map((link) => {
        const external = link.href.startsWith('http')
        return (
          <li key={link.label}>
            <a
              href={link.href}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
