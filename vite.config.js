import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // This ensures assets are loaded correctly on GitHub Pages
  server: {
    port: 5173,
    open: true
  }
})