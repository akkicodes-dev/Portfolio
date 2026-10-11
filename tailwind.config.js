/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-top': '#0a1020',
        'bg-bottom': '#050813',
        cherry: {
          DEFAULT: '#9a0002',
          glow: '#ff3b3f',
          deep: '#5e0001',
          faint: 'rgba(154, 0, 2, 0.25)',
        },
        plaid: {
          DEFAULT: '#5b8def',
          deep: '#1f3a8a',
          glow: '#78a6ff',
          faint: 'rgba(91, 141, 239, 0.2)',
        },
        cream: {
          DEFAULT: '#efe6dd',
          dim: 'rgba(239, 230, 221, 0.72)',
          faint: 'rgba(239, 230, 221, 0.08)',
        },
        glass: {
          DEFAULT: 'rgba(239, 230, 221, 0.07)',
          hover: 'rgba(239, 230, 221, 0.11)',
          border: 'rgba(239, 230, 221, 0.16)',
          highlight: 'rgba(255, 255, 255, 0.12)',
        },
      },
      fontFamily: {
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'hero': ['var(--fs-hero)', { lineHeight: 'var(--lh-hero)', letterSpacing: '-0.02em' }],
        'h2': ['var(--fs-h2)', { lineHeight: 'var(--lh-h2)', letterSpacing: '-0.02em' }],
        'h3': ['var(--fs-h3)', { lineHeight: 'var(--lh-h3)' }],
        'body': ['var(--fs-body)', { lineHeight: 'var(--lh-body)' }],
        'small': ['var(--fs-small)', { lineHeight: 'var(--lh-small)' }],
        'label': ['var(--fs-label)', { lineHeight: 'var(--lh-label)' }],
      },
      maxWidth: {
        'prose-card': '62ch',
      },
      borderRadius: {
        chip: '999px',
        card: '24px',
        panel: '32px',
      },
      boxShadow: {
        'spatial-glass': '0 20px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        'cherry-glow': '0 0 35px -5px rgba(154, 0, 2, 0.45)',
        'cherry-glow-lg': '0 0 50px -5px rgba(255, 59, 63, 0.35)',
        'plaid-glow': '0 0 35px -5px rgba(91, 141, 239, 0.45)',
        'plaid-glow-lg': '0 0 50px -5px rgba(91, 141, 239, 0.35)',
      },
      backdropBlur: {
        spatial: '24px',
      },
    },
  },
  plugins: [],
}
