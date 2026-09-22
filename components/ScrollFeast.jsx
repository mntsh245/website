'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '@/app/providers';
import { getItem } from '@/lib/menu';
import { currency } from '@/lib/site';

/**
 * Maps `value` from [inMin, inMax] to [outMin, outMax], clamped to the
 * output range. This is the only math the whole animation runs on —
 * every moving part below is just this function called with a different
 * window of the scroll progress (0 to 1).
 */
function map(value, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  const clamped = Math.min(1, Math.max(0, t));
  return outMin + clamped * (outMax - outMin);
}

const STAGES = [
  {
    range: [0, 0.16],
    kicker: 'It starts on the tawa',
    line: 'One iron plate, on the fire since 1905.',
  },
  {
    range: [0.16, 0.42],
    kicker: 'Hand-pounded, not chopped',
    line: '160 spices, mince worked on stone until it needs no teeth.',
  },
  {
    range: [0.42, 0.66],
    kicker: 'Ulte tawe ka paratha',
    line: 'Slapped onto the upturned tawa so the layers stay crisp, not steamed.',
  },
  {
    range: [0.66, 0.86],
    kicker: 'Finished at the counter',
    line: 'Mint chutney drizzled last, onion and lime on the side.',
  },
  {
    range: [0.86, 1],
    kicker: 'On your plate in minutes',
    line: 'Cooked to order at Nazirabad Market, Aminabad.',
  },
];

function activeStageIndex(progress) {
  const index = STAGES.findIndex((s) => progress >= s.range[0] && progress < s.range[1]);
  return index === -1 ? STAGES.length - 1 : index;
}

