<template>
	<div class="terminal-body">
		<div class="terminal-content">
			<!-- Welcome ASCII Art -->
			<div class="output-section">
				<div class="ascii-art">
					<pre class="ascii-text">{{ asciiArt }}</pre>
				</div>
			</div>

			<!-- Terminal History -->
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

			<!-- Terminal Input Component -->
			<div class="terminal-input-wrapper">
				<TerminalInput
					@command-submitted="handleCommandSubmit"
					@show-section="handleSectionChange"
				/>
			</div>

			<!-- Command Output Display -->
			<div
				v-if="commandOutput"
				class="command-output-display"
			>
				<div class="terminal-line">
					<span class="prompt">involvex@portfolio:~$</span>
					<span class="command">{{ lastCommand }}</span>
				</div>
				<div
					class="output-section"
					v-html="commandOutput"
				></div>
			</div>

			<!-- Quick Navigation Commands (Clickable) -->
			<div class="quick-commands">
				<div class="terminal-line">
					<span class="prompt">involvex@portfolio:~$</span>
					<span class="command">help</span>
				</div>
				<div class="output-section">
					<div class="help-commands">
						<div
							class="command-item clickable"
							@click="executeCommand('help')"
						>
							<span class="cmd">help</span>
							<span class="desc">- View Help Commands</span>
						</div>
						<div
							class="command-item clickable"
							@click="executeCommand('about')"
						>
							<span class="cmd">about</span>
							<span class="desc">- Learn about Involvex</span>
						</div>
						<div
							class="command-item clickable"
							@click="executeCommand('projects')"
						>
							<span class="cmd">projects</span>
							<span class="desc">- View my GitHub projects</span>
						</div>
						<div
							class="command-item clickable"
							@click="executeCommand('skills')"
						>
							<span class="cmd">skills</span>
							<span class="desc">- See my technical skills</span>
						</div>
						<div
							class="command-item clickable"
							@click="executeCommand('contact')"
						>
							<span class="cmd">contact</span>
							<span class="desc">- Get in touch with me</span>
						</div>
						<div
							class="command-item clickable"
							@click="executeCommand('sponsor')"
						>
							<span class="cmd">sponsor</span>
							<span class="desc">- Support my work</span>
						</div>
						<div
							class="command-item clickable"
							@click="executeCommand('clear')"
						>
							<span class="cmd">clear</span>
							<span class="desc">- Clear the terminal</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Section Content Display -->
			<div
				v-if="currentView !== 'welcome'"
				class="section-content"
			>
				<!-- About Section  -->
				<div v-if="currentView === 'about'">
					<div class="terminal-line">
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">about</span>
					</div>
					<div class="output-section">
						<div class="about-content">
							<h3 class="section-title">About Involvex</h3>
							<div class="about-grid">
								<div class="about-card">
									<h4>👨‍💻 Developer</h4>
									<p>
										Passionate full-stack developer with expertise in modern web technologies and
										open-source contributions.
									</p>
								</div>
								<div class="about-card">
									<h4>🚀 Innovator</h4>
									<p>
										Creating innovative solutions and contributing to the developer community
										through open-source projects.
									</p>
								</div>
								<div class="about-card">
									<h4>🌐 Open Source</h4>
									<p>
										Active contributor to various open-source projects and maintainer of several
										repositories on GitHub.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Projects Section -->
				<div v-if="currentView === 'projects'">
					<div class="terminal-line">
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">projects</span>
					</div>
					<div class="output-section">
						<div class="projects-content">
							<h3 class="section-title">Featured Projects</h3>
							<div
								v-if="isLoadingProjects"
								class="loading-state"
							>
								<p>Loading projects from GitHub...</p>
							</div>
							<div
								v-else-if="projectsError"
								class="error-state"
							>
								<p>{{ projectsError }}</p>
							</div>
							<div
								v-else
								class="projects-grid"
							>
								<div
									class="project-card"
									v-for="project in projects"
									:key="project.name"
								>
									<div class="project-header">
										<h4 class="project-name">{{ project.name }}</h4>
										<div class="project-links">
											<a
												:href="project.github"
												target="_blank"
												class="project-link"
											>
												<span class="link-icon">🔗</span> GitHub
											</a>
											<a
												v-if="project.demo"
												:href="project.demo"
												target="_blank"
												class="project-link"
											>
												<span class="link-icon">🚀</span> Demo
											</a>
											<span
												v-if="project.stars"
												class="project-stats"
											>
												⭐ {{ project.stars }}
											</span>
										</div>
									</div>
									<p class="project-description">{{ project.description }}</p>
									<div class="project-tech">
										<span
											v-for="tech in project.technologies"
											:key="tech"
											class="tech-tag"
											>{{ tech }}</span
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Skills Section -->
				<div v-if="currentView === 'skills'">
					<div class="terminal-line">
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">skills</span>
					</div>
					<div class="output-section">
						<div class="skills-content">
							<h3 class="section-title">Technical Skills</h3>
							<div class="skills-grid">
								<div
									class="skill-category"
									v-for="category in skills"
									:key="category.name"
								>
									<h4 class="category-name">{{ category.name }}</h4>
									<div class="skill-items">
										<div
											v-for="skill in category.items"
											:key="skill.name"
											class="skill-item"
										>
											<span class="skill-name">{{ skill.name }}</span>
											<div class="skill-bar">
												<div
													class="skill-progress"
													:style="{width: skill.level + '%'}"
												></div>
											</div>
											<span class="skill-level">{{ skill.level }}%</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Contact Section -->
				<div v-if="currentView === 'contact'">
					<div class="terminal-line">
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">contact</span>
					</div>
					<div class="output-section">
						<div class="contact-content">
							<h3 class="section-title">Get In Touch</h3>
							<div class="contact-info">
								<p>
									📧 <strong>Email:</strong>
									<a
										href="mailto:involvex@proton.me"
										class="contact-link"
										>involvex@proton.me</a
									>
								</p>
								<p>
									🐙 <strong>GitHub:</strong>
									<a
										href="https://github.com/involvex"
										target="_blank"
										class="contact-link"
										>@involvex</a
									>
								</p>
								<p>💬 <strong>Discord:</strong> involvex</p>
							</div>
							<div class="contact-actions">
								<a
									href="mailto:involvex@proton.me?subject=Portfolio Contact&body=Hi Involvex,%0A%0AI'm reaching out from your portfolio..."
									class="contact-btn"
								>
									<span class="btn-icon">📧</span>
									Send Email
								</a>
								<a
									href="https://github.com/involvex"
									target="_blank"
									class="contact-btn"
								>
									<span class="btn-icon">🐙</span>
									GitHub Profile
								</a>
							</div>
							<div class="contact-note">
								<p>
									💡 Feel free to reach out for collaborations, questions, or just to say hello!
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Sponsor Section -->
				<div v-if="currentView === 'sponsor'">
					<div class="terminal-line">
						<span class="prompt">involvex@portfolio:~$</span>
						<span class="command">sponsor</span>
					</div>
					<div class="output-section">
						<div class="sponsor-content">
							<h3 class="section-title">Support My Work</h3>
							<div class="sponsor-grid">
								<div class="sponsor-card">
									<h4>🌟 GitHub Sponsors</h4>
									<p>Support my open-source work through GitHub Sponsors</p>
									<a
										href="https://github.com/sponsors/involvex"
										target="_blank"
										class="sponsor-btn"
									>
										<span class="btn-icon">⭐</span> Sponsor on GitHub
									</a>
								</div>
								<div class="sponsor-card">
									<h4>☕ Buy Me a Coffee</h4>
									<p>Show your appreciation with a coffee</p>
									<a
										href="https://buymeacoffee.com/involvex"
										target="_blank"
										class="sponsor-btn"
									>
										<span class="btn-icon">☕</span> Buy Coffee
									</a>
								</div>
								<div class="sponsor-card">
									<h4>💝 PayPal</h4>
									<p>Direct support via PayPal</p>
									<a
										href="https://paypal.me/involvex"
										target="_blank"
										class="sponsor-btn"
									>
										<span class="btn-icon">💝</span> Donate
									</a>
								</div>
								<div class="sponsor-card">
									<h4>💸 Microsoft Rewards</h4>
									<p>Support with Microsoft Rewards</p>
									<a
										href="https://rewards.bing.com/welcome?rh=14525F68&ref=rafsrchae&form=ML2XE3&OCID=ML2XE3&PUBL=RewardsDO&CREA=ML2XE3"
										target="_blank"
										class="sponsor-btn"
									>
										<span class="btn-icon">💸</span> Signup
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import TerminalInput from './TerminalInput.vue'
import {onMounted, ref} from 'vue'

