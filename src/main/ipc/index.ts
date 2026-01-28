/**
 * IPC Handlers Registry
 * Central place to register all IPC handlers
 */

import { ipcMain, BrowserWindow, shell, dialog } from 'electron'
import type { IpcMainInvokeEvent } from 'electron'

/**
 * Register all IPC handlers
 */
export function registerIpcHandlers(): void {
  // Window controls
  registerWindowHandlers()

  // Dialog handlers
  registerDialogHandlers()

  // Shell handlers
  registerShellHandlers()

  // App handlers
  registerAppHandlers()
}

/**
 * Window control handlers
 */
function registerWindowHandlers(): void {
  ipcMain.handle('window:minimize', (event: IpcMainInvokeEvent) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    window?.minimize()
  })

  ipcMain.handle('window:maximize', (event: IpcMainInvokeEvent) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (window?.isMaximized()) {
      window.unmaximize()
    } else {
      window?.maximize()
    }
  })

  ipcMain.handle('window:close', (event: IpcMainInvokeEvent) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    window?.close()
  })

  ipcMain.handle('window:isMaximized', (event: IpcMainInvokeEvent) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    return window?.isMaximized() ?? false
  })
}

/**
 * Dialog handlers
 */
function registerDialogHandlers(): void {
  ipcMain.handle('dialog:openFile', async (_event, options?: Electron.OpenDialogOptions) => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      ...options
    })
    return result.filePaths[0] ?? null
  })

  ipcMain.handle('dialog:openDirectory', async (_event, options?: Electron.OpenDialogOptions) => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
      ...options
    })
    return result.filePaths[0] ?? null
  })

  ipcMain.handle('dialog:saveFile', async (_event, options?: Electron.SaveDialogOptions) => {
    const result = await dialog.showSaveDialog({
      ...options
    })
    return result.filePath ?? null
  })

  ipcMain.handle('dialog:showMessage', async (_event, options: Electron.MessageBoxOptions) => {
    const result = await dialog.showMessageBox(options)
    return result.response
  })
}

/**
 * Shell handlers
 */
function registerShellHandlers(): void {
  ipcMain.handle('shell:openExternal', async (_event, url: string) => {
    await shell.openExternal(url)
  })

  ipcMain.handle('shell:openPath', async (_event, path: string) => {
    await shell.openPath(path)
  })

  ipcMain.handle('shell:showItemInFolder', (_event, path: string) => {
    shell.showItemInFolder(path)
  })
}

/**
 * App handlers
 */
function registerAppHandlers(): void {
  ipcMain.handle('app:getVersion', () => {
    return process.env.npm_package_version ?? '1.0.0'
  })

  ipcMain.handle('app:getPlatform', () => {
    return process.platform
  })

  ipcMain.handle('app:getAppPath', () => {
    const { app } = require('electron')
    return app.getAppPath()
  })
}
