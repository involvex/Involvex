<template>
  <div class="terminal-body">
    <div class="terminal-content">
      <!-- Welcome Message -->
      <div class="terminal-line">
        <span class="prompt">involvex@portfolio:~$</span>
        <span class="command">welcome</span>
      </div>

      <div class="output-section">
        <div class="ascii-art">
          <pre class="ascii-text">{{ asciiArt }}</pre>
        </div>

        <div class="welcome-text">
          <p class="greeting">Welcome to Involvex's Terminal Portfolio</p>
          <p class="description">
            Type <span class="highlight">help</span> to see available commands
          </p>
        </div>
      </div>

      <!-- Navigation Commands -->
      <div class="terminal-line">
        <span class="prompt">involvex@portfolio:~$</span>
        <span class="command">help</span>
      </div>

      <div class="output-section">
        <div class="help-commands">
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
            <span class="cmd">clear</span>
            <span class="desc">- Clear the terminal</span>
          </div>
        </div>
      </div>

      <!-- About Section -->
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
                Creating innovative solutions and contributing to the developer community through
                open-source projects.
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

      <!-- Projects Section -->
      <div class="terminal-line">
        <span class="prompt">involvex@portfolio:~$</span>
        <span class="command">projects</span>
      </div>

      <div class="output-section">
        <div class="projects-content">
          <h3 class="section-title">Featured Projects</h3>
          <div class="projects-grid">
            <div class="project-card" v-for="project in projects" :key="project.name">
              <div class="project-header">
                <h4 class="project-name">{{ project.name }}</h4>
                <div class="project-links">
                  <a :href="project.github" target="_blank" class="project-link">
                    <span class="link-icon">🔗</span> GitHub
                  </a>
                  <a v-if="project.demo" :href="project.demo" target="_blank" class="project-link">
                    <span class="link-icon">🚀</span> Demo
                  </a>
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

      <!-- Skills Section -->
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

      <!-- Contact Section -->
      <div class="terminal-line">
        <span class="prompt">involvex@portfolio:~$</span>
        <span class="command">contact</span>
      </div>

      <div class="output-section">
        <div class="contact-content">
          <h3 class="section-title">Get In Touch</h3>
          <div class="contact-form">
            <form @submit.prevent="submitContact">
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="contactForm.name" required />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="contactForm.email" required />
              </div>
              <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" v-model="contactForm.message" rows="4" required></textarea>
              </div>
              <button type="submit" class="submit-btn">Send Message</button>
            </form>
          </div>
          <div class="contact-links">
            <a href="https://github.com/involvex" target="_blank" class="contact-link">
              <span class="link-icon">🐙</span> GitHub
            </a>
            <a href="mailto:contact@involvex.dev" class="contact-link">
              <span class="link-icon">📧</span> Email
            </a>
          </div>
        </div>
      </div>

      <!-- Sponsor Section -->
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
              <a href="https://github.com/sponsors/involvex" target="_blank" class="sponsor-btn">
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
          </div>
        </div>
      </div>

      <!-- Interactive Terminal Input -->
      <TerminalInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import TerminalInput from './TerminalInput.vue'

const asciiArt = `
    ██╗███╗   ██╗██╗   ██╗ ██████╗ ██╗     ██╗   ██╗███████╗██╗  ██╗
    ██║████╗  ██║██║   ██║██╔═══██╗██║     ██║   ██║██╔════╝╚██╗██╔╝
    ██║██╔██╗ ██║██║   ██║██║   ██║██║     ██║   ██║█████╗   ╚███╔╝
    ██║██║╚██╗██║╚██╗ ██╔╝██║   ██║██║     ╚██╗ ██╔╝██╔══╝   ██╔██╗
    ██║██║ ╚████║ ╚████╔╝ ╚██████╔╝███████╗ ╚████╔╝ ███████╗██╔╝ ██╗
    ╚═╝╚═╝  ╚═══╝  ╚═══╝   ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
`

const projects = ref([
  {
    name: 'BotForge',
    description: 'AI-powered bot creation platform with advanced automation capabilities',
    technologies: ['Vue.js', 'Node.js', 'AI/ML', 'WebSocket'],
    github: 'https://github.com/involvex/botforge',
    demo: 'https://botforge-one.vercel.app',
  },
  {
    name: 'Involvex Portfolio',
    description: 'Terminal-style portfolio showcasing projects and skills',
    technologies: ['Vue.js', 'TypeScript', 'CSS3', 'Vite'],
    github: 'https://github.com/involvex/involvex',
  },
  {
    name: 'Open Source Contributions',
    description: 'Various contributions to open-source projects and community tools',
    technologies: ['JavaScript', 'Python', 'Go', 'Docker'],
    github: 'https://github.com/involvex',
  },
])

const skills = ref([
  {
    name: 'Frontend',
    items: [
      { name: 'Vue.js', level: 95 },
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'CSS/SCSS', level: 92 },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Go', level: 80 },
      { name: 'PostgreSQL', level: 88 },
    ],
  },
  {
    name: 'Tools & DevOps',
    items: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'CI/CD', level: 85 },
    ],
  },
])

const contactForm = reactive({
  name: '',
  email: '',
  message: '',
})

const submitContact = () => {
  // Handle form submission
  console.log('Contact form submitted:', contactForm)
  alert("Thank you for your message! I'll get back to you soon.")

  // Reset form
  contactForm.name = ''
  contactForm.email = ''
  contactForm.message = ''
}
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

.highlight {
  color: #00ff00;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.help-commands {
  margin: 20px 0;
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

.section-title {
  color: #00ff00;
  font-size: 20px;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.about-card {
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.about-card:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: rgba(0, 255, 0, 0.4);
  transform: translateY(-2px);
}

.about-card h4 {
  color: #00ff00;
  margin-bottom: 10px;
  font-size: 16px;
}

.about-card p {
  color: #cccccc;
  line-height: 1.6;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.project-card {
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.project-card:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: rgba(0, 255, 0, 0.4);
  transform: translateY(-2px);
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
  gap: 10px;
  flex-wrap: wrap;
}

.project-link {
  color: #00ff00;
  text-decoration: none;
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.project-link:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: rgba(0, 255, 0, 0.6);
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
  gap: 8px;
}

.tech-tag {
  background: rgba(0, 255, 0, 0.1);
  color: #00ff00;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid rgba(0, 255, 0, 0.3);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 20px 0;
}

.skill-category {
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
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
}

.skill-name {
  color: #ffffff;
  font-weight: 500;
  min-width: 100px;
}

.skill-bar {
  flex: 1;
  height: 8px;
  background: rgba(0, 255, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
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
  display: block;
  color: #00ff00;
  margin-bottom: 8px;
  font-weight: 600;
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
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00ff00;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
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
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.4);
}

.contact-links {
  display: flex;
  gap: 20px;
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
}

.contact-link:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: rgba(0, 255, 0, 0.6);
}

.sponsor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.sponsor-card {
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.sponsor-card:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: rgba(0, 255, 0, 0.4);
  transform: translateY(-2px);
}

.sponsor-card h4 {
  color: #00ff00;
  margin-bottom: 10px;
  font-size: 18px;
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

.cursor {
  color: #00ff00;
  animation: blink 1s infinite;
}

@media (max-width: 768px) {
  .terminal-body {
    padding: 15px;
  }

  .about-grid,
  .projects-grid,
  .skills-grid,
  .sponsor-grid {
    grid-template-columns: 1fr;
  }

  .project-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .skill-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .skill-bar {
    width: 100%;
  }
}
</style>