const currentView = defineModel<string>('currentView', {
	default: 'welcome',
})

const emit = defineEmits<{
	'show-section': [section: string]
}>()

const asciiArt = `
    ██╗███╗   ██╗██╗   ██╗ ██████╗ ██╗     ██╗   ██╗███████╗██╗  ██╗
    ██║████╗  ██║██║   ██║██╔═══██╗██║     ██║   ██║██╔════╝╚██╗██╔╝
    ██║██╔██╗ ██║██║   ██║██║   ██║██║     ██║   ██║█████╗   ╚███╔╝
    ██║██║╚██╗██║╚██╗ ██╔╝██║   ██║██║     ╚██╗ ██╔╝██╔══╝   ██╔██╗
    ██║██║ ╚████║ ╚████╔╝ ╚██████╔╝███████╗ ╚████╔╝ ███████╗██╔╝ ██╗
    ╚═╝╚═╝  ╚═══╝  ╚═══╝   ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
`

// Reactive state
const commandOutput = ref('')
const lastCommand = ref('')

// Terminal history for commands and outputs
interface TerminalHistoryItem {
	id: number
	command: string
	output: string
	timestamp: string
	type: 'command' | 'output' | 'clear'
}

const terminalHistory = ref<TerminalHistoryItem[]>([])

interface Project {
	name: string
	description: string
	technologies: string[]
	github: string
	demo?: string | null
	stars?: number
	language?: string | null
	updated?: string
}

