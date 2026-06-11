/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: '#0B0F19',
            dark: '#030712',
            light: '#1C2541',
            glass: 'rgba(11, 15, 25, 0.6)',
          },
          royal: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            DEFAULT: '#2563EB',
          },
          violet: {
            DEFAULT: '#7C3AED',
            light: '#A78BFA',
            dark: '#6D28D9',
          },
          accent: {
            DEFAULT: '#8B5CF6',
            teal: '#06B6D4',
            emerald: '#10B981',
          },
          matte: {
            DEFAULT: '#121212',
            card: '#1A1A1A',
            border: '#2A2A2A',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}