export default function ScrollFeast() {
  const { addItem } = useCart();
  const dish = getItem('galouti-mutton');
  const paratha = getItem('paratha-ulta-tawa');

  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const frame = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const onChange = (e) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return undefined;

    const el = sectionRef.current;
    if (!el) return undefined;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const next = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress(next);
      frame.current = null;
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [reduced]);

  const p = reduced ? 1 : progress;
  const stage = STAGES[activeStageIndex(p)];

  // --- Choreography: every transform below is derived from p (0 → 1) ---

  // Plate: drifts in, settles centre, gently grows at the very end.
  const plateX = map(p, 0, 0.14, -6, 0);
  const plateScale = map(p, 0.86, 1, 1, 1.08);
  const plateRotate = map(p, 0, 1, -3, 2);

  // Kebab pieces: three pieces fly onto the plate one after another.
  const kebab1 = {
    x: map(p, 0.16, 0.26, -120, 0),
    y: map(p, 0.16, 0.26, -40, 0),
    r: map(p, 0.16, 0.26, -50, -8),
    o: map(p, 0.16, 0.24, 0, 1),
  };
  const kebab2 = {
    x: map(p, 0.22, 0.32, 130, 0),
    y: map(p, 0.22, 0.32, -50, 6),
    r: map(p, 0.22, 0.32, 60, 10),
    o: map(p, 0.22, 0.3, 0, 1),
  };
  const kebab3 = {
    x: map(p, 0.28, 0.38, 0, 0),
    y: map(p, 0.28, 0.38, -120, -14),
    r: map(p, 0.28, 0.38, 20, -4),
    o: map(p, 0.28, 0.36, 0, 1),
  };

  // Paratha: unrolls in from the right and slides half under the kebab.
  const parathaX = map(p, 0.42, 0.58, 220, 40);
  const parathaO = map(p, 0.42, 0.5, 0, 1);
  const parathaRotate = map(p, 0.42, 0.6, 30, 6);

  // Chutney: a drawn stroke that "draws itself" across the plate.
  const chutneyDash = map(p, 0.66, 0.8, 340, 0);
  const chutneyO = map(p, 0.66, 0.7, 0, 1);

  // Garnish: onion rings and lime drop in last.
  const garnishO = map(p, 0.74, 0.84, 0, 1);
  const garnishY = map(p, 0.74, 0.84, 20, 0);

  // Steam: only once the dish is basically complete.
  const steamO = map(p, 0.9, 1, 0, 0.8);

  // Caption card: fades between stages using the same progress value.
  const captionO = 1 - Math.pow(Math.abs(map(p, stage.range[0], stage.range[1], -1, 1)), 4);

  // CTA: appears only in the final stretch.
  const ctaO = map(p, 0.92, 1, 0, 1);
  const ctaY = map(p, 0.92, 1, 16, 0);

  return (
    <section
      ref={sectionRef}
      aria-label="How a plate of galouti and paratha comes together"
      className={reduced ? 'relative' : 'relative'}
      style={{ height: reduced ? 'auto' : '380vh' }}
    >
      <div
        className={`${
          reduced ? '' : 'sticky top-0'
        } flex h-[100dvh] items-center justify-center overflow-hidden border-y border-line bg-gradient-to-b from-bg via-card to-bg`}
      >
        {/* Ambient light, matches the menu-card reel */}
        <div aria-hidden="true" className="reel-light" />

        <div className="shell relative grid w-full items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Caption side */}
          <div className="relative order-2 lg:order-1">
            <div
              style={reduced ? {} : { opacity: Math.max(0.15, captionO) }}
              className="max-w-md"
            >
              <p className="text-sm font-semibold tracking-wide text-accent">
                {stage.kicker}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-fg sm:text-4xl">
                {stage.line}
              </h2>
            </div>

            <div
              style={
                reduced
                  ? { opacity: 1, transform: 'none' }
                  : { opacity: ctaO, transform: `translateY(${ctaY}px)` }
              }
              className="mt-8"
            >
              <button
                type="button"
                onClick={() => {
                  addItem(dish, 'full', 1);
                  addItem(paratha, 'full', 1);
                }}
                className="btn-solid"
              >
                <Plus size={15} /> Add galouti + paratha ·{' '}
                {currency(dish.full + paratha.full)}
              </button>
            </div>

            {/* Progress rail */}
            {!reduced ? (
              <div className="mt-10 hidden max-w-xs items-center gap-1.5 sm:flex">
                {STAGES.map((s, index) => (
                  <span
                    key={s.kicker}
                    className="h-1 flex-1 overflow-hidden rounded-full bg-line"
                  >
                    <span
                      className="block h-full bg-accent transition-[width] duration-150 ease-linear"
                      style={{
                        width: `${map(p, s.range[0], s.range[1], 0, 100)}%`,
                        opacity: p >= s.range[0] ? 1 : 0.3,
                      }}
                    />
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {/* Plate side */}
          <div className="order-1 flex justify-center lg:order-2">
            <svg
              viewBox="0 0 480 420"
              role="img"
              aria-hidden={!reduced}
              className="h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] lg:h-[420px] lg:w-[420px]"
              style={
                reduced
                  ? {}
                  : {
                      transform: `translateX(${plateX}%) rotate(${plateRotate}deg) scale(${plateScale})`,
                    }
              }
            >
              <defs>
                <radialGradient id="plateShine" cx="35%" cy="28%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="plateShadow" cx="50%" cy="50%" r="50%">
                  <stop offset="70%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
                </radialGradient>
              </defs>

              {/* Table shadow */}
              <ellipse cx="240" cy="360" rx="170" ry="26" fill="rgb(var(--shadow) / 0.18)" />

              {/* Plate */}
              <circle cx="240" cy="210" r="180" fill="#efe6d4" />
              <circle cx="240" cy="210" r="180" fill="url(#plateShadow)" />
              <circle cx="240" cy="210" r="148" fill="#f8f2e6" />
              <circle cx="240" cy="210" r="148" fill="url(#plateShine)" />
              <circle
                cx="240"
                cy="210"
                r="148"
                fill="none"
                stroke="rgb(var(--accent) / 0.35)"
                strokeWidth="1.5"
              />

              {/* Paratha, slides in from the right and sits under the kebabs */}
              <g
                style={
                  reduced
                    ? {}
                    : {
                        transform: `translateX(${parathaX}px) rotate(${parathaRotate}deg)`,
                        transformOrigin: '300px 230px',
                        opacity: reduced ? 1 : parathaO,
                      }
                }
                opacity={reduced ? 1 : undefined}
              >
                <ellipse cx="300" cy="230" rx="120" ry="46" fill="#c98f34" />
                <ellipse cx="300" cy="222" rx="120" ry="46" fill="#e8bb63" />
                <path
                  d="M190 222 Q300 190 410 222"
                  stroke="#a9722a"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.5"
                />
                <path
                  d="M198 232 Q300 202 402 232"
                  stroke="#a9722a"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.4"
                />
                <ellipse cx="255" cy="206" rx="26" ry="9" fill="#f6dfa0" opacity="0.7" />
              </g>

              {/* Kebab pieces */}
              {[kebab1, kebab2, kebab3].map((k, index) => (
                <g
                  key={index}
                  style={
                    reduced
                      ? {}
                      : {
                          transform: `translate(${k.x}px, ${k.y}px) rotate(${k.r}deg)`,
                          transformOrigin: '200px 230px',
                          opacity: reduced ? 1 : k.o,
                        }
                  }
                  opacity={reduced ? 1 : undefined}
                >
                  <ellipse
                    cx={200 + index * 34}
                    cy={230 - index * 6}
                    rx="46"
                    ry="18"
                    fill="#4a2513"
                  />
                  <ellipse
                    cx={200 + index * 34}
                    cy={226 - index * 6}
                    rx="46"
                    ry="18"
                    fill="#7a3f20"
                  />
                  <ellipse
                    cx={188 + index * 34}
                    cy={220 - index * 6}
                    rx="14"
                    ry="5"
                    fill="#a56a3c"
                    opacity="0.5"
                  />
                </g>
              ))}

              {/* Chutney drizzle, drawn as a stroking path */}
              <path
                d="M150 190 Q180 170 205 195 Q230 220 258 192 Q285 165 312 190 Q335 210 360 185"
                fill="none"
                stroke="#5c7a3a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="340"
                style={
                  reduced
                    ? {}
                    : { strokeDashoffset: chutneyDash, opacity: chutneyO }
                }
                opacity={reduced ? 1 : undefined}
              />

              {/* Garnish: onion rings + lime */}
              <g
                style={
                  reduced
                    ? {}
                    : {
                        transform: `translateY(${garnishY}px)`,
                        opacity: reduced ? 1 : garnishO,
                      }
                }
                opacity={reduced ? 1 : undefined}
              >
                <ellipse cx="150" cy="270" rx="20" ry="8" fill="none" stroke="#a06fb0" strokeWidth="3" />
                <ellipse cx="172" cy="278" rx="16" ry="6.5" fill="none" stroke="#a06fb0" strokeWidth="3" />
                <path
                  d="M330 268 A16 16 0 1 1 330 267.9"
                  fill="#c7d96a"
                  stroke="#8fae4a"
                  strokeWidth="2"
                />
              </g>

              {/* Steam, once the plate is basically done */}
              <g style={reduced ? { opacity: 0 } : { opacity: steamO }}>
                <path
                  d="M210 150 Q220 128 210 106"
                  stroke="#ffffff"
                  strokeOpacity="0.55"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-steam"
                />
                <path
                  d="M250 146 Q262 122 250 96"
                  stroke="#ffffff"
                  strokeOpacity="0.4"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-steam"
                  style={{ animationDelay: '1.1s' }}
                />
                <path
                  d="M288 152 Q298 130 288 108"
                  stroke="#ffffff"
                  strokeOpacity="0.35"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-steam"
                  style={{ animationDelay: '2s' }}
                />
              </g>
            </svg>
          </div>
        </div>

        {!reduced && p < 0.98 ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted"
            style={{ opacity: 1 - p * 3 }}
          >
            Keep scrolling ↓
          </div>
        ) : null}
      </div>
    </section>
  );
}
