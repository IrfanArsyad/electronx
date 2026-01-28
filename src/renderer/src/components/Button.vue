<script setup lang="ts">
/**
 * Button - Reusable button component
 */

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    class="btn"
    :class="[
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--block': block, 'btn--loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="btn__loader"></span>
    <span class="btn__content" :class="{ 'btn__content--hidden': loading }">
      <slot />
    </span>
  </button>
</template>
