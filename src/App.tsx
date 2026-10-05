import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // The sections don't exist when the browser first resolves the URL hash,
  // so deep links like /#projects need a manual scroll after mount.
  useEffect(() => {
    if (!window.location.hash) return
    document
      .getElementById(window.location.hash.slice(1))
      ?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <>
      <Nav />
      <Hero />
      <main>
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
