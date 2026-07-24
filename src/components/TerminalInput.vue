<template>
	<div class="terminal-input-section">
		<div class="terminal-line">
			<span class="prompt">involvex@portfolio:~$</span>
			<input
				ref="commandInputRef"
				v-model="currentCommand"
				@keydown.enter="handleEnterKey"
				@keydown.up="navigateHistory(-1)"
				@keydown.down="navigateHistory(1)"
				class="command-input"
				placeholder="or type a command…"
				autocomplete="off"
				spellcheck="false"
				aria-label="Terminal command input"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from 'vue'

const currentCommand = ref('')
const commandHistory = ref<string[]>([])
const historyIndex = ref(-1)
const commandInputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
	'command-submitted': [command: string]
}>()

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

const handleEnterKey = () => {
	const command = currentCommand.value.trim()
	if (command) {
		if (commandHistory.value[commandHistory.value.length - 1] !== command) {
			commandHistory.value.push(command)
		}
		historyIndex.value = commandHistory.value.length
		emit('command-submitted', command)
		currentCommand.value = ''
	}
}

const focusInput = () => {
	nextTick(() => {
		commandInputRef.value?.focus()
	})
}

onMounted(() => {
	focusInput()
})

defineExpose({
	focusInput,
	commandInputRef,
})
</script>

<script lang="ts">
export default {
	name: 'TerminalInput',
}
</script>

<style scoped>
.terminal-input-section {
	margin-top: 0;
	width: 100%;
}

.terminal-line {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 0;
}

.prompt {
	color: var(--crt-green, #00ff41);
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
	caret-color: var(--crt-green, #00ff41);
	min-width: 0;
}

.command-input::placeholder {
	color: #666;
}
</style>
