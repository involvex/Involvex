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
          <div v-if="item.type === 'command'" class="terminal-line">
            <span class="prompt">involvex@portfolio:~$</span>
            <span class="command">{{ item.command }}</span>
          </div>
          <div v-if="item.output" class="output-section" v-html="item.output"></div>
          <div v-if="item.type === 'clear'" class="clear-message">
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
      <div v-if="commandOutput" class="command-output-display">
        <div class="terminal-line">
          <span class="prompt">involvex@portfolio:~$</span>
          <span class="command">{{ lastCommand }}</span>
        </div>
        <div class="output-section" v-html="commandOutput"></div>
      </div>

      <!-- Quick Navigation Commands (Clickable) -->
      <div class="quick-commands">
        <div class="terminal-line">
          <span class="prompt">involvex@portfolio:~$</span>
          <span class="command">help</span>
        </div>
        <div class="output-section">
          <div class="help-commands">
            <div class="command-item clickable" @click="executeCommand('help')">
              <span class="cmd">help</span>
              <span class="desc">- View Help Commands</span>
            </div>
            <div class="command-item clickable" @click="executeCommand('about')">
              <span class="cmd">about</span>
              <span class="desc">- Learn about Involvex</span>
            </div>
            <div class="command-item clickable" @click="executeCommand('projects')">
              <span class="cmd">projects</span>
              <span class="desc">- View my GitHub projects</span>
            </div>
            <div class="command-item clickable" @click="executeCommand('skills')">
              <span class="cmd">skills</span>
              <span class="desc">- See my technical skills</span>
            </div>
            <div class="command-item clickable" @click="executeCommand('contact')">
              <span class="cmd">contact</span>
              <span class="desc">- Get in touch with me</span>
            </div>
            <div class="command-item clickable" @click="executeCommand('sponsor')">
              <span class="cmd">sponsor</span>
              <span class="desc">- Support my work</span>
            </div>
            <div class="command-item clickable" @click="executeCommand('clear')">
              <span class="cmd">clear</span>
              <span class="desc">- Clear the terminal</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Content Display -->
      <div v-if="currentView !== 'welcome'" class="section-content">
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
              <div v-if="isLoadingProjects" class="loading-state">
                <p>Loading projects from GitHub...</p>
              </div>
              <div v-else-if="projectsError" class="error-state">
                <p>{{ projectsError }}</p>
              </div>
              <div v-else class="projects-grid">
                <div class="project-card" v-for="project in projects" :key="project.name">
                  <div class="project-header">
                    <h4 class="project-name">{{ project.name }}</h4>
                    <div class="project-links">
                      <a :href="project.github" target="_blank" class="project-link">
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
                      <span v-if="project.stars" class="project-stats">
                        ⭐ {{ project.stars }}
                      </span>
                    </div>
                  </div>
                  <p class="project-description">{{ project.description }}</p>
                  <div class="project-tech">
                    <span v-for="tech in project.technologies" :key="tech" class="tech-tag">{{
                      tech
                    }}</span>
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
                <div class="skill-category" v-for="category in skills" :key="category.name">
                  <h4 class="category-name">{{ category.name }}</h4>
                  <div class="skill-items">
                    <div v-for="skill in category.items" :key="skill.name" class="skill-item">
                      <span class="skill-name">{{ skill.name }}</span>
                      <div class="skill-bar">
                        <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
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

              <!-- Form Feedback Messages -->
              <div v-if="formState.errors.length > 0" class="form-error">
                <h3>❌ Validation Errors</h3>
                <ul>
                  <li v-for="error in formState.errors" :key="error">{{ error }}</li>
                </ul>
              </div>

              <div v-if="formState.isSubmitting" class="form-loading">
                <h3>⏳ Sending Message...</h3>
                <p>Please wait while your message is being sent.</p>
                <div class="loading-spinner"></div>
              </div>

              <div v-if="formState.isSubmitted" class="form-success">
                <h3>✅ Message Sent Successfully!</h3>
                <p>Thank you for your message! I'll get back to you within 24 hours.</p>
              </div>

              <div class="contact-form">
                <form @submit.prevent="submitContact">
                  <div class="form-group">
                    <label for="contact-name">Name:</label>
                    <input
                      type="text"
                      id="contact-name"
                      v-model="contactForm.name"
                      :disabled="formState.isSubmitting"
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="contact-email">Email:</label>
                    <input
                      type="email"
                      id="contact-email"
                      v-model="contactForm.email"
                      :disabled="formState.isSubmitting"
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div class="form-group">
                    <label for="discord-name">Discord:</label>
                    <input
                      type="text"
                      id="discord-name"
                      v-model="contactForm.discordname"
                      :disabled="formState.isSubmitting"
                      placeholder="Your Discord username (optional)"
                    />
                  </div>
                  <div class="form-group">
                    <label for="contact-message">
                      Message:
                      <span
                        class="char-count"
                        :class="{
                          warning: contactForm.message.length < 10,
                          error: contactForm.message.length > 500,
                        }"
                      >
                        ({{ contactForm.message.length }}/500)
                      </span>
                    </label>
                    <textarea
                      id="contact-message"
                      v-model="contactForm.message"
                      rows="4"
                      :disabled="formState.isSubmitting"
                      required
                      placeholder="Your message... (minimum 10 characters)"
                      maxlength="500"
                    ></textarea>
                  </div>

                  <!-- reCAPTCHA Validation -->
                  <div class="form-group">
                    <div class="recaptcha-container">
                      <div v-if="formState.isRecaptchaLoading" class="recaptcha-loading">
                        <div class="loading-spinner"></div>
                        <span>Validating reCAPTCHA...</span>
                      </div>
                      <div v-else-if="formState.isRecaptchaValid" class="recaptcha-success">
                        ✅ reCAPTCHA verified
                      </div>
                      <div v-else class="recaptcha-info">
                        🔒 This form is protected by reCAPTCHA
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="submit-btn"
                    :disabled="
                      formState.isSubmitting || formState.isRecaptchaLoading || !isFormValid
                    "
                  >
                    <span class="btn-icon">
                      {{
                        formState.isSubmitting ? '📤' : formState.isRecaptchaLoading ? '🔄' : '📧'
                      }}
                    </span>
                    {{
                      formState.isSubmitting
                        ? 'Sending...'
                        : formState.isRecaptchaLoading
                          ? 'Validating...'
                          : 'Send Message'
                    }}
                  </button>
                </form>
              </div>
              <div class="contact-links">
                <a href="https://github.com/involvex" target="_blank" class="contact-link">
                  <span class="link-icon">🐙</span> GitHub
                </a>
                <a href="mailto:contact@involvex97@gmail.com" class="contact-link">
                  <span class="link-icon">📧</span> Email
                </a>
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
                  <a href="https://buymeacoffee.com/involvex" target="_blank" class="sponsor-btn">
                    <span class="btn-icon">☕</span> Buy Coffee
                  </a>
                </div>
                <div class="sponsor-card">
                  <h4>💝 PayPal</h4>
                  <p>Direct support via PayPal</p>
                  <a href="https://paypal.me/involvex" target="_blank" class="sponsor-btn">
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
import emailjs from '@emailjs/browser'
import { onMounted, reactive, ref, computed } from 'vue'
import TerminalInput from './TerminalInput.vue'
import { getRecaptchaToken, verifyRecaptchaToken, isRecaptchaAvailable } from '../utils/recaptcha'

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'involvex'
const EMAILJS_TEMPLATE_ID = 'template'
const EMAILJS_PUBLIC_KEY = 'hCOUKo1H7J90KW7QC'

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
    const response = await fetch(
      'https://api.github.com/users/involvex/repos?sort=updated&per_page=12',
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos = await response.json()

    // Filter out forks and sort by stars
    const filteredRepos = repos
      .filter((repo: GitHubApiResponse) => !repo.fork)
      .sort((a: GitHubApiResponse, b: GitHubApiResponse) => b.stargazers_count - a.stargazers_count)
      .slice(0, 8) // Limit to top 8 projects

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
      { name: 'Vue.js', level: 75 },
      { name: 'React', level: 70 },
      { name: 'TypeScript', level: 68 },
      { name: 'CSS/SCSS', level: 85 },
      { name: 'HTML5', level: 90 },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Node.js', level: 82 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 70 },
    ],
  },
  {
    name: 'Tools & Others',
    items: [
      { name: 'Git', level: 80 },
      { name: 'Docker', level: 65 },
      { name: 'AWS', level: 60 },
      { name: 'Linux', level: 75 },
    ],
  },
])

