---
name: component
description: Generate a new Vue 3 SFC component with script setup
argument-hint: "<ComponentName> [description]"
allowed-tools: Read, Write
---

# Generate Vue Component

Create a new Vue 3 component: **$0**

## File Location

`src/renderer/src/components/$0.vue`

## Template

```vue
<script setup lang="ts">
/**
 * Component: $0
 * $1
 */

import { ref, computed } from 'vue'

// Props
interface Props {
  // Define props here
}

const props = withDefaults(defineProps<Props>(), {
  // Default values
})

// Emits
const emit = defineEmits<{
  // (e: 'update', value: string): void
}>()

// State
const state = ref('')

// Computed
const computedValue = computed(() => {
  return state.value
})

// Methods
function handleClick() {
  // Implementation
}
</script>

<template>
  <div class="$0">
    <!-- Component content -->
  </div>
</template>

<style scoped>
.$0 {
  /* Styles */
}
</style>
```

## Naming Convention

- PascalCase for component names (e.g., `UserCard`, `NavBar`)
- File name matches component name
- CSS class uses component name (kebab-case optional)

## Guidelines

1. Use `<script setup lang="ts">` syntax
2. Define Props interface with `defineProps<Props>()`
3. Use `defineEmits` for custom events
4. Keep template clean, extract logic to composables
5. Use scoped styles

Generate component "$0" with description "$1".
