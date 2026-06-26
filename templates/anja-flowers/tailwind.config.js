/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vanya Flowers — warm coral & terracotta garden palette
        brand: {
          dark: '#2B1A16',      // primary ink / body text
          night: '#1A0F0C',     // deepest backgrounds (loader, hero, footer)
          gold: '#C56B5A',      // signature accent (warm coral)
          deep: '#9E4031',      // darker accent for text & hairlines on white
          champagne: '#FBF3EC', // soft warm-cream section background
          red: '#A3382B',       // highlight / notification accent
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
      }
    },
  },
  plugins: [],
}
