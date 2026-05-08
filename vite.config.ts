import {fileURLToPath, URL} from 'node:url'

import vueDevTools from 'vite-plugin-vue-devtools'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite'

const dev = 'dev'

export default defineConfig(({command: _command}) => {
	// // Determine base path for GitHub Pages
	// const isProduction = mode === 'production'
	// const isGitHubPages = isProduction && process.env.GITHUB_ACTIONS === 'true'

	// For GitHub Pages, use repository name as base path
	// const base = isGitHubPages ? '/involvex/' : '/'

	return {
		base: './',
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
			assetsDir: 'assets',
			copyPublicDir: true,
			polyfillModulePreload: false,
			modulePreload: false,
			rollupOptions: {
				output: {
					entryFileNames: `assets/[name].js`,
					chunkFileNames: `assets/[name].js`,
					assetFileNames: `assets/[name].[ext]`,
				},
				input: {
					main: 'index.html',
					404: 'public/404.html',
				},
			},
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	}
})
