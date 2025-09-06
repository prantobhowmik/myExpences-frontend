/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          light: '#3b82f6',   // blue-500
          dark: '#1e40af',    // blue-800
        },
        accent: {
          DEFAULT: '#f472b6', // pink-400
          light: '#f9a8d4',   // pink-300
          dark: '#be185d',    // pink-800
        },
        background: {
          DEFAULT: '#f8fafc', // slate-50
          dark: '#0f172a',    // slate-900
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e293b',
        },
        border: {
          DEFAULT: '#e5e7eb', // gray-200
          dark: '#334155',    // slate-700
        },
        muted: {
          DEFAULT: '#64748b', // slate-500
          dark: '#94a3b8',    // slate-400
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

