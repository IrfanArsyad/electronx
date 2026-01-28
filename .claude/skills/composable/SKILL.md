---
name: composable
description: Generate a new Vue 3 composable with TypeScript
argument-hint: "<name> [description]"
allowed-tools: Read, Write
---

# Generate Vue Composable

Create a new composable: **use$0**

## File Location

`src/renderer/src/composables/use$0.ts`

## Template

```typescript
/**
 * Composable: use$0
 * $1
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'

export function use$0() {
  // State
  const data = ref<unknown>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const hasData = computed(() => data.value !== null)

  // Methods
  async function fetch() {
    loading.value = true
    error.value = null
    try {
      // Implementation
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  // Lifecycle
  onMounted(() => {
    // Setup
  })

  onUnmounted(() => {
    // Cleanup
  })

  return {
    // State
    data,
    loading,
    error,
    // Computed
    hasData,
    // Methods
    fetch
  }
}
```

## Guidelines

1. Name starts with `use` (e.g., `useAuth`, `useTheme`)
2. Return reactive state and methods
3. Handle cleanup in `onUnmounted`
4. Type all refs and return values
5. Export from `composables/index.ts`

## After Creating

Add export to `src/renderer/src/composables/index.ts`:

```typescript
export { use$0 } from './use$0'
```

Generate the composable "use$0" with description "$1".
