'use client';

import { Star } from 'lucide-react';

/**
 * Visual 5-star rating with a numeric score and optional review count.
 * Renders half stars by clipping a filled star over an outlined one.
 */
export default function StarRating({
  value = 5,
  reviews = null,
  size = 15,
  showNumber = true,
  label = 'Google Reviews',
  className = '',
}) {
  const stars = [1, 2, 3, 4, 5];
  const rounded = Math.round(value * 10) / 10;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Rated ${rounded} out of 5`}
      >
        {stars.map((position) => {
          const fillPercent = Math.max(0, Math.min(1, value - (position - 1))) * 100;
          return (
            <span
              key={position}
              className="relative inline-block"
              style={{ width: size, height: size }}
            >
              <Star
                size={size}
                className="absolute inset-0 text-accent/35"
                strokeWidth={1.5}
              />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <Star
                  size={size}
                  className="text-accent"
                  fill="currentColor"
                  strokeWidth={1.5}
                />
              </span>
            </span>
          );
        })}
      </span>

      {showNumber ? (
        <span className="text-sm font-semibold text-fg">{rounded.toFixed(1)}</span>
      ) : null}

      {reviews ? (
        <span className="text-xs text-muted">
          ({reviews.toLocaleString('en-IN')}+ {label})
        </span>
      ) : null}
    </div>
  );
}
