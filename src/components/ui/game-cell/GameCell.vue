<script setup lang="ts">
import { css } from '../../../../styled-system/css'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = defineProps<{
  value: string
}>()

const icon = computed(() => {
  if (props.value === 'X') return 'fa:close'
  if (props.value === 'O') return 'fa6-solid:circle-dot'
  return ''
})

const iconColor = computed(() => {
  if (props.value === 'X') return 'primary.200'
  if (props.value === 'O') return 'secondary.200'
  return ''
})
</script>

<template>
  <div
    role="button"
    :class="
      css({
        w: '100%',
        maxW: '8.75rem',
        aspectRatio: '1',
        bg: 'darkNavy.100',
        borderRadius: '0.938rem',
        boxShadow: '0px -8px 0px 0px #10212A inset',
        _hover: {
          cursor: props.value ? 'default' : 'pointer',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })
    "
  >
    <Transition name="slide-up">
      <div v-if="value">
        <Icon
        :class="css({
          w: { base: '2.5rem', sm: '4rem' },
          h: { base: '2.5rem', sm: '4rem' },
          aspectRatio: '1',
          color: iconColor
        })"
        :icon="icon"
        />
      </div>
    </Transition>
  </div>
</template>
