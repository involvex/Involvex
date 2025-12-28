<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const isLoaded = ref(false)
const currentCommand = ref('')
const commandHistory = ref<string[]>([])
const historyIndex = ref(-1)
const commandOutput = ref('')
const showWelcome = ref(true)

const commands = {
  help: () => `
    <div class="help-output">
      <h3>Available Commands:</h3>
      <div class="command-list">
        <div class="command-item">
          <span class="cmd clickable-cmd" onclick="executeClickableCommand('about')">about</span>
          <span class="desc">- Learn about Involvex</span>
        </div>
        <div class="command-item">
          <span class="cmd clickable-cmd" onclick="executeClickableCommand('projects')">projects</span>
          <span class="desc">- View my GitHub projects</span>
        </div>
        <div class="command-item">
          <span class="cmd clickable-cmd" onclick="executeClickableCommand('skills')">skills</span>
          <span class="desc">- See my technical skills</span>
        </div>
        <div class="command-item">
          <span class="cmd clickable-cmd" onclick="executeClickableCommand('contact')">contact</span>
          <span class="desc">- Get in touch with me</span>
        </div>
        <div class="command-item">
          <span class="cmd clickable-cmd" onclick="executeClickableCommand('sponsor')">sponsor</span>
          <span class="desc">- Support my work</span>
        </div>
        <div class="command-item">
          <span class="cmd clickable-cmd" onclick="executeClickableCommand('github')">github</span>
          <span class="desc">- Open my GitHub profile</span>
        </div>
        <div class="command-item">
          <span class="cmd clickable-cmd" onclick="executeClickableCommand('clear')">clear</span>
          <span class="desc">- Clear the terminal</span>
        </div>
        <div class="command-item">
          <span class="cmd clickable-cmd" onclick="executeClickableCommand('whoami')">whoami</span>
          <span class="desc">- Display current user</span>
        </div>
        <div class="command-item">
          <span class="cmd clickable-cmd" onclick="executeClickableCommand('date')">date</span>
          <span class="desc">- Show current date and time</span>
        </div>
        <div class="command-item">
          <span class="cmd clickable-cmd" onclick="executeClickableCommand('help')">help</span>
          <span class="desc">- Show this help message</span>
        </div>
      </div>
    </div>
  `,

  about: () => `
    <div class="about-output">
      <h3>About Involvex</h3>
      <p>👨‍💻 Full-stack developer passionate about creating innovative solutions</p>
      <p>🚀 Open-source contributor and tech enthusiast</p>
      <p>🌐 Building the future of web development</p>
      <p>💡 Always learning and exploring new technologies</p>
    </div>
  `,

  projects: () => `
    <div class="projects-output">
      <h3>Featured Projects</h3>
      <div class="project-item">
        <strong>BotForge</strong> - AI-powered bot creation platform
        <br><span class="project-link">🔗 <a href="https://botforge-one.vercel.app" target="_blank">Live Demo</a></span>
        <br><span class="project-link">📁 <a href="https://github.com/involvex/botforge" target="_blank">GitHub</a></span>
      </div>
      <div class="project-item">
        <strong>Create Wizard</strong> - Interactive CLI tool for project setup
        <br><span class="project-link">🔗 <a href="https://involvex.github.io/create-wizard/" target="_blank">Live Demo</a></span>
        <br><span class="project-link">📁 <a href="https://github.com/involvex/create-wizard" target="_blank">GitHub</a></span>
        <br><span class="project-link">📦 <a href="https://www.npmjs.com/package/@involvex/create-wizard" target="_blank">NPM Package</a></span>
      </div>
      <div class="project-item">
        <strong>Terminal Portfolio</strong> - This interactive terminal-style portfolio
        <br><span class="project-link">📁 <a href="https://github.com/involvex/involvex" target="_blank">GitHub</a></span>
      </div>
    </div>
  `,

  skills: () => `
    <div class="skills-output">
      <h3>Technical Skills</h3>
      <div class="skill-category">
        <strong>Frontend:</strong> Vue.js, React, TypeScript, CSS/SCSS
      </div>
      <div class="skill-category">
        <strong>Backend:</strong> Node.js, Python, Go, PostgreSQL
      </div>
      <div class="skill-category">
        <strong>Tools:</strong> Git, Docker, AWS, CI/CD
      </div>
      <div class="skill-category">
        <strong>Languages:</strong> JavaScript, TypeScript, Python, Go
      </div>
    </div>
  `,

  contact: () => `
    <div class="contact-output">
      <h3>Get In Touch</h3>
      <p>📧 Email: <a href="mailto:involvex@proton.me">involvex@proton.me</a></p>
      <p>🐙 GitHub: <a href="https://github.com/involvex" target="_blank">github.com/involvex</a></p>
      <p>💬 Discord: <a href="https://discord.com/users/157968227106947072" target="_blank">involvex</a></p>
    </div>
  `,

  sponsor: () => `
    <div class="sponsor-output">
      <h3>Support My Work</h3>
      <p>🌟 <a href="https://github.com/sponsors/involvex" target="_blank">GitHub Sponsors</a> - Support my open-source work</p>
      <p>☕ <a href="https://buymeacoffee.com/involvex" target="_blank">Buy Me a Coffee</a> - Show your appreciation</p>
      <p>💝 <a href="https://paypal.me/involvex" target="_blank">PayPal</a> - Direct support</p>
      
      <p>💸 <a href="https://rewards.bing.com/welcome?rh=14525F68&ref=rafsrchae&form=ML2XE3&OCID=ML2XE3&PUBL=RewardsDO&CREA=ML2XE3" target="_blank">Microsoft Rewards</a></p>
      <p>Thank you for considering supporting my work! 🙏</p>
    </div>
  `,

  github: () => {
    window.open('https://github.com/involvex', '_blank')
    return '<div class="output">Opening GitHub profile...</div>'
  },

  clear: () => {
    commandOutput.value = ''
    showWelcome.value = false
    return ''
  },

  whoami: () => '<div class="output">involvex</div>',

  date: () => `<div class="output">${new Date().toString()}</div>`,

  ls: () => `
    <div class="output">
      <div>📁 projects/</div>
      <div>📁 skills/</div>
      <div>📁 contact/</div>
      <div>📁 sponsor/</div>
      <div>📄 README.md</div>
    </div>
  `,

  pwd: () => '<div class="output">/home/involvex/portfolio</div>',

  cat: (args: string) => {
    if (args.includes('README')) {
      return `
        <div class="output">
          <h3>🚀 Involvex Terminal Portfolio</h3>
          <p>An interactive terminal-style portfolio built with Vue 3, TypeScript, and Vite.</p>
          <br>
          <h4>✨ Features:</h4>
          <p>• 🖥️ Terminal Interface: Authentic terminal experience with command-line interactions</p>
          <p>• 🎨 Modern Design: Sleek dark theme with green terminal aesthetics</p>
          <p>• 📱 Responsive: Works perfectly on desktop, tablet, and mobile devices</p>
          <p>• ⚡ Interactive Commands: Type commands to navigate through different sections</p>
          <p>• 🔗 GitHub Integration: Direct links to repositories and GitHub profile</p>
          <p>• 💝 Sponsorship Support: Easy access to support options</p>
          <br>
          <h4>🛠️ Tech Stack:</h4>
          <p>• Vue 3 - Progressive JavaScript framework</p>
          <p>• TypeScript - Type-safe JavaScript</p>
          <p>• Vite - Fast build tool and dev server</p>
          <p>• CSS3 - Modern styling with animations</p>
          <br>
          <h4>🚀 Getting Started:</h4>
          <p>1. Clone the repository: git clone https://github.com/involvex/Involvex.git</p>
          <p>2. Install dependencies: npm install</p>
          <p>3. Start development server: npm run dev</p>
          <p>4. Build for production: npm run build</p>
          <br>
          <h4>📞 Contact:</h4>
          <p>• GitHub: <a href="https://github.com/involvex" target="_blank">@involvex</a></p>
          <p>• Email: <a href="mailto:involvex@proton.me">involvex@proton.me</a></p>
          <p>• Discord: <a href="https://discord.com/users/157968227106947072" target="_blank">involvex</a></p>
          <br>
          <p>Type 'help' to see available commands.</p>
        </div>
      `
    }
    return '<div class="output">File not found</div>'
  },
}

