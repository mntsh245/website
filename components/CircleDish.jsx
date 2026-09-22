'use client';

const RECIPES = {
  'galouti-mutton': { base: '#4a2513', mid: '#7a3f20', top: '#a56a3c', bits: '#c7d96a' },
  'paratha-ulta-tawa': { base: '#8a5c18', mid: '#c98f34', top: '#e8bb63', bits: '#f3d68a' },
  'mutton-chaap': { base: '#38150c', mid: '#6b2b18', top: '#9a4223', bits: '#c96f2b' },
  'chicken-korma': { base: '#a08d5e', mid: '#d9c79a', top: '#efe3c1', bits: '#7fa15c' },
  'shahi-tukda': { base: '#6e4415', mid: '#b47a2e', top: '#dda85a', bits: '#cfd6d8' },
  phirni: { base: '#a89473', mid: '#e6dcc4', top: '#f6efdc', bits: '#e0a83a' },
};
const FALLBACK = { base: '#3a2013', mid: '#7a4a2a', top: '#a9683a', bits: '#8fae6a' };

/**
 * A circular "plated dish" rendering used wherever the design calls for a
 * photo of the dish shot from above on a dark table. If you have real
 * photography, drop it at /public/dishes/<id>.jpg and pass `image` — this
 * component will render the photo inside the same glowing circular frame
 * instead of the SVG plate.
 */
export default function CircleDish({ item, image = null, size = 'md', float = true }) {
  const palette = RECIPES[item.id] || FALLBACK;
  const sizes = {
    sm: 'h-40 w-40 sm:h-48 sm:w-48',
    md: 'h-56 w-56 sm:h-64 sm:w-64',
    lg: 'h-72 w-72 sm:h-[22rem] sm:w-[22rem]',
  };

  return (
    <div
      className={`circle-frame ${sizes[size] || sizes.md} ${
        float ? 'animate-floatSlow' : ''
      }`}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={item.name}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label={item.name}>
          <defs>
            <radialGradient id={`dish-${item.id}`} cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor={palette.top} />
              <stop offset="55%" stopColor={palette.mid} />
              <stop offset="100%" stopColor={palette.base} />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="78" fill={`url(#dish-${item.id})`} />
          <circle cx="78" cy="76" r="6" fill={palette.bits} opacity="0.85" />
          <circle cx="118" cy="64" r="4" fill={palette.bits} opacity="0.7" />
          <circle cx="132" cy="108" r="5" fill={palette.bits} opacity="0.6" />
          <circle cx="70" cy="118" r="4.5" fill={palette.bits} opacity="0.7" />
          <circle cx="100" cy="100" r="78" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="1" />
        </svg>
      )}
    </div>
  );
}
