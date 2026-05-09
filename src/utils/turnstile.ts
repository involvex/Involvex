// Cloudflare Turnstile utility functions for form validation

// Global type declarations for Turnstile
declare global {
	interface Window {
		turnstile: TurnstileInstance
		onTurnstileLoad?: () => void
	}
}

// Turnstile type definitions
interface TurnstileInstance {
	render: (container: string | HTMLElement, options: TurnstileOptions) => string
	getResponse: (widgetId: string) => string
	reset: (widgetId: string) => void
	remove: (widgetId: string) => void
	execute: (container: string | HTMLElement, options?: TurnstileOptions) => void
}

interface TurnstileOptions {
	sitekey: string
	callback?: (response: string) => void
	'error-callback'?: () => void
	'expired-callback'?: () => void
	theme?: 'light' | 'dark' | 'auto'
	size?: 'normal' | 'compact' | 'invisible'
	tabindex?: number
	retry?: 'auto' | 'never'
	'retry-interval'?: number
	appearance?: 'always' | 'execute' | 'interaction-only'
}

// Turnstile site key
const TURNSTILE_SITE_KEY = '0x4AAAAAACkURlXHUh-8pW1d'

// Set up global callback
window.onTurnstileLoad = () => {
	console.log('✅ Turnstile global callback triggered')
}

/**
 * Load Turnstile script dynamically
 * @returns Promise<void>
 */
function loadTurnstileScript(): Promise<void> {
	return new Promise((resolve, reject) => {
		// Check if script is already loaded
		if (window.turnstile && typeof window.turnstile.render === 'function') {
			console.log('✅ Turnstile already loaded')
			resolve()
			return
		}

		// Check if script tag exists in DOM
		const existingScript = document.querySelector('script[src*="turnstile/api.js"]')
		if (existingScript) {
			console.log('📝 Turnstile script tag found in DOM, waiting for load...')
			// Wait for the script to load
			const checkInterval = setInterval(() => {
				if (window.turnstile && typeof window.turnstile.render === 'function') {
					console.log('✅ Turnstile loaded from existing script')
					clearInterval(checkInterval)
					resolve()
				}
			}, 100)

			// Timeout after 10 seconds
			setTimeout(() => {
				clearInterval(checkInterval)
				if (!window.turnstile) {
					console.error('❌ Turnstile script timeout')
					reject(new Error('Turnstile script loading timeout'))
				}
			}, 10000)
			return
		}

		console.log('📡 Loading Turnstile script...')

		const script = document.createElement('script')
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
		script.async = true
		script.defer = true

		script.onload = () => {
			console.log('✅ Turnstile script loaded successfully')
			// Wait a bit for the script to initialize
			setTimeout(() => {
				if (window.turnstile && typeof window.turnstile.render === 'function') {
					console.log('✅ window.turnstile is available')
					resolve()
				} else {
					console.error('❌ Script loaded but window.turnstile not available')
					reject(new Error('Turnstile script loaded but window.turnstile not available'))
				}
			}, 100)
		}

		script.onerror = () => {
			console.error('❌ Failed to load Turnstile script')
			reject(new Error('Failed to load Turnstile script'))
		}

		document.head.appendChild(script)
		console.log('📝 Turnstile script added to DOM')
	})
}

/**
 * Initialize Turnstile widget
 * @param containerId - HTML element ID to render the widget
 * @param callback - Function to call when Turnstile is completed
 * @returns Promise<string> - Widget ID
 */
export async function initTurnstile(
	containerId: string = 'turnstile-container',
	callback?: (response: string) => void,
): Promise<string> {
	try {
		console.log('🚀 Starting Turnstile initialization...')
		await loadTurnstileScript()

		// Wait for turnstile to be available
		return new Promise((resolve, reject) => {
			let attempts = 0
			const maxAttempts = 50 // 5 seconds total (50 * 100ms)

			const checkTurnstile = () => {
				attempts++

				// Check if container element exists
				const container = document.getElementById(containerId)
				if (!container) {
					console.error('❌ Container element not found:', containerId)
					console.log(
						'🔍 Available elements with turnstile in ID:',
						Array.from(document.querySelectorAll('[id*="turnstile"]')).map(el => el.id),
					)
					reject(new Error(`Container element "${containerId}" not found in DOM`))
					return
				}

				console.log('✅ Container element found:', containerId, container)

				if (window.turnstile && typeof window.turnstile.render === 'function') {
					try {
						console.log('🔧 Turnstile available, rendering widget...')

						// Pass the actual DOM element instead of the ID
						const widgetId = window.turnstile.render(container, {
							sitekey: TURNSTILE_SITE_KEY,
							callback:
								callback ||
								((response: string) => {
									console.log('✅ Turnstile completed:', response.substring(0, 20) + '...')
								}),
							theme: 'dark',
							size: 'normal',
							retry: 'auto',
						})

						console.log('✅ Turnstile widget initialized successfully:', widgetId)
						resolve(widgetId)
					} catch (error) {
						console.error('❌ Turnstile render failed:', error)
						reject(error)
					}
				} else {
					if (attempts >= maxAttempts) {
						console.error('❌ Turnstile initialization timeout after', maxAttempts, 'attempts')
						reject(new Error('Turnstile initialization timeout - window.turnstile not available'))
					} else {
						// Retry after a short delay
						setTimeout(checkTurnstile, 100)
					}
				}
			}

			checkTurnstile()
		})
	} catch (error) {
		console.error('❌ Turnstile initialization failed:', error)
		throw error
	}
}

/**
 * Get Turnstile response token
 * @param widgetId - Widget ID returned from initTurnstile
 * @returns string - Turnstile response token
 */
export function getTurnstileResponse(widgetId: string): string {
	if (!window.turnstile) {
		throw new Error('Turnstile not loaded')
	}

	const response = window.turnstile.getResponse(widgetId)
	console.log('📝 Turnstile response:', response.substring(0, 20) + '...')
	return response
}

/**
 * Reset Turnstile widget
 * @param widgetId - Widget ID to reset
 */
export function resetTurnstile(widgetId: string): void {
	if (!window.turnstile) {
		console.warn('Turnstile not loaded')
		return
	}

	window.turnstile.reset(widgetId)
	console.log('🔄 Turnstile reset')
}

/**
 * Remove Turnstile widget
 * @param widgetId - Widget ID to remove
 */
export function removeTurnstile(widgetId: string): void {
	if (!window.turnstile) {
		console.warn('Turnstile not loaded')
		return
	}

	window.turnstile.remove(widgetId)
	console.log('🗑️ Turnstile removed')
}

/**
 * Check if Turnstile is available
 * @returns boolean - Whether Turnstile is loaded
 */
export function isTurnstileAvailable(): boolean {
	return !!(window.turnstile && typeof window.turnstile.render === 'function')
}

/**
 * Get Turnstile site key
 * @returns string - The Turnstile site key
 */
export function getTurnstileSiteKey(): string {
	return TURNSTILE_SITE_KEY
}

/**
 * Legacy function for backward compatibility
 * @param action - The action being performed
 * @returns Promise<string> - Turnstile token
 */
export async function getTurnstileToken(_action: string = 'contact_form'): Promise<string> {
	console.warn(
		'⚠️ getTurnstileToken() is deprecated. Use initTurnstile() and getTurnstileResponse() instead.',
	)
	return ''
}
