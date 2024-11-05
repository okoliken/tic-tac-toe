<script setup lang="ts">
import { css } from '../../styled-system/css'
import GameHeader from '../components/ui/GameHeader.vue'
import GameBoard from '../components/ui/GameBoard.vue'
import ScoreBoard from '../components/ui/ScoreBoard.vue'
</script>

<template>
  <div
    :class="
      css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        w: '100%',
      })
    "
  >
    <div
      :class="
        css({
          w: '100%',
          maxWidth: '28.75rem',
          display: 'grid',
          gap: '1.25rem',
        })
      "
    >
      <GameHeader />
      <GameBoard />
      <ScoreBoard />
    </div>
  </div>
</template>