// GitHub API integration
const projects = ref<Project[]>([])
const isLoadingProjects = ref(false)
const projectsError = ref<string | null>(null)

const fetchProjects = async () => {
	isLoadingProjects.value = true
	projectsError.value = null

	try {
		// Fetch all repos using pagination
		let allRepos: GitHubApiResponse[] = []
		let page = 1
		let hasMore = true

		while (hasMore) {
			const response = await fetch(
				`https://api.github.com/users/involvex/repos?per_page=100&page=${page}`,
			)

			if (!response.ok) {
				throw new Error(`GitHub API error: ${response.status}`)
			}

			const repos = await response.json()

			if (repos.length === 0) {
				hasMore = false
			} else {
				allRepos = [...allRepos, ...repos]
				page++
				// Safety limit to prevent infinite loops
				if (page > 10) hasMore = false
			}
		}

		// Filter out forks and sort by stars (descending)
		const filteredRepos = allRepos
			.filter((repo: GitHubApiResponse) => !repo.fork)
			.sort((a: GitHubApiResponse, b: GitHubApiResponse) => b.stargazers_count - a.stargazers_count)
			.slice(0, 5) // Limit to top 5 projects

		// Transform GitHub API response to our format
		projects.value = filteredRepos.map(
			(repo: GitHubApiResponse): Project => ({
				name: repo.name,
				description: repo.description || 'No description available',
				technologies: extractTechnologies(repo),
				github: repo.html_url,
				demo: repo.homepage || null,
				stars: repo.stargazers_count,
				language: repo.language,
				updated: new Date(repo.updated_at).toLocaleDateString(),
			}),
		)
	} catch (error) {
		console.error('Error fetching projects:', error)
		projectsError.value = 'Failed to fetch projects from GitHub'

		// Fallback to sample projects if API fails
		projects.value = [
			{
				name: 'Involvex Portfolio',
				description: 'Terminal-style portfolio showcasing projects and skills',
				technologies: ['Vue.js', 'TypeScript', 'CSS3', 'Vite'],
				github: 'https://github.com/involvex/involvex',
			},
		]
	} finally {
		isLoadingProjects.value = false
	}
}

interface GitHubRepo {
	name: string
	description: string | null
	language: string | null
	fork: boolean
	stargazers_count: number
	html_url: string
	homepage: string | null
	updated_at: string
}

interface GitHubApiResponse {
	name: string
	description: string | null
	language: string | null
	fork: boolean
	stargazers_count: number
	html_url: string
	homepage: string | null
	updated_at: string
}

