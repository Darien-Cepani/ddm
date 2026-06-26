import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// `base` must match how GitHub Pages serves the site:
//   - Project page (repo "Diagonal")  -> https://darien-cepani.github.io/Diagonal/  -> base '/Diagonal/'
//   - User/org page (repo "<user>.github.io") -> served at root -> set base to '/'
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Diagonal/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))
