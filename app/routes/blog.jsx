import { useState } from 'react'
import { Link } from 'react-router'
import { PageHero } from '../components/UI.jsx'
import { Img } from '../lib/images.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd, abs } from '../lib/seo.js'
import { POSTS, formatDate } from '../lib/blog.js'

export const meta = () => seo({
  title: 'The Vijayran Diaries: Journal',
  description: 'Stories, guides and planning tips from The Vijayran Palace: Jaipur travel, palace weddings, Rajasthani culture, cuisine and the seasons.',
  path: '/blog',
  jsonLd: [
    breadcrumbLd([['Journal', '/blog']]),
    { '@context': 'https://schema.org', '@type': 'Blog', name: 'The Vijayran Diaries', url: abs('/blog'), blogPost: POSTS.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: abs(`/blog/${p.slug}`), datePublished: p.date })) },
  ],
})

export default function Blog() {
  const cats = ['All', ...new Set(POSTS.map(p => p.category))]
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? POSTS : POSTS.filter(p => p.category === cat)
  const [lead, ...rest] = list
  return (
    <>
      <PageHero img="jharokha-3" hi="डायरी" eyebrow="Journal" title="The Vijayran Diaries" crumbs={[['Journal', '/blog']]} compact />
      <section className="sec sec--ivory">
        <div className="tabs" role="tablist" aria-label="Filter by category">
          {cats.map(c => <button key={c} role="tab" aria-selected={cat === c} className={`tab ${cat === c ? 'is-on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        {lead && (
          <article className="lead-post" data-reveal ref={reveal}>
            <Link viewTransition to={`/blog/${lead.slug}`} className="lead-post__img arch-clip"><Img name={lead.cover} alt="" sizes="(max-width: 900px) 90vw, 50vw" /></Link>
            <div>
              <p className="post__meta">{lead.category} · {lead.readMinutes} min read</p>
              <h2 className="lead-post__title"><Link viewTransition to={`/blog/${lead.slug}`}>{lead.title}</Link></h2>
              <p className="lead-post__desc">{lead.description}</p>
              <p className="post__date">{formatDate(lead.date)}</p>
              <Link viewTransition to={`/blog/${lead.slug}`} className="link-u link-u--gold">Read the story</Link>
            </div>
          </article>
        )}
        <div className="posts mt-64">
          {rest.map((p, i) => (
            <article key={p.slug} className="post" data-reveal ref={reveal} style={{ '--d': `${i * 90}ms` }}>
              <Link viewTransition to={`/blog/${p.slug}`} className="post__img arch-clip"><Img name={p.cover} alt="" sizes="(max-width: 900px) 90vw, 30vw" /></Link>
              <p className="post__meta">{p.category} · {p.readMinutes} min read</p>
              <h3 className="post__title"><Link viewTransition to={`/blog/${p.slug}`}>{p.title}</Link></h3>
              <p className="post__date">{formatDate(p.date)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
