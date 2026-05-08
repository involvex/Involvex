import {fileURLToPath, URL} from 'node:url'

import vueDevTools from 'vite-plugin-vue-devtools'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite'

export default defineConfig(({mode}) => {
	const isDev = mode === 'development'

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
			sourcemap: isDev ? 'inline' : false,
			modulePreload: false,
			rollupOptions: {
				output: {
					entryFileNames: isDev ? 'assets/[name].js' : 'assets/[name].[hash].js',
					chunkFileNames: isDev ? 'assets/[name].js' : 'assets/[name].[hash].js',
					assetFileNames: isDev ? 'assets/[name].[ext]' : 'assets/[name].[hash].[ext]',
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
