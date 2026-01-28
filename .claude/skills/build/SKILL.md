---
name: build
description: Build ElectronX for production or specific platform
disable-model-invocation: true
allowed-tools: Bash(pnpm *)
argument-hint: "[platform: win|mac|linux]"
---

# Build ElectronX

Build the application for production.

## Usage

- `/build` - Build only (no installer)
- `/build win` - Build Windows installer (.exe)
- `/build mac` - Build macOS DMG
- `/build linux` - Build Linux AppImage

## Commands

```bash
# Build only
pnpm build

# Platform specific
pnpm build:win    # Windows
pnpm build:mac    # macOS
pnpm build:linux  # Linux
```

## Output

- Build files: `out/`
- Installers: `dist/`

If argument is "$ARGUMENTS", run `pnpm build`.
If argument is "win", run `pnpm build:win`.
If argument is "mac", run `pnpm build:mac`.
If argument is "linux", run `pnpm build:linux`.
