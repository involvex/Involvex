<template>
	<div id="app">
		<header
			class="nav-header"
			role="banner"
		>
			<div class="nav-container">
				<div
					class="logo-section"
					@click="showHome"
					@keydown.enter="showHome"
					@keydown.space.prevent="showHome"
					role="button"
					tabindex="0"
					:aria-label="`Navigate to ${navigationLabels.welcome}`"
				>
					<img
						src="/icon.png"
						alt="Involvex Logo"
						class="logo-img"
						loading="lazy"
					/>
					<span class="logo-text">Involvex</span>
				</div>

				<nav
					class="main-nav desktop-nav"
					role="navigation"
					aria-label="Main navigation"
				>
					<button
						v-for="section in navigationSections"
						:key="section.id"
						@click="() => showSection(section.id)"
						@keydown.enter="() => showSection(section.id)"
						:class="{active: currentView === section.id}"
						:aria-current="currentView === section.id ? 'page' : undefined"
						class="nav-btn"
						type="button"
						:aria-label="navigationLabels[section.id]"
					>
						<span class="nav-icon">{{ section.name }}</span>
						<span class="nav-text">{{ navigationLabels[section.id] }}</span>
					</button>
				</nav>

				<button
					class="mobile-menu-btn"
					@click="toggleMobileMenu"
					:aria-expanded="isMobileMenuOpen"
					aria-controls="mobile-nav"
					aria-label="Toggle navigation menu"
				>
					<span
						class="hamburger-line"
						:class="{active: isMobileMenuOpen}"
					></span>
					<span
						class="hamburger-line"
						:class="{active: isMobileMenuOpen}"
					></span>
					<span
						class="hamburger-line"
						:class="{active: isMobileMenuOpen}"
					></span>
				</button>
			</div>

			<nav
				id="mobile-nav"
				class="mobile-nav"
				role="navigation"
				aria-label="Mobile navigation"
				:class="{open: isMobileMenuOpen}"
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
						:class="{active: currentView === section.id}"
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

		<div
			v-if="isMobileMenuOpen"
			class="mobile-overlay"
			@click="closeMobileMenu"
			@keydown.escape="closeMobileMenu"
			tabindex="-1"
		></div>

		<main
			class="terminal-container"
			role="main"
		>
			<TerminalHeader @show-section="showSection" />
			<TerminalBody
				:current-view="currentView"
				@show-section="showSection"
				ref="terminalBodyRef"
			/>
		</main>

		<footer
			class="footer"
			role="contentinfo"
		>
			<p class="footer-copy">
				<a
					:href="PROFILE.portfolioUrl"
					target="_blank"
					rel="noopener noreferrer"
					class="link homepage"
					>&copy; {{ currentYear }} Involvex</a
				>
			</p>
			<div class="footer-socials">
				<a
					v-for="social in SOCIALS"
					:key="social.id"
					:href="social.url"
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					:aria-label="social.label"
				>
					<svg
						v-if="social.id === 'github'"
						class="social-icon"
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
						/>
					</svg>
					<svg
						v-else-if="social.id === 'x'"
						class="social-icon"
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
						/>
					</svg>
					<svg
						v-else-if="social.id === 'reddit'"
						class="social-icon"
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547A1.885 1.885 0 0 0 11.344 4.5a1.885 1.885 0 0 0-1.822 1.362l-2.596.547a1.25 1.25 0 0 1-2.498-.056 1.25 1.25 0 0 1 1.25-1.249c.484 0 .897.275 1.104.684l2.887-.609a1.885 1.885 0 0 0 .244-.053l.001-.001c.022-.005.043-.01.064-.016l2.886.61c.207-.409.62-.684 1.104-.684zM9.41 13.048c-.691.001-1.251.56-1.25 1.25a1.25 1.25 0 0 0 2.501.001c0-.69-.559-1.25-1.251-1.251zm5.18 0c-.691 0-1.251.56-1.25 1.25a1.25 1.25 0 0 0 2.501.001c0-.69-.56-1.25-1.251-1.251zm-5.982 3.456c.057.053 1.408 1.307 3.392 1.307 1.984 0 3.336-1.254 3.393-1.307a.5.5 0 0 1 .707.707c-.129.13-1.764 1.75-4.1 1.75-2.336 0-3.971-1.62-4.1-1.75a.5.5 0 0 1 .708-.707z"
						/>
					</svg>
					<span class="social-label">{{ social.label }}</span>
				</a>
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
import {PROFILE, SOCIALS, resolveCommand} from './data/portfolio'
import TerminalHeader from './components/TerminalHeader.vue'
import TerminalBody from './components/TerminalBody.vue'
import {computed, onMounted, onUnmounted, ref} from 'vue'

type NavigationSection = {
	id: string
	name: string
}

type NavigationLabels = {
	[key: string]: string
}

interface AppEmits {
	'show-section': [section: string]
}

