import { PageHero, EnquiryForm } from '../components/UI.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd } from '../lib/seo.js'
import { SITE } from '../content/site.js'

export const meta = () => seo({
  title: 'Careers',
  description: 'Grow your career in luxury hospitality with The Vijayran Palace by Royal Quest Resorts, Jaipur.',
  path: '/careers',
  jsonLd: [breadcrumbLd([['Careers', '/careers']])],
})

export default function Careers() {
  return (
    <>
      <PageHero img="hall-interior" hi="सेवा" eyebrow="Careers" title="Work with The Vijayran Palace" crumbs={[['Careers', '/careers']]} compact />
      <section className="sec sec--ivory">
        <div className="prose prose--center" data-reveal ref={reveal}>
          <p className="dropcap">Our guests remember our people by name. If you believe hospitality is an art, that the guest is God, and that the smallest detail matters, we would love to hear from you.</p>
          <p>We hire across front office, food &amp; beverage, kitchen, housekeeping, events, sales and the stables. Send us a note with the role you are interested in. Please email your CV to <a href={`mailto:${SITE.emails.sales}?subject=Career application`}>{SITE.emails.sales}</a>.</p>
        </div>
      </section>
      <section className="sec sec--sand">
        <EnquiryForm kind="Career" to={SITE.emails.sales} title="Apply" fields={['name', 'email', 'phone', 'role', 'message']} id="apply" />
      </section>
    </>
  )
}
