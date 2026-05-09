# Agent Instructions for Involvex

This document provides comprehensive instructions for AI agents working on the Involvex project. It covers useful commands, technologies, best practices, and guidelines to ensure consistent and high-quality code contributions.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Useful Commands](#useful-commands)
3. [Technologies](#technologies)
4. [Best Practices and Guidelines](#best-practices-and-guidelines)
5. [Code Style and Standards](#code-style-and-standards)
6. [Development Workflow](#development-workflow)

---

## Project Overview

**Involvex** is an interactive terminal-style portfolio built with Vue 3, TypeScript, and Vite. The project features a command-line interface that showcases projects, skills, and contact information in an authentic terminal experience.

### Key Features

- Terminal interface with command-line interactions
- Modern dark theme with green terminal aesthetics
- Responsive design for desktop, tablet, and mobile
- Interactive commands (help, about, projects, skills, contact, sponsor, etc.)
- GitHub integration
- Contact form with EmailJS
- reCAPTCHA enterprise for security

### Repository

- **GitHub**: https://github.com/involvex/Involvex
- **Homepage**: https://involvex.github.io/Involvex/
- **License**: MIT

---

## Useful Commands

### Development Commands

| Command              | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| `bun run dev`        | Start the development server with hot module replacement      |
| `bun run build`      | Run full build pipeline (format, lint, typecheck, then build) |
| `bun run preview`    | Preview the production build locally                          |
| `bun run production` | Run production build with production mode                     |
| `bun run serve`      | Start development server (alias for `vite -m development`)    |

### Linting and Formatting

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| `bun run lint`        | Run ESLint to check for code issues          |
| `bun run lint:fix`    | Run ESLint with auto-fix for fixable issues  |
| `bun run lint:oxlint` | Run oxlint for additional correctness checks |
| `bun run format`      | Format code using Prettier                   |

### Type Checking

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `bun run typecheck` | Run TypeScript type checking with vue-tsc |

### Git Commands (When Requested)

| Command                                | Description                       |
| -------------------------------------- | --------------------------------- |
| `git status`                           | Show working tree status          |
| `git diff`                             | Show changes in working directory |
| `git log`                              | Show commit history               |
| `git add . && git commit -m "message"` | Stage and commit changes          |
| `git push`                             | Push commits to remote            |

---

## Technologies

### Core Technologies

| Technology     | Version               | Purpose                          |
| -------------- | --------------------- | -------------------------------- |
| **Vue.js**     | ^3.5.34               | Progressive JavaScript framework |
| **TypeScript** | ~6.0.3                | Type-safe JavaScript             |
| **Vite**       | 7.3.1 (rolldown-vite) | Fast build tool and dev server   |
| **CSS3**       | -                     | Modern styling with animations   |

### Key Dependencies

| Package              | Purpose                              |
| -------------------- | ------------------------------------ |
| `@emailjs/browser`   | Email sending from frontend          |
| `@formwerk/core`     | Form handling                        |
| `@vitejs/plugin-vue` | Vue.js support for Vite              |
| `cross-env`          | Cross-platform environment variables |
| `vue-router`         | Client-side routing                  |

### Development Dependencies

| Package                      | Purpose                       |
| ---------------------------- | ----------------------------- |
| **ESLint**                   | JavaScript/TypeScript linting |
| **Prettier**                 | Code formatting               |
| **oxlint**                   | Fast linting for correctness  |
| **vue-tsc**                  | TypeScript checking for Vue   |
| **vite-plugin-vue-devtools** | Vue DevTools integration      |
| **vite-plugin-inspect**      | Vite plugin inspection        |

### Recommended VS Code Extensions

- **Vue.volar** - Vue.js language support
- **ESLint** - Code linting
- **EditorConfig** - Consistent coding styles
- **oxc-vscode** - Oxc linting support
- **Prettier** - Code formatting

---

## Best Practices and Guidelines

### Vue.js Best Practices

1. **Use Composition API** - Prefer `<script setup>` syntax for Vue 3 components
2. **TypeScript Integration** - Always use TypeScript for type safety
3. **Component Structure** - Keep components focused and single-purpose
4. **Reactive Data** - Use `ref`, `reactive`, or `computed` appropriately
5. **Props and Emits** - Define props with proper types and use `defineEmits`

### TypeScript Best Practices

1. **Strict Mode** - Enable strict type checking
2. **Explicit Types** - Avoid `any`; use proper types
3. **Interfaces** - Use interfaces for object shapes
4. **Generics** - Use generics for reusable components
5. **Type Guards** - Use type guards for runtime type checking

### File Organization

```
src/
├── assets/           # Static assets (CSS, images)
│   ├── main.css
│   └── base.css
├── components/       # Vue components
│   ├── TerminalBody.vue
│   ├── TerminalHeader.vue
│   ├── TerminalInput.vue
│   └── icons/        # Icon components
├── router/           # Vue Router configuration
├── utils/            # Utility functions
├── App.vue           # Root component
└── main.ts           # Application entry point
```

### CSS and Styling

1. **Use Scoped CSS** - Prefer `<style scoped>` for component-specific styles
2. **CSS Variables** - Use CSS custom properties for theming
3. **Mobile-First** - Design responsive styles from mobile up
4. **Terminal Aesthetics** - Maintain the dark theme with green terminal colors

### Security Best Practices

1. **Environment Variables** - Never commit secrets; use `.env` files
2. **reCAPTCHA** - Use enterprise reCAPTCHA for form protection
3. **Input Validation** - Validate all user inputs
4. **EmailJS** - Only expose public keys in frontend code

### Performance Guidelines

1. **Lazy Loading** - Use dynamic imports for routes
2. **Tree Shaking** - Enable in production builds
3. **Asset Optimization** - Compress images and use modern formats
4. **Bundle Analysis** - Use vite-plugin-inspect to analyze bundles

---

## Code Style and Standards

### General Guidelines

- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Use **semicolons** at the end of statements
- Use **camelCase** for variables and functions
- Use **PascalCase** for components and classes
- Use **UPPER_SNAKE_CASE** for constants

### Vue Component Style

```vue
<script setup lang="ts">
// Imports
import {ref, computed} from 'vue'

// Props
interface Props {
	title: string
	count?: number
}

const props = withDefaults(defineProps<Props>(), {
	count: 0,
})

// Emits
const emit = defineEmits<{
	update: [value: string]
}>()

// Reactive state
const isLoading = ref(false)

// Computed properties
const displayTitle = computed(() => props.title.toUpperCase())

// Methods
function handleClick() {
	emit('update', 'new value')
}
</script>

<template>
	<div class="component-name">
		{{ displayTitle }}
	</div>
</template>

<style scoped>
.component-name {
	/* Scoped styles */
}
</style>
```

### TypeScript Style

```typescript
// Interfaces
interface User {
	id: string
	name: string
	email: string
}

// Types
type Status = 'pending' | 'active' | 'inactive'

// Functions
function greetUser(user: User): string {
	return `Hello, ${user.name}!`
}

// Arrow functions with proper typing
const processData = (data: string[]): number => {
	return data.length
}
```

### ESLint and Prettier Configuration

The project uses:

- **Prettier** with `@involvex/prettier-config` for code formatting
- **ESLint** with Vue and TypeScript support
- **oxlint** for additional correctness checks

Run formatting before committing:

```bash
bun run format
bun run lint:fix
bun run typecheck
```

---

## Development Workflow

### Before Making Changes

1. **Understand the task** - Read the requirements carefully
2. **Check existing code** - Review similar implementations
3. **Plan the approach** - Break down the task into steps

### While Making Changes

1. **Follow the tech stack** - Use Vue 3, TypeScript, and Vite
2. **Maintain code quality** - Run linting and type checking
3. **Test locally** - Verify changes work as expected
4. **Keep changes focused** - One feature or fix per commit

### After Making Changes

1. **Run the full build pipeline**:
   ```bash
   bun run build
   ```
2. **Verify no linting errors**:
   ```bash
   bun run lint
   ```
3. **Verify type checking passes**:
   ```bash
   bun run typecheck
   ```

### Deployment

The project uses GitHub Actions for deployment (see `.github/workflows/deploy.yml`). The production build is deployed to GitHub Pages at `https://involvex.github.io/Involvex/`.

### Environment Variables

When working with environment variables:

- Copy `.env.example` to `.env`
- Never commit `.env` files with secrets
- Use `VITE_*` prefix for Vite environment variables

Required variables for EmailJS:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Contact Information

- **GitHub**: [@involvex](https://github.com/involvex)
- **Email**: [involvex@proton.me](mailto:involvex@proton.me)

---

_Last Updated: May 2026_
_This file is maintained by the Involvex project contributors_
