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

        <!-- Desktop Navigation -->
        <nav class="main-nav desktop-nav" role="navigation" :aria-label="'Main navigation'">
          <button
            v-for="section in navigationSections"
            :key="section.id"
            @click="() => showSection(section.id)"
            @keydown.enter="() => showSection(section.id)"
            :class="{ active: currentView === section.id }"
            :aria-current="currentView === section.id ? 'page' : undefined"
            class="nav-btn"
            type="button"
            :aria-label="navigationLabels[section.id]"
          >
            <span class="nav-icon">{{ section.name }}</span>
            <span class="nav-text">{{ navigationLabels[section.id] }}</span>
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
          <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
          <span class="hamburger-line" :class="{ active: isMobileMenuOpen }"></span>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <nav
        id="mobile-nav"
        class="mobile-nav"
        role="navigation"
        :aria-label="'Mobile navigation'"
        :class="{ open: isMobileMenuOpen }"
      >
        <div class="mobile-nav-content">
          <button
            v-for="section in navigationSections"
            :key="section.id"
            @click="
              () => {
                showSection(section.id)
                closeMobileMenu()
              }
            "
            @keydown.enter="
              () => {
                showSection(section.id)
                closeMobileMenu()
              }
            "
            :class="{ active: currentView === section.id }"
            :aria-current="currentView === section.id ? 'page' : undefined"
            class="mobile-nav-btn"
            type="button"
            :aria-label="navigationLabels[section.id]"
          >
            <span class="nav-icon">{{ section.name }}</span>
            <span class="nav-text">{{ navigationLabels[section.id] }}</span>
          </button>
        </div>
      </nav>
    </header>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
      @keydown.escape="closeMobileMenu"
      tabindex="-1"
    ></div>

    <!-- Terminal Interface -->
    <main class="terminal-container" role="main">
      <TerminalHeader @show-section="showSection" />
      <TerminalBody
        :current-view="currentView"
        @show-section="showSection"
        @command-submitted="handleCommandSubmit"
        ref="terminalBodyRef"
      />
    </main>
    <footer class="footer" role="contentinfo">
      <p>
        <a href="https://involvex.github.io/Involvex/" target="_blank" class="link homepage"
          >&copy; 2025 Involvex</a
        >
        <br />
        <a href="https://github.com/involvex" target="_blank" class="link github"
          ><svg
            role="img"
            viewBox="0 0 24 24"
            style="
              width: 25px;
              height: 25px;
              background-color: white;
              box-shadow: 1px snow;
              text-box: inherit;
              transform: scale();
              border: 1px solid snow;
              color: white;
              padding: 2px;
              border-radius: 50%;
            "
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>GitHub</title>
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
          Github</a
        >
      </p>
    </footer>
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

type NavigationLabels = {
  [key: string]: string
}

interface AppEmits {
  'show-section': [section: string]
}

// Constants for better maintainability
const NAVIGATION_SECTIONS = Object.freeze([
  // { id: 'home', name: '🏠' },
  { id: 'welcome', name: '🏚️' },
  { id: 'help', name: '🤔 help' },

  { id: 'about', name: '❓' },
  { id: 'projects', name: '⌨️' },
  { id: 'contact', name: '📝' },
  { id: 'skills', name: '⭐' },
  { id: 'sponsor', name: '💸' },
] as const)

const NAVIGATION_LABELS: NavigationLabels = Object.freeze({
  welcome: 'Home',
  about: 'About',
  projects: 'Projects',
  contact: 'Contact',
  skills: 'Skills',
  sponsor: 'Sponsor',
})

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
const isMobileMenuOpen = ref(false)
const terminalBodyRef = ref<InstanceType<typeof TerminalBody> | null>(null)

// Computed properties for better performance
const navigationSections = NAVIGATION_SECTIONS as readonly NavigationSection[]
const navigationLabels = computed(() => NAVIGATION_LABELS)

// Removed unused getRoutePath function

// Mobile menu methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

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

