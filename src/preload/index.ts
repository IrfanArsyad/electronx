/**
 * Preload Script
 * Securely expose APIs to renderer using contextBridge
 */

import { contextBridge, ipcRenderer } from 'electron'
import type { IpcRendererEvent } from 'electron'

// Type definitions for exposed API
export interface ElectronAPI {
  // Window controls
  window: {
    minimize: () => Promise<void>
    maximize: () => Promise<void>
    close: () => Promise<void>
    isMaximized: () => Promise<boolean>
  }
  // Dialog
  dialog: {
    openFile: (options?: Electron.OpenDialogOptions) => Promise<string | null>
    openDirectory: (options?: Electron.OpenDialogOptions) => Promise<string | null>
    saveFile: (options?: Electron.SaveDialogOptions) => Promise<string | null>
    showMessage: (options: Electron.MessageBoxOptions) => Promise<number>
  }
  // Shell
  shell: {
    openExternal: (url: string) => Promise<void>
    openPath: (path: string) => Promise<void>
    showItemInFolder: (path: string) => void
  }
  // App
  app: {
    getVersion: () => Promise<string>
    getPlatform: () => Promise<NodeJS.Platform>
    getAppPath: () => Promise<string>
  }
  // IPC utilities
  ipc: {
    send: (channel: string, ...args: unknown[]) => void
    invoke: <T = unknown>(channel: string, ...args: unknown[]) => Promise<T>
    on: (channel: string, callback: (...args: unknown[]) => void) => () => void
    once: (channel: string, callback: (...args: unknown[]) => void) => void
  }
}

// Exposed API
const electronAPI: ElectronAPI = {
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
    isMaximized: () => ipcRenderer.invoke('window:isMaximized')
  },

  dialog: {
    openFile: (options) => ipcRenderer.invoke('dialog:openFile', options),
    openDirectory: (options) => ipcRenderer.invoke('dialog:openDirectory', options),
    saveFile: (options) => ipcRenderer.invoke('dialog:saveFile', options),
    showMessage: (options) => ipcRenderer.invoke('dialog:showMessage', options)
  },

  shell: {
    openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),
    openPath: (path) => ipcRenderer.invoke('shell:openPath', path),
    showItemInFolder: (path) => ipcRenderer.invoke('shell:showItemInFolder', path)
  },

  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
    getPlatform: () => ipcRenderer.invoke('app:getPlatform'),
    getAppPath: () => ipcRenderer.invoke('app:getAppPath')
  },

  ipc: {
    send: (channel, ...args) => {
      ipcRenderer.send(channel, ...args)
    },
    invoke: <T>(channel: string, ...args: unknown[]) => {
      return ipcRenderer.invoke(channel, ...args) as Promise<T>
    },
    on: (channel, callback) => {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args)
      ipcRenderer.on(channel, subscription)
      // Return unsubscribe function
      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    },
    once: (channel, callback) => {
      ipcRenderer.once(channel, (_event, ...args) => callback(...args))
    }
  }
}

// Expose to renderer
contextBridge.exposeInMainWorld('electron', electronAPI)