const executeCommand = async () => {
  const command = currentCommand.value.trim().toLowerCase()
  const [cmd, ...args] = command.split(' ')

  // Add to history
  if (command && commandHistory.value[commandHistory.value.length - 1] !== command) {
    commandHistory.value.push(currentCommand.value)
  }
  historyIndex.value = commandHistory.value.length

  // Execute command
  if (commands[cmd as keyof typeof commands]) {
    const result = commands[cmd as keyof typeof commands](args.join(' '))
    if (result) {
      commandOutput.value = result
    }
  } else {
    commandOutput.value = `<div class="error">Command not found: ${cmd}. Type 'help' for available commands.</div>`
  }

  currentCommand.value = ''

  // Scroll to bottom
  await nextTick()
  const terminal = document.querySelector('.terminal-body')
  if (terminal) {
    terminal.scrollTop = terminal.scrollHeight
  }
}

const navigateHistory = (direction: number) => {
  if (commandHistory.value.length === 0) return

  historyIndex.value = Math.max(
    0,
    Math.min(commandHistory.value.length, historyIndex.value + direction),
  )

  if (historyIndex.value < commandHistory.value.length) {
    currentCommand.value = commandHistory.value[historyIndex.value]!
  } else {
    currentCommand.value = ''
  }
}

// Global function for clickable commands
const executeClickableCommand = (command: string) => {
  currentCommand.value = command
  executeCommand()
}

