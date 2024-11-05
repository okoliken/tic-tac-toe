<script setup lang="tsx">
import { css } from '../../../styled-system/css'
import GameCell from './game-cell/GameCell.vue'
</script>

<template>
  <div 
    :class="css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.25rem',
    width: '100%'
  })">
    <GameCell v-for="i in 9" :key="i" />
  </div>
</template>
