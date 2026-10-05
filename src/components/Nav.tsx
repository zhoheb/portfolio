import { useEffect, useState } from 'react'
import { nav } from '../data/content'

const NAV_HEIGHT = 64

// Sits in the page flow directly below the hero and sticks to the top of the
// viewport once scrolled to (position: sticky in styles.css).
export default function Nav() {
  const [active, setActive] = useState(nav[0].href)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      // The active section is the last one whose top has crossed a line
      // a third of the way down the viewport.
      const line = NAV_HEIGHT + window.innerHeight * 0.3
      let current = nav[0].href
      for (const item of nav) {
        const section = document.getElementById(item.href.slice(1))
        if (section && section.getBoundingClientRect().top <= line) {
          current = item.href
        }
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) current = nav[nav.length - 1].href
      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <nav className={`nav${open ? ' is-open' : ''}`} aria-label="Main">
      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>
      <ul className="nav-links">
        {nav.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={item.href === active ? 'is-active' : undefined}
              aria-current={item.href === active ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
