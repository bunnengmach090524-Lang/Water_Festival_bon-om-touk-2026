import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    // three.js is deliberately isolated in a lazy chunk for the optional 3D hero.
    chunkSizeWarningLimit: 800,
  },
})
