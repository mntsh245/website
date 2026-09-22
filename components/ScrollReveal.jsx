'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Wraps children and adds the .reveal / .reveal-in classes (see globals.css)
 * so they fade and slide up the first time they cross into the viewport.
 * Pure CSS does the animating; this only toggles one class via
 * IntersectionObserver, so it stays cheap on long pages.
 */
export default function ScrollReveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
