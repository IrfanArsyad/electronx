# ElectronX

Core boilerplate untuk Electron + Vue 3 + Vite dengan Socket.IO support.

## Tech Stack

- **Electron** - Desktop app framework
- **Vue 3** - Composition API
- **Vite** - Build tool (via electron-vite)
- **Socket.IO** - Real-time communication
- **TypeScript** - Type safety

## Project Structure

```
electronx/
├── src/
│   ├── main/                 # Main Process (Node.js)
│   │   ├── index.ts          # Entry point, window creation
│   │   └── ipc/
│   │       └── index.ts      # IPC handlers
│   │
│   ├── preload/              # Preload Scripts
│   │   ├── index.ts          # Context bridge setup
│   │   └── index.d.ts        # Type declarations
│   │
│   └── renderer/             # Renderer Process (Vue)
│       ├── index.html
│       └── src/
│           ├── main.ts       # Vue entry point
│           ├── App.vue       # Root component
│           ├── composables/  # Vue composables
│           │   ├── useElectron.ts
│           │   └── useSocket.ts
│           └── types/        # Type definitions
│
├── electron.vite.config.ts   # Vite config
├── tsconfig.json
└── package.json
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Development mode
pnpm dev

# Build for production
pnpm build

# Build for specific platform
pnpm build:win    # Windows
pnpm build:mac    # macOS
pnpm build:linux  # Linux
```

## Core Features

### 1. IPC Communication

Main process (`src/main/ipc/index.ts`) handles:
- Window controls (minimize, maximize, close)
- Dialog operations (open file, save file, message box)
- Shell operations (open external URL, reveal in folder)
- App info (version, platform)

### 2. Preload Script

Securely exposes Electron APIs via `contextBridge`:

```typescript
// Di Vue component
const { window, dialog, shell, app, ipc } = useElectron()

// Window controls
await window.minimize()
await window.maximize()
await window.close()

// Dialogs
const file = await dialog.openFile({ filters: [{ name: 'Images', extensions: ['png', 'jpg'] }] })

// Shell
await shell.openExternal('https://google.com')

// IPC
ipc.send('custom-event', data)
const result = await ipc.invoke('custom-handler', data)
```

### 3. Socket.IO Integration

```typescript
import { useSocket } from '@/composables/useSocket'

const { connect, disconnect, isConnected, on, emit } = useSocket()

// Connect
connect('http://localhost:3000')

// Listen events
on('message', (data) => {
  console.log('Received:', data)
})

// Emit events
emit('message', 'Hello server!')

// Disconnect
disconnect()
```

## Composables

### useElectron

Akses Electron APIs dengan auto-cleanup:

```typescript
const { window, dialog, shell, app, ipc } = useElectron()
```

| Property | Methods |
|----------|---------|
| `window` | `minimize()`, `maximize()`, `close()`, `isMaximized()` |
| `dialog` | `openFile()`, `openDirectory()`, `saveFile()`, `showMessage()` |
| `shell` | `openExternal()`, `openPath()`, `showItemInFolder()` |
| `app` | `getVersion()`, `getPlatform()`, `getAppPath()` |
| `ipc` | `on()`, `send()`, `invoke()` |

### useSocket

Socket.IO wrapper dengan reactive state:

```typescript
const {
  isConnected,      // Ref<boolean>
  connectionError,  // Ref<string | null>
  connect,          // (url, options?) => Socket
  disconnect,       // () => void
  on,               // (event, callback) => unsubscribe
  once,             // (event, callback) => void
  off,              // (event, callback?) => void
  emit,             // (event, ...args) => void
  emitWithAck,      // (event, ...args) => Promise<T>
  getSocket         // () => Socket | null
} = useSocket()
```

## Adding Custom IPC Handlers

1. **Main process** - Register handler di `src/main/ipc/index.ts`:

```typescript
ipcMain.handle('custom:action', async (_event, payload) => {
  // Handle logic
  return result
})
```

2. **Preload** - Expose di `src/preload/index.ts`:

```typescript
contextBridge.exposeInMainWorld('electron', {
  // ... existing
  custom: {
    action: (payload) => ipcRenderer.invoke('custom:action', payload)
  }
})
```

3. **Renderer** - Gunakan di Vue component:

```typescript
const result = await window.electron.custom.action(payload)
```

## Security

- `contextIsolation: true` - Renderer terisolasi dari Node.js
- `nodeIntegration: false` - No direct Node.js access
- `sandbox: false` - Disabled untuk preload script
- CSP configured di `index.html`

## Tips

1. **IPC Pattern**: Selalu gunakan `invoke/handle` untuk request-response, `send/on` untuk one-way
2. **Socket Events**: Pastikan cleanup listeners saat component unmount (handled by composable)
3. **Type Safety**: Definisikan types di `src/renderer/src/types/`

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm build:win` | Build Windows installer |
| `pnpm build:mac` | Build macOS DMG |
| `pnpm build:linux` | Build Linux AppImage |
| `pnpm typecheck` | Run TypeScript check |

## License

MIT
