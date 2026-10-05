import { hero, links } from '../data/content'
import LinkList from './LinkList'

export default function Hero() {
  return (
    <header className="hero">
      <h1>{hero.name}</h1>
      <p className="intro">{hero.intro}</p>
      <LinkList links={links} />
    </header>
  )
}
