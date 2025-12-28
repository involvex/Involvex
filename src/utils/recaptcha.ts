// reCAPTCHA v3 Enterprise utility functions

// Global type declarations for reCAPTCHA
declare global {
  interface Window {
    grecaptcha: RecaptchaInstance
  }
}

// reCAPTCHA type definitions
interface RecaptchaInstance {
  enterprise: RecaptchaEnterprise
}

interface RecaptchaEnterprise {
  ready: (callback: () => void | Promise<void>) => void
  execute: (siteKey: string, options: RecaptchaOptions) => Promise<string>
}

interface RecaptchaOptions {
  action: string
}

// reCAPTCHA site key - in production, this should come from environment variables
const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITEKEY || '6LecbjksAAAAAJCp4NMbtNEHucXwiyhMjMWpXwhZ'

/**
 * Load reCAPTCHA script dynamically to avoid CORB issues
 * @param siteKey - reCAPTCHA site key
 * @returns Promise<void>
 */
function loadRecaptchaScript(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="recaptcha/enterprise.js"]')) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`
    script.async = true
    script.defer = true

    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'))

    document.head.appendChild(script)
  })
}

/**
 * Initialize reCAPTCHA and get a token
 * @param action - The action being performed (e.g., 'contact_form')
 * @returns Promise<string> - reCAPTCHA token
 */
export async function getRecaptchaToken(action: string = 'contact_form'): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Load reCAPTCHA script if not already loaded
      loadRecaptchaScript(RECAPTCHA_SITE_KEY)

      // Wait for grecaptcha to be available
      const checkGrecaptcha = () => {
        if (window.grecaptcha && window.grecaptcha.enterprise) {
          window.grecaptcha.enterprise.ready(async () => {
            try {
              const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
                action,
              })
              resolve(token)
            } catch (error) {
              console.error('reCAPTCHA execution failed:', error)
              reject(
                new Error(
                  `reCAPTCHA execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                ),
              )
            }
          })
        } else {
          // Retry after a short delay
          setTimeout(checkGrecaptcha, 100)
        }
      }

      checkGrecaptcha()

      // Timeout after 10 seconds
      setTimeout(() => {
        reject(new Error('reCAPTCHA timeout - service not available'))
      }, 10000)
    } catch (error) {
      reject(
        new Error(
          `reCAPTCHA initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ),
      )
    }
  })
}

/**
 * Verify reCAPTCHA token on the server side
 * This would typically be done server-side, but for demo purposes
 * @param token - reCAPTCHA token
 * @returns Promise<boolean> - Whether the token is valid
 */
export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token provided')
    }

    // In a real implementation, you would send this to your server
    // to verify with Google's reCAPTCHA API
    console.log('Token would be verified on server:', token.substring(0, 20) + '...')

    // For demo purposes, we'll assume the token is valid
    // In production, implement server-side verification
    return true
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error)
    return false
  }
}

/**
 * Check if reCAPTCHA is available
 * @returns boolean - Whether reCAPTCHA is loaded
 */
export function isRecaptchaAvailable(): boolean {
  return !!(window.grecaptcha && window.grecaptcha.enterprise)
}

/**
 * Get reCAPTCHA site key
 * @returns string - The reCAPTCHA site key
 */
export function getRecaptchaSiteKey(): string {
  return RECAPTCHA_SITE_KEY
}

/**
 * Reset/cleanup reCAPTCHA state (useful for forms)
 */
export function resetRecaptcha(): void {
  // Note: reCAPTCHA v3 Enterprise doesn't have a direct reset method like v2
  // This is a placeholder for future implementations
  console.log('reCAPTCHA reset called - v3 Enterprise does not require manual reset')
}
