/**
 * Composable: useElectron
 * Access Electron APIs from Vue components
 */

import { ref, onUnmounted } from 'vue'

export function useElectron() {
  const electron = window.electron

  // Window controls
  const window = {
    minimize: () => electron.window.minimize(),
    maximize: () => electron.window.maximize(),
    close: () => electron.window.close(),
    isMaximized: () => electron.window.isMaximized()
  }

  // Dialog
  const dialog = {
    openFile: (options?: Electron.OpenDialogOptions) =>
      electron.dialog.openFile(options),
    openDirectory: (options?: Electron.OpenDialogOptions) =>
      electron.dialog.openDirectory(options),
    saveFile: (options?: Electron.SaveDialogOptions) =>
      electron.dialog.saveFile(options),
    showMessage: (options: Electron.MessageBoxOptions) =>
      electron.dialog.showMessage(options)
  }

  // Shell
  const shell = {
    openExternal: (url: string) => electron.shell.openExternal(url),
    openPath: (path: string) => electron.shell.openPath(path),
    showItemInFolder: (path: string) => electron.shell.showItemInFolder(path)
  }

  // App
  const app = {
    getVersion: () => electron.app.getVersion(),
    getPlatform: () => electron.app.getPlatform(),
    getAppPath: () => electron.app.getAppPath()
  }

  // IPC with auto cleanup
  const listeners: Array<() => void> = []

  function ipcOn(channel: string, callback: (...args: unknown[]) => void) {
    const unsubscribe = electron.ipc.on(channel, callback)
    listeners.push(unsubscribe)
    return unsubscribe
  }

  function ipcSend(channel: string, ...args: unknown[]) {
    electron.ipc.send(channel, ...args)
  }

  function ipcInvoke<T = unknown>(channel: string, ...args: unknown[]) {
    return electron.ipc.invoke<T>(channel, ...args)
  }

  // Auto cleanup listeners on unmount
  onUnmounted(() => {
    listeners.forEach(unsubscribe => unsubscribe())
  })

  return {
    window,
    dialog,
    shell,
    app,
    ipc: {
      on: ipcOn,
      send: ipcSend,
      invoke: ipcInvoke
    }
  }
}
