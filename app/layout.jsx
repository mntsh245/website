import './globals.css';
import { Marcellus, Karla, Cormorant_Garamond } from 'next/font/google';
import Providers from '@/app/providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { BRANCH, SITE } from '@/lib/site';

const display = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const body = Karla({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// Used for the handwritten dish names pressed into the menu card.
const script = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['italic'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Tunday Kababi, Aminabad — Galouti kebab in Lucknow since 1905',
    template: '%s · Tunday Kababi Aminabad',
  },
  description:
    'The Aminabad flagship of Tunday Kababi in Nazirabad Market, Lucknow. Galouti kebab, ulte tawe ka paratha, mutton chaap, Lucknowi biryani and phirni. Open daily 11:00 AM to 11:30 PM.',
  keywords: [
    'Tunday Kababi',
    'Tunday Kebab Aminabad',
    'galouti kebab Lucknow',
    'best kebab in Lucknow',
    'Awadhi food Aminabad',
    'ulte tawe ka paratha',
  ],
  openGraph: {
    title: 'Tunday Kababi, Aminabad — Galouti kebab in Lucknow since 1905',
    description:
      '160 spices, one iron tawa, four generations. Eat in upstairs or take it away from the Nazirabad counter.',
    url: SITE.url,
    siteName: SITE.name,
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdfbf7' },
    { media: '(prefers-color-scheme: dark)', color: '#120e0c' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${script.variable}`}
    >
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accentInk"
          >
            Skip to content
          </a>

          <Navbar />

          <main id="main">{children}</main>

          <Footer />
          <CartDrawer />
        </Providers>

        <noscript>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            Ordering needs JavaScript. Call {BRANCH.phoneDisplay} and we will take the
            order over the phone.
          </div>
        </noscript>
      </body>
    </html>
  );
}