// Extract technologies based on repository characteristics
const extractTechnologies = (repo: GitHubRepo): string[] => {
	const tech: string[] = []

	if (repo.language) {
		tech.push(repo.language)
	}

	// Add technology hints based on repository name and description
	const name = repo.name.toLowerCase()
	const desc = (repo.description || '').toLowerCase()

	if (name.includes('vue') || desc.includes('vue')) tech.push('Vue.js')
	if (name.includes('react') || desc.includes('react')) tech.push('React')
	if (name.includes('node') || desc.includes('node')) tech.push('Node.js')
	if (name.includes('python') || desc.includes('python')) tech.push('Python')
	if (name.includes('docker')) tech.push('Docker')
	if (name.includes('ai') || desc.includes('ai')) tech.push('AI/ML')
	if (name.includes('api')) tech.push('API')
	if (name.includes('bot')) tech.push('Bot')

	// Remove duplicates and limit
	return [...new Set(tech)].slice(0, 4)
}

// Skills data
const skills = ref([
	{
		name: 'Frontend',
		items: [
			{name: 'Ink', level: 85},
			{name: 'React', level: 70},
			{name: 'TypeScript', level: 75},
			{name: 'CSS/SCSS', level: 85},
			{name: 'HTML5', level: 90},
		],
	},
	{
		name: 'Backend',
		items: [
			{name: 'Bun', level: 86},
			{name: 'Node.js', level: 85},
			{name: 'Python', level: 75},
			{name: 'Tauri', level: 75},
			{name: 'Rust', level: 55},
		],
	},
	{
		name: 'Mobile Development',
		items: [
			{name: 'Flutter', level: 75},
			{name: 'Ionic', level: 75},
			{name: 'Expo', level: 75},
			{name: 'React Native', level: 70},
		],
	},
	{
		name: 'Tools & Others',
		items: [
			{name: 'Git', level: 80},
			{name: 'Worker', level: 75},
			{name: 'Powershell', level: 65},
			{name: 'Linux', level: 75},
		],
	},
	{
		name: 'Agentic Tools',
		items: [
			{name: 'Opencode', level: 75},
			{name: 'Kilo', level: 75},
			{name: 'Copilot', level: 75},
			{name: 'Claude', level: 75},
			{name: 'Gemini', level: 75},
			{name: 'Cline', level: 75},
		],
	},
	{
		name: 'Favorite Frameworks',
		items: [
			{name: 'Ink', level: 85},
			{name: 'Bun', level: 85},
			{name: 'Tauri', level: 75},
			{name: 'Flutter', level: 75},
		],
	},
])

// Terminal history management
const addToHistory = (command: string) => {
	const timestamp = new Date().toLocaleTimeString()
	terminalHistory.value.push({
		id: Date.now(),
		command,
		output: '',
		timestamp,
		type: 'command',
	})
}

// Methods
const handleSectionChange = (section: string) => {
	emit('show-section', section)
}

const handleCommandSubmit = (command: string) => {
	addToHistory(command)
	executeCommand(command)
}

const executeCommand = (command: string) => {
	lastCommand.value = command

	// Handle clear command
	if (command === 'clear') {
		clearTerminal()
		return
	}

	emit('show-section', command)

	// Show command output and add to history
	const output = showCommandOutput(command)
	if (output) {
		addOutputToHistory(output)
	}
}

const clearTerminal = () => {
	// Add clear marker to history
	terminalHistory.value.push({
		id: Date.now(),
		command: 'clear',
		output: '',
		timestamp: new Date().toLocaleTimeString(),
		type: 'clear',
	})

	// Clear all history items except the clear command itself
	setTimeout(() => {
		terminalHistory.value = []
	}, 100)
}

const addOutputToHistory = (output: string) => {
	const timestamp = new Date().toLocaleTimeString()
	terminalHistory.value.push({
		id: Date.now() + 1,
		command: '',
		output,
		timestamp,
		type: 'output',
	})
}

