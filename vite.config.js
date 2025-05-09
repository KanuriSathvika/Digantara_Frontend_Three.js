import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Digantara_Frontend_Three.js/',  // Updated to match repository name for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  server: {
    port: 5173,
    open: true
  }
})