import { PageHero, SectionHead, Feature, Glyph, CtaBand } from '../components/UI.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd } from '../lib/seo.js'
import { ACTIVITIES } from '../content/experiences.js'

export const meta = () => seo({
  title: 'Activities: Horse Riding, Folk Evenings & More',
  description: 'Horse and carriage rides, Rajasthani folk evenings, the pool, elephant experiences near Amer, camel rides, jeep safaris, yoga and bird watching at The Vijayran Palace.',
  path: '/experiences/activities',
  jsonLd: [breadcrumbLd([['Experiences', '/experiences'], ['Activities', '/experiences/activities']])],
})

export default function Activities() {
  const withPhoto = ACTIVITIES.filter(a => a.img)
  const rest = ACTIVITIES.filter(a => !a.img)
  return (
    <>
      <PageHero img="horse" hi="क्रीड़ा" eyebrow="Activities" title="Days of adventure, evenings of song" crumbs={[['Experiences', '/experiences'], ['Activities', '/experiences/activities']]}
        lead="Choose from a village walk, a ride from our stables, an open-jeep safari, or simply gazing at the night sky." />
      <section className="sec sec--ivory">
        <div className="features">
          {withPhoto.map((a, i) => (
            <Feature key={a.id} id={a.id} img={a.img} title={a.title} flip={i % 2 === 1}><p>{a.text}</p></Feature>
          ))}
        </div>
      </section>
      <section className="sec sec--sand">
        <SectionHead num={1} eyebrow="More to discover" title="Beyond the palace walls" />
        <div className="acts">
          {rest.map((a, i) => (
            <article key={a.id} id={a.id} className="act" data-reveal ref={reveal} style={{ '--d': `${(i % 3) * 80}ms` }}>
              <Glyph k={a.glyph} />
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </article>
          ))}
        </div>
        <p className="note">Some experiences take place off-site and are subject to availability and season. Our concierge will arrange everything.</p>
      </section>
      <CtaBand title="Plan your days with our concierge" />
    </>
  )
}
