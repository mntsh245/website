'use client';

import { useCallback, useEffect, useState } from 'react';

const SESSION_KEY = 'tk-intro-played';

export default function MenuIntro() {
  const [stage, setStage] = useState('checking'); // checking | playing | leaving | done

  const finish = useCallback(() => {
    setStage((current) => (current === 'playing' ? 'leaving' : current));
  }, []);

  useEffect(() => {
    let alreadyPlayed = false;
    try {
      alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch (error) {
      alreadyPlayed = false;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (alreadyPlayed || reduced) {
      setStage('done');
      return undefined;
    }

    setStage('playing');
    document.body.style.overflow = 'hidden';

    const leaveTimer = setTimeout(() => setStage('leaving'), 2300);
    const doneTimer = setTimeout(() => setStage('done'), 3200);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (stage !== 'done') return;
    document.body.style.overflow = '';
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch (error) {
      // Private browsing — the intro simply plays again next time.
    }
  }, [stage]);

  if (stage === 'checking' || stage === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-bg ${
        stage === 'leaving' ? 'animate-veilOut' : 'animate-fadeIn'
      }`}
      onClick={finish}
      role="presentation"
    >
      <div aria-hidden="true" className="reel-light" />

      <div className="relative px-6 text-center">
        <div className="reel-paper animate-cardIn mx-auto w-full max-w-sm px-8 py-12 sm:max-w-md sm:py-16">
          <p className="reel-engrave font-display text-[11px] tracking-[0.42em] text-[#8a6a3a]">
            NAZIRABAD MARKET
          </p>

          <h1 className="reel-engrave mt-5 font-script text-5xl leading-none text-[#3f2c17] sm:text-6xl">
            Aminabad Dawat
          </h1>

          <span className="animate-ruleDraw mx-auto mt-5 block h-px bg-[#b08b3e]" />

          <p className="reel-engrave animate-lineUp mt-5 font-display text-xs tracking-[0.3em] text-[#6f5326]">
            AMINABAD · SINCE 1905
          </p>

          <p className="animate-lineUp mt-6 text-sm text-[#7a5a2c]" style={{ animationDelay: '900ms' }}>
            160 spices. One iron tawa.
          </p>
        </div>

        <button
          type="button"
          onClick={finish}
          className="mt-8 text-xs text-muted underline-offset-4 hover:text-accent hover:underline"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
