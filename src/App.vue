<template>
  <div id="app">
    <!-- Navigation Header -->
    <header class="nav-header" role="banner">
      <div class="nav-container">
        <!-- Logo -->
        <div
          class="logo-section"
          @click="showHome"
          @keydown.enter="showHome"
          @keydown.space.prevent="showHome"
          role="button"
          tabindex="0"
          :aria-label="`Navigate to ${navigationLabels.welcome}`"
        >
          <img src="/icon.png" alt="Involvex Logo" class="logo-img" loading="lazy" />
          <span class="logo-text">Involvex</span>
        </div>

        <!-- Main Navigation -->
        <nav class="main-nav" role="navigation" :aria-label="'Main navigation'">
          <button
            alt="section"
            value="section"
            aria-label="section"
            v-for="section in navigationSections"
            :key="section.id"
            @click="() => showSection(section.id)"
            @keydown.enter="() => showSection(section.id)"
            :class="{ active: currentView === section.id }"
            :aria-current="currentView === section.id ? 'page' : undefined"
            class="nav-btn"
            type="button"
          >
            {{ section.name }}
          </button>
        </nav>
      </div>
    </header>

    <!-- Terminal Interface -->
    <main class="terminal-container" role="main">
      <TerminalHeader @show-section="showSection" />
      <TerminalBody :current-view="currentView" @show-section="showSection" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import TerminalHeader from './components/TerminalHeader.vue'
import TerminalBody from './components/TerminalBody.vue'

// Type definitions for better type safety
type NavigationSection = {
  id: string
  name: string
  route?: string
}

interface AppEmits {
  'show-section': [section: string]
}

// Constants for better maintainability
const NAVIGATION_SECTIONS = Object.freeze([
  { id: 'welcome', name: '🏚️' },
  { id: 'about', name: '❓' },
  { id: 'projects', name: '⌨️' },
  { id: 'contact', name: '📝' },
  { id: 'skills', name: '⭐' },
  { id: 'sponsor', name: '💸' },
] as const)

const NAVIGATION_LABELS = Object.freeze({
  welcome: 'Home',
  about: 'About',
  projects: 'Projects',
  contact: 'Contact',
  skills: 'Skills',
  sponsor: 'Sponsor',
} as const)

// Props and emits
interface Props {
  defaultView?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultView: 'welcome',
})

const emit = defineEmits<AppEmits>()

// Reactive state
const currentView = ref<string>(props.defaultView)

// Computed properties for better performance
const navigationSections = NAVIGATION_SECTIONS as readonly NavigationSection[]
const navigationLabels = computed(() => NAVIGATION_LABELS)

// Command mapping for better maintainability
const commandHandlers: Record<string, () => void> = {
  home: () => showHome(),
  welcome: () => showHome(),
  about: () => showSection('about'),
  projects: () => showSection('projects'),
  work: () => showSection('projects'),
  contact: () => showSection('contact'),
  skills: () => showSection('skills'),
  tech: () => showSection('skills'),
  sponsor: () => showSection('sponsor'),
  help: () => showHelp(),
}

// Navigation methods with improved error handling
const showSection = (section: string): void => {
  try {
    // Validate section exists
    const validSections = NAVIGATION_SECTIONS.map((s) => s.id as string)
    if (!validSections.includes(section)) {
      console.warn(`Invalid section: ${section}`)
      return
    }

    currentView.value = section
    emit('show-section', section)

    // Optional: Update browser history for better UX
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({ view: section }, '', `#${section}`)
    }
  } catch (error) {
    console.error('Error showing section:', error)
  }
}

const showHome = (): void => {
  showSection('welcome')
}

// Command handling with better error handling and validation
const handleCommand = (command: string): void => {
  try {
    // Input validation
    if (!command || typeof command !== 'string') {
      console.warn('Invalid command provided')
      return
    }

    const normalizedCommand = command.toLowerCase().trim()

    // Check if command exists
    if (commandHandlers[normalizedCommand]) {
      commandHandlers[normalizedCommand]()
    } else {
      console.log(`Unknown command: ${normalizedCommand}`)
      showHelp()
    }
  } catch (error) {
    console.error('Error handling command:', error)
    showHelp()
  }
}

const showHelp = (): void => {
  const availableCommands = Object.keys(commandHandlers).join(', ')
  console.log(`Available commands: ${availableCommands}`)
}

