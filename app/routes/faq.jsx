import { Link } from 'react-router'
import { PageHero, Faq } from '../components/UI.jsx'
import { seo, breadcrumbLd } from '../lib/seo.js'
import { FAQ } from '../content/misc.js'

export const meta = () => seo({
  title: 'Frequently Asked Questions',
  description: 'Answers about staying at The Vijayran Palace, Jaipur: location, check-in times, transfers, weddings, day outings, dining and family facilities.',
  path: '/faq',
  jsonLd: [
    breadcrumbLd([['FAQ', '/faq']]),
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ],
})

export default function FaqPage() {
  return (
    <>
      <PageHero img="courtyard-1" hi="प्रश्न" eyebrow="FAQ" title="Questions, answered" crumbs={[['FAQ', '/faq']]} compact />
      <section className="sec sec--ivory">
        <Faq items={FAQ} />
        <p className="center mt-48">Still curious? <Link className="link-u link-u--gold" to="/contact">Ask us anything</Link></p>
      </section>
    </>
  )
}
