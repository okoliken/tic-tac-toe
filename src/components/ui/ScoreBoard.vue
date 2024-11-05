<script setup lang="ts">
import ScoreCard from './ScoreCard.vue'
import { css } from '../../../styled-system/css'

const styles = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '1.188rem',
  w: '100%',
})
</script>

<template>
  <div :class="styles">
    <ScoreCard title="X (YOU)" color="primary.200" score="0" />
    <ScoreCard title="TIES" color="sliver.200" score="0" />
    <ScoreCard title="O (CPU)" color="secondary.200" score="0" />
  </div>
</template>
