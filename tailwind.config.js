/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          600: '#991923',
          700: '#7d1420',
          950: '#4a0c11',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'infinite-scroll-right': 'infinite-scroll-right 30s linear infinite',
        'infinite-scroll-left': 'infinite-scroll-left 35s linear infinite',
        'move-across': 'move-across 12s linear infinite',
        'move-across-reverse': 'move-across-reverse 15s linear infinite',
        'move-across-slow': 'move-across-slow 20s linear infinite',
        'move-diagonal': 'move-diagonal 18s linear infinite',
        'move-diagonal-reverse': 'move-diagonal-reverse 16s linear infinite',
        'move-wave': 'move-wave 14s ease-in-out infinite',
        'move-zigzag': 'move-zigzag 10s linear infinite',
        'move-bounce': 'move-bounce 8s ease-in-out infinite',
        'gradient-move': 'gradient-move 20s ease-in-out infinite',
        'gradient-sweep': 'gradient-sweep 25s linear infinite',
        'gradient-pulse': 'gradient-pulse 15s ease-in-out infinite',
        'line-sweep-vertical': 'line-sweep-vertical 8s linear infinite',
        'line-sweep-horizontal': 'line-sweep-horizontal 10s linear infinite',
        'line-sweep-vertical-reverse': 'line-sweep-vertical-reverse 12s linear infinite',
        'line-sweep-horizontal-reverse': 'line-sweep-horizontal-reverse 14s linear infinite',
        'particle-flow': 'particle-flow 6s linear infinite',
      },
      keyframes: {
        'infinite-scroll-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' }
        },
        'infinite-scroll-left': {
          '0%': { transform: 'translateX(-33.333%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'move-across-slow': {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' }
        },
        'move-diagonal': {
          '0%': { transform: 'translate(-100px, 0px)' },
          '50%': { transform: 'translate(50vw, -50px)' },
          '100%': { transform: 'translate(calc(100vw + 100px), 0px)' }
        },
        'move-diagonal-reverse': {
          '0%': { transform: 'translate(calc(100vw + 100px), 0px)' },
          '50%': { transform: 'translate(50vw, 50px)' },
          '100%': { transform: 'translate(-100px, 0px)' }
        },
        'move-wave': {
          '0%': { transform: 'translate(-100px, 0px)' },
          '25%': { transform: 'translate(25vw, -30px)' },
          '50%': { transform: 'translate(50vw, 30px)' },
          '75%': { transform: 'translate(75vw, -20px)' },
          '100%': { transform: 'translate(calc(100vw + 100px), 0px)' }
        },
        'move-zigzag': {
          '0%': { transform: 'translate(-50px, 0px)' },
          '20%': { transform: 'translate(20vw, -40px)' },
          '40%': { transform: 'translate(40vw, 40px)' },
          '60%': { transform: 'translate(60vw, -30px)' },
          '80%': { transform: 'translate(80vw, 30px)' },
          '100%': { transform: 'translate(calc(100vw + 50px), 0px)' }
        },
        'move-bounce': {
          '0%': { transform: 'translate(-50px, 0px)' },
          '25%': { transform: 'translate(25vw, -60px)' },
          '50%': { transform: 'translate(50vw, 0px)' },
          '75%': { transform: 'translate(75vw, -40px)' },
          '100%': { transform: 'translate(calc(100vw + 50px), 0px)' }
        },
        'gradient-move': {
          '0%, 100%': { transform: 'translate(0%, 0%) rotate(0deg)' },
          '25%': { transform: 'translate(10%, -5%) rotate(90deg)' },
          '50%': { transform: 'translate(-5%, 10%) rotate(180deg)' },
          '75%': { transform: 'translate(-10%, -5%) rotate(270deg)' }
        },
        'gradient-sweep': {
          '0%': { transform: 'translateX(-100%) rotate(0deg)' },
          '100%': { transform: 'translateX(100%) rotate(360deg)' }
        },
        'gradient-pulse': {
          '0%, 100%': { opacity: '0.05', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '0.15', transform: 'scale(1.1) rotate(180deg)' }
        },
        'line-sweep-vertical': {
          '0%': { transform: 'translateX(-100vw)' },
          '100%': { transform: 'translateX(100vw)' }
        },
        'line-sweep-horizontal': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'line-sweep-vertical-reverse': {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-100vw)' }
        },
        'line-sweep-horizontal-reverse': {
          '0%': { transform: 'translateY(100vh)' },
          '100%': { transform: 'translateY(-100vh)' }
        },
        'particle-flow': {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(calc(100vw + 10px))', opacity: '0' }
        }
      },
    },
  },
  plugins: [],
};