const showCommandOutput = (command: string): string => {
	const outputs: Record<string, string> = {
		about: `
      <div class="about-output">
        <h3>About Involvex</h3>
        <p>👨‍💻 Full-stack developer passionate about creating innovative solutions</p>
        <p>🚀 Open-source contributor and tech enthusiast</p>
		<p><SVG role="img" width="16" height="16" style="fill: white;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Bun</title><path d="M12 22.596c6.628 0 12-4.338 12-9.688 0-3.318-2.057-6.248-5.219-7.986-1.286-.715-2.297-1.357-3.139-1.89C14.058 2.025 13.08 1.404 12 1.404c-1.097 0-2.334.785-3.966 1.821a49.92 49.92 0 0 1-2.816 1.697C2.057 6.66 0 9.59 0 12.908c0 5.35 5.372 9.687 12 9.687v.001ZM10.599 4.715c.334-.759.503-1.58.498-2.409 0-.145.202-.187.23-.029.658 2.783-.902 4.162-2.057 4.624-.124.048-.199-.121-.103-.209a5.763 5.763 0 0 0 1.432-1.977Zm2.058-.102a5.82 5.82 0 0 0-.782-2.306v-.016c-.069-.123.086-.263.185-.172 1.962 2.111 1.307 4.067.556 5.051-.082.103-.23-.003-.189-.126a5.85 5.85 0 0 0 .23-2.431Zm1.776-.561a5.727 5.727 0 0 0-1.612-1.806v-.014c-.112-.085-.024-.274.114-.218 2.595 1.087 2.774 3.18 2.459 4.407a.116.116 0 0 1-.049.071.11.11 0 0 1-.153-.026.122.122 0 0 1-.022-.083 5.891 5.891 0 0 0-.737-2.331Zm-5.087.561c-.617.546-1.282.76-2.063 1-.117 0-.195-.078-.156-.181 1.752-.909 2.376-1.649 2.999-2.778 0 0 .155-.118.188.085 0 .304-.349 1.329-.968 1.874Zm4.945 11.237a2.957 2.957 0 0 1-.937 1.553c-.346.346-.8.565-1.286.62a2.178 2.178 0 0 1-1.327-.62 2.955 2.955 0 0 1-.925-1.553.244.244 0 0 1 .064-.198.234.234 0 0 1 .193-.069h3.965a.226.226 0 0 1 .19.07c.05.053.073.125.063.197Zm-5.458-2.176a1.862 1.862 0 0 1-2.384-.245 1.98 1.98 0 0 1-.233-2.447c.207-.319.503-.566.848-.713a1.84 1.84 0 0 1 1.092-.11c.366.075.703.261.967.531a1.98 1.98 0 0 1 .408 2.114 1.931 1.931 0 0 1-.698.869v.001Zm8.495.005a1.86 1.86 0 0 1-2.381-.253 1.964 1.964 0 0 1-.547-1.366c0-.384.11-.76.32-1.079.207-.319.503-.567.849-.713a1.844 1.844 0 0 1 1.093-.108c.367.076.704.262.968.534a1.98 1.98 0 0 1 .4 2.117 1.932 1.932 0 0 1-.702.868Z"/></SVG> Bun is better then every other package manager!⌨️ npm install -g bun ! (Last npm command you used) and run bun pm migrate</p>
        <p>🎨 UI/UX designer with a focus on user experience</p>
        <p>📚 Lifelong learner dedicated to continuous improvement</p>
        <p><SVG role="img" width="16" height="16" style="fill: white;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GNOME Terminal</title><path d="M1.846 0A1.841 1.841 0 000 1.846v18.463c0 1.022.823 1.845 1.846 1.845h20.308A1.841 1.841 0 0024 20.31V1.846A1.841 1.841 0 0022.154 0H1.846zm0 .924h20.308c.512 0 .922.41.922.922v18.463c0 .511-.41.921-.922.921H1.846a.919.919 0 01-.922-.921V1.846c0-.512.41-.922.922-.922zm0 .922v18.463h20.308V1.846H1.846zm1.845 2.14l3.235 1.758v.836L3.69 8.477V7.385l2.243-1.207v-.033L3.69 5.076v-1.09zM7.846 9.23h3.693v.924H7.846V9.23zM0 21.736v.418C0 23.177.823 24 1.846 24h20.308A1.841 1.841 0 0024 22.154v-.418a2.334 2.334 0 01-1.846.918H1.846A2.334 2.334 0 010 21.736Z"/></SVG> Commandline First</p>
        <p>👾 Agents > Humand Developer</p>
        <p>🌐 Building the future of web development</p>
        <p>💡 Always learning and exploring new technologies</p>
      </div>
    `,
		projects: `
      <div class="projects-output">
        <h3>Featured Projects</h3>
        <p>📂 Loading projects from GitHub...</p>
      </div>
    `,
		skills: `
      <div class="skills-output">
        <h3>Technical Skills</h3>
        <p>🎯 Expertise in modern web technologies</p>
      </div>
    `,
		contact: `
      <div class="contact-output">
        <h3>Get In Touch</h3>
        <p>📧 Ready to collaborate on exciting projects</p>
      </div>
    `,
		sponsor: `
      <div class="sponsor-output">
        <h3>Support My Work</h3>
        <p>🙏 Thank you for considering supporting my open-source work</p>
      </div>
    `,
		help: `
      <div class="help-output">
        <h3>Available Commands</h3>
        <p>Use the commands above to navigate through the portfolio</p>
      </div>
    `,
	}

	const output = outputs[command] || `<div class="output">Command executed: ${command}</div>`
	commandOutput.value = output
	return output
}

