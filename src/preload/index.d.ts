/**
 * Type declarations for window.electron
 */

import type { ElectronAPI } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
  }
}

export {}
