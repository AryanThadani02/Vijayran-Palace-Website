// Node-side list of every URL to prerender + include in the sitemap.
// Used by react-router.config.js and scripts/sitemap.mjs (not imported by the app).
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { ROOM_SLUGS } from './rooms.js'

const here = dirname(fileURLToPath(import.meta.url))
export const BLOG_SLUGS = readdirSync(join(here, 'blog')).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))

export const STATIC_PATHS = [
  '/', '/about', '/accommodation',
  '/experiences', '/experiences/activities', '/experiences/attractions', '/experiences/dining',
  '/gallery', '/weddings', '/weddings/pre-wedding-shoots', '/weddings/meetings-events',
  '/day-outing', '/offers', '/blog', '/contact', '/faq', '/careers', '/terms',
]

export const ALL_PATHS = [
  ...STATIC_PATHS,
  ...ROOM_SLUGS.map(s => `/accommodation/${s}`),
  ...BLOG_SLUGS.map(s => `/blog/${s}`),
]