// Contact form
const contactForm = reactive({
  name: '',
  email: '',
  message: '',
  discordname: '',
})

// Form validation and submission state
const formState = reactive({
  isSubmitting: false,
  errors: [] as string[],
  isSubmitted: false,
  recaptchaToken: '',
  isRecaptchaValid: false,
  isRecaptchaLoading: false,
})

// Computed property for form validation
const isFormValid = computed(() => {
  return (
    contactForm.name.trim().length > 0 &&
    contactForm.email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email) &&
    contactForm.message.trim().length >= 10 &&
    formState.isRecaptchaValid
  )
})

// reCAPTCHA validation function
const validateRecaptcha = async (): Promise<boolean> => {
  if (!isRecaptchaAvailable()) {
    formState.errors.push('reCAPTCHA is not available. Please refresh the page and try again.')
    return false
  }

  formState.isRecaptchaLoading = true

  try {
    const token = await getRecaptchaToken('contact_form')
    const isValid = await verifyRecaptchaToken(token)

    formState.recaptchaToken = token
    formState.isRecaptchaValid = isValid

    if (!isValid) {
      formState.errors.push('reCAPTCHA validation failed. Please try again.')
    }

    return isValid
  } catch (error) {
    console.error('reCAPTCHA validation error:', error)
    formState.errors.push('reCAPTCHA validation failed. Please try again.')
    return false
  } finally {
    formState.isRecaptchaLoading = false
  }
}

