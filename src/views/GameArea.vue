<script setup lang="tsx">
import { css } from '../../styled-system/css'
import GameHeader from '../components/ui/GameHeader.vue'
import GameBoard from '../components/ui/GameBoard.vue'
</script>

<template>
  <div
    :class="
      css({
        display: 'flex',
        h: '100vh',
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
    </div>
  </div>
</template>
