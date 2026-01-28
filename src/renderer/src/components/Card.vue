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
