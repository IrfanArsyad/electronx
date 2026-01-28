---
name: install
description: Install npm package as dependency or devDependency
disable-model-invocation: true
argument-hint: "<package-name> [-D]"
allowed-tools: Bash(pnpm *)
---

# Install Package

Install npm package: **$ARGUMENTS**

## Usage

- `/install axios` - Install as dependency
- `/install vitest -D` - Install as devDependency

## Commands

```bash
# Dependencies (runtime)
pnpm add <package>

# DevDependencies (build/dev tools)
pnpm add -D <package>
```

## Common Packages for ElectronX

### Runtime
- `axios` - HTTP client
- `pinia` - State management
- `vue-router` - Routing
- `dayjs` - Date manipulation

### DevDependencies
- `vitest` - Testing
- `@vue/test-utils` - Vue testing
- `eslint` - Linting
- `prettier` - Formatting

Run the install command for "$ARGUMENTS".