// Lifecycle
onMounted(async () => {
	fetchProjects()
})

// Expose methods for parent components
defineExpose({
	executeCommand(command: string) {
		executeCommand(command)
	},
})
</script>

<script lang="ts">
export default {
	name: 'TerminalBody',
}
</script>

<style scoped>
.terminal-body {
	background: #0a0a0a;
	min-height: 600px;
	padding: 20px;
	font-family: 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
	overflow-y: auto;
	max-height: 80vh;
	position: relative;
}

.terminal-content {
	max-width: 100%;
}

.terminal-line {
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	gap: 10px;
	flex-wrap: wrap;
}

.prompt {
	color: #00ff00;
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
	margin-left: 20px;
	margin-bottom: 30px;
}

.terminal-input-wrapper {
	margin: 20px 0;
	padding: 0 20px;
}

.command-output-display {
	margin: 20px 0;
	padding: 0 20px;
	color: #00ff00;
	background: border-box;
	background-color: transparent;
	/* border: 1px solid #00ff0073;
  border-radius: 10px; */
	box-shadow: 1px lime;
}

.quick-commands {
	margin: 30px 0;
	padding: 0 20px;
}

.section-content {
	margin: 30px 0;
}

.ascii-art {
	margin: 20px 0;
	text-align: center;
	padding: 0 20px;
}

.ascii-text {
	color: #00ff00;
	font-size: clamp(8px, 2vw, 12px);
	line-height: 1.2;
	text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
	overflow-x: auto;
	white-space: pre;
}

.loading-state,
.error-state {
	text-align: center;
	padding: 20px;
	color: #cccccc;
}

.loading-state {
	color: #00ff00;
}

.error-state {
	color: #ff6b6b;
}

.help-commands {
	margin: 20px 0;
}

.command-item {
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	gap: 15px;
	flex-wrap: wrap;
}

.command-item.clickable {
	cursor: pointer;
	transition: all 0.2s ease;
	padding: 4px 8px;
	border-radius: 4px;
}

.command-item.clickable:hover {
	background: rgba(0, 255, 0, 0.05);
	transform: translateX(4px);
}

.cmd {
	color: #00ff00;
	font-weight: 600;
	min-width: 80px;
	flex-shrink: 0;
}

.desc {
	color: #cccccc;
	flex: 1;
}

.section-title {
	color: #00ff00;
	font-size: clamp(18px, 4vw, 24px);
	margin-bottom: 20px;
	text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.about-grid,
.projects-grid,
.skills-grid,
.sponsor-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 20px;
	margin: 20px 0;
}

.about-card,
.project-card,
.skill-category,
.sponsor-card {
	background: rgba(0, 255, 0, 0.05);
	border: 1px solid rgba(0, 255, 0, 0.2);
	border-radius: 8px;
	padding: 20px;
	transition: all 0.3s ease;
}

.about-card:hover,
.project-card:hover,
.sponsor-card:hover {
	background: rgba(0, 255, 0, 0.1);
	border-color: rgba(0, 255, 0, 0.4);
	transform: translateY(-2px);
}

.about-card h4,
.sponsor-card h4 {
	color: #00ff00;
	margin-bottom: 10px;
	font-size: 16px;
}

.about-card p {
	color: #cccccc;
	line-height: 1.6;
}

.project-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 15px;
	flex-wrap: wrap;
	gap: 10px;
}

.project-name {
	color: #00ff00;
	font-size: 18px;
	font-weight: 600;
}

