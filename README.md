# Tunday Kababi — Aminabad, Lucknow

Next.js 14 (App Router, JavaScript) site for the Nazirabad Market flagship. Dark/light theming with `next-themes`, an interactive menu with half/full portions, a slide-over cart with GST and packaging, and a validated catering enquiry form.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

The first build downloads the Marcellus and Karla webfonts through `next/font/google`, so keep an internet connection for that step.

## Structure

```
app/
  globals.css        theme tokens for both palettes
  providers.jsx      ThemeProvider + cart context (useCart)
  layout.jsx         fonts, metadata, navbar, footer, cart drawer
  page.jsx           hero, heritage, house specialities, reviews, location
  menu/page.jsx      search, category tabs, dietary filters
  catering/page.jsx  packages, validated enquiry form, live estimate
  outlets/page.jsx   sketch map, hours, parking, routes
components/
  Navbar.jsx  Footer.jsx  CartDrawer.jsx  ThemeToggle.jsx
  DishCard.jsx  StarRating.jsx
lib/
  site.js    branch details, WhatsApp number, tax and packaging rates
  menu.js    dishes, catering packages, reviews
```

## Things you will want to change

Everything business-specific lives in `lib/site.js`:

- `BRANCH.whatsapp` — the number orders are sent to (country code, no `+`)
- `BRANCH.phoneDial` / `phoneDisplay` / `email`
- `BRANCH.latitude` / `longitude` and `mapsUrl`
- `TAX_RATE` (currently 5%) and `PACKAGING_PER_ITEM` (₹15 per distinct item)

Menu items, prices, ratings and catering packages live in `lib/menu.js`.

## Theming

Both palettes are CSS variables in `app/globals.css`, exposed to Tailwind as semantic colours (`bg`, `card`, `raised`, `fg`, `muted`, `line`, `accent`, `royal`). Dark is Royal Awadhi (charcoal `#120e0c`, gold `#d4af37`, emerald `#064e3b`); light is Royal Cream (ivory `#fdfbf7`, white cards, amber `#b45309`, crimson `#881337`). Switching themes only swaps the variables, so no component carries `dark:` overrides.

## Ordering flow

The cart lives in React state and posts nothing to a server. "Place order on WhatsApp" builds a formatted `wa.me` message with every line, the subtotal, packaging, 5% GST and the total. Swap `buildWhatsAppLink` in `components/CartDrawer.jsx` for an API route when you add a payment gateway.
