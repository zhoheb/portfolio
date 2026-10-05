import { FaArrowDown } from 'react-icons/fa'
import { hero } from '../data/content'
import ParticleCanvas from './ParticleCanvas'

export default function Hero() {
  return (
    <header id="home" className="hero">
      <ParticleCanvas />
      <div className="hero-content">
        <h1>
          <span className="hero-line">
            {hero.greeting}
            <span className="accent">{hero.firstName}</span>
            {hero.greetingEnd}
          </span>
          <span className="hero-line">{hero.tagline}</span>
        </h1>
        <a className="hero-button" href="#about">
          {hero.cta}
          <FaArrowDown aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}
