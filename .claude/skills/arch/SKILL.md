---
name: arch
description: Show ElectronX architecture overview and project structure
user-invocable: true
allowed-tools: Read, Glob
---

# ElectronX Architecture

## Overview

ElectronX uses a three-process architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Electron App                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐    IPC     ┌───────────────────────┐  │
│  │ Main Process │◄──────────►│   Renderer Process    │  │
│  │  (Node.js)   │            │      (Vue 3)          │  │
│  └──────────────┘            └───────────────────────┘  │
│         │                              ▲                 │
│         │                              │                 │
│         ▼                              │                 │
│  ┌──────────────┐            ┌─────────┴─────────┐      │
│  │   Preload    │            │    Socket.IO      │      │
│  │ (Bridge API) │            │    (Real-time)    │      │
│  └──────────────┘            └───────────────────┘      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Process Responsibilities

| Process | Location | Role |
|---------|----------|------|
| **Main** | `src/main/` | Window management, IPC handlers, native APIs |
| **Preload** | `src/preload/` | Secure bridge between main and renderer |
| **Renderer** | `src/renderer/` | UI (Vue 3), user interaction, Socket.IO |

## Key Files

### Main Process
- `src/main/index.ts` - Entry, window creation, app lifecycle
- `src/main/ipc/index.ts` - IPC handler registration

### Preload
- `src/preload/index.ts` - contextBridge API exposure
- `src/preload/index.d.ts` - TypeScript declarations

### Renderer (Vue)
- `src/renderer/src/main.ts` - Vue app entry
- `src/renderer/src/App.vue` - Root component
- `src/renderer/src/composables/` - Reusable logic
- `src/renderer/src/services/` - Business logic
- `src/renderer/src/types/` - Type definitions

## Communication Flow

```
Vue Component
     │
     ▼
useElectron() ──────► window.electron ──────► ipcRenderer
                           │                       │
                           │                       ▼
                           │                  ipcMain.handle()
                           │                       │
                           └───────────────────────┘
```

## Socket.IO Flow

```
Vue Component
     │
     ▼
useSocket() ──────► socket.io-client ──────► Socket Server
     │                                              │
     │◄─────────── Real-time events ───────────────┘
```

Display this architecture information to the user.
