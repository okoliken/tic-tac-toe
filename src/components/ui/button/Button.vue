<script setup lang="tsx">
import { button } from './button.styles'

const { visual, size, renderIconOnly } = defineProps({
  visual: { type: String as () => 'primary' | 'silver' | 'secondary', default: 'primary' },
  size: { type: String as () => 'sm' | 'lg', default: 'sm' },
  renderIconOnly: { type: Boolean, default: false, required: false },
})
</script>

<template>
  <button role="button" :class="button({ visual, size })">
    <slot v-if="!renderIconOnly"></slot>
  </button>
</template>
