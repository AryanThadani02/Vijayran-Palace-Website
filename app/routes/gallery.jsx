import { PageHero, Gallery, CtaBand } from '../components/UI.jsx'
import { seo, breadcrumbLd, abs } from '../lib/seo.js'
import { imgUrl } from '../lib/images.jsx'
import { GALLERY } from '../content/misc.js'

export const meta = () => seo({
  title: 'Gallery',
  description: 'Photographs of The Vijayran Palace, Jaipur: the palace and grounds, suites and villas, weddings, dining and experiences.',
  path: '/gallery',
  jsonLd: [
    breadcrumbLd([['Gallery', '/gallery']]),
    { '@context': 'https://schema.org', '@type': 'ImageGallery', name: 'The Vijayran Palace gallery', image: GALLERY.slice(0, 12).map(([n, , alt]) => ({ '@type': 'ImageObject', contentUrl: abs(imgUrl(n, 1280)), caption: alt })) },
  ],
})

export default function GalleryPage() {
  return (
    <>
      <PageHero img="corridor" hi="चित्रशाला" eyebrow="Gallery" title="The palace in pictures" crumbs={[['Gallery', '/gallery']]} compact />
      <section className="sec sec--ivory"><Gallery items={GALLERY} /></section>
      <CtaBand />
    </>
  )
}
