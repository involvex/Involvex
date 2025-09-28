# 🚀 Involvex Terminal Portfolio

An interactive terminal-style portfolio built with Vue 3, TypeScript, and Vite. Experience a unique command-line interface that showcases projects, skills, and contact information.

## ✨ Features

- 🖥️ **Terminal Interface**: Authentic terminal experience with command-line interactions
- 🎨 **Modern Design**: Sleek dark theme with green terminal aesthetics
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Interactive Commands**: Type commands to navigate through different sections
- 🔗 **GitHub Integration**: Direct links to repositories and GitHub profile
- 💝 **Sponsorship Support**: Easy access to support options
- 📧 **Contact Form**: Built-in contact functionality

## 🎮 Available Commands

- `help` - Show all available commands
- `about` - Learn about Involvex
- `projects` - View featured projects
- `skills` - See technical skills
- `contact` - Get in touch
- `sponsor` - Support options
- `github` - Open GitHub profile
- `whoami` - Display current user
- `date` - Show current date/time
- `clear` - Clear terminal
- `ls` - List directory contents
- `pwd` - Show current directory
- `cat README` - Display README content

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with animations
- **Monospace Fonts** - Authentic terminal feel

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/involvex/Involvex.git
cd Involvex

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── TerminalHeader.vue    # Terminal window header
│   ├── TerminalBody.vue      # Main content sections
│   └── TerminalInput.vue     # Interactive command input
├── assets/
│   ├── base.css              # Base terminal styles
│   └── main.css              # Main application styles
└── App.vue                   # Root component
```

## 🎨 Customization

### Adding New Commands

1. Open `src/components/TerminalInput.vue`
2. Add your command to the `commands` object
3. Implement the command function
4. Add help text to the `help` command

### Styling

- Modify `src/assets/base.css` for global styles
- Update `src/assets/main.css` for component-specific styles
- Terminal colors can be customized via CSS variables

## 🌐 Deployment

This portfolio is designed to be deployed on:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by terminal interfaces and retro computing
- Built with modern web technologies
- Designed for developer portfolios

## 📞 Contact

- **GitHub**: [@involvex](https://github.com/involvex)
- **Email**: contact@involvex.dev
- **Portfolio**: [involvex.dev](https://involvex.dev)

---

Made with ❤️ by [Involvex](https://github.com/involvex)