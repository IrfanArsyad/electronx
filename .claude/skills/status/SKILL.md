---
name: status
description: Check ElectronX project status and health
disable-model-invocation: true
allowed-tools: Bash(pnpm *), Bash(git *), Read
---

# Project Status Check

Check the current status of ElectronX project.

## Checks to Perform

1. **Dependencies**
```bash
pnpm list --depth=0
```

2. **TypeScript Check**
```bash
pnpm typecheck
```

3. **Git Status** (if git repo)
```bash
git status --short
```

4. **Outdated Packages**
```bash
pnpm outdated
```

## Report Format

```
ElectronX Status
================
Dependencies: ✓ Installed / ✗ Missing
TypeScript:   ✓ No errors / ✗ X errors
Git:          ✓ Clean / ✗ X changes
Outdated:     X packages need update
```

Run these checks and report the project status.