/** Primary section switcher — help is command-only */
const NAVIGATION_SECTIONS = Object.freeze([
	{id: 'welcome', name: '⌂'},
	{id: 'about', name: '?'},
	{id: 'projects', name: '⌘'},
	{id: 'skills', name: '★'},
	{id: 'contact', name: '✉'},
	{id: 'sponsor', name: '♥'},
] as const)

const VALID_VIEWS = new Set([
	'welcome',
	'help',
	'about',
	'projects',
	'skills',
	'contact',
	'sponsor',
])

const NAVIGATION_LABELS: NavigationLabels = Object.freeze({
	welcome: 'Home',
	about: 'About',
	projects: 'Projects',
	skills: 'Skills',
	contact: 'Contact',
	sponsor: 'Sponsor',
})

interface Props {
	defaultView?: string
}

const props = withDefaults(defineProps<Props>(), {
	defaultView: 'welcome',
})

const emit = defineEmits<AppEmits>()

const currentView = ref<string>(props.defaultView)
const isMobileMenuOpen = ref(false)
const terminalBodyRef = ref<InstanceType<typeof TerminalBody> | null>(null)
const currentYear = new Date().getFullYear()

const navigationSections = NAVIGATION_SECTIONS as readonly NavigationSection[]
const navigationLabels = computed(() => NAVIGATION_LABELS)

const toggleMobileMenu = () => {
	isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
	isMobileMenuOpen.value = false
}

const showSection = (section: string): void => {
	try {
		const resolved = resolveCommand(section)
		if (!VALID_VIEWS.has(resolved)) {
			console.warn(`Invalid section: ${section}`)
			return
		}

		currentView.value = resolved
		emit('show-section', resolved)

		if (typeof window !== 'undefined' && window.history) {
			window.history.pushState({view: resolved}, '', `#${resolved}`)
		}
	} catch (error) {
		console.error('Error showing section:', error)
	}
}

const showHome = (): void => {
	showSection('welcome')
}

const handleKeydown = (event: KeyboardEvent): void => {
	if (event.key === 'Escape') {
		if (isMobileMenuOpen.value) {
			closeMobileMenu()
			return
		}
		showHome()
	}

	const keyNum = parseInt(event.key)
	if (keyNum >= 1 && keyNum <= NAVIGATION_SECTIONS.length) {
		const section = NAVIGATION_SECTIONS[keyNum - 1]
		if (section) showSection(section.id)
	}
}

const handlePopState = (event: PopStateEvent): void => {
	if (event.state?.view) {
		showSection(event.state.view)
	} else {
		const hash = window.location.hash.slice(1)
		if (hash) showSection(hash)
	}
}

onMounted(() => {
	document.addEventListener('keydown', handleKeydown)
	window.addEventListener('popstate', handlePopState)
	const hash = window.location.hash.slice(1)
	if (hash) showSection(hash)
})

onUnmounted(() => {
	document.removeEventListener('keydown', handleKeydown)
	window.removeEventListener('popstate', handlePopState)
})

defineExpose({
	showSection,
	showHome,
})
</script>

<style scoped>
#app {
	min-height: 100vh;
	background: var(--crt-panel);
	color: var(--crt-green);
	font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
}

.nav-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	background: rgba(10, 10, 10, 0.92);
	backdrop-filter: blur(10px);
	border-bottom: 1px solid var(--crt-border);
	transition: all 0.3s ease;
}

.nav-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: var(--crt-header-height);
	position: relative;
}

.logo-section {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	cursor: pointer;
	transition: transform 0.2s ease;
	border-radius: 6px;
	padding: 0.25rem;
	flex-shrink: 0;
}

.logo-section:hover,
.logo-section:focus-visible {
	transform: scale(1.03);
	outline: 2px solid var(--crt-green);
	outline-offset: 2px;
}

.logo-img {
	width: clamp(28px, 4vw, 40px);
	height: clamp(28px, 4vw, 40px);
	border-radius: 6px;
	box-shadow: var(--crt-glow);
	object-fit: cover;
}

.logo-text {
	font-size: clamp(1rem, 2.5vw, 1.25rem);
	font-weight: 600;
	color: var(--crt-green);
	white-space: nowrap;
}

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
	transition: all 0.15s ease;
	font-family: inherit;
	font-size: 0.875rem;
	white-space: nowrap;
	min-height: 36px;
}

.nav-btn:hover,
.nav-btn:focus-visible {
	background: var(--crt-green-mute);
	color: var(--crt-green);
	border-color: var(--crt-border);
	outline: 2px solid transparent;
}

.nav-btn:focus-visible {
	outline: 2px solid var(--crt-green);
	outline-offset: 2px;
}

.nav-btn.active {
	background: var(--crt-green-mute);
	color: var(--crt-green);
	border-color: var(--crt-green);
	box-shadow: var(--crt-glow);
}

.nav-icon {
	font-size: 1rem;
	line-height: 1;
}

.nav-text {
	font-weight: 500;
}

.mobile-menu-btn {
	display: none;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 44px;
	height: 44px;
	background: transparent;
	border: 1px solid transparent;
	border-radius: 6px;
	cursor: pointer;
	padding: 8px;
	gap: 3px;
}

