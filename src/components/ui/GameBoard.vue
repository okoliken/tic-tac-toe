<script setup lang="ts">
import { css } from '../../../styled-system/css'
import GameCell from './game-cell/GameCell.vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
</script>

<template>
  <div
    :class="css({
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.25rem',
      width: '100%'
    })"
  >
    <GameCell
      v-for="(cell, index) in gameStore.board"
      :key="index"
      :value="cell"
      @click="gameStore.makeMove(index)"
    />
  </div>
</template>