// Enhanced contact form submission with EmailJS integration and reCAPTCHA
const submitContact = async () => {
  formState.errors = []
  formState.isSubmitting = true
  formState.isSubmitted = false

  // Validation
  if (!contactForm.name.trim()) {
    formState.errors.push('Name is required')
  }
  if (!contactForm.email.trim()) {
    formState.errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
    formState.errors.push('Please enter a valid email address')
  }
  if (!contactForm.message.trim()) {
    formState.errors.push('Message is required')
  } else if (contactForm.message.trim().length < 10) {
    formState.errors.push('Message must be at least 10 characters long')
  }

  // reCAPTCHA validation
  const recaptchaValid = await validateRecaptcha()
  if (!recaptchaValid) {
    formState.isSubmitting = false
    return
  }

  try {
    // Prepare email template parameters
    const templateParams = {
      from_name: contactForm.name,
      from_email: contactForm.email,
      discord_name: contactForm.discordname || 'Not provided',
      message: contactForm.message,
      to_name: 'Involvex',
    }

    // Send email using EmailJS
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)

    formState.isSubmitting = false
    formState.isSubmitted = true

    const response = `
✅ Thank you for your message, ${contactForm.name}!

📧 Contact Details:
   • Name: ${contactForm.name}
   • Email: ${contactForm.email}
   ${contactForm.discordname ? `   • Discord: ${contactForm.discordname}` : ''}

📝 Message Summary:
${contactForm.message.substring(0, 100)}${contactForm.message.length > 100 ? '...' : ''}

🚀 Your message has been sent successfully!
I'll get back to you within 24 hours.

Type 'contact' again to send another message.
`

    console.log('Contact Form', response)

    // Reset form after a delay
    setTimeout(() => {
      contactForm.name = ''
      contactForm.email = ''
      contactForm.message = ''
      contactForm.discordname = ''
      formState.isSubmitted = false
    }, 3000)
  } catch (error) {
    formState.isSubmitting = false
    console.error('Failed to send email:', error)
    formState.errors.push(
      'Failed to send message. Please try again or contact me directly via email.',
    )
  }
}

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
onMounted(() => {
  fetchProjects()

  // Initialize reCAPTCHA validation status
  if (isRecaptchaAvailable()) {
    // Perform initial reCAPTCHA validation
    validateRecaptcha()
      .then((isValid) => {
        if (isValid) {
          console.log('reCAPTCHA validated successfully')
        } else {
          console.log('reCAPTCHA validation failed')
        }
      })
      .catch((error) => {
        console.error('Initial reCAPTCHA validation error:', error)
      })
  }
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

.contact-form {
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #00ff00;
  margin-bottom: 8px;
  font-weight: 600;
}

.char-count {
  font-size: 12px;
  font-weight: normal;
  color: #666;
}

.char-count.warning {
  color: #ffa500;
}

.char-count.error {
  color: #ff6b6b;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 4px;
  color: #ffffff;
  font-family: inherit;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00ff00;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.form-group input:disabled,
.form-group textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #666;
}

.submit-btn {
  background: linear-gradient(135deg, #00ff00, #00cc00);
  color: #000000;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-btn:disabled:hover {
  transform: none;
  box-shadow: none;
}

/* Form Feedback Styles */
.form-error,
.form-loading,
.form-success {
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
}

.form-error {
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  color: #ff6b6b;
}

.form-error ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

.form-error li {
  margin-bottom: 5px;
}

.form-loading {
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  color: #00ff00;
}

.form-success {
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.4);
  color: #00ff00;
}

.form-error h3,
.form-loading h3,
.form-success h3 {
  margin-bottom: 15px;
  font-size: 18px;
}

.form-error p,
.form-loading p,
.form-success p {
  margin-bottom: 10px;
  line-height: 1.6;
}

.form-error strong,
.form-success strong {
  color: #ffffff;
}

/* Loading Spinner */
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 255, 0, 0.1);
  border-top: 3px solid #00ff00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
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

/* Command Output Styles */
.about-output,
.projects-output,
.skills-output,
.contact-output,
.sponsor-output {
  color: #cccccc;
}

.about-output h3,
.projects-output h3,
.skills-output h3,
.contact-output h3,
.sponsor-output h3 {
  color: #00ff00;
  margin-bottom: 15px;
}

.about-output p,
.projects-output p,
.skills-output p,
.contact-output p,
.sponsor-output p {
  margin-bottom: 10px;
  line-height: 1.6;
}

.about-output a,
.projects-output a,
.skills-output a,
.contact-output a,
.sponsor-output a {
  color: #00ff00;
  text-decoration: none;
}

.about-output a:hover,
.projects-output a:hover,
.skills-output a:hover,
.contact-output a:hover,
.sponsor-output a:hover {
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.6);
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

  .recaptcha-container {
    padding: 12px;
  }

  .recaptcha-loading {
    flex-direction: column;
    gap: 8px;
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
