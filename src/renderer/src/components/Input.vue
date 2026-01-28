<script setup lang="ts">
/**
 * Input - Reusable input component
 */

interface Props {
  modelValue?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'search'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  label?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  error: '',
  label: ''
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()
</script>

<template>
  <div class="input-wrapper" :class="{ 'input-wrapper--error': error }">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      class="input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <span v-if="error" class="input-error">{{ error }}</span>
  </div>
</template>
