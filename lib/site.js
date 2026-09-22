export const SITE = {
  name: 'Tunday Kababi',
  legalName: 'Tunday Kababi — Aminabad',
  tagline: 'Galouti since 1905. Still hand-pounded, still Aminabad.',
  established: 1905,
  url: 'https://www.tundaykababi-aminabad.in',
};

export const BRANCH = {
  label: 'Aminabad Flagship',
  street: 'Nazirabad Market, Aminabad',
  city: 'Lucknow',
  state: 'Uttar Pradesh',
  postalCode: '226018',
  country: 'IN',
  fullAddress: 'Nazirabad Market, Aminabad, Lucknow, Uttar Pradesh 226018',
  phoneDisplay: '+91 98390 12345',
  phoneDial: '+919839012345',
  whatsapp: '919839012345',
  email: 'orders@tundaykababi-aminabad.in',
  hours: 'Daily, 11:00 AM – 11:30 PM',
  opens: '11:00',
  closes: '23:30',
  latitude: 26.8472,
  longitude: 80.9333,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Tunday+Kababi+Aminabad+Lucknow',
  rating: 4.9,
  reviewCount: 12450,
  priceRange: '₹₹',
};

export const SEATING = [
  {
    title: 'AC family dining, first floor',
    detail:
      '42 covers upstairs with separate family seating, table service and washbasins at both ends. Stairs are to the right of the counter; no lift.',
  },
  {
    title: 'Takeaway counter, ground floor',
    detail:
      'Kebabs go on the tawa to order. Average wait is 8–12 minutes at peak. Parcels are packed in butter paper with paratha stacked separately so it stays crisp.',
  },
  {
    title: 'Parking around Nazirabad',
    detail:
      'Two-wheelers park along the Nazirabad Market lane. Cars: paid lot behind Prince Market (250 m) or the Aminabad Inter College ground (400 m). The lane itself is pedestrian-heavy after 7 PM.',
  },
];

// 5% GST as specified, plus a flat packing charge per distinct item.
export const TAX_RATE = 0.05;
export const PACKAGING_PER_ITEM = 15;

export function currency(value) {
  return '₹' + Number(value).toLocaleString('en-IN');
}
