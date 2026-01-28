<script setup lang="ts">
/**
 * TitleBar - Custom window title bar with controls
 */
import { ref, onMounted, onUnmounted } from 'vue'
import { useElectron } from '@/composables/useElectron'

interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'ElectronX'
})

const { window, ipc } = useElectron()
const isMaximized = ref(false)

async function checkMaximized() {
  isMaximized.value = await window.isMaximized()
}

onMounted(() => {
  checkMaximized()
  ipc.on('window-maximized', () => (isMaximized.value = true))
  ipc.on('window-unmaximized', () => (isMaximized.value = false))
})

async function handleMinimize() {
  await window.minimize()
}

async function handleMaximize() {
  await window.maximize()
  await checkMaximized()
}

async function handleClose() {
  await window.close()
}
</script>

<template>
  <div class="title-bar">
    <div class="title-bar__drag">
      <span class="title-bar__title">{{ title }}</span>
    </div>
    <div class="title-bar__controls">
      <button class="title-bar__btn" @click="handleMinimize" title="Minimize">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <rect y="5" width="12" height="2" fill="currentColor" />
        </svg>
      </button>
      <button class="title-bar__btn" @click="handleMaximize" title="Maximize">
        <svg v-if="!isMaximized" width="12" height="12" viewBox="0 0 12 12">
          <rect x="1" y="1" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
        <svg v-else width="12" height="12" viewBox="0 0 12 12">
          <rect x="3" y="0" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1.5" />
          <rect x="0" y="3" width="9" height="9" fill="var(--bg-color, #1a1a2e)" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </button>
      <button class="title-bar__btn title-bar__btn--close" @click="handleClose" title="Close">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="2" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  background: #16213e;
  user-select: none;
}

.title-bar__drag {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 12px;
  -webkit-app-region: drag;
}

.title-bar__title {
  font-size: 13px;
  color: #888;
}

.title-bar__controls {
  display: flex;
  height: 100%;
  -webkit-app-region: no-drag;
}

.title-bar__btn {
  width: 46px;
  height: 100%;
  border: none;
  background: transparent;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
}

.title-bar__btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.title-bar__btn--close:hover {
  background: #e81123;
  color: #fff;
}
</style>