.project-links {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	align-items: center;
}

.project-link {
	color: #00ff00;
	text-decoration: none;
	font-size: 12px;
	padding: 4px 8px;
	border: 1px solid rgba(0, 255, 0, 0.3);
	border-radius: 4px;
	transition: all 0.3s ease;
	white-space: nowrap;
}

.project-link:hover {
	background: rgba(0, 255, 0, 0.1);
	border-color: rgba(0, 255, 0, 0.6);
}

.project-stats {
	color: #cccccc;
	font-size: 12px;
	padding: 2px 6px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
}

.link-icon {
	margin-right: 4px;
}

.project-description {
	color: #cccccc;
	margin-bottom: 15px;
	line-height: 1.6;
}

.project-tech {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
}

.tech-tag {
	background: rgba(0, 255, 0, 0.1);
	color: #00ff00;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 11px;
	border: 1px solid rgba(0, 255, 0, 0.3);
	white-space: nowrap;
}

.skills-grid {
	gap: 30px;
}

.skill-category {
	background: rgba(0, 255, 0, 0.05);
}

.category-name {
	color: #00ff00;
	font-size: 18px;
	margin-bottom: 20px;
	text-align: center;
}

.skill-item {
	display: flex;
	align-items: center;
	margin-bottom: 15px;
	gap: 15px;
	flex-wrap: wrap;
}

.skill-name {
	color: #ffffff;
	font-weight: 500;
	min-width: 100px;
	flex-shrink: 0;
}

.skill-bar {
	flex: 1;
	height: 8px;
	background: rgba(0, 255, 0, 0.1);
	border-radius: 4px;
	overflow: hidden;
	min-width: 100px;
}

