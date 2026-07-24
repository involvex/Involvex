<template>
	<div class="terminal-body">
		<div
			class="crt-scanlines"
			aria-hidden="true"
		></div>
		<div
			class="crt-scan-beam"
			aria-hidden="true"
		></div>

		<div class="terminal-content">
			<div class="output-section boot-art">
				<div class="ascii-art">
					<pre class="ascii-text ascii-desktop">{{ ASCII_ART }}</pre>
					<pre class="ascii-text ascii-mobile">{{ ASCII_ART_MOBILE }}</pre>
				</div>
			</div>

			<div class="terminal-history">
				<div
					v-for="item in terminalHistory"
					:key="item.id"
					class="history-item"
					:class="`history-${item.type}`"
				>
					<div
						v-if="item.type === 'command'"
						class="terminal-line"
					>
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">{{ item.command }}</span>
					</div>
					<div
						v-if="item.output"
						class="output-section"
						v-html="item.output"
					></div>
					<div
						v-if="item.type === 'clear'"
						class="clear-message"
					>
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">clear</span>
						<div class="clear-notice">Terminal cleared</div>
					</div>
				</div>
			</div>

			<!-- Help on welcome or help view -->
			<div
				v-if="showHelpPanel"
				class="help-panel"
			>
				<div class="terminal-line">
					<span class="prompt">involvex@portfolio:~$</span>
					<span class="command">help</span>
				</div>
				<div class="output-section">
					<div class="help-commands">
						<button
							v-for="item in HELP_COMMANDS"
							:key="item.cmd"
							type="button"
							class="command-item clickable"
							@click="executeCommand(item.cmd)"
						>
							<span class="cmd">{{ item.cmd }}</span>
							<span class="desc">— {{ item.desc }}</span>
						</button>
					</div>
				</div>
			</div>

			<!-- Section content -->
			<div
				v-if="isContentView"
				class="section-content"
			>
				<!-- About -->
				<div v-if="currentView === 'about'">
					<div class="terminal-line">
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">cat about.txt</span>
					</div>
					<div class="output-section">
						<div class="term-block">
							<div
								v-for="field in ABOUT_FIELDS"
								:key="field.key"
								class="kv-row"
							>
								<span class="kv-key">{{ field.key }}:</span>
								<span class="kv-value">{{ field.value }}</span>
							</div>
							<p class="prose">{{ PROFILE.bio }}</p>
							<ul class="philosophy-list">
								<li
									v-for="line in PROFILE.philosophy"
									:key="line"
								>
									{{ line }}
								</li>
							</ul>
							<div class="inline-socials">
								<a
									v-for="social in SOCIALS"
									:key="social.id"
									:href="social.url"
									target="_blank"
									rel="noopener noreferrer"
									class="inline-link"
									>{{ social.handle ?? social.label }}</a
								>
							</div>
						</div>
					</div>
				</div>

				<!-- Projects -->
				<div v-if="currentView === 'projects'">
					<div class="terminal-line">
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">ls projects/</span>
					</div>
					<div class="output-section">
						<div class="projects-list">
							<article
								v-for="project in FEATURED_PROJECTS"
								:key="project.name"
								class="project-entry"
							>
								<div class="project-title-row">
									<span class="project-name">[{{ project.name }}]</span>
									<span
										v-if="project.stars"
										class="project-stars"
										>★ {{ project.stars }}</span
									>
								</div>
								<p class="project-description">{{ project.description }}</p>
								<div class="project-meta">
									<span
										v-for="tech in project.technologies"
										:key="tech"
										class="tech-tag"
										>{{ tech }}</span
									>
								</div>
								<div class="project-links">
									<a
										:href="project.github"
										target="_blank"
										rel="noopener noreferrer"
										class="project-link"
										>→ github</a
									>
									<a
										v-if="project.demo"
										:href="project.demo"
										target="_blank"
										rel="noopener noreferrer"
										class="project-link"
										>→ demo</a
									>
								</div>
							</article>
						</div>
					</div>
				</div>

				<!-- Skills -->
				<div v-if="currentView === 'skills'">
					<div class="terminal-line">
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">skills{{ showAllSkills ? ' --all' : '' }}</span>
					</div>
					<div class="output-section">
						<div class="skills-list">
							<div
								v-for="category in visibleSkills"
								:key="category.name"
								class="skill-category"
							>
								<h4 class="category-name">{{ category.name }}</h4>
								<div
									v-for="skill in category.items"
									:key="skill.name"
									class="skill-meter-row"
								>
									<span class="skill-name">{{ skill.name }}</span>
									<span
										class="skill-meter"
										aria-hidden="true"
										>{{ skillMeter(skill.level) }}</span
									>
									<span class="skill-level">{{ skill.level }}%</span>
								</div>
							</div>
						</div>
						<button
							v-if="hasExtraSkills"
							type="button"
							class="show-more-btn"
							@click="showAllSkills = !showAllSkills"
						>
							{{ showAllSkills ? 'skills (core only)' : 'skills --all' }}
						</button>
					</div>
				</div>

				<!-- Contact -->
				<div v-if="currentView === 'contact'">
					<div class="terminal-line">
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">contact</span>
					</div>
					<div class="output-section">
						<div class="term-block">
							<div class="kv-row">
								<span class="kv-key">Email:</span>
								<a
									:href="`mailto:${PROFILE.email}`"
									class="kv-value link"
									>{{ PROFILE.email }}</a
								>
							</div>
							<div class="kv-row">
								<span class="kv-key">Discord:</span>
								<span class="kv-value">{{ PROFILE.discord }}</span>
							</div>
							<div
								v-for="social in SOCIALS"
								:key="social.id"
								class="kv-row"
							>
								<span class="kv-key">{{ social.label }}:</span>
								<a
									:href="social.url"
									target="_blank"
									rel="noopener noreferrer"
									class="kv-value link"
									>{{ social.handle ?? social.url }}</a
								>
							</div>
							<div class="contact-actions">
								<a
									:href="`mailto:${PROFILE.email}?subject=Portfolio Contact`"
									class="action-btn"
									>Send Email</a
								>
								<a
									:href="SOCIALS[0]!.url"
									target="_blank"
									rel="noopener noreferrer"
									class="action-btn"
									>GitHub Profile</a
								>
							</div>
							<p class="prose muted">
								Reach out for collaborations, questions, or open-source ideas.
							</p>
						</div>
					</div>
				</div>

				<!-- Sponsor -->
				<div v-if="currentView === 'sponsor'">
					<div class="terminal-line">
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">sponsor</span>
					</div>
					<div class="output-section">
						<div class="sponsor-menu">
							<a
								v-for="option in SPONSOR_OPTIONS"
								:key="option.id"
								:href="option.url"
								target="_blank"
								rel="noopener noreferrer"
								class="sponsor-row"
							>
								<span class="sponsor-label">{{ option.label }}</span>
								<span class="sponsor-desc">{{ option.description }}</span>
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Sticky input + mobile chips -->
			<div class="terminal-input-sticky">
				<div class="command-chips">
					<button
						v-for="chip in COMMAND_CHIPS"
						:key="chip"
						type="button"
						class="chip"
						@click="executeCommand(chip)"
					>
						{{ chip }}
					</button>
				</div>
				<div class="terminal-input-wrapper">
					<TerminalInput
						@command-submitted="handleCommandSubmit"
						@show-section="handleSectionChange"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	ABOUT_FIELDS,
	ASCII_ART,
	ASCII_ART_MOBILE,
	COMMAND_CHIPS,
	FEATURED_PROJECTS,
	HELP_COMMANDS,
	PROFILE,
	SKILL_CATEGORIES,
	SOCIALS,
	SPONSOR_OPTIONS,
	resolveCommand,
	skillMeter,
} from '../data/portfolio'
import TerminalInput from './TerminalInput.vue'
import {computed, ref} from 'vue'

