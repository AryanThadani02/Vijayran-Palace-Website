import { PageHero } from '../components/UI.jsx'
import { seo, breadcrumbLd } from '../lib/seo.js'
import { SITE } from '../content/site.js'

export const meta = () => seo({
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using the website of The Vijayran Palace by Royal Quest Resorts, Jaipur.',
  path: '/terms',
  jsonLd: [breadcrumbLd([['Terms & Conditions', '/terms']])],
})

// From the current site's Terms page (lightly copy-edited). Have the client's legal team review before launch.
export default function Terms() {
  return (
    <>
      <PageHero img="facade" eyebrow="Legal" title="Terms & Conditions" crumbs={[['Terms & Conditions', '/terms']]} compact />
      <section className="sec sec--ivory">
        <div className="prose prose--article">
          <p>By accessing, viewing or using this website you confirm that you have read these terms and conditions and agree to be bound by them. If you do not accept any of these terms, please discontinue your use of the website.</p>
          <h2>Proprietary information and copyright</h2>
          <p>All information on this website, including text, images, videos, animation, sounds, links, software and other materials, is the property of The Vijayran Palace and its affiliated entities. No one may display, reproduce, link, publish, broadcast, translate, modify, transfer, sell or otherwise deal with this information by any means without prior written permission from The Vijayran Palace.</p>
          <h2>Trademark notice</h2>
          <p>This website contains the trademarks VIJAYRAN, VIJAYRAN PALACE and other “VIJAYRAN” business identifiers owned by The Vijayran Palace. These marks are protected under national and international law and may not be reproduced, copied or reused without prior written consent.</p>
          <h2>Purchase of services</h2>
          <p>Services are purchased from The Vijayran Palace, registered in Jaipur, with its office at {SITE.address.full}. For questions about our services, contact <a href={`mailto:${SITE.emails.sales}`}>{SITE.emails.sales}</a> or {SITE.phones.sales.label}.</p>
          <h2>Disclaimer</h2>
          <p>Every effort is made to ensure that the information on this website, including rooms and availability, is accurate and reliable. However, The Vijayran Palace is not bound by any omission or error and is not liable for any loss resulting from it. We make no warranty as to the merchantability, completeness or fitness for purpose of any information on this website or linked sites, or that they are free of viruses or other harmful code. We may revise these terms or any information at any time without prior notice.</p>
          <p>To the fullest extent permitted by law, The Vijayran Palace is not liable for any loss, injury, damage or expense, direct or indirect, arising in any way from the unavailability of information, marks, the website or any link.</p>
          <h2>Links</h2>
          <p>This website may include links to websites not connected with The Vijayran Palace. We do not verify or monitor such content, and linking does not imply endorsement. Please exercise your own judgement when visiting them.</p>
          <h2>Applicable law and jurisdiction</h2>
          <p>Any dispute arising in relation to this website is governed by the laws of Rajasthan, India, and you agree to submit to the non-exclusive jurisdiction of the courts of Rajasthan.</p>
          <p>Please direct all enquiries to: The Vijayran Palace by Royal Quest Resorts, {SITE.address.full}.</p>
        </div>
      </section>
    </>
  )
}
