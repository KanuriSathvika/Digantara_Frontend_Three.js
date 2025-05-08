import { defineConfig } from 'vite'

export default defineConfig({
  base: './',  // Changed to relative path for better compatibility
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