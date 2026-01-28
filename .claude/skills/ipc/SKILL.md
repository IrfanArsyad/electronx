---
name: ipc
description: Generate new IPC handler for Electron main-renderer communication
argument-hint: "<channel-name> [description]"
allowed-tools: Read, Edit, Write
---

# Generate IPC Handler

Create a new IPC handler for ElectronX with the channel name: **$0**

## Steps

1. **Add handler in main process** (`src/main/ipc/index.ts`):

```typescript
ipcMain.handle('$0', async (_event, payload) => {
  // Handler logic here
  return result
})
```

2. **Expose in preload** (`src/preload/index.ts`):

Add to the `electronAPI` object:

```typescript
$0: (payload) => ipcRenderer.invoke('$0', payload)
```

3. **Update type definition** in `ElectronAPI` interface.

## Pattern Guidelines

- Use `namespace:action` format for channel names (e.g., `file:read`, `db:query`)
- Use `invoke/handle` for request-response
- Use `send/on` for one-way notifications
- Always type the payload and return value

## Example

For channel `file:read`:

**Main:**
```typescript
ipcMain.handle('file:read', async (_event, path: string) => {
  const content = await fs.readFile(path, 'utf-8')
  return content
})
```

**Preload:**
```typescript
file: {
  read: (path: string) => ipcRenderer.invoke('file:read', path)
}
```

Generate the IPC handler for "$0" following this pattern.
