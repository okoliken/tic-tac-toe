<script setup lang="ts">
import { css } from '../../../styled-system/css'

const props = defineProps<{
  title: string
  color: string
  score: number
}>()

const baseStyles = css({
  w: '100%',
  minH: '4.5rem',
  borderRadius: '0.938rem',
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
        flex: '1',
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
          flex:'1',
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
