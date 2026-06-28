/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        app: {
          bg: 'rgb(var(--app-bg) / <alpha-value>)',
          'bg-accent': 'rgb(var(--app-bg-accent) / <alpha-value>)',
          surface: 'rgb(var(--app-surface) / <alpha-value>)',
          panel: 'rgb(var(--app-panel) / <alpha-value>)',
          'panel-strong': 'rgb(var(--app-panel-strong) / <alpha-value>)',
          border: 'rgb(var(--app-border) / <alpha-value>)',
          text: 'rgb(var(--app-text) / <alpha-value>)',
          muted: 'rgb(var(--app-text-muted) / <alpha-value>)',
          soft: 'rgb(var(--app-text-soft) / <alpha-value>)',
          primary: 'rgb(var(--app-primary) / <alpha-value>)',
          'primary-strong': 'rgb(var(--app-primary-strong) / <alpha-value>)',
          'primary-contrast': 'rgb(var(--app-primary-contrast) / <alpha-value>)',
          'primary-muted': 'rgb(var(--app-primary-muted) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        rounded: ['var(--font-rounded)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};
