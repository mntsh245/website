'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Plus } from 'lucide-react';
import { useCart } from '@/app/providers';
import { SUPERSTARS } from '@/lib/menu';
import { currency } from '@/lib/site';

/**
 * Plating colours for the CSS-rendered dish. If you later shoot real photos,
 * drop them in /public/dishes/<id>.jpg and add `image: '/dishes/<id>.jpg'`
 * to the matching entry below — the component uses the photo instead.
 */
const PLATING = {
  'galouti-mutton': {
    image: null,
    body: '#5b2f1c',
    top: '#8a4a2a',
    rim: '#2f1810',
    shape: 'patty',
    garnish: '#8fae6a',
  },
  'paratha-ulta-tawa': {
    image: null,
    body: '#c98f34',
    top: '#e8bb63',
    rim: '#8a5c18',
    shape: 'disc',
    garnish: '#f3d68a',
  },
  'mutton-chaap': {
    image: null,
    body: '#6b2b18',
    top: '#9a4223',
    rim: '#38150c',
    shape: 'chop',
    garnish: '#c96f2b',
  },
  'chicken-korma': {
    image: null,
    body: '#d9c79a',
    top: '#efe3c1',
    rim: '#a08d5e',
    shape: 'bowl',
    garnish: '#7fa15c',
  },
  'shahi-tukda': {
    image: null,
    body: '#b47a2e',
    top: '#dda85a',
    rim: '#6e4415',
    shape: 'square',
    garnish: '#cfd6d8',
  },
  phirni: {
    image: null,
    body: '#e6dcc4',
    top: '#f6efdc',
    rim: '#a89473',
    shape: 'kulhad',
    garnish: '#e0a83a',
  },
};

const FALLBACK = {
  image: null,
  body: '#7a4a2a',
  top: '#a9683a',
  rim: '#3a2013',
  shape: 'patty',
  garnish: '#8fae6a',
};

