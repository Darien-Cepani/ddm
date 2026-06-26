/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Driven by CSS variables so each demo (?shop=) gets its own accent.
        brand: {
          dark: 'rgb(var(--c-dark) / <alpha-value>)',
          night: 'rgb(var(--c-night) / <alpha-value>)',
          gold: 'rgb(var(--c-gold) / <alpha-value>)',
          deep: 'rgb(var(--c-deep) / <alpha-value>)',
          champagne: 'rgb(var(--c-champagne) / <alpha-value>)',
          red: 'rgb(var(--c-red) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      }
    },
  },
  plugins: [],
}
