import { Link } from 'react-router'
import { ArchFrame } from '../components/Ornaments.jsx'
import { seo } from '../lib/seo.js'

export const meta = () => seo({ title: 'Page not found', description: 'This page could not be found.', path: '/404', noindex: true })

export default function NotFound() {
  return (
    <section className="sec sec--ink notfound">
      <div className="notfound__arch"><ArchFrame inset={10} /><span lang="hi" aria-hidden="true">४०४</span></div>
      <p className="eyebrow eyebrow--light">Page not found</p>
      <h1 className="notfound__title">You seem to have wandered off the palace grounds</h1>
      <p className="notfound__links">
        <Link className="btn btn--gold" to="/"><span>Return to the palace</span></Link>
        <Link className="btn btn--ghost" to="/accommodation"><span>See our suites</span></Link>
      </p>
    </section>
  )
}
