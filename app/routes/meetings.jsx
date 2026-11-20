import { PageHero, SectionHead, Feature, EnquiryForm } from '../components/UI.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd } from '../lib/seo.js'
import { SITE } from '../content/site.js'

export const meta = () => seo({
  title: 'Meetings, Conferences & Events in Jaipur',
  description: 'Host conferences, corporate offsites, birthdays and celebrations at The Vijayran Palace, Jaipur, with the air-conditioned Raj Mahal banquet hall and open courtyards and lawns.',
  path: '/weddings/meetings-events',
  jsonLd: [breadcrumbLd([['Weddings', '/weddings'], ['Meetings & Events', '/weddings/meetings-events']])],
})

export default function Meetings() {
  return (
    <>
      <PageHero img="banquet" hi="सभा" eyebrow="Meetings & Events" title="Gatherings with a royal welcome" crumbs={[['Weddings', '/weddings'], ['Meetings & Events', '/weddings/meetings-events']]} />
      <section className="sec sec--ivory">
        <div className="features">
          <Feature img="banquet" eyebrow="Up to 300 guests" title="Raj Mahal banquet hall">
            <p>Our largest indoor space is air-conditioned, with a stage, and suits conferences, award nights and gala dinners in any season.</p>
          </Feature>
          <Feature img="music-night-2" eyebrow="Up to 1,500 guests" title="Lawns & courtyards" flip>
            <p>Hold product launches, family celebrations and evening receptions in Char Bagh, the Haveli Chowk or the Vijayran Mahal Bagh lawn.</p>
          </Feature>
          <Feature img="folk" eyebrow="For your guests" title="Culture after hours">
            <p>Close the day with a Rajasthani folk performance, a bonfire, or dinner under the sky. Team experiences on horseback or in the hills can be arranged too.</p>
          </Feature>
        </div>
      </section>
      <section className="sec sec--sand">
        <SectionHead num={1} eyebrow="Plan an event" title="Tell us about your gathering" />
        <div data-reveal ref={reveal}>
          <EnquiryForm kind="Event" to={SITE.emails.sales} title="Event enquiry" fields={['name', 'email', 'phone', 'dates', 'guests', 'message']} id="event-enquiry" />
        </div>
      </section>
    </>
  )
}
