// reCAPTCHA v2 (checkbox) utility functions for EmailJS integration

// Global type declarations for reCAPTCHA
declare global {
  interface Window {
    grecaptcha: RecaptchaV2Instance
  }
}

// reCAPTCHA v2 type definitions
interface RecaptchaV2Instance {
  render: (container: string | HTMLElement, options: RecaptchaV2Options) => string
  getResponse: (widgetId: string) => string
  reset: (widgetId: string) => void
}

interface RecaptchaV2Options {
  sitekey: string
  callback?: (response: string) => void
  'expired-callback'?: () => void
  'error-callback'?: () => void
  theme?: string
  size?: string
}

// reCAPTCHA site key - using the valid key from .env
const RECAPTCHA_SITE_KEY = '6LecbjksAAAAAJCp4NMbtNEHucXwiyhMjMWpXwhZ'

/**
 * Load reCAPTCHA v2 script dynamically
 * @returns Promise<void>
 */
function loadRecaptchaV2Script(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="recaptcha/api.js"]')) {
      console.log('✅ reCAPTCHA v2 script already loaded')
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=en`
    script.async = true
    script.defer = true

    script.onload = () => {
      console.log('✅ reCAPTCHA v2 script loaded successfully')
      resolve()
    }

    script.onerror = () => {
      console.error('❌ Failed to load reCAPTCHA v2 script')
      reject(new Error('Failed to load reCAPTCHA script'))
    }

    document.head.appendChild(script)
  })
}

/**
 * Initialize reCAPTCHA v2 widget
 * @param containerId - HTML element ID to render the widget
 * @param callback - Function to call when reCAPTCHA is completed
 * @returns Promise<string> - Widget ID
 */
export async function initRecaptchaV2(
  containerId: string = 'recaptcha-container',
  callback?: (response: string) => void,
): Promise<string> {
  try {
    await loadRecaptchaV2Script()

    // Wait for grecaptcha to be available
    return new Promise((resolve, reject) => {
      const checkGrecaptcha = () => {
        if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
          try {
            const widgetId = window.grecaptcha.render(containerId, {
              sitekey: RECAPTCHA_SITE_KEY,
              callback:
                callback ||
                ((response: string) => {
                  console.log('✅ reCAPTCHA v2 completed:', response.substring(0, 20) + '...')
                }),
              theme: 'dark',
              size: 'normal',
            })
            console.log('✅ reCAPTCHA v2 widget initialized:', widgetId)
            resolve(widgetId)
          } catch (error) {
            console.error('❌ reCAPTCHA v2 render failed:', error)
            reject(error)
          }
        } else {
          // Retry after a short delay
          setTimeout(checkGrecaptcha, 100)
        }
      }

      checkGrecaptcha()

      // Timeout after 10 seconds
      setTimeout(() => {
        reject(new Error('reCAPTCHA v2 initialization timeout'))
      }, 10000)
    })
  } catch (error) {
    console.error('❌ reCAPTCHA v2 initialization failed:', error)
    throw error
  }
}

/**
 * Get reCAPTCHA v2 response token
 * @param widgetId - Widget ID returned from initRecaptchaV2
 * @returns string - reCAPTCHA response token
 */
export function getRecaptchaV2Response(widgetId: string): string {
  if (!window.grecaptcha) {
    throw new Error('reCAPTCHA v2 not loaded')
  }

  const response = window.grecaptcha.getResponse(widgetId)
  console.log('📝 reCAPTCHA v2 response:', response.substring(0, 20) + '...')
  return response
}

/**
 * Reset reCAPTCHA v2 widget
 * @param widgetId - Widget ID to reset
 */
export function resetRecaptchaV2(widgetId: string): void {
  if (!window.grecaptcha) {
    console.warn('reCAPTCHA v2 not loaded')
    return
  }

  window.grecaptcha.reset(widgetId)
  console.log('🔄 reCAPTCHA v2 reset')
}

/**
 * Check if reCAPTCHA v2 is available
 * @returns boolean - Whether reCAPTCHA v2 is loaded
 */
export function isRecaptchaV2Available(): boolean {
  return !!(window.grecaptcha && typeof window.grecaptcha.render === 'function')
}

/**
 * Legacy function for backward compatibility
 * @param action - The action being performed
 * @returns Promise<string> - reCAPTCHA token (returns empty string for v2)
 */
export async function getRecaptchaToken(_action: string = 'contact_form'): Promise<string> {
  console.warn(
    '⚠️ getRecaptchaToken() is deprecated. Use initRecaptchaV2() and getRecaptchaV2Response() instead.',
  )
  return ''
}

/**
 * Verify reCAPTCHA token (simplified for v2)
 * @param token - reCAPTCHA token
 * @returns Promise<boolean> - Whether the token is valid
 */
export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  try {
    if (!token || typeof token !== 'string' || token.length === 0) {
      console.warn('⚠️ Empty reCAPTCHA v2 token')
      return false
    }

    // For demo purposes, accept any non-empty token
    console.log('✅ reCAPTCHA v2 token accepted (demo mode)')
    return true
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error)
    return false
  }
}

/**
 * Legacy function for backward compatibility
 * @returns boolean - Whether reCAPTCHA is loaded
 */
export function isRecaptchaAvailable(): boolean {
  return isRecaptchaV2Available()
}

/**
 * Get reCAPTCHA site key
 * @returns string - The reCAPTCHA site key
 */
export function getRecaptchaSiteKey(): string {
  return RECAPTCHA_SITE_KEY
}

/**
 * Reset reCAPTCHA state
 */
export function resetRecaptcha(): void {
  console.log('🔄 reCAPTCHA reset called (v2 compatibility)')
}
