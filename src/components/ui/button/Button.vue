<script setup lang="ts">
import { button } from './button.styles'

const { visual, size } = defineProps({
  visual: { type: String as () => 'primary' | 'silver' | 'secondary', default: 'primary' },
  size: { type: String as () => 'sm' | 'lg', default: 'sm' },
})
</script>

<template>
  <button role="button" :class="button({ visual, size })">
    <slot></slot>
  </button>
</template>
