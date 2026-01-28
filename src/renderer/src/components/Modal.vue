<script setup lang="ts">
/**
 * Modal - Dialog/modal component
 */
import { watch } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  width?: string
  closable?: boolean
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: '480px',
  closable: true,
  closeOnOverlay: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function handleOverlayClick() {
  if (props.closeOnOverlay) {
    close()
  }
}

watch(() => props.modelValue, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click.self="handleOverlayClick">
        <div class="modal" :style="{ maxWidth: width }">
          <div v-if="title || closable" class="modal__header">
            <h3 class="modal__title">{{ title }}</h3>
            <button v-if="closable" class="modal__close" @click="close">
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="2" />
              </svg>
            </button>
          </div>
          <div class="modal__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
