import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Initialize the Vue application
const app = createApp(App)

// Global error handling
app.config.errorHandler = (error, instance, info) => {
  console.error('Global error:', error, info)
}

// Development-only performance monitoring
if (import.meta.env.DEV) {
  // Performance observer for development
  const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        console.log(`Page load time: ${entry.duration}ms`)
      }
    }
  })

  try {
    performanceObserver.observe({ entryTypes: ['navigation', 'measure'] })
  } catch (error) {
    console.warn('Performance monitoring not available:', error)
  }
}

// Mount the application
app.mount('#app')

// Development helper: expose app to window for debugging
if (import.meta.env.DEV) {
  ;(window as typeof window & { $app?: typeof app }).$app = app
}
