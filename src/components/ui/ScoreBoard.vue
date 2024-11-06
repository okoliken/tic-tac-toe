<script setup lang="ts">
import ScoreCard from './ScoreCard.vue'
import { css } from '../../../styled-system/css'
import { useGameStore } from '@/stores/gameStore'
import { storeToRefs } from 'pinia'

const { scores } = storeToRefs(useGameStore())

const styles = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '1.188rem',
  w: '100%',
})
</script>

<template>
  <div :class="styles">
    <ScoreCard title="X (YOU)" color="primary.200" :score="scores.x" />
    <ScoreCard title="TIES" color="sliver.200" :score="scores.ties" />
    <ScoreCard title="O (CPU)" color="secondary.200" :score="scores.o" />
  </div>
</template>
