import type { ReactNode } from 'react'
import {
  FaAngleDoubleUp,
  FaEnvelope,
  FaFileAlt,
  FaGithub,
  FaLinkedinIn,
} from 'react-icons/fa'
import { links, siteName, type Link } from '../data/content'

const linkIcons: Record<Link['icon'], ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedinIn />,
  email: <FaEnvelope />,
  resume: <FaFileAlt />,
}

export default function Footer() {
  return (
    <footer className="footer">
      <a className="footer-top" href="#home" aria-label="Back to top">
        <FaAngleDoubleUp aria-hidden="true" />
      </a>
      <ul className="footer-links">
        {links.map((link) => {
          const external = link.href.startsWith('http')
          return (
            <li key={link.label}>
              <a
                href={link.href}
                aria-label={link.label}
                title={link.label}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {linkIcons[link.icon]}
              </a>
            </li>
          )
        })}
      </ul>
      <p className="footer-copy">
        {siteName} © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