// Expose function globally for onclick handlers
;(
  window as unknown as { executeClickableCommand: (command: string) => void }
).executeClickableCommand = executeClickableCommand

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 500)
})
</script>

<template>
  <div id="app" class="terminal-app">
    <div class="terminal-window" :class="{ loaded: isLoaded }">
      <div class="terminal-header">
        <div class="terminal-controls">
          <div class="control-btn close"></div>
          <div class="control-btn minimize"></div>
          <div class="control-btn maximize"></div>
        </div>
        <div class="terminal-title">
          <span class="terminal-icon">⚡</span>
          <span class="terminal-text">involvex@portfolio:~$</span>
        </div>
        <div class="terminal-status">
          <div class="status-indicator online"></div>
          <span class="status-text">ONLINE</span>
        </div>
      </div>
      <div class="terminal-body">
        <div class="terminal-content">
          <!-- Welcome Message -->
          <div v-if="showWelcome" class="terminal-line">
            <span class="prompt">involvex@portfolio:~$</span>
            <span class="command">welcome</span>
          </div>

          <div v-if="showWelcome" class="output-section">
            <div class="ascii-art">
              <pre class="ascii-text">
    ██╗███╗   ██╗██╗   ██╗ ██████╗ ██╗     ██╗   ██╗███████╗██╗  ██╗
    ██║████╗  ██║██║   ██║██╔═══██╗██║     ██║   ██║██╔════╝╚██╗██╔╝
    ██║██╔██╗ ██║██║   ██║██║   ██║██║     ██║   ██║█████╗   ╚███╔╝
    ██║██║╚██╗██║╚██╗ ██╔╝██║   ██║██║     ╚██╗ ██╔╝██╔══╝   ██╔██╗
    ██║██║ ╚████║ ╚████╔╝ ╚██████╔╝███████╗ ╚████╔╝ ███████╗██╔╝ ██╗
    ╚═╝╚═╝  ╚═══╝  ╚═══╝   ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝</pre
              >
            </div>
            <div class="welcome-text">
              <p class="greeting">Welcome to Involvex's Terminal Portfolio</p>
              <p class="description">
                Type
                <span class="highlight clickable-cmd" onclick="executeClickableCommand('help')"
                  >help</span
                >
                to see available commands
              </p>
              <p class="deployment-info">🚀 Deployed via GitHub Pages</p>
            </div>
          </div>

          <!-- Command Output -->
          <div v-if="commandOutput" class="output-section" v-html="commandOutput"></div>

          <!-- Interactive Command Input -->
          <div class="terminal-line">
            <span class="prompt">involvex@portfolio:~$</span>
            <input
              v-model="currentCommand"
              @keydown.enter="executeCommand"
              @keydown.up="navigateHistory(-1)"
              @keydown.down="navigateHistory(1)"
              class="command-input"
              placeholder="Type a command..."
              autofocus
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
  color: #00ff00;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.terminal-window {
  width: 100%;
  max-width: 1200px;
  background: #0a0a0a;
  border: 2px solid #333;
  border-radius: 12px;
  box-shadow:
    0 0 30px rgba(0, 255, 0, 0.1),
    0 0 60px rgba(0, 255, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.terminal-window.loaded {
  opacity: 1;
  transform: translateY(0);
}

.terminal-window::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00ff00, transparent);
  animation: scanline 3s linear infinite;
}