// Keyboard navigation support
const handleKeydown = (event: KeyboardEvent): void => {
  // ESC key to return home
  if (event.key === 'Escape') {
    showHome()
  }

  // Number keys for quick navigation (1-6)
  const keyNum = parseInt(event.key)
  if (keyNum >= 1 && keyNum <= NAVIGATION_SECTIONS.length) {
    const section = NAVIGATION_SECTIONS[keyNum - 1]
    if (section) {
      showSection(section.id)
    }
  }
}

// Browser navigation support
const handlePopState = (event: PopStateEvent): void => {
  if (event.state?.view) {
    showSection(event.state.view)
  } else {
    // Fallback to hash-based routing
    const hash = window.location.hash.slice(1)
    if (hash) {
      showSection(hash)
    }
  }
}

// Lifecycle hooks with cleanup
onMounted(() => {
  // Set up keyboard navigation
  document.addEventListener('keydown', handleKeydown)

  // Set up browser navigation
  window.addEventListener('popstate', handlePopState)

  // Initialize from URL hash if present
  const hash = window.location.hash.slice(1)
  if (hash) {
    showSection(hash)
  }
})

onUnmounted(() => {
  // Cleanup event listeners
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('popstate', handlePopState)
})

// Expose methods for parent components if needed
defineExpose({
  showSection,
  showHome,
  handleCommand,
  currentView,
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: #0d1117;
  color: #58a6ff;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  overflow-x: hidden;
}

/* Navigation Header */
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(42, 43, 42, 0.582);
  backdrop-filter: blur(10px);
  border: 1px solid #046e34;
  border-radius: 2 2 16px 16px;
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  border-radius: 6px;
  padding: 0.25rem;
}

.logo-section:hover,
.logo-section:focus-visible {
  transform: scale(1.05);
  outline: 2px solid #58a6ff;
  outline-offset: 2px;
}

.logo-img {
  width: clamp(24px, 5vw, 40px);
  height: clamp(24px, 5vw, 40px);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(88, 166, 255, 0.3);
  transition: all 0.3s ease;
}

.logo-text {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 600;
  color: #07cf11;
  text-decoration: none;
  transition: all 0.3s ease;
}

/* Main Navigation */
.main-nav {
  display: flex;
  gap: 0.5rem;
}

.nav-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid transparent;
  color: #8b949e;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: 0.875rem;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.nav-btn:hover,
.nav-btn:focus-visible {
  background: rgba(29, 118, 219, 0.603);
  color: #58a6ff;
  border-color: #30363d;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.nav-btn:focus-visible {
  outline: 2px solid #58a6ff;
}

.nav-btn.active {
  background: rgba(6, 30, 58, 0.2);
  color: #58a6ff;
  border-color: #58a6ff;
}

/* Terminal Container */
.terminal-container {
  margin-top: 60px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
}

/* Enhanced hover effects */
.nav-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(88, 166, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-btn:hover::before {
  left: 100%;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .nav-header,
  .logo-section,
  .logo-img,
  .nav-btn {
    transition: none;
  }

  .nav-btn::before {
    display: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .nav-header {
    background: #d0d0d1;
    border-bottom: 2px solid #58a6ff;
  }

  .nav-btn.active {
    border: 2px solid #58a6ff;
  }
}

/* Responsive Design - Show navigation only on small screens */
@media (min-width: 769px) {
  .main-nav {
    display: none;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 0.75rem;
  }

  .logo-text {
    font-size: 1.1rem;
  }

  .terminal-container {
    margin-top: 60px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.5rem;
  }

  .logo-section {
    gap: 0.5rem;
  }
}

@media (max-width: 360px) {
  .logo-text {
    display: none;
  }
}
@media (min-width: 769px) {
  .nav-header {
    display: none;
    margin-top: -10%;
    top: -10%;
    bottom: 0%;
    margin-bottom: -10%;
  }
}
@media (min-width: 769px) {
  .terminal-container {
    margin-top: -10px;
  }
}

/* Animation for smooth transitions */
.nav-header {
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Focus management for accessibility */
.logo-section:focus-visible,
.nav-btn:focus-visible {
  position: relative;
  z-index: 1001;
}

/* Print styles */
@media print {
  .nav-header {
    position: static;
    background: none;
    border-bottom: 1px solid #000;
  }

  .terminal-container {
    margin-top: 0;
  }
}
</style>
