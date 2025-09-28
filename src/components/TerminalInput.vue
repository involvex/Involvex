<template>
  <div class="terminal-input-section">
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

    <div v-if="commandOutput" class="command-output">
      <div v-html="commandOutput"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const currentCommand = ref('')
const commandHistory = ref<string[]>([])
const historyIndex = ref(-1)
const commandOutput = ref('')

const commands = {
  help: () => `
    <div class="help-output">
      <h3>Available Commands:</h3>
      <div class="command-list">
        <div class="command-item">
          <span class="cmd">about</span>
          <span class="desc">- Learn about Involvex</span>
        </div>
        <div class="command-item">
          <span class="cmd">projects</span>
          <span class="desc">- View my GitHub projects</span>
        </div>
        <div class="command-item">
          <span class="cmd">skills</span>
          <span class="desc">- See my technical skills</span>
        </div>
        <div class="command-item">
          <span class="cmd">contact</span>
          <span class="desc">- Get in touch with me</span>
        </div>
        <div class="command-item">
          <span class="cmd">sponsor</span>
          <span class="desc">- Support my work</span>
        </div>
        <div class="command-item">
          <span class="cmd">github</span>
          <span class="desc">- Open my GitHub profile</span>
        </div>
        <div class="command-item">
          <span class="cmd">clear</span>
          <span class="desc">- Clear the terminal</span>
        </div>
        <div class="command-item">
          <span class="cmd">whoami</span>
          <span class="desc">- Display current user</span>
        </div>
        <div class="command-item">
          <span class="cmd">date</span>
          <span class="desc">- Show current date and time</span>
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
        <strong>Terminal Portfolio</strong> - This interactive terminal-style portfolio
        <br><span class="project-link">📁 <a href="https://github.com/involvex/involvex" target="_blank">GitHub</a></span>
      </div>
      <div class="project-item">
        <strong>Open Source Contributions</strong> - Various contributions to the community
        <br><span class="project-link">📁 <a href="https://github.com/involvex" target="_blank">GitHub Profile</a></span>
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
      <p>📧 Email: <a href="mailto:contact@involvex.dev">contact@involvex.dev</a></p>
      <p>🐙 GitHub: <a href="https://github.com/involvex" target="_blank">github.com/involvex</a></p>
      <p>💼 LinkedIn: <a href="https://linkedin.com/in/involvex" target="_blank">linkedin.com/in/involvex</a></p>
      <p>🐦 Twitter: <a href="https://twitter.com/involvex" target="_blank">@involvex</a></p>
    </div>
  `,

  sponsor: () => `
    <div class="sponsor-output">
      <h3>Support My Work</h3>
      <p>🌟 <a href="https://github.com/sponsors/involvex" target="_blank">GitHub Sponsors</a> - Support my open-source work</p>
      <p>☕ <a href="https://buymeacoffee.com/involvex" target="_blank">Buy Me a Coffee</a> - Show your appreciation</p>
      <p>💝 <a href="https://paypal.me/involvex" target="_blank">PayPal</a> - Direct support</p>
      <p>Thank you for considering supporting my work! 🙏</p>
    </div>
  `,

  github: () => {
    window.open('https://github.com/involvex', '_blank')
    return '<div class="output">Opening GitHub profile...</div>'
  },

  clear: () => {
    commandOutput.value = ''
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
          <h3>Welcome to Involvex's Portfolio</h3>
          <p>This is an interactive terminal-style portfolio showcasing my work and skills.</p>
          <p>Type 'help' to see available commands.</p>
        </div>
      `
    }
    return '<div class="output">File not found</div>'
  }
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

  historyIndex.value = Math.max(0, Math.min(commandHistory.value.length, historyIndex.value + direction))

  if (historyIndex.value < commandHistory.value.length) {
    currentCommand.value = commandHistory.value[historyIndex.value]!
  } else {
    currentCommand.value = ''
  }
}

onMounted(() => {
  // Show welcome message
  setTimeout(() => {
    commandOutput.value = commands.help()
  }, 1000)
})
</script>

<script lang="ts">
export default {
  name: 'TerminalInput'
}
</script>

<style scoped>
.terminal-input-section {
  margin-top: 20px;
}

.terminal-line {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.prompt {
  color: #00ff00;
  font-weight: 600;
  white-space: nowrap;
}

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

.command-output {
  margin-left: 20px;
  margin-bottom: 20px;
}

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
</style>
