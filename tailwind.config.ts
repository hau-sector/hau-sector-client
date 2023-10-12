import type { Config } from 'tailwindcss'

export default {
  corePlugins: {
    preflight: false,
  },
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary-color)',
        'ground': 'var(--surface-ground)',
        'card': 'var(--surface-card)',
        'hover': 'var(--surface-hover)',
        'text': 'var(--text-color)',
        'highlight': 'var(--highlight-bg)',
        'highlight-text': 'var(--highlight-text-color)',
      },
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
      },
      borderRadius: {
        theme: 'var(--border-radius)',
      },
    },
  },
  plugins: [],
} as Config
