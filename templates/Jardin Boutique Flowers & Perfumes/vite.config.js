import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project at https://<user>.github.io/Jardin-Boutique/,
// so production assets must be referenced from that sub-path. Local dev stays at '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Jardin-Boutique/' : '/',
  plugins: [react()],
}))
