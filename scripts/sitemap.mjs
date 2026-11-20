// Post-build: writes build/client/sitemap.xml from the prerender path list.
import { writeFileSync, readFileSync, existsSync, copyFileSync } from 'node:fs'
import { ALL_PATHS } from '../app/content/paths.js'

let site = 'https://www.royalquestresorts.com'
if (existsSync('.env')) {
  const m = readFileSync('.env', 'utf8').match(/^VITE_SITE_URL=(.+)$/m)
  if (m && m[1].trim()) site = m[1].trim().replace(/\/$/, '')
}
const today = new Date().toISOString().slice(0, 10)
const prio = p => (p === '/' ? '1.0' : /^\/(accommodation|weddings)/.test(p) ? '0.9' : p.startsWith('/blog/') ? '0.6' : '0.7')
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ALL_PATHS.map(p => `  <url><loc>${site}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod><priority>${prio(p)}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync('build/client/sitemap.xml', xml)
copyFileSync('build/client/404/index.html', 'build/client/404.html')
console.log(`sitemap.xml: ${ALL_PATHS.length} URLs (${site})`)
