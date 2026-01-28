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

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.btn--primary {
  background: #00d9ff;
  color: #1a1a2e;
}
.btn--primary:hover:not(:disabled) {
  background: #00c4e6;
}

.btn--secondary {
  background: #333;
  color: #fff;
}
.btn--secondary:hover:not(:disabled) {
  background: #444;
}

.btn--danger {
  background: #ff4757;
  color: #fff;
}
.btn--danger:hover:not(:disabled) {
  background: #ff3344;
}

.btn--ghost {
  background: transparent;
  color: #00d9ff;
  border: 1px solid #00d9ff;
}
.btn--ghost:hover:not(:disabled) {
  background: rgba(0, 217, 255, 0.1);
}

/* Sizes */
.btn--sm {
  padding: 6px 12px;
  font-size: 12px;
}
.btn--md {
  padding: 10px 20px;
  font-size: 14px;
}
.btn--lg {
  padding: 14px 28px;
  font-size: 16px;
}

/* Block */
.btn--block {
  width: 100%;
}

/* Loading */
.btn__loader {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.btn__content--hidden {
  visibility: hidden;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
