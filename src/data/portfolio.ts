/** Single source of truth for portfolio content */

export interface SocialLink {
	id: string
	label: string
	url: string
	handle?: string
}

export interface AboutField {
	key: string
	value: string
}

export interface Project {
	name: string
	description: string
	technologies: string[]
	github: string
	demo?: string | null
	stars?: number
}

export interface SkillItem {
	name: string
	level: number
}

export interface SkillCategory {
	name: string
	items: SkillItem[]
	/** Core categories show on mobile by default */
	core?: boolean
}

export interface HelpCommand {
	cmd: string
	desc: string
}

export interface SponsorOption {
	id: string
	label: string
	description: string
	url: string
}

export const PROFILE = {
	name: 'Involvex',
	handle: 'involvex',
	location: 'Germany',
	role: 'Full-stack developer & open-source maintainer',
	email: 'involvex@proton.me',
	discord: 'involvex',
	hireable: true,
	portfolioUrl: 'https://involvex.github.io/involvex/',
	bio: 'Germany-based full-stack developer focused on open-source CLI/TUI tools, Bun-powered apps, and AI-assisted developer workflows. Best known for youtube-music-cli — a TypeScript/Ink TUI YouTube Music player — with additional work across Flutter/Expo, Gemini CLI extensions, and Cloudflare Workers.',
	philosophy: [
		'Commandline First — terminal-based workflows',
		'Agents > Human Developer — AI tools for productivity',
		'Open Source — active contributor and maintainer',
		'Continuous Learning — always exploring new stacks',
	],
} as const

export const SOCIALS: SocialLink[] = [
	{
		id: 'github',
		label: 'GitHub',
		url: 'https://github.com/involvex',
		handle: '@involvex',
	},
	{
		id: 'x',
		label: 'X',
		url: 'https://x.com/Involvexdev',
		handle: '@Involvexdev',
	},
	{
		id: 'reddit',
		label: 'Reddit',
		url: 'https://www.reddit.com/u/involvex',
		handle: 'u/involvex',
	},
]

export const ABOUT_FIELDS: AboutField[] = [
	{key: 'Name', value: 'Involvex'},
	{key: 'Role', value: 'Full-stack / open source'},
	{key: 'Location', value: 'Germany'},
	{key: 'Focus', value: 'CLI-first, Bun, TUI, AI agents'},
	{key: 'Status', value: 'Available for hire'},
	{key: 'Email', value: 'involvex@proton.me'},
]

export const FEATURED_PROJECTS: Project[] = [
	{
		name: 'youtube-music-cli',
		description:
			'TUI music player for YouTube Music — search, queue, plugins, themes, immersive mode.',
		technologies: ['TypeScript', 'Ink', 'Bun', 'React'],
		github: 'https://github.com/involvex/youtube-music-cli',
		demo: 'https://involvex.github.io/youtube-music-cli/',
		stars: 380,
	},
	{
		name: 'gemini-cli-prompt-library',
		description: 'Curated high-quality prompts for Gemini CLI development tasks.',
		technologies: ['Prompts', 'Gemini CLI'],
		github: 'https://github.com/involvex/gemini-cli-prompt-library',
		stars: 60,
	},
	{
		name: 'gemini-cli-skill-creator',
		description: 'Gemini CLI extension for creating project skills via slash commands.',
		technologies: ['TypeScript', 'Gemini CLI'],
		github: 'https://github.com/involvex/gemini-cli-skill-creator',
		stars: 10,
	},
	{
		name: 'gemini-cli-ssh-extension',
		description: 'SSH-related Gemini CLI extension for remote workflows.',
		technologies: ['Python', 'Gemini CLI', 'SSH'],
		github: 'https://github.com/involvex/gemini-cli-ssh-extension',
		stars: 7,
	},
	{
		name: 'create-wizard',
		description: 'Interactive project scaffolding CLI for bootstrapping apps quickly.',
		technologies: ['JavaScript', 'Node.js'],
		github: 'https://github.com/involvex/create-wizard',
		demo: 'https://involvex.github.io/create-wizard/',
		stars: 3,
	},
	{
		name: 'archhive-app',
		description: 'Cross-platform media browser, downloader, and library manager.',
		technologies: ['Rust'],
		github: 'https://github.com/involvex/archhive-app',
		stars: 3,
	},
	{
		name: 'nova-assistant',
		description: 'On-device AI assistant with voice, screen, and tools — no cloud required.',
		technologies: ['Dart', 'Flutter'],
		github: 'https://github.com/involvex/nova-assistant',
		demo: 'https://involvex.github.io/nova-assistant/',
		stars: 1,
	},
	{
		name: 'pocketshell',
		description: 'Flutter SSH client/server for mobile and desktop.',
		technologies: ['Dart', 'Flutter', 'SSH'],
		github: 'https://github.com/involvex/pocketshell',
		demo: 'https://involvex.github.io/pocketshell/',
		stars: 1,
	},
	{
		name: 'awesome-github-app',
		description: 'Expo / React Native GitHub mobile client.',
		technologies: ['Expo', 'React Native', 'TypeScript'],
		github: 'https://github.com/involvex/awesome-github-app',
		stars: 1,
	},
]

