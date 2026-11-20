import { useEffect, useState } from 'react'
import { archAt } from './Ornaments.jsx'

/** "Shahi Swagat": plays on the first home-page visit of a session. Repeat visits and
    reduced-motion users never see it (an inline script in <head> sets html.vp-seen). */
export default function Intro() {
  const [phase, setPhase] = useState('play')
  useEffect(() => {
    if (document.documentElement.classList.contains('vp-seen')) { setPhase('done'); return }
    try { sessionStorage.setItem('vp-intro', '1') } catch { /* private mode */ }
    document.documentElement.classList.add('is-locked')
    const t1 = setTimeout(() => setPhase('out'), 2300)
    const t2 = setTimeout(() => { setPhase('done'); document.documentElement.classList.remove('is-locked') }, 3200)
    return () => { clearTimeout(t1); clearTimeout(t2); document.documentElement.classList.remove('is-locked') }
  }, [])
  if (phase === 'done') return null
  return (
    <div className={`intro ${phase === 'out' ? 'is-out' : ''}`} aria-hidden="true">
      <div className="intro__inner">
        <svg className="intro__arch" viewBox="-4 -4 308 462"><path d={archAt(0, 0, 300, 454)} pathLength="1" /></svg>
        <img className="intro__crest" src="/crest-mark.png" alt="" width="180" height="158" />
        <p className="intro__deva" lang="hi">खम्मा घणी</p>
        <p className="intro__en">Khamma Ghani · Welcome to The Vijayran Palace</p>
      </div>
      <button className="intro__skip" onClick={() => setPhase('out')} tabIndex={-1}>Skip</button>
    </div>
  )
}
