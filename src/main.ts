/* eslint-disable-file */
import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'

// import * as reactPerfDevtools from 'react-perf-devtool'

// assign the observer to the global scope, as the GC will delete it otherwise

const options = {
  root: document.querySelector('#app') as HTMLElement,
  rootMargin: '0px',
  threshold: 1.0,
  delay: 1000, // Load the extension after 12 sec.
}
const Observer = new window.IntersectionObserver((entries) => {
  console.log(entries)
}, options)
const PerformObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry)
  }
})
// console.log(reactPerfDevtools)
console.log(PerformObserver)
Observer.observe(document.querySelector('#app') as HTMLElement)
console.log(Observer)
new window.PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry)
  }
})
createApp(App).mount('#app')
export const currentView = ref('welcome')