export const SKILL_CATEGORIES: SkillCategory[] = [
	{
		name: 'Frontend',
		core: true,
		items: [
			{name: 'Ink', level: 85},
			{name: 'Vue 3', level: 80},
			{name: 'React', level: 70},
			{name: 'TypeScript', level: 75},
			{name: 'CSS/SCSS', level: 85},
			{name: 'HTML5', level: 90},
		],
	},
	{
		name: 'Backend',
		core: true,
		items: [
			{name: 'Bun', level: 86},
			{name: 'Node.js', level: 85},
			{name: 'Python', level: 75},
			{name: 'Tauri', level: 75},
			{name: 'Rust', level: 55},
		],
	},
	{
		name: 'Mobile',
		core: true,
		items: [
			{name: 'Flutter', level: 75},
			{name: 'Expo', level: 75},
			{name: 'Ionic', level: 75},
			{name: 'React Native', level: 70},
		],
	},
	{
		name: 'Tools',
		core: true,
		items: [
			{name: 'Git', level: 80},
			{name: 'Cloudflare Workers', level: 75},
			{name: 'PowerShell', level: 65},
			{name: 'Linux', level: 75},
		],
	},
	{
		name: 'Agentic Tools',
		core: false,
		items: [
			{name: 'Gemini CLI', level: 80},
			{name: 'Claude', level: 75},
			{name: 'Copilot', level: 75},
			{name: 'Cline', level: 75},
			{name: 'Opencode', level: 75},
			{name: 'Kilo', level: 75},
		],
	},
	{
		name: 'Favorite Frameworks',
		core: false,
		items: [
			{name: 'Ink', level: 85},
			{name: 'Bun', level: 85},
			{name: 'Tauri', level: 75},
			{name: 'Flutter', level: 75},
		],
	},
]

export const HELP_COMMANDS: HelpCommand[] = [
	{cmd: 'help', desc: 'View available commands'},
	{cmd: 'about', desc: 'Learn about Involvex'},
	{cmd: 'projects', desc: 'View featured GitHub projects'},
	{cmd: 'skills', desc: 'See technical skills'},
	{cmd: 'contact', desc: 'Get in touch'},
	{cmd: 'sponsor', desc: 'Support my work'},
	{cmd: 'clear', desc: 'Clear the terminal'},
]

export const COMMAND_CHIPS = ['about', 'projects', 'skills', 'contact', 'sponsor', 'clear'] as const

export const SPONSOR_OPTIONS: SponsorOption[] = [
	{
		id: 'github',
		label: '[1] GitHub Sponsors',
		description: 'Support open-source work on GitHub',
		url: 'https://github.com/sponsors/involvex',
	},
	{
		id: 'coffee',
		label: '[2] Buy Me a Coffee',
		description: 'Show appreciation with a coffee',
		url: 'https://buymeacoffee.com/involvex',
	},
	{
		id: 'paypal',
		label: '[3] PayPal',
		description: 'Direct support via PayPal',
		url: 'https://paypal.me/involvex',
	},
	{
		id: 'rewards',
		label: '[4] Microsoft Rewards',
		description: 'Support via Bing Rewards signup',
		url: 'https://rewards.bing.com/welcome?rh=14525F68&ref=rafsrchae&form=ML2XE3&OCID=ML2XE3&PUBL=RewardsDO&CREA=ML2XE3',
	},
]

export const ASCII_ART = `
    ██╗███╗   ██╗██╗   ██╗ ██████╗ ██╗     ██╗   ██╗███████╗██╗  ██╗
    ██║████╗  ██║██║   ██║██╔═══██╗██║     ██║   ██║██╔════╝╚██╗██╔╝
    ██║██╔██╗ ██║██║   ██║██║   ██║██║     ██║   ██║█████╗   ╚███╔╝
    ██║██║╚██╗██║╚██╗ ██╔╝██║   ██║██║     ╚██╗ ██╔╝██╔══╝   ██╔██╗
    ██║██║ ╚████║ ╚████╔╝ ╚██████╔╝███████╗ ╚████╔╝ ███████╗██╔╝ ██╗
    ╚═╝╚═╝  ╚═══╝  ╚═══╝   ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
`

export const ASCII_ART_MOBILE = `
 ██╗███╗  ██╗██╗   ██╗
 ██║████╗ ██║██║   ██║
 ██║██╔██╗██║██║   ██║
 ██║██║╚████║╚██╗ ██╔╝
 ██║██║ ╚███║ ╚████╔╝
 ╚═╝╚═╝  ╚══╝  ╚═══╝
  ██████╗ ██╗    ██╗   ██╗███████╗██╗  ██╗
 ██╔═══██╗██║    ██║   ██║██╔════╝╚██╗██╔╝
 ██║   ██║██║    ██║   ██║█████╗   ╚███╔╝
 ██║   ██║██║    ╚██╗ ██╔╝██╔══╝   ██╔██╗
 ╚██████╔╝███████╗╚████╔╝ ███████╗██╔╝ ██╗
  ╚═════╝ ╚══════╝ ╚═══╝  ╚══════╝╚═╝  ╚═╝
`

/** Map typed aliases to section ids */
export const COMMAND_ALIASES: Record<string, string> = {
	home: 'welcome',
	welcome: 'welcome',
	about: 'about',
	projects: 'projects',
	work: 'projects',
	skills: 'skills',
	tech: 'skills',
	contact: 'contact',
	sponsor: 'sponsor',
	help: 'help',
}

export function resolveCommand(command: string): string {
	const normalized = command.toLowerCase().trim()
	return COMMAND_ALIASES[normalized] ?? normalized
}

export function skillMeter(level: number, width = 10): string {
	const filled = Math.round((level / 100) * width)
	return '█'.repeat(filled) + '░'.repeat(width - filled)
}
