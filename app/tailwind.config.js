/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: '#FFF0CC',
        ember: '#8B3A00',
        emberLight: '#B84500',
        emberDark: '#6D2F05',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        soft: '0 24px 60px rgba(34, 15, 5, 0.18)',
      },
      letterSpacing: {
        tighterest: '-0.06em',
      },
    },
  },
  plugins: [],
}