<script setup lang="ts">
/**
 * Card - Container card component
 */

interface Props {
  title?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  padding: 'md',
  hoverable: false
})
</script>

<template>
  <div class="card" :class="[`card--padding-${padding}`, { 'card--hoverable': hoverable }]">
    <div v-if="title || $slots.header" class="card__header">
      <slot name="header">
        <h3 class="card__title">{{ title }}</h3>
      </slot>
    </div>
    <div class="card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #16213e;
  border-radius: 8px;
  border: 1px solid #333;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card--hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.card__header {
  padding: 16px 20px;
  border-bottom: 1px solid #333;
}

.card__title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.card__body {
  color: #ccc;
}

.card--padding-none .card__body {
  padding: 0;
}
.card--padding-sm .card__body {
  padding: 12px;
}
.card--padding-md .card__body {
  padding: 20px;
}
.card--padding-lg .card__body {
  padding: 28px;
}

.card__footer {
  padding: 16px 20px;
  border-top: 1px solid #333;
}
</style>