function DishPlate({ item, active }) {
  const plate = PLATING[item.id] || FALLBACK;

  if (plate.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={plate.image}
        alt={item.name}
        className="h-full w-full object-contain drop-shadow-[0_28px_28px_rgba(60,35,10,0.35)]"
      />
    );
  }

  const shapes = {
    patty: (
      <g>
        <ellipse cx="110" cy="112" rx="58" ry="20" fill={plate.body} />
        <ellipse cx="110" cy="104" rx="58" ry="20" fill={plate.top} />
        <ellipse cx="96" cy="99" rx="16" ry="5" fill="#ffffff" opacity="0.22" />
        <ellipse cx="150" cy="118" rx="70" ry="16" fill={plate.body} opacity="0.35" />
        <ellipse cx="150" cy="110" rx="70" ry="16" fill={plate.top} opacity="0.55" />
        <circle cx="62" cy="124" r="7" fill={plate.garnish} />
        <circle cx="76" cy="130" r="5" fill={plate.garnish} opacity="0.8" />
      </g>
    ),
    disc: (
      <g>
        <ellipse cx="112" cy="116" rx="82" ry="30" fill={plate.rim} opacity="0.55" />
        <ellipse cx="112" cy="106" rx="82" ry="30" fill={plate.body} />
        <ellipse cx="112" cy="102" rx="70" ry="24" fill={plate.top} />
        <ellipse cx="88" cy="96" rx="20" ry="7" fill="#ffffff" opacity="0.3" />
        <ellipse cx="136" cy="110" rx="26" ry="8" fill={plate.rim} opacity="0.35" />
        <ellipse cx="112" cy="90" rx="48" ry="12" fill={plate.garnish} opacity="0.35" />
      </g>
    ),
    chop: (
      <g>
        <ellipse cx="112" cy="126" rx="76" ry="18" fill={plate.rim} opacity="0.45" />
        <path
          d="M52 118 Q64 78 106 80 Q152 82 164 112 Q168 128 142 130 L70 130 Q50 130 52 118 Z"
          fill={plate.body}
        />
        <path
          d="M64 112 Q76 88 108 90 Q144 92 152 112 Z"
          fill={plate.top}
          opacity="0.85"
        />
        <rect x="150" y="100" width="34" height="9" rx="4" fill="#efe6d2" />
        <circle cx="90" cy="104" r="6" fill={plate.garnish} opacity="0.7" />
      </g>
    ),
    bowl: (
      <g>
        <ellipse cx="112" cy="128" rx="74" ry="18" fill={plate.rim} opacity="0.45" />
        <path
          d="M44 92 Q112 72 180 92 L166 124 Q112 142 58 124 Z"
          fill="#f2ead8"
        />
        <ellipse cx="112" cy="94" rx="66" ry="17" fill={plate.body} />
        <ellipse cx="112" cy="92" rx="54" ry="13" fill={plate.top} />
        <circle cx="98" cy="90" r="6" fill={plate.garnish} />
        <circle cx="126" cy="95" r="4" fill={plate.garnish} opacity="0.8" />
      </g>
    ),
    square: (
      <g>
        <ellipse cx="112" cy="128" rx="70" ry="16" fill={plate.rim} opacity="0.45" />
        <path d="M60 96 L164 96 L154 126 L70 126 Z" fill={plate.body} />
        <path d="M60 96 L164 96 L158 86 L66 86 Z" fill={plate.top} />
        <rect x="80" y="78" width="64" height="9" rx="4" fill={plate.garnish} opacity="0.85" />
        <circle cx="96" cy="76" r="4" fill="#6f8f4c" />
        <circle cx="132" cy="76" r="4" fill="#6f8f4c" />
      </g>
    ),
    kulhad: (
      <g>
        <ellipse cx="112" cy="132" rx="56" ry="14" fill={plate.rim} opacity="0.45" />
        <path d="M74 80 L150 80 L142 130 L82 130 Z" fill="#a9724a" />
        <path d="M74 80 L150 80 L146 72 L78 72 Z" fill="#8c5a36" />
        <ellipse cx="112" cy="78" rx="34" ry="9" fill={plate.top} />
        <circle cx="104" cy="77" r="3" fill={plate.garnish} />
        <circle cx="120" cy="79" r="2.5" fill={plate.garnish} />
      </g>
    ),
  };

  return (
    <svg
      viewBox="0 0 224 160"
      role="img"
      aria-label={item.name}
      className="h-full w-full drop-shadow-[0_26px_26px_rgba(60,35,10,0.32)]"
    >
      <defs>
        <radialGradient id={`sheen-${item.id}`} cx="35%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {shapes[plate.shape] || shapes.patty}
      <rect width="224" height="160" fill={`url(#sheen-${item.id})`} />
      {active ? (
        <g className="animate-steam" style={{ transformOrigin: '112px 80px' }}>
          <path
            d="M96 66 Q102 54 96 42"
            stroke="#ffffff"
            strokeOpacity="0.5"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M118 62 Q125 48 118 34"
            stroke="#ffffff"
            strokeOpacity="0.4"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      ) : null}
    </svg>
  );
}

