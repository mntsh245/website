/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fixed brand values
        charcoal: '#0a0806',
        gold: '#caa356',
        emerald: '#064e3b',
        ivory: '#fdfbf7',
        amberdeep: '#b45309',
        crimson: '#881337',

        // Theme-aware tokens (CSS variables in globals.css)
        bg: 'rgb(var(--bg) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        raised: 'rgb(var(--raised) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accentInk: 'rgb(var(--accent-ink) / <alpha-value>)',
        royal: 'rgb(var(--royal) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'Georgia', 'serif'],
      },
      borderRadius: {
        arch: '9999px 9999px 14px 14px',
      },
      boxShadow: {
        plate: '0 18px 50px -24px rgb(var(--shadow) / 0.55)',
        glow: '0 0 0 1px rgb(var(--accent) / 0.3), 0 30px 60px -20px rgb(var(--shadow) / 0.65)',
      },
      backgroundImage: {
        jaali:
          'radial-gradient(circle at 1px 1px, rgb(var(--accent) / 0.16) 1px, transparent 0)',
      },
      keyframes: {
        drawerIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        steam: {
          '0%': { opacity: '0', transform: 'translateY(6px) scaleX(0.9)' },
          '45%': { opacity: '0.7' },
          '100%': { opacity: '0', transform: 'translateY(-16px) scaleX(1.15)' },
        },
        lightDrift: {
          '0%, 100%': { transform: 'translate3d(-8%, -4%, 0) rotate(-6deg)', opacity: '0.55' },
          '50%': { transform: 'translate3d(10%, 6%, 0) rotate(-2deg)', opacity: '0.85' },
        },
        cardIn: {
          '0%': { opacity: '0', transform: 'perspective(1200px) rotateX(24deg) translateY(28px) scale(0.94)' },
          '100%': { opacity: '1', transform: 'perspective(1200px) rotateX(0deg) translateY(0) scale(1)' },
        },
        ruleDraw: { '0%': { width: '0' }, '100%': { width: '78px' } },
        lineUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        veilOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-4%)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--rot, 0deg))' },
          '50%': { transform: 'translateY(-16px) rotate(var(--rot, 0deg))' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%': { transform: 'translateY(-22px) rotate(2deg)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(36px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
      },
      animation: {
        drawerIn: 'drawerIn 260ms cubic-bezier(0.22, 1, 0.36, 1)',
        fadeIn: 'fadeIn 420ms ease-out',
        steam: 'steam 3.6s ease-in-out infinite',
        lightDrift: 'lightDrift 18s ease-in-out infinite',
        cardIn: 'cardIn 1100ms cubic-bezier(0.22, 1, 0.36, 1) both',
        ruleDraw: 'ruleDraw 700ms cubic-bezier(0.22, 1, 0.36, 1) 600ms both',
        lineUp: 'lineUp 700ms ease-out 700ms both',
        veilOut: 'veilOut 900ms cubic-bezier(0.7, 0, 0.84, 0) both',
        floatY: 'floatY 6s ease-in-out infinite',
        floatSlow: 'floatSlow 9s ease-in-out infinite',
        spinSlow: 'spinSlow 40s linear infinite',
        marquee: 'marquee 26s linear infinite',
        sparkle: 'sparkle 3.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
