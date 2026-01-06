/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          400: '#ff4d5e',
          500: '#dc2626',
          600: '#991923',
          700: '#7d1420',
          800: '#4a0c11',
          900: '#2b0508',
          950: '#1a0203',
        },
        gray: {
          850: '#1f1f1f',
          900: '#121212',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #1a0507 0deg, #4a0c11 55deg, #991923 120deg, #1a0507 160deg, transparent 360deg)',
      },
      animation: {
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'infinite-scroll-right': 'infinite-scroll-right 30s linear infinite',
        'infinite-scroll-left': 'infinite-scroll-left 40s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        'infinite-scroll-right': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'infinite-scroll-left': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        },
      },
    },
  },
  plugins: [],
};
