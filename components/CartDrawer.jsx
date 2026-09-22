'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';

import { useCart } from '@/app/providers';
import { BRANCH, PACKAGING_PER_ITEM, currency } from '@/lib/site';

export default function CartDrawer() {
  // Get cart context safely
  const cart = useCart();

  // Safe defaults
  const lines = cart?.lines ?? [];

  const totals = cart?.totals ?? {
    count: 0,
    subtotal: 0,
    packaging: 0,
    gst: 0,
    grandTotal: 0,
  };

  const isOpen = cart?.isOpen ?? false;

  const closeCart = cart?.closeCart ?? (() => {});
  const changeQuantity = cart?.changeQuantity ?? (() => {});
  const removeLine = cart?.removeLine ?? (() => {});
  const clearCart = cart?.clearCart ?? (() => {});

  const [mode, setMode] = useState('takeaway');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeCart();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (panelRef.current) {
      panelRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCart]);

  const buildWhatsAppLink = () => {
    const itemLines = lines
      .map(
        (line) =>
          `• ${line.name} (${
            line.portion === 'half' ? 'Half' : 'Full'
          } plate) × ${line.quantity} — ${currency(
            line.price * line.quantity
          )}`
      )
      .join('\n');

    const message = [
      `Order for Tunday Kababi, ${BRANCH.street}`,
      '',
      itemLines,
      '',
      `Subtotal: ${currency(totals.subtotal)}`,
      `Packaging: ${currency(totals.packaging)}`,
      `GST (5%): ${currency(totals.gst)}`,
      `Total payable: ${currency(totals.grandTotal)}`,
      '',
      `Type: ${
        mode === 'takeaway'
          ? 'Takeaway pickup'
          : 'Dine-in, first floor'
      }`,
      `Name: ${name.trim() || 'Not given'}`,
      note.trim() ? `Note: ${note.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${
      BRANCH.whatsapp
    }?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? '' : 'pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-charcoal/60 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-bg shadow-plate outline-none transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 className="font-display text-xl text-fg">
              Your order
            </h2>

            <p className="text-xs text-muted">
              Nazirabad counter ·{' '}
              {BRANCH.hours.replace('Daily, ', '')}
            </p>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg transition hover:border-accent hover:text-accent"
            aria-label="Close order panel"
          >
            <X size={18} />
          </button>
        </header>

        {/* Empty cart */}
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag
              size={30}
              className="text-accent"
              strokeWidth={1.4}
            />

            <p className="text-sm text-muted">
              Nothing here yet. Start with a half plate of
              galouti and one ulte tawe ka paratha — that is
              how most people begin.
            </p>

            <Link
              href="/menu"
              onClick={closeCart}
              className="btn-solid"
            >
              Browse the menu
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-3">
                {lines.map((line) => (
                  <li
                    key={line.key}
                    className="card-surface flex items-start gap-3 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-fg">
                        {line.name}
                      </p>

                      <p className="mt-0.5 text-xs text-muted">
                        {line.portion === 'half'
                          ? 'Half plate'
                          : 'Full plate'}{' '}
                        · {line.unit} · {line.diet}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-accent">
                        {currency(line.price * line.quantity)}

                        <span className="ml-1 text-xs font-normal text-muted">
                          ({currency(line.price)} each)
                        </span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 rounded-full border border-line p-0.5">
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(line.key, -1)
                          }
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-fg transition hover:bg-raised"
                          aria-label={`Reduce ${line.name}`}
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-5 text-center text-sm font-semibold text-fg">
                          {line.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(line.key, 1)
                          }
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-fg transition hover:bg-raised"
                          aria-label={`Add another ${line.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeLine(line.key)
                        }
                        className="inline-flex items-center gap-1 text-xs text-muted transition hover:text-royal"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Order Type */}
              <div className="mt-5 flex gap-2">
                {[
                  {
                    id: 'takeaway',
                    label: 'Takeaway',
                  },
                  {
                    id: 'dinein',
                    label: 'Dine-in, first floor',
                  },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMode(option.id)}
                    className={`chip flex-1 justify-center ${
                      mode === option.id ? 'chip-on' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Customer Details */}
              <div className="mt-3 flex flex-col gap-2">
                <input
                  className="field"
                  placeholder="Name for the order"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  aria-label="Name for the order"
                />

                <textarea
                  className="field min-h-[72px] resize-y"
                  placeholder="Anything the kitchen should know — less chilli, extra chutney, paratha packed separately"
                  value={note}
                  onChange={(event) =>
                    setNote(event.target.value)
                  }
                  aria-label="Note for the kitchen"
                />
              </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-line bg-card px-5 py-4">
              <dl className="flex flex-col gap-1.5 text-sm">
                {/* Subtotal */}
                <div className="flex justify-between text-muted">
                  <dt>Subtotal</dt>

                  <dd className="text-fg">
                    {currency(totals.subtotal)}
                  </dd>
                </div>

                {/* Packaging */}
                <div className="flex justify-between text-muted">
                  <dt>
                    Packaging ({lines.length}{' '}
                    {lines.length === 1 ? 'item' : 'items'} ×{' '}
                    {currency(PACKAGING_PER_ITEM)})
                  </dt>

                  <dd className="text-fg">
                    {currency(totals.packaging)}
                  </dd>
                </div>

                {/* GST */}
                <div className="flex justify-between text-muted">
                  <dt>GST at 5%</dt>

                  <dd className="text-fg">
                    {currency(totals.gst)}
                  </dd>
                </div>

                <div className="my-1 rule-gold" />

                {/* Total */}
                <div className="flex justify-between text-base font-semibold">
                  <dt className="text-fg">
                    Total payable
                  </dt>

                  <dd className="text-accent">
                    {currency(totals.grandTotal)}
                  </dd>
                </div>
              </dl>

              {/* WhatsApp */}
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid mt-4 w-full"
              >
                Place order on WhatsApp
              </a>

              {/* Clear */}
              <button
                type="button"
                onClick={clearCart}
                className="mt-2 w-full text-center text-xs text-muted transition hover:text-royal"
              >
                Clear the order
              </button>

              <p className="mt-2 text-center text-[11px] text-muted">
                We confirm every order on WhatsApp before
                cooking. Pay at the counter on pickup.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}