// Handle command submission from terminal
const handleCommandSubmit = (command: string): void => {
  handleCommand(command)
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
  position: relative;
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
  flex-shrink: 0;
  text-decoration: none;
}

.logo-section:hover,
.logo-section:focus-visible {
  transform: scale(1.05);
  outline: 2px solid #58a6ff;
  outline-offset: 2px;
}

.logo-img {
  width: clamp(28px, 4vw, 40px);
  height: clamp(28px, 4vw, 40px);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(88, 166, 255, 0.3);
  transition: all 0.3s ease;
  object-fit: cover;
  background: transparent;
}

.logo-text {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 600;
  color: #07cf11;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  gap: 0.25rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
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
  min-height: 36px;
  text-decoration: none;
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

.nav-icon {
  font-size: 1rem;
  line-height: 1;
}

.nav-text {
  font-weight: 500;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px;
  gap: 3px;
}

.mobile-menu-btn:hover,
.mobile-menu-btn:focus-visible {
  background: rgba(29, 118, 219, 0.603);
  border-color: #30363d;
  outline: 2px solid #58a6ff;
  outline-offset: 2px;
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background: #8b949e;
  border-radius: 1px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Navigation */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(42, 43, 42, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid #046e34;
  border-top: none;
  border-radius: 0 0 16px 16px;
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
  opacity: 0;
  z-index: 999;
}

.mobile-nav.open {
  max-height: 300px;
  opacity: 1;
}

.mobile-nav-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: 1px solid rgba(88, 166, 255, 0.2);
  color: #8b949e;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: 0.875rem;
  text-align: left;
  min-height: 44px;
  text-decoration: none;
}

.mobile-nav-btn:hover,
.mobile-nav-btn:focus-visible {
  background: rgba(29, 118, 219, 0.603);
  color: #58a6ff;
  border-color: #58a6ff;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.mobile-nav-btn.active {
  background: rgba(6, 30, 58, 0.2);
  color: #58a6ff;
  border-color: #58a6ff;
}

.mobile-nav-btn .nav-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.mobile-nav-btn .nav-text {
  font-weight: 500;
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(2px);
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
  .nav-btn,
  .mobile-menu-btn,
  .hamburger-line,
  .mobile-nav {
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

  .nav-btn.active,
  .mobile-nav-btn.active {
    border: 2px solid #58a6ff;
  }
}

/* Desktop Navigation - Show on larger screens */
@media (min-width: 769px) {
  .desktop-nav {
    display: flex;
  }

  .mobile-menu-btn {
    display: none;
  }
}

/* Mobile Navigation - Hide on larger screens */
@media (min-width: 769px) {
  .mobile-nav,
  .mobile-overlay {
    display: none;
  }
}

/* Tablet Styles */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .logo-text {
    font-size: 1.1rem;
  }
}

/* Small Mobile Styles */
@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.75rem;
  }

  .logo-section {
    gap: 0.5rem;
  }

  .logo-text {
    font-size: 1rem;
  }
}

/* Extra Small Mobile Styles */
@media (max-width: 360px) {
  .logo-text {
    display: none;
  }

  .logo-img {
    width: 32px;
    height: 32px;
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
.nav-btn:focus-visible,
.mobile-menu-btn:focus-visible,
.mobile-nav-btn:focus-visible {
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

  .mobile-nav,
  .mobile-overlay,
  .mobile-menu-btn {
    display: none;
  }

  .terminal-container {
    margin-top: 0;
  }
}
.footer {
  padding: 1rem;
  text-align: center;
  font-size: 0.95rem;
  font-style: normal;
  font: bold;
  color: #0ab10a;
  border-top: 1px solid #30363d;
  bottom: 0;
  position: fixed;
  margin-bottom: 0px;
  margin-top: auto;
  background: transparent;
  transform: translateY();
  align-content: center;
  width: 100%;
  border: 1px solid #07cf11;
  border-radius: 5px;
  box-shadow: #046e34;
  background-color: #0d1117;
}
</style>
