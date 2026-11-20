import { useEffect } from 'react'
import { useLocation } from 'react-router'
import Lenis from 'lenis'

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let io = null
function observer() {
  if (io || typeof window === 'undefined') return io
  io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  return io
}

/** Ref callback: <div data-reveal ref={reveal}> fades up when it enters the viewport. */
export function reveal(el) {
  if (!el) return
  if (reducedMotion()) { el.classList.add('is-in'); return }
  observer()?.observe(el)
}

/** Smooth scroll on desktop pointers; scroll to top on route change (or to #hash). */
export function useSmoothScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (reducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, anchors: { offset: -90 } })
    window.__lenis = lenis
    let id
    const raf = t => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy(); delete window.__lenis }
  }, [])
  useEffect(() => {
    const target = hash && document.querySelector(decodeURIComponent(hash))
    if (target) {
      setTimeout(() => window.__lenis ? window.__lenis.scrollTo(target, { offset: -90 }) : target.scrollIntoView(), 60)
    } else {
      window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
    }
  }, [pathname, hash])
}

/** Calls fn(progress 0..1) as the element scrolls through its sticky range. */
export function useScrollProgress(ref, fn) {
  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const range = r.height - window.innerHeight
      fn(range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0)
    }
    const on = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [ref, fn])
}

export const easeOut = t => 1 - Math.pow(1 - t, 3)