.skill-progress {
	height: 100%;
	background: linear-gradient(90deg, #00ff00, #00cc00);
	border-radius: 4px;
	transition: width 1s ease;
	box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.skill-level {
	color: #00ff00;
	font-weight: 600;
	min-width: 40px;
	text-align: right;
	flex-shrink: 0;
}

.contact-content {
	background: rgba(0, 255, 0, 0.05);
	border: 1px solid rgba(0, 255, 0, 0.2);
	border-radius: 8px;
	padding: 20px;
	margin-bottom: 20px;
}

.contact-info {
	margin: 20px 0;
}

.contact-info p {
	color: #cccccc;
	margin-bottom: 10px;
	line-height: 1.6;
}

.contact-info a {
	color: #00ff00;
	text-decoration: none;
}

.contact-info a:hover {
	text-decoration: underline;
}

.contact-actions {
	display: flex;
	gap: 15px;
	margin: 20px 0;
	flex-wrap: wrap;
}

.contact-btn {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	background: linear-gradient(135deg, #00ff00, #00cc00);
	color: #000000;
	text-decoration: none;
	padding: 12px 24px;
	border-radius: 6px;
	font-weight: 600;
	transition: all 0.3s ease;
}

.contact-btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 5px 15px rgba(0, 255, 0, 0.4);
}

.contact-note {
	margin-top: 20px;
	padding: 15px;
	background: rgba(0, 255, 0, 0.05);
	border-radius: 4px;
	border-left: 3px solid #00ff00;
}

.contact-note p {
	color: #cccccc;
	margin: 0;
	line-height: 1.6;
}

.contact-links {
	display: flex;
	gap: 15px;
	justify-content: center;
	flex-wrap: wrap;
}

.contact-link {
	color: #00ff00;
	text-decoration: none;
	padding: 10px 20px;
	border: 1px solid rgba(0, 255, 0, 0.3);
	border-radius: 6px;
	transition: all 0.3s ease;
	white-space: nowrap;
}

.contact-link:hover {
	background: rgba(0, 255, 0, 0.1);
	border-color: rgba(0, 255, 0, 0.6);
}

.sponsor-card {
	text-align: center;
}

.sponsor-card p {
	color: #cccccc;
	margin-bottom: 20px;
	line-height: 1.6;
}

.sponsor-btn {
	display: inline-block;
	background: linear-gradient(135deg, #00ff00, #00cc00);
	color: #000000;
	text-decoration: none;
	padding: 12px 20px;
	border-radius: 6px;
	font-weight: 600;
	transition: all 0.3s ease;
}

.sponsor-btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 5px 15px rgba(0, 255, 0, 0.4);
}

.btn-icon {
	margin-right: 8px;
}

/* Responsive Design */
@media (max-width: 768px) {
	.terminal-body {
		padding: 15px;
	}

	.terminal-input-wrapper,
	.command-output-display,
	.quick-commands {
		padding: 0 10px;
	}

	.ascii-art {
		padding: 0 10px;
	}

	.ascii-text {
		font-size: clamp(6px, 3vw, 10px);
	}

	.output-section {
		margin-left: 10px;
	}

	.about-grid,
	.projects-grid,
	.skills-grid,
	.sponsor-grid {
		grid-template-columns: 1fr;
		gap: 15px;
	}

	.project-header {
		flex-direction: column;
		align-items: flex-start;
	}

	.project-links {
		justify-content: flex-start;
	}

	.skill-item {
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
	}

	.skill-bar {
		width: 100%;
		min-width: unset;
	}

	.contact-links {
		flex-direction: column;
		align-items: center;
	}

	.contact-link {
		width: 100%;
		text-align: center;
	}

	.command-item {
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
	}

	.cmd {
		min-width: unset;
	}
}

@media (max-width: 480px) {
	.terminal-body {
		padding: 10px;
	}

	.terminal-input-wrapper,
	.command-output-display,
	.quick-commands,
	.ascii-art {
		padding: 0 5px;
	}

	.output-section {
		margin-left: 5px;
	}

	.about-card,
	.project-card,
	.skill-category,
	.sponsor-card,
	.contact-form {
		padding: 15px;
	}

	.project-links {
		flex-direction: column;
		gap: 6px;
	}

	.project-link {
		text-align: center;
	}

	.turnstile-container {
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.turnstile-widget {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 80px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 4px;
		border: 1px solid rgba(0, 255, 0, 0.2);
	}

	.turnstile-error {
		color: #ff6b6b;
		font-size: 12px;
		text-align: center;
		padding: 8px;
		background: rgba(255, 107, 107, 0.1);
		border-radius: 4px;
		border: 1px solid rgba(255, 107, 107, 0.3);
	}

	.turnstile-loading {
		flex-direction: column;
		gap: 8px;
		text-align: center;
	}

	.recaptcha-widget {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 80px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 4px;
		border: 1px solid rgba(0, 255, 0, 0.2);
	}

	.recaptcha-error {
		color: #ff6b6b;
		font-size: 12px;
		text-align: center;
		padding: 8px;
		background: rgba(255, 107, 107, 0.1);
		border-radius: 4px;
		border: 1px solid rgba(255, 107, 107, 0.3);
	}

	.recaptcha-loading {
		flex-direction: column;
		gap: 8px;
		text-align: center;
		color: #00ff00;
		padding: 12px;
	}
}

/* Focus styles for accessibility */
.command-item.clickable:focus-visible,
.project-link:focus-visible,
.contact-link:focus-visible,
.sponsor-btn:focus-visible,
.submit-btn:focus-visible {
	outline: 2px solid #00ff00;
	outline-offset: 2px;
}

/* Animation for smooth transitions */
.terminal-body {
	animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Scrollbar styling */
.terminal-body::-webkit-scrollbar {
	width: 8px;
}

.terminal-body::-webkit-scrollbar-track {
	background: rgba(0, 255, 0, 0.1);
}

.terminal-body::-webkit-scrollbar-thumb {
	background: rgba(0, 255, 0, 0.3);
	border-radius: 4px;
}

.terminal-body::-webkit-scrollbar-thumb:hover {
	background: rgba(0, 255, 0, 0.5);
}

/* Terminal History Styles */
.terminal-history {
	margin: 20px 0;
}

.history-item {
	margin-bottom: 10px;
	animation: fadeInUp 0.3s ease;
}

.history-command {
	border-left: 3px solid #00ff00;
	padding-left: 10px;
}

.history-output {
	margin-left: 20px;
	margin-bottom: 15px;
}

.history-clear {
	text-align: center;
	color: #00ff00;
	font-style: italic;
	margin: 20px 0;
}

.clear-message {
	display: flex;
	align-items: center;
	gap: 10px;
	flex-wrap: wrap;
}

.clear-notice {
	margin-left: 20px;
	color: #666;
	font-style: italic;
	animation: fadeIn 0.5s ease;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(10px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