const props = withDefaults(
	defineProps<{
		currentView?: string
	}>(),
	{
		currentView: 'welcome',
	},
)

const emit = defineEmits<{
	'show-section': [section: string]
}>()

interface TerminalHistoryItem {
	id: number
	command: string
	output: string
	timestamp: string
	type: 'command' | 'output' | 'clear'
}

const terminalHistory = ref<TerminalHistoryItem[]>([])
const showAllSkills = ref(false)

const currentView = computed(() => props.currentView)

const showHelpPanel = computed(
	() => currentView.value === 'welcome' || currentView.value === 'help',
)

const isContentView = computed(() =>
	['about', 'projects', 'skills', 'contact', 'sponsor'].includes(currentView.value),
)

const visibleSkills = computed(() => {
	if (showAllSkills.value) return SKILL_CATEGORIES
	return SKILL_CATEGORIES.filter(c => c.core !== false)
})

const hasExtraSkills = computed(() => SKILL_CATEGORIES.some(c => c.core === false))

const addToHistory = (command: string) => {
	terminalHistory.value.push({
		id: Date.now(),
		command,
		output: '',
		timestamp: new Date().toLocaleTimeString(),
		type: 'command',
	})
}

const handleSectionChange = (section: string) => {
	emit('show-section', section)
}

