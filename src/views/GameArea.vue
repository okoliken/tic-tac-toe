<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { css } from '../../styled-system/css'
import GameHeader from '../components/ui/GameHeader.vue'
import GameBoard from '../components/ui/GameBoard.vue'
import ScoreBoard from '../components/ui/ScoreBoard.vue'
import GameModal from '../components/GameModal.vue'
import Button from '../components/ui/button/Button.vue'
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
    <GameModal>
      <template #header>
        <div>
          <p
            :class="
              css({
                fontSize: 'heading.sm',
                marginBottom: '1.438rem',
                color: 'sliver.200',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              })
            "
          >
            PLAYER 1 WINS!
          </p>
        </div>

        <div
          :class="
            css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1.938rem',
            })
          "
        >
          <Icon
            :class="css({ w: '4rem', h: '4rem', color: 'secondary.200' })"
            icon="fa6-solid:circle-dot"
          />
          <h2
            :class="
              css({
                fontSize: 'heading.lg',
                color: 'secondary.200',
                fontWeight: 'bold'
              })
            "
          >
            TAKES THE ROUND
          </h2>
        </div>
      </template>
      <template #footer>
        <div
          :class="
            css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            })
          "
        >
          <Button
            :class="
              css({
                w: '4.75rem!',
                boxShadow: '0px -4px 0px 0px #6B8997 inset!',
                fontSize: 'heading.xs',
                borderRadius: '0.625rem!',
              })
            "
            visual="silver"
            size="sm"
            >QUIT</Button
          >
          <Button
            :class="
              css({
                w: '9.125rem!',
                boxShadow: '0px -4px 0px 0px #CC8B13 inset!',
                fontSize: 'heading.xs',
                borderRadius: '0.625rem!',
              })
            "
            visual="secondary"
            size="sm"
            >NEXT ROUND</Button
          >
        </div>
      </template>
    </GameModal>
  </div>
</template>
