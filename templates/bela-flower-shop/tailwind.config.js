/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bela Flower Shop — soft romantic blush palette
        brand: {
          dark: '#3A2330',      // primary ink / body text
          night: '#1E1016',     // deepest backgrounds (loader, hero, footer)
          gold: '#D98BA6',      // signature accent (dusty rose)
          deep: '#A14E6E',      // darker accent for text & hairlines on white
          champagne: '#FAF1F3', // soft blush-cream section background
          red: '#B23A6A',       // highlight / notification accent
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
