import { Link, useParams } from 'react-router'
import { Breadcrumbs, CtaBand } from '../components/UI.jsx'
import { VineDivider } from '../components/Ornaments.jsx'
import { Img, imgUrl } from '../lib/images.jsx'
import { seo, breadcrumbLd, abs } from '../lib/seo.js'
import { POSTS, postBySlug, formatDate } from '../lib/blog.js'
import { SITE } from '../content/site.js'
import NotFound from './not-found.jsx'

export const meta = ({ params }) => {
  const p = postBySlug(params.slug)
  if (!p) return seo({ title: 'Not found', description: '', path: '/404', noindex: true })
  const path = `/blog/${p.slug}`
  return [
    ...seo({
      title: p.title, description: p.description, path, type: 'article', image: imgUrl(p.cover, 1280),
      jsonLd: [
        breadcrumbLd([['Journal', '/blog'], [p.title, path]]),
        {
          '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description,
          image: abs(imgUrl(p.cover, 1280)), datePublished: p.date, dateModified: p.updated || p.date,
          author: { '@type': 'Organization', name: SITE.name }, publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: abs('/crest-mark.png') } },
          mainEntityOfPage: abs(path),
        },
      ],
    }),
    { property: 'article:published_time', content: p.date },
  ]
}

export default function BlogPost() {
  const { slug } = useParams()
  const p = postBySlug(slug)
  if (!p) return <NotFound />
  const more = POSTS.filter(x => x.slug !== p.slug).slice(0, 2)
  return (
    <>
      <article className="article">
        <header className="article__head">
          <Img name={p.cover} alt="" eager className="article__bg" sizes="100vw" />
          <div className="article__shade" />
          <div className="article__inner">
            <Breadcrumbs items={[['Journal', '/blog'], [p.title, `/blog/${p.slug}`]]} />
            <p className="eyebrow eyebrow--light">{p.category} · {p.readMinutes} min read</p>
            <h1 className="article__title">{p.title}</h1>
            <p className="article__date">{formatDate(p.date)}</p>
          </div>
        </header>
        <div className="sec sec--ivory">
          <div className="prose prose--article" dangerouslySetInnerHTML={{ __html: p.html }} />
          <VineDivider />
        </div>
      </article>
      {more.length > 0 && (
        <section className="sec sec--sand">
          <p className="eyebrow center">Continue reading</p>
          <div className="posts posts--2">
            {more.map(m => (
              <article key={m.slug} className="post">
                <Link viewTransition to={`/blog/${m.slug}`} className="post__img arch-clip"><Img name={m.cover} alt="" sizes="(max-width: 900px) 90vw, 40vw" /></Link>
                <p className="post__meta">{m.category}</p>
                <h3 className="post__title"><Link viewTransition to={`/blog/${m.slug}`}>{m.title}</Link></h3>
              </article>
            ))}
          </div>
        </section>
      )}
      <CtaBand />
    </>
  )
}
