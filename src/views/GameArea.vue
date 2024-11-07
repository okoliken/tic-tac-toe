<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { useModalStore } from '@/stores/modalStore'
import { Icon } from '@iconify/vue'
import { css } from '../../styled-system/css'
import GameHeader from '../components/ui/GameHeader.vue'
import GameBoard from '../components/ui/GameBoard.vue'
import ScoreBoard from '../components/ui/ScoreBoard.vue'
import GameModal from '../components/GameModal.vue'
import Button from '../components/ui/button/Button.vue'

const gameStore = useGameStore()
const modalStore = useModalStore()
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

    <GameModal :is-open="modalStore.isOpen">
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
            {{ gameStore.winnerMessage }}
          </p>
        </div>

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
          <Icon
            v-if="modalStore.modalType !== 'draw' && modalStore.modalType !== 'restart'"
            :class="
              css({
                w: { base: '1.75rem', lg: '4rem' },
                h: { base: '1.75rem', lg: '4rem' },
                color:
                  gameStore.winner === 'X' ? 'primary.200' : 'secondary.200',
              })
            "
            :icon="
              gameStore.winner === 'X' ? 'fa:close' : 'fa6-solid:circle-dot'
            "
          />
          <h2
            v-if="modalStore.modalType !== 'draw' && modalStore.modalType !== 'restart'"
            :class="
              css({
                fontSize: { lg: 'heading.lg', base: 'heading.md' },
                color:
                  gameStore.winner === 'X' ? 'primary.200' : 'secondary.200',
                fontWeight: 'bold',
              })
            "
          >
            TAKES THE ROUND
          </h2>
          <h2
            v-if="modalStore.modalType === 'draw'"
            :class="
              css({
                fontSize: { lg: 'heading.lg', base: 'heading.md' },
                color: 'sliver.200',
                fontWeight: 'bold',
              })
            "
          >
            ROUND TIED
          </h2>
          <h2
            v-if="modalStore.modalType === 'restart'"
            :class="
              css({
                fontSize: { lg: 'heading.lg', base: 'heading.md' },
                color: 'sliver.200',
                fontWeight: 'bold',
              })
            "
          >
            RESTART GAME?
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
            v-if="modalStore.modalType !== 'restart'"
            @click="gameStore.quitGame"
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
            v-if="modalStore.modalType !== 'restart'"
            @click="gameStore.nextRound"
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
          <Button
            v-if="modalStore.modalType === 'restart'"
            @click="modalStore.hideModal"
            :class="
              css({
                w: '9.125rem!',
                boxShadow: '0px -4px 0px 0px #6B8997 inset!',
                fontSize: 'heading.xs',
                borderRadius: '0.625rem!',
              })
            "
            visual="silver"
            size="sm"
            >NO, CANCEL</Button
          >
          <Button
            v-if="modalStore.modalType === 'restart'"
            @click="gameStore.resetGame"
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
            >YES, RESTART</Button
          >
        </div>
      </template>
    </GameModal>
  </div>
</template>
