<script setup lang="ts">
defineOptions({
  name: 'BaseButton'
})
import { button } from './button.styles'

const { visual, size, disabled } = defineProps({
  visual: { type: String as () => 'primary' | 'silver' | 'secondary', default: 'primary' },
  size: { type: String as () => 'sm' | 'lg', default: 'sm' },
  disabled: { type: Boolean, default: false }
})
</script>

<template>
  <button role="button" :class="button({ visual, size })" :disabled="disabled">
    <slot></slot>
  </button>
</template>
