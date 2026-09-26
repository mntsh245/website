import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BRANCH, SITE } from '@/lib/site';

// Schema generator function to prevent undefined variable errors
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${SITE.url}/#restaurant`,
  name: SITE.name,
  alternateName: 'Aminabad Dawat Aminabad',
  description:
    'Awadhi kebab house in Nazirabad Market, Aminabad, Lucknow, serving galouti kebab, ulte tawe ka paratha, Mughlai gravies and Lucknowi biryani since 1905.',
  url: SITE.url,
  telephone: BRANCH.phoneDial,
  email: BRANCH.email,
  priceRange: BRANCH.priceRange,
  servesCuisine: ['Awadhi', 'Mughlai', 'North Indian', 'Lucknowi'],
  foundingDate: String(SITE.established),
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BRANCH.street,
    addressLocality: BRANCH.city,
    addressRegion: BRANCH.state,
    postalCode: BRANCH.postalCode,
    addressCountry: BRANCH.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BRANCH.latitude,
    longitude: BRANCH.longitude,
  },
  hasMap: BRANCH.mapsUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: BRANCH.opens,
      closes: BRANCH.closes,
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: BRANCH.rating,
    reviewCount: BRANCH.reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Family seating', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Takeaway', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Halal certified', value: true },
  ],
  acceptsReservations: 'False',
  hasMenu: {
    '@type': 'Menu',
    name: 'Aminabad Dawat Aminabad Menu',
    url: `${SITE.url}/menu`,
  },
};

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-card">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="shell grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl text-fg">Aminabad Dawat</p>
          <p className="mt-1 text-sm text-accent">{SITE.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            One kitchen, one lane, four generations. Everything is cooked to order on the
            same iron tawa the family has used since the shop opened in Aminabad.
          </p>

          <a
            href={BRANCH.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-6"
          >
            <MapPin size={15} /> Open in Google Maps
          </a>
        </div>

        <div>
          <p className="font-display text-base text-fg">Find us</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <li className="flex gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
              <span>{BRANCH.fullAddress}</span>
            </li>
            <li className="flex gap-2">
              <Clock size={15} className="mt-0.5 shrink-0 text-accent" />
              <span>{BRANCH.hours}</span>
            </li>
            <li className="flex gap-2">
              <Phone size={15} className="mt-0.5 shrink-0 text-accent" />
              <a href={`tel:${BRANCH.phoneDial}`} className="hover:text-accent">
                {BRANCH.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail size={15} className="mt-0.5 shrink-0 text-accent" />
              <a href={`mailto:${BRANCH.email}`} className="break-all hover:text-accent">
                {BRANCH.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-base text-fg">Pages</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-accent">
                Full menu and ordering
              </Link>
            </li>
            <li>
              <Link href="/catering" className="hover:text-accent">
                Bulk catering and events
              </Link>
            </li>
            <li>
              <Link href="/outlets" className="hover:text-accent">
                Directions, parking, seating
              </Link>
            </li>
          </ul>

          <p className="mt-6 text-xs text-muted">
            Halal certified · FSSAI Lic. 12722004000531
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            {BRANCH.rating} ★ from {BRANCH.reviewCount?.toLocaleString('en-IN') || '10,000'}+ Google
            reviews
          </p>
        </div>
      </div>
    </footer>
  );
}