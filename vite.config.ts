import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Inspect from 'vite-plugin-inspect'
const dev = 'dev'

export default defineConfig({
  base: '/',
  server: {
    port: 8098,
    host: '0.0.0.0',
    allowedHosts: ['*'],
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    Inspect({
      build: true,
      outputDir: '.vite-inspect',
    }),
  ],
  envPrefix: ['VITE_'],
  build: {
    sourcemap: dev ? 'inline' : false,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
