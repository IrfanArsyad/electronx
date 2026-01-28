---
name: dev
description: Start ElectronX development server with hot reload
disable-model-invocation: true
allowed-tools: Bash(pnpm *)
---

# Start Development Server

Run the development server for ElectronX:

```bash
pnpm dev
```

This will:
1. Start Vite dev server for renderer (Vue)
2. Start Electron main process with hot reload
3. Open the app window automatically

If dependencies are not installed, run `pnpm install` first.
