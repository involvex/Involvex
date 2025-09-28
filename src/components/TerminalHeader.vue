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
  name: 'TerminalHeader'
}
</script>

<style scoped>
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

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
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
</style>
