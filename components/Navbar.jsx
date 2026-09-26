'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, ShoppingBag, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useCart } from '@/app/providers';
import { BRANCH } from '@/lib/site';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/catering', label: 'Catering' },
  { href: '/outlets', label: 'Visit us' },
];

export default function Navbar() {
  const pathname = usePathname();

  const cart = useCart();

  // Safe defaults so Navbar doesn't crash if cart is initially empty
  const totals = cart?.totals ?? { count: 0 };
  const openCart = cart?.openCart ?? (() => {});

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const itemCount = Number(totals?.count ?? 0);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled
          ? 'border-line bg-bg/95 backdrop-blur'
          : 'border-transparent bg-bg'
      }`}
    >
      <nav className="shell flex h-[72px] items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="font-display text-xl tracking-tight text-fg sm:text-2xl">
            Aminabad Dawat
          </span>

          <span className="hidden text-[11px] font-medium text-accent sm:inline">
            est. 1905 · Aminabad
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'text-accent'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {link.label}

                {active ? (
                  <span className="mx-auto mt-1 block h-px w-5 bg-accent" />
                ) : null}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Phone */}
          <a
            href={`tel:${BRANCH.phoneDial}`}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-fg transition hover:border-accent hover:text-accent sm:inline-flex"
            aria-label={`Call the Aminabad counter on ${BRANCH.phoneDisplay}`}
          >
            <Phone size={17} strokeWidth={1.8} />
          </a>

          {/* Theme */}
          <ThemeToggle />

          {/* Cart / Order */}
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-10 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accentInk transition hover:brightness-110"
            aria-label={`Open order — ${itemCount} item${
              itemCount === 1 ? '' : 's'
            }`}
          >
            <ShoppingBag size={17} strokeWidth={2} />

            <span className="hidden sm:inline">
              Order
            </span>

            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border border-bg bg-royal px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            ) : null}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-fg md:hidden"
            aria-label={
              mobileOpen
                ? 'Close navigation'
                : 'Open navigation'
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen ? (
        <div className="border-t border-line bg-bg md:hidden">
          <div className="shell flex flex-col py-3">

            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-line/60 py-3 text-sm font-medium text-fg last:border-0"
              >
                {link.label}
              </Link>
            ))}

            <a
              href={`tel:${BRANCH.phoneDial}`}
              className="py-3 text-sm font-medium text-accent"
            >
              Call {BRANCH.phoneDisplay}
            </a>

          </div>
        </div>
      ) : null}
    </header>
  );
}