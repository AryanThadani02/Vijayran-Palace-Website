import { marked } from 'marked'

const files = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true })

function parse(path, raw) {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  const meta = {}
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const i = line.indexOf(':')
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, '$1')
    }
  }
  const body = m ? m[2] : raw
  const words = body.split(/\s+/).length
  return { slug, ...meta, readMinutes: Math.max(1, Math.round(words / 220)), html: marked.parse(body) }
}

export const POSTS = Object.entries(files)
  .map(([p, raw]) => parse(p, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export const postBySlug = slug => POSTS.find(p => p.slug === slug)

export const formatDate = d =>
  new Date(`${d}T12:00:00+05:30`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