const handleCommandSubmit = (command: string) => {
	addToHistory(command)
	executeCommand(command)
}

const clearTerminal = () => {
	terminalHistory.value.push({
		id: Date.now(),
		command: 'clear',
		output: '',
		timestamp: new Date().toLocaleTimeString(),
		type: 'clear',
	})
	setTimeout(() => {
		terminalHistory.value = []
	}, 100)
}

const executeCommand = (command: string) => {
	const normalized = command.toLowerCase().trim()

	if (normalized === 'clear') {
		clearTerminal()
		emit('show-section', 'welcome')
		return
	}

	if (normalized === 'whoami') {
		terminalHistory.value.push({
			id: Date.now() + 1,
			command: '',
			output: `<div class="output">${PROFILE.handle}</div>`,
			timestamp: new Date().toLocaleTimeString(),
			type: 'output',
		})
		return
	}

	if (normalized === 'date') {
		terminalHistory.value.push({
			id: Date.now() + 1,
			command: '',
			output: `<div class="output">${new Date().toString()}</div>`,
			timestamp: new Date().toLocaleTimeString(),
			type: 'output',
		})
		return
	}

	if (normalized === 'pwd') {
		terminalHistory.value.push({
			id: Date.now() + 1,
			command: '',
			output: '<div class="output">/home/involvex/portfolio</div>',
			timestamp: new Date().toLocaleTimeString(),
			type: 'output',
		})
		return
	}

	if (normalized === 'ls') {
		terminalHistory.value.push({
			id: Date.now() + 1,
			command: '',
			output:
				'<div class="output"><div>about/</div><div>projects/</div><div>skills/</div><div>contact/</div><div>sponsor/</div></div>',
			timestamp: new Date().toLocaleTimeString(),
			type: 'output',
		})
		return
	}

	if (normalized === 'github') {
		window.open(SOCIALS[0]!.url, '_blank')
		return
	}

	const resolved = resolveCommand(normalized)
	emit('show-section', resolved)
}

defineExpose({
	executeCommand,
})
</script>

<script lang="ts">
export default {
	name: 'TerminalBody',
}
</script>

