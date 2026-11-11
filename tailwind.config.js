const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: v('ink-rgb'),
          900: v('ink-rgb'),
          850: v('ink-850-rgb'),
          800: v('ink-800-rgb'),
          700: v('ink-700-rgb'),
          600: v('ink-600-rgb'),
        },
        bone: {
          DEFAULT: v('bone-rgb'),
          dim: v('bone-dim-rgb'),
        },
        ash: v('ash-rgb'),
        smoke: v('smoke-rgb'),
        line: 'var(--line)',
        signal: {
          DEFAULT: '#ff2b1e',
          hot: v('signal-hot-rgb'),
          deep: '#a8160d',
          ember: '#4a0805',
        },
        // older names still used by the forms and the case pages
        paper: v('ink-rgb'),
        char: {
          DEFAULT: v('bone-rgb'),
          2: v('bone-dim-rgb'),
          3: v('ash-rgb'),
        },
        red: {
          DEFAULT: '#ff2b1e',
          text: v('signal-hot-rgb'),
        },
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      maxWidth: {
        frame: '1520px',
      },
    },
  },
  plugins: [],
};
