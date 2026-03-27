/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0c1b3',
          400: '#d3a28e',
          500: '#c68d71',
          600: '#ba7759',
          700: '#a3624a',
          800: '#86503d',
          900: '#6f4435',
          950: '#3b221a',
        },
      },
    },
  },
  plugins: [],
}
