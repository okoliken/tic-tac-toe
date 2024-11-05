<script setup lang="ts">
import { css } from '../../../styled-system/css'

const props = defineProps<{
  title: string
  color: string
  score: string
}>()

const baseStyles = css({
  w: '8.75rem',
  h: '4.5rem',
  borderRadius: '0.938rem',
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.5rem',
})
</script>

<template>
  <div
    :class="[
      baseStyles,
      css({
        bg: `${props.color}`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      
      }),
    ]"
  >
    <h3
      :class="
        css({
          fontSize: 'heading.xxs',
          fontWeight: '400',
          color: 'darkNavy.200',
          letterSpacing:'0.055rem',
          flex:'1'
        })
      "
    >
      {{ props.title }}
    </h3>
    <p
      :class="
        css({
          fontSize: 'heading.md',
          fontWeight: '700',
          color: 'darkNavy.200',
            flex:'1'
        })
      "
    >
      {{ props.score }}
    </p>
  </div>
</template>
