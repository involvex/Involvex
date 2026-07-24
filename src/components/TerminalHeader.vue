<template>
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
</template>

<script setup lang="ts">
// Terminal header component with window controls and branding
</script>

<script lang="ts">
export default {
	name: 'TerminalHeader',
}
</script>

<style scoped>
.terminal-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px 20px;
	background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
	border-bottom: 1px solid var(--crt-border, rgba(0, 255, 65, 0.25));
	position: relative;
	flex-shrink: 0;
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
	color: var(--crt-green, #00ff41);
	text-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
	min-width: 0;
}

.terminal-icon {
	font-size: 16px;
	flex-shrink: 0;
}

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.45;
	}
}

.terminal-text {
	font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace;
	font-size: 14px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.terminal-status {
	display: flex;
	align-items: center;
	gap: 6px;
	flex-shrink: 0;
}

.status-indicator {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	animation: pulse 2s ease-in-out infinite;
}

.status-indicator.online {
	background: var(--crt-green, #00ff41);
	box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
}

.status-text {
	font-size: 10px;
	font-weight: 600;
	color: var(--crt-green, #00ff41);
	letter-spacing: 1px;
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
}

@media (prefers-reduced-motion: reduce) {
	.status-indicator {
		animation: none;
	}
}
</style>
