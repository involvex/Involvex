import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Inspect from 'vite-plugin-inspect'

const dev = 'dev'

export default defineConfig(({ command: _command }) => {
  // // Determine base path for GitHub Pages
  // const isProduction = mode === 'production'
  // const isGitHubPages = isProduction && process.env.GITHUB_ACTIONS === 'true'

  // For GitHub Pages, use repository name as base path
  // const base = isGitHubPages ? '/involvex/' : '/'

  return {
    base: '/involvex/',
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
      rollupOptions: {
        input: {
          main: 'index.html',
          404: 'public/404.html'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
