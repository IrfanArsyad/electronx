/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, unknown>
  export default component
}

// Extend Window with electron API
interface Window {
  electron: import('../../preload/index').ElectronAPI
}