<style scoped>
.terminal-body {
	background: var(--crt-bg, #0a0a0a);
	min-height: calc(100dvh - var(--crt-header-height, 60px) - var(--crt-footer-height, 56px) - 48px);
	padding: 16px 20px 0;
	font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace;
	overflow-y: auto;
	position: relative;
	display: flex;
	flex-direction: column;
	flex: 1;
}

.crt-scanlines,
.crt-scan-beam {
	pointer-events: none;
	position: absolute;
	inset: 0;
	z-index: 2;
}

.crt-scanlines {
	background: repeating-linear-gradient(
		to bottom,
		transparent 0,
		transparent 2px,
		rgba(0, 255, 65, 0.03) 2px,
		rgba(0, 255, 65, 0.03) 3px
	);
}

.crt-scan-beam {
	background: linear-gradient(
		to bottom,
		transparent 0%,
		rgba(0, 255, 65, 0.06) 50%,
		transparent 100%
	);
	height: 40%;
	animation: scanline 8s linear infinite;
	opacity: 0.5;
}

.terminal-content {
	max-width: 100%;
	position: relative;
	z-index: 3;
	display: flex;
	flex-direction: column;
	flex: 1;
}

.boot-art {
	animation: bootFade 0.4s ease;
}

.terminal-line {
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	gap: 10px;
	flex-wrap: wrap;
}

.prompt {
	color: var(--crt-green, #00ff41);
	font-weight: 600;
	white-space: nowrap;
	flex-shrink: 0;
}

.command {
	color: #ffffff;
	font-weight: 500;
	word-break: break-word;
}

.output-section {
	margin-left: 12px;
	margin-bottom: 24px;
}

.history-item {
	animation: fadeInUp 0.25s ease;
}

.clear-notice {
	color: var(--crt-text, #c8c8c8);
	margin-left: 12px;
	margin-top: 4px;
}

.ascii-art {
	margin: 12px 0 20px;
	text-align: center;
}

.ascii-text {
	color: var(--crt-green, #00ff41);
	font-size: clamp(10px, 1.1vw, 14px);
	line-height: 1.2;
	text-shadow: 0 0 10px rgba(0, 255, 65, 0.35);
	white-space: pre;
	margin: 0;
}

.ascii-desktop {
	display: block;
}

.ascii-mobile {
	display: none;
}

.help-panel {
	margin-bottom: 16px;
}

.help-commands {
	display: grid;
	grid-template-columns: 1fr;
	gap: 4px 24px;
}

@media (min-width: 768px) {
	.help-commands {
		grid-template-columns: 1fr 1fr;
	}
}

.command-item {
	display: flex;
	align-items: center;
	gap: 12px;
	background: transparent;
	border: 1px solid transparent;
	color: inherit;
	font-family: inherit;
	font-size: inherit;
	text-align: left;
	padding: 12px 14px;
	min-height: 44px;
	border-radius: 4px;
	cursor: pointer;
	transition: background 0.15s ease;
}

.command-item.clickable:hover,
.command-item.clickable:focus-visible {
	background: var(--crt-green-mute, rgba(0, 255, 65, 0.15));
	border-color: var(--crt-border, rgba(0, 255, 65, 0.25));
	outline: none;
}

.cmd {
	color: var(--crt-green, #00ff41);
	font-weight: 600;
	min-width: 80px;
	flex-shrink: 0;
}

.desc {
	color: var(--crt-text, #c8c8c8);
	flex: 1;
}

.term-block {
	border-left: 3px solid var(--crt-green, #00ff41);
	padding: 12px 16px;
	background: rgba(0, 255, 65, 0.04);
}

.kv-row {
	display: grid;
	grid-template-columns: 100px 1fr;
	gap: 8px;
	margin-bottom: 6px;
	font-size: 14px;
}

.kv-key {
	color: var(--crt-green-dim, #00cc33);
}

.kv-value,
.kv-value.link {
	color: #fff;
	padding: 0;
}

.prose {
	margin-top: 16px;
	color: var(--crt-text, #c8c8c8);
	line-height: 1.6;
	font-size: 14px;
}

.prose.muted {
	font-size: 13px;
	opacity: 0.85;
}

.philosophy-list {
	margin: 12px 0 0;
	padding-left: 1.2rem;
	color: var(--crt-text, #c8c8c8);
	font-size: 13px;
}

.philosophy-list li {
	margin-bottom: 4px;
}

.inline-socials {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	margin-top: 16px;
}

.inline-link {
	color: var(--crt-green, #00ff41);
	font-size: 13px;
	padding: 4px 0;
}

.projects-list {
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;
}

@media (min-width: 768px) {
	.projects-list {
		grid-template-columns: 1fr 1fr;
	}
}

.project-entry {
	border-left: 3px solid var(--crt-green, #00ff41);
	padding: 12px 14px;
	background: rgba(0, 255, 65, 0.04);
}

.project-title-row {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 8px;
	flex-wrap: wrap;
	margin-bottom: 6px;
}

.project-name {
	color: var(--crt-green, #00ff41);
	font-weight: 600;
	font-size: 15px;
}

.project-stars {
	color: var(--crt-text, #c8c8c8);
	font-size: 12px;
}

.project-description {
	color: var(--crt-text, #c8c8c8);
	font-size: 13px;
	line-height: 1.5;
	margin-bottom: 8px;
}

.project-meta {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	margin-bottom: 8px;
}

.tech-tag {
	color: var(--crt-green-dim, #00cc33);
	font-size: 11px;
	border: 1px solid var(--crt-border, rgba(0, 255, 65, 0.25));
	padding: 2px 6px;
	border-radius: 2px;
}

.project-links {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.project-link {
	color: var(--crt-green, #00ff41);
	font-size: 13px;
	padding: 0;
}

.skills-list {
	display: grid;
	grid-template-columns: 1fr;
	gap: 20px;
}

@media (min-width: 768px) {
	.skills-list {
		grid-template-columns: 1fr 1fr;
	}
}

.skill-category {
	border-left: 3px solid var(--crt-green, #00ff41);
	padding: 10px 14px;
	background: rgba(0, 255, 65, 0.04);
}

.category-name {
	color: var(--crt-green, #00ff41);
	font-size: 15px;
	font-weight: 600;
	margin-bottom: 12px;
}

.skill-meter-row {
	display: grid;
	grid-template-columns: minmax(90px, 120px) 1fr auto;
	gap: 8px;
	align-items: center;
	margin-bottom: 8px;
	font-size: 13px;
}

.skill-name {
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.skill-meter {
	color: var(--crt-green, #00ff41);
	font-size: 12px;
	letter-spacing: 0;
	overflow: hidden;
}

.skill-level {
	color: var(--crt-green-dim, #00cc33);
	font-size: 12px;
	min-width: 36px;
	text-align: right;
}

.show-more-btn {
	margin-top: 12px;
	background: transparent;
	border: 1px solid var(--crt-border, rgba(0, 255, 65, 0.25));
	color: var(--crt-green, #00ff41);
	font-family: inherit;
	font-size: 13px;
	padding: 10px 14px;
	min-height: 44px;
	cursor: pointer;
	border-radius: 4px;
}

.show-more-btn:hover {
	background: var(--crt-green-mute, rgba(0, 255, 65, 0.15));
}

.contact-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-top: 16px;
}

.action-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 44px;
	padding: 10px 18px;
	background: var(--crt-green, #00ff41);
	color: #000 !important;
	font-weight: 600;
	font-size: 13px;
	border-radius: 4px;
	text-shadow: none !important;
}

.action-btn:hover {
	background: var(--crt-green-dim, #00cc33);
	transform: none;
}

.sponsor-menu {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.sponsor-row {
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 14px 16px;
	min-height: 48px;
	border-left: 3px solid var(--crt-green, #00ff41);
	background: rgba(0, 255, 65, 0.04);
	color: inherit;
	text-decoration: none;
	transition: background 0.15s ease;
}

.sponsor-row:hover {
	background: var(--crt-green-mute, rgba(0, 255, 65, 0.15));
	transform: none;
}

.sponsor-label {
	color: var(--crt-green, #00ff41);
	font-weight: 600;
	font-size: 14px;
}

.sponsor-desc {
	color: var(--crt-text, #c8c8c8);
	font-size: 13px;
}

.terminal-input-sticky {
	position: sticky;
	bottom: 0;
	margin-top: auto;
	padding-top: 8px;
	padding-bottom: 12px;
	background: linear-gradient(to top, var(--crt-bg, #0a0a0a) 70%, transparent);
	z-index: 5;
}

.command-chips {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-bottom: 10px;
	padding: 0 4px;
}

.chip {
	min-height: 44px;
	padding: 10px 14px;
	font-family: inherit;
	font-size: 13px;
	color: var(--crt-green, #00ff41);
	background: transparent;
	border: 1px solid var(--crt-border, rgba(0, 255, 65, 0.25));
	border-radius: 4px;
	cursor: pointer;
	transition: background 0.15s ease;
}

.chip:hover,
.chip:focus-visible {
	background: var(--crt-green-mute, rgba(0, 255, 65, 0.15));
	outline: none;
}

.terminal-input-wrapper {
	padding: 0 4px;
}

@media (min-width: 769px) {
	.command-chips {
		display: none;
	}
}

@media (max-width: 768px) {
	.terminal-body {
		padding: 12px 12px 0;
		min-height: calc(
			100dvh - var(--crt-header-height, 60px) - var(--crt-footer-height, 56px) - 24px
		);
	}

	.ascii-desktop {
		display: none;
	}

	.ascii-mobile {
		display: block;
		font-size: clamp(7px, 2.2vw, 10px);
	}

	.output-section {
		margin-left: 4px;
	}

	.kv-row {
		grid-template-columns: 80px 1fr;
		font-size: 13px;
	}

	.skill-meter-row {
		grid-template-columns: minmax(70px, 100px) 1fr auto;
		font-size: 12px;
	}
}

@media (max-width: 480px) {
	.terminal-body {
		padding: 10px 8px 0;
	}

	.skill-meter {
		font-size: 10px;
	}
}

@media (prefers-reduced-motion: reduce) {
	.crt-scan-beam {
		animation: none;
		opacity: 0.15;
	}

	.boot-art,
	.history-item {
		animation: none;
	}
}
</style>