export default function MenuReel({ heading, intro, autoPlay = true }) {
  const dishes = SUPERSTARS;
  const { addItem } = useCart();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const stageRef = useRef(null);
  const touchStart = useRef(null);

  const go = useCallback(
    (direction) => {
      setActive((current) => {
        const next = current + direction;
        if (next < 0) return dishes.length - 1;
        if (next >= dishes.length) return 0;
        return next;
      });
    },
    [dishes.length]
  );

  // Auto pan, paused on hover, focus, tab-away or reduced motion.
  useEffect(() => {
    if (!playing) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const timer = setInterval(() => {
      if (document.hidden) return;
      setActive((current) => (current + 1) % dishes.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [playing, dishes.length]);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  };

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const current = dishes[active];

  return (
    <section
      className="reel relative overflow-hidden border-y border-line py-14 sm:py-20"
      aria-roledescription="carousel"
      aria-label="Signature dishes on the menu card"
    >
      {/* Warm window light drifting across the paper */}
      <div aria-hidden="true" className="reel-light" />

      <div className="shell relative">
        {heading ? (
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-fg sm:text-4xl">{heading}</h2>
            {intro ? (
              <p className="mt-3 text-base leading-relaxed text-muted">{intro}</p>
            ) : null}
          </div>
        ) : null}

        {/* The menu card */}
        <div className="reel-card relative mx-auto mt-10 max-w-5xl">
          <div className="reel-paper">
            <p className="reel-engrave text-center font-display text-sm tracking-[0.3em] text-[#8a6a3a]">
              TUNDAY KABABI
            </p>
            <p className="reel-engrave mt-1 text-center font-script text-2xl text-[#6f5326]">
              Aminabad, since 1905
            </p>

            <div
              ref={stageRef}
              tabIndex={0}
              role="group"
              aria-label={`Dish ${active + 1} of ${dishes.length}: ${current.name}`}
              onKeyDown={onKeyDown}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onMouseEnter={() => setPlaying(false)}
              onMouseLeave={() => setPlaying(autoPlay)}
              onFocus={() => setPlaying(false)}
              onBlur={() => setPlaying(autoPlay)}
              className="reel-stage relative mt-6 overflow-hidden outline-none"
            >
              <div className="reel-track flex" style={{ '--i': active }}>
                {dishes.map((dish, index) => {
                  const distance = Math.abs(index - active);
                  const isActive = index === active;
                  return (
                    <figure
                      key={dish.id}
                      aria-hidden={!isActive}
                      className="reel-slide flex shrink-0 flex-col items-center px-3 sm:px-5"
                      style={{
                        transform: `scale(${isActive ? 1 : 0.82}) translateY(${
                          isActive ? 0 : 14
                        }px)`,
                        filter: `blur(${Math.min(distance * 3.2, 7)}px)`,
                        opacity: isActive ? 1 : Math.max(0.28, 0.6 - distance * 0.16),
                        transition:
                          'transform 900ms cubic-bezier(.22,1,.36,1), filter 900ms ease, opacity 900ms ease',
                      }}
                    >
                      <div className="h-32 w-full sm:h-44">
                        <DishPlate item={dish} active={isActive} />
                      </div>

                      <figcaption className="mt-4 text-center">
                        <span className="reel-engrave block font-script text-2xl leading-tight text-[#4a3520] sm:text-3xl">
                          {dish.name.replace('Legendary ', '')}
                        </span>
                        <span className="reel-engrave mt-1 block font-script text-xl text-[#7a5a2c]">
                          {currency(dish.full)}
                        </span>
                        <span className="mx-auto mt-2 block h-px w-10 bg-[#b99a5c]/60" />
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>

            {/* Camera controls sit on the paper, like a menu clip */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="reel-btn"
                aria-label="Previous dish"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="reel-btn"
                aria-label={playing ? 'Pause the pan' : 'Resume the pan'}
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>

              <button
                type="button"
                onClick={() => go(1)}
                className="reel-btn"
                aria-label="Next dish"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Live detail for the dish in focus */}
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p key={current.id} className="animate-fadeIn text-sm leading-relaxed text-muted">
            {current.story}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => addItem(current, 'full', 1)}
              className="btn-solid"
            >
              <Plus size={15} /> Add {current.name.replace('Legendary ', '')} ·{' '}
              {currency(current.full)}
            </button>

            <div className="flex items-center gap-1.5" role="tablist" aria-label="Dishes">
              {dishes.map((dish, index) => (
                <button
                  key={dish.id}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={dish.name}
                  onClick={() => setActive(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === active ? 'w-7 bg-accent' : 'w-1.5 bg-line hover:bg-accent/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
