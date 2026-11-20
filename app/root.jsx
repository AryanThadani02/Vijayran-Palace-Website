import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, Link } from 'react-router'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import { OrnamentDefs } from './components/Ornaments.jsx'
import { useSmoothScroll } from './lib/motion.js'
import 'lenis/dist/lenis.css'
import './styles/tokens.css'
import './styles/app.css'
import './styles/pages.css'
import './styles/hero.css'

export const links = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Lato:wght@300;400;700&family=Tiro+Devanagari+Hindi&display=swap' },
  { rel: 'icon', href: '/crest-mark.png', type: 'image/png' },
  { rel: 'apple-touch-icon', href: '/crest-mark.png' },
]

// Runs before paint: skips the intro on repeat visits / reduced motion, and marks JS as available.
const HEAD_SCRIPT = `document.documentElement.classList.add('js');try{if(sessionStorage.getItem('vp-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('vp-seen')}catch(e){}`

export function Layout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#180A0A" />
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
        <Meta />
        <Links />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <OrnamentDefs />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  useSmoothScroll()
  return (
    <>
      <Nav />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  )
}

export function ErrorBoundary({ error }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404
  return (
    <main className="sec sec--ink notfound">
      <p className="eyebrow eyebrow--light">{notFound ? '404' : 'Something went wrong'}</p>
      <h1 className="shead__title" style={{ color: 'var(--ivory-50)' }}>{notFound ? 'You seem to have wandered off the palace grounds' : 'The palace doors are stuck'}</h1>
      <p><Link className="btn btn--gold" to="/"><span>Return to the palace</span></Link></p>
    </main>
  )
}
