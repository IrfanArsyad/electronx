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

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-label {
  font-size: 13px;
  color: #888;
  font-weight: 500;
}

.input {
  padding: 10px 14px;
  border: 1px solid #333;
  border-radius: 6px;
  background: #16213e;
  color: #eee;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input::placeholder {
  color: #666;
}

.input:focus {
  outline: none;
  border-color: #00d9ff;
  box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-wrapper--error .input {
  border-color: #ff4757;
}

.input-wrapper--error .input:focus {
  box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.1);
}

.input-error {
  font-size: 12px;
  color: #ff4757;
}
</style>