.mobile-menu-btn:hover,
.mobile-menu-btn:focus-visible {
	background: var(--crt-green-mute);
	border-color: var(--crt-border);
	outline: 2px solid var(--crt-green);
	outline-offset: 2px;
}

.hamburger-line {
	width: 20px;
	height: 2px;
	background: #8b949e;
	border-radius: 1px;
	transition: all 0.3s ease;
}

.hamburger-line.active:nth-child(1) {
	transform: rotate(45deg) translate(5px, 5px);
	background: var(--crt-green);
}

.hamburger-line.active:nth-child(2) {
	opacity: 0;
}

.hamburger-line.active:nth-child(3) {
	transform: rotate(-45deg) translate(7px, -6px);
	background: var(--crt-green);
}

.mobile-nav {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background: rgba(10, 10, 10, 0.98);
	backdrop-filter: blur(10px);
	border: 1px solid var(--crt-border);
	border-top: none;
	border-radius: 0 0 12px 12px;
	max-height: 0;
	overflow: hidden;
	transition:
		max-height 0.3s ease,
		opacity 0.3s ease;
	opacity: 0;
	z-index: 999;
}

.mobile-nav.open {
	max-height: min(70vh, 480px);
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
	border: 1px solid var(--crt-border);
	color: #8b949e;
	border-radius: 6px;
	cursor: pointer;
	font-family: inherit;
	font-size: 0.875rem;
	text-align: left;
	min-height: 44px;
	transition: all 0.15s ease;
}

.mobile-nav-btn:hover,
.mobile-nav-btn:focus-visible,
.mobile-nav-btn.active {
	background: var(--crt-green-mute);
	color: var(--crt-green);
	border-color: var(--crt-green);
}

.mobile-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 998;
	backdrop-filter: blur(2px);
}

.terminal-container {
	width: min(1100px, calc(100% - 48px));
	margin: calc(var(--crt-header-height) + 12px) auto calc(var(--crt-footer-height) + 24px);
	min-height: calc(100dvh - var(--crt-header-height) - var(--crt-footer-height) - 36px);
	display: flex;
	flex-direction: column;
	border: 1px solid var(--crt-border);
	border-radius: 8px 8px 4px 4px;
	box-shadow:
		var(--crt-glow),
		0 0 40px rgba(0, 0, 0, 0.8);
	overflow: hidden;
	position: relative;
	z-index: 1;
	background: var(--crt-bg);
}

.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	padding: 0.5rem 1rem;
	text-align: center;
	font-size: 0.85rem;
	color: var(--crt-green);
	border-top: 1px solid var(--crt-border);
	background: rgba(10, 10, 10, 0.95);
	backdrop-filter: blur(8px);
	min-height: var(--crt-footer-height);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.35rem;
}

.footer-copy {
	margin: 0;
}

.footer-copy .link {
	color: var(--crt-green);
	padding: 0;
}

.footer-socials {
	display: flex;
	gap: 1rem;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}

.social-link {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	min-height: 44px;
	min-width: 44px;
	padding: 0.35rem 0.5rem;
	color: var(--crt-green);
	border-radius: 4px;
	transition: background 0.15s ease;
}

.social-link:hover,
.social-link:focus-visible {
	background: var(--crt-green-mute);
	outline: 1px solid var(--crt-green);
}

.social-icon {
	width: 18px;
	height: 18px;
	fill: var(--crt-green);
	flex-shrink: 0;
}

.social-label {
	font-size: 0.8rem;
}

@media (min-width: 1280px) {
	.terminal-container {
		width: min(1200px, calc(100% - 64px));
	}
}

@media (min-width: 769px) {
	.desktop-nav {
		display: flex;
	}

	.mobile-menu-btn,
	.mobile-nav,
	.mobile-overlay {
		display: none;
	}
}

@media (max-width: 768px) {
	.desktop-nav {
		display: none;
	}

	.mobile-menu-btn {
		display: flex;
	}

	.terminal-container {
		width: calc(100% - 16px);
		margin: calc(var(--crt-header-height) + 8px) auto calc(var(--crt-footer-height) + 16px);
		border-radius: 6px;
	}

	.social-label {
		font-size: 0.75rem;
	}
}

@media (max-width: 480px) {
	.nav-container {
		padding: 0 0.75rem;
	}

	.logo-section {
		gap: 0.5rem;
	}

	.footer-socials {
		gap: 0.5rem;
	}
}

@media (max-width: 360px) {
	.logo-text {
		display: none;
	}

	.logo-img {
		width: 32px;
		height: 32px;
	}
}

@media (prefers-reduced-motion: reduce) {
	.nav-header,
	.logo-section,
	.nav-btn,
	.mobile-menu-btn,
	.hamburger-line,
	.mobile-nav {
		transition: none;
	}
}

@media print {
	.nav-header,
	.footer,
	.mobile-nav,
	.mobile-overlay,
	.mobile-menu-btn {
		display: none;
	}

	.terminal-container {
		margin: 0;
		width: 100%;
		box-shadow: none;
	}
}
</style>
