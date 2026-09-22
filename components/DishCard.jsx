'use client';

import { useState } from 'react';
import { Flame, Plus, ShieldCheck } from 'lucide-react';
import StarRating from '@/components/StarRating';
import { useCart } from '@/app/providers';
import { SPICE_LABEL } from '@/lib/menu';
import { currency } from '@/lib/site';

const DIET_TONE = {
  Mutton: 'text-royal border-royal/40 bg-royal/10',
  Chicken: 'text-accent border-accent/40 bg-accent/10',
  Buff: 'text-muted border-line bg-raised',
  Vegetarian: 'text-emerald border-emerald/40 bg-emerald/10 dark:text-accent',
};

export default function DishCard({ item, feature = false }) {
  const { addItem } = useCart();
  const [portion, setPortion] = useState('full');

  const price = portion === 'half' ? item.half : item.full;
  const portionLabel = portion === 'half' ? 'Half plate' : 'Full plate';
  const unitParts = item.unit.split(' / ');
  const unitText = portion === 'half' ? unitParts[0] : unitParts[1] || item.unit;

  return (
    <article
      className={`card-surface flex flex-col overflow-hidden shadow-plate ${
        feature ? 'p-6 sm:p-7' : 'p-5'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            className={`font-display text-fg ${
              feature ? 'text-2xl leading-snug' : 'text-lg leading-snug'
            }`}
          >
            {item.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{item.local}</p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
            DIET_TONE[item.diet] || 'border-line text-muted'
          }`}
        >
          {item.diet}
        </span>
      </div>

      <StarRating
        value={item.rating}
        reviews={item.reviews}
        className="mt-3"
        size={14}
      />

      {item.story ? (
        <p
          className={`mt-4 text-sm leading-relaxed text-muted ${
            feature ? '' : 'line-clamp-4'
          }`}
        >
          {item.story}
        </p>
      ) : null}

      {feature && item.note ? (
        <p className="mt-3 border-l-2 border-accent/50 pl-3 text-sm italic text-fg/80">
          {item.note}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="chip" title={SPICE_LABEL[item.spice]}>
          {[1, 2, 3].map((level) => (
            <Flame
              key={level}
              size={12}
              className={level <= item.spice ? 'text-royal' : 'text-line'}
              fill={level <= item.spice ? 'currentColor' : 'none'}
            />
          ))}
          <span className="ml-1">{SPICE_LABEL[item.spice].split(' — ')[0]}</span>
        </span>

        {item.halal ? (
          <span className="chip">
            <ShieldCheck size={12} className="text-accent" /> Halal
          </span>
        ) : null}

        <span className="chip">{unitText}</span>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
        <div
          className="flex rounded-full border border-line p-0.5"
          role="group"
          aria-label={`Portion size for ${item.name}`}
        >
          {[
            { id: 'half', label: 'Half' },
            { id: 'full', label: 'Full' },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setPortion(option.id)}
              aria-pressed={portion === option.id}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                portion === option.id
                  ? 'bg-accent text-accentInk'
                  : 'text-muted hover:text-fg'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <span className="ml-auto text-right">
          <span className="block text-lg font-semibold text-fg">{currency(price)}</span>
          <span className="block text-[11px] text-muted">{portionLabel}</span>
        </span>
      </div>

      <button
        type="button"
        onClick={() => addItem(item, portion, 1)}
        className="btn-solid mt-3 w-full"
      >
        <Plus size={15} /> Add {portionLabel.toLowerCase()}
      </button>
    </article>
  );
}
