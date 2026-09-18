/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0f051d',
          darker: '#090214',
          card: '#160a2c',
          purple: '#1a0b2e',
          accent: '#250f44',
        },
        neon: {
          pink: '#ff4d8d',
          magenta: '#e0267d',
          cyan: '#00f3ff',
          purple: '#9d4edf',
          violet: '#8b5cf6',
          gold: '#ffd700',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        cursive: ['Great Vibes', 'Sacramento', 'cursive'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 77, 141, 0.6), 0 0 40px rgba(255, 77, 141, 0.3)',
        'neon-pink-lg': '0 0 35px rgba(255, 77, 141, 0.8), 0 0 70px rgba(255, 77, 141, 0.5)',
        'neon-cyan': '0 0 20px rgba(0, 243, 255, 0.6), 0 0 40px rgba(0, 243, 255, 0.3)',
        'glass': '0 8px 32px 0 rgba(255, 77, 141, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px #ff4d8d)' },
          '100%': { filter: 'drop-shadow(0 0 20px #ff4d8d)' },
        }
      }
    },
  },
  plugins: [],
}