@keyframes scanline {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Terminal cursor animation */
@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.cursor {
  animation: blink 1s infinite;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #00ff00;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #00cc00;
}

/* Responsive design */
@media (max-width: 768px) {
  #app {
    padding: 10px;
  }

  .terminal-window {
    border-radius: 8px;
  }
}

/* Terminal Header Styles */
.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  border-bottom: 1px solid #333;
  position: relative;
}

.terminal-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  transform: scale(1.1);
}

.close {
  background: #ff5f56;
}

.close:hover {
  background: #ff3b30;
  box-shadow: 0 0 10px rgba(255, 95, 86, 0.5);
}

.minimize {
  background: #ffbd2e;
}

.minimize:hover {
  background: #ff9500;
  box-shadow: 0 0 10px rgba(255, 189, 46, 0.5);
}

.maximize {
  background: #27ca3f;
}

.maximize:hover {
  background: #00d4aa;
  box-shadow: 0 0 10px rgba(39, 202, 63, 0.5);
}

.terminal-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.terminal-icon {
  font-size: 16px;
  animation: pulse 2s ease-in-out infinite;
}

.terminal-text {
  font-family: 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
}

.terminal-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.status-indicator.online {
  background: #00ff00;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.status-text {
  font-size: 10px;
  font-weight: 600;
  color: #00ff00;
  letter-spacing: 1px;
}

/* Terminal Body Styles */
.terminal-body {
  background: #0a0a0a;
  min-height: 600px;
  padding: 20px;
  font-family: 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  overflow-y: auto;
  max-height: 80vh;
}

.terminal-content {
  max-width: 100%;
}

.terminal-line {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.prompt {
  color: #00ff00;
  font-weight: 600;
  white-space: nowrap;
}

.command {
  color: #ffffff;
  font-weight: 500;
}

.output-section {
  margin-left: 20px;
  margin-bottom: 30px;
}

.ascii-art {
  margin: 20px 0;
  text-align: center;
}

.ascii-text {
  color: #00ff00;
  font-size: 12px;
  line-height: 1.2;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.welcome-text {
  text-align: center;
  margin: 20px 0;
}

.greeting {
  font-size: 24px;
  color: #00ff00;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
}

.description {
  color: #cccccc;
  font-size: 16px;
}

.deployment-info {
  color: #00ff00;
  font-size: 12px;
  margin-top: 10px;
  opacity: 0.8;
}

.highlight {
  color: #00ff00;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.cursor {
  color: #00ff00;
  animation: blink 1s infinite;
}

/* Command Input Styles */
.command-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  caret-color: #00ff00;
}

.command-input::placeholder {
  color: #666;
}

/* Command Output Styles */
.help-output h3,
.about-output h3,
.projects-output h3,
.skills-output h3,
.contact-output h3,
.sponsor-output h3 {
  color: #00ff00;
  margin-bottom: 15px;
}

.command-list {
  margin: 15px 0;
}

.command-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 15px;
}

.cmd {
  color: #00ff00;
  font-weight: 600;
  min-width: 80px;
}

.clickable-cmd {
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
}

.clickable-cmd:hover {
  background: rgba(0, 255, 0, 0.1);
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.6);
  transform: translateY(-1px);
}

.desc {
  color: #cccccc;
}

.project-item {
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 4px;
}

.project-link {
  color: #00ff00;
  font-size: 14px;
}

.project-link a {
  color: #00ff00;
  text-decoration: none;
}

.project-link a:hover {
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.6);
}

.skill-category {
  margin-bottom: 10px;
  padding: 8px;
  background: rgba(0, 255, 0, 0.05);
  border-radius: 4px;
}

.output {
  color: #cccccc;
  margin: 10px 0;
}

.error {
  color: #ff6b6b;
  margin: 10px 0;
}

.contact-output p,
.sponsor-output p {
  margin-bottom: 10px;
}

.contact-output a,
.sponsor-output a {
  color: #00ff00;
  text-decoration: none;
}

.contact-output a:hover,
.sponsor-output a:hover {
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.6);
}

@media (max-width: 768px) {
  .terminal-header {
    padding: 10px 15px;
  }

  .terminal-text {
    font-size: 12px;
  }

  .status-text {
    display: none;
  }

  .terminal-body {
    padding: 15px;
  }
}
</style>
