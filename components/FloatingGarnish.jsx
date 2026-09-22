'use client';

/**
 * A handful of small hand-drawn SVG garnish pieces, absolutely positioned
 * and set to a gentle CSS float (see .garnish-item / floatY in globals.css).
 * Pass `variant` to pick which scatter pattern to use around a given
 * visual — "hero" is wider, "dish" is tighter for the circular menu cards.
 */

function Chilli({ style }) {
  return (
    <svg viewBox="0 0 40 40" className="garnish-item h-8 w-8 sm:h-10 sm:w-10" style={style}>
      <path
        d="M8 10c6-4 14-4 18 2 3 4 2 10-3 14-5 4-13 4-17-1-3-4-3-10 2-15Z"
        fill="#b3311f"
      />
      <path d="M8 10c2-3 4-5 4-5" stroke="#4c7a34" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M11 8c1-2 3-4 5-4" stroke="#4c7a34" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function MintLeaf({ style }) {
  return (
    <svg viewBox="0 0 40 40" className="garnish-item h-7 w-7 sm:h-9 sm:w-9" style={style}>
      <path
        d="M20 6c9 2 15 10 12 20-8 3-18 0-20-9C10 10 14 7 20 6Z"
        fill="#5f8a3f"
      />
      <path d="M20 8c1 8 3 13 8 16" stroke="#3d5e26" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function LimeSlice({ style }) {
  return (
    <svg viewBox="0 0 40 40" className="garnish-item h-7 w-7 sm:h-9 sm:w-9" style={style}>
      <circle cx="20" cy="20" r="15" fill="#c7d96a" />
      <circle cx="20" cy="20" r="15" fill="none" stroke="#8fae4a" strokeWidth="2" />
      {[0, 45, 90, 135].map((deg) => (
        <line
          key={deg}
          x1="20"
          y1="7"
          x2="20"
          y2="33"
          stroke="#eef3c9"
          strokeWidth="1.4"
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
    </svg>
  );
}

function SpiceDust({ style }) {
  return (
    <svg viewBox="0 0 40 40" className="garnish-item h-6 w-6 sm:h-7 sm:w-7 opacity-80" style={style}>
      <circle cx="10" cy="14" r="1.6" fill="#caa356" />
      <circle cx="18" cy="8" r="1.2" fill="#caa356" />
      <circle cx="26" cy="16" r="1.8" fill="#b3311f" />
      <circle cx="14" cy="24" r="1.3" fill="#b3311f" />
      <circle cx="24" cy="26" r="1.5" fill="#caa356" />
      <circle cx="32" cy="10" r="1" fill="#caa356" />
    </svg>
  );
}

const SCATTERS = {
  hero: [
    { Item: Chilli, top: '6%', left: '2%', delay: '0s', duration: '7s', rotate: '-12deg' },
    { Item: MintLeaf, top: '68%', left: '-4%', delay: '1.2s', duration: '8s', rotate: '10deg' },
    { Item: LimeSlice, top: '4%', left: '86%', delay: '0.6s', duration: '9s', rotate: '-6deg' },
    { Item: SpiceDust, top: '40%', left: '92%', delay: '2s', duration: '6s', rotate: '0deg' },
    { Item: Chilli, top: '80%', left: '78%', delay: '1.8s', duration: '7.5s', rotate: '18deg' },
    { Item: SpiceDust, top: '16%', left: '18%', delay: '0.9s', duration: '6.5s', rotate: '0deg' },
  ],
  dish: [
    { Item: MintLeaf, top: '-6%', left: '8%', delay: '0.2s', duration: '6s', rotate: '-10deg' },
    { Item: Chilli, top: '4%', left: '82%', delay: '1s', duration: '7s', rotate: '14deg' },
    { Item: SpiceDust, top: '78%', left: '-4%', delay: '0.6s', duration: '5.5s', rotate: '0deg' },
    { Item: LimeSlice, top: '82%', left: '84%', delay: '1.4s', duration: '6.8s', rotate: '-8deg' },
  ],
};

export default function FloatingGarnish({ variant = 'hero', className = '' }) {
  const pieces = SCATTERS[variant] || SCATTERS.hero;

  return (
    <div aria-hidden="true" className={`garnish-layer ${className}`}>
      {pieces.map((piece, index) => (
        <piece.Item
          key={index}
          style={{
            top: piece.top,
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            '--rot': piece.rotate,
          }}
        />
      ))}
    </div>
  );
}
