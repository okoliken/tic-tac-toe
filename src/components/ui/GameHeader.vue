<script setup lang="ts">
import { css } from '../../../styled-system/css'
import { Icon } from '@iconify/vue'
import GameLogo from '../GameLogo.vue'
import Button from './button/Button.vue'
import { useGameStore } from '@/stores/gameStore'
import { useModalStore } from '@/stores/modalStore'
import { storeToRefs } from 'pinia'
import { PlayerType } from '../../types'

const { currentPlayer, isGameInProgress } = storeToRefs(useGameStore())
const modalStore = useModalStore()

const openModal = () => {
  modalStore.showModal('restart')
}
</script>

<template>
  <div
    :class="
      css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        w: '100%',
        marginBottom: { base: '2rem', sm: '0' },
      })
    "
  >
    <GameLogo />
    <div
      :class="
        css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { base: '0.563rem', sm: '0.813rem' },
          bg: 'darkNavy.100',
          w: { base: '6rem', sm: 'min(8.75rem, 100%)' },
          h: { base: '2.5rem', sm: '3.25rem' },
          pt: '0.813rem',
          pb: '1.188rem',
          borderRadius: {base:'0.313rem', sm:'0.625rem'},
          boxShadow: '0px -4px 0px 0px #10212A inset',
        })
      "
    >
      <Transition mode="out-in" name="slide-up">
        <Icon
          v-if="currentPlayer === PlayerType.X"
          icon="fa:close"
          :class="
            css({
              w: '1.25rem',
              h: '1.25rem',
              color: 'sliver.200',
              transition: 'all 0.2s ease-in-out',
            })
          "
        />
        <Icon
          v-else
          icon="fa6-solid:circle-dot"
          :class="
            css({
              w: '1.25rem',
              h: '1.25rem',
              color: 'sliver.200',
              transition: 'all 0.2s ease-in-out',
            })
          "
        />
      </Transition>
      <p
        :class="
          css({
            fontSize: {base:'heading.xxs',sm:'heading.xs'},
            fontWeight: 'bold',
            color: 'sliver.200',
          })
        "
      >
        TURN
      </p>
    </div>

    <Button
      @click="() => isGameInProgress && openModal()"
      :class="
        css({
          width: { base: '2.5rem!', sm: '3.25rem!' },
          h: { base: '2.5rem!', sm: '3.25rem!' },
          borderRadius: { base: '0.313rem', sm: '0.625rem' },
          boxShadow: '0px -4px 0px 0px #6B8997 inset!',
          '&:active #icon-reset': {
            transform: 'rotate(120deg)',
          },
        })
      "
      visual="silver"
      render-icon-only
    >
      <svg
        id="icon-reset"
        :class="css({
          w: { base: '1rem', sm: '1.25rem' },
          h: { base: '1rem', sm: '1.25rem' },
          transition: 'transform 0.3s ease-in-out',
        })"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.5241 2.75843e-07H17.644C17.3812 -0.000279724 17.1679 0.21264 17.1676 0.47564C17.1676 0.48336 17.1678 0.49108 17.1681 0.4988L17.3268 3.78292C15.46 1.58176 12.7198 0.31428 9.83484 0.31744C4.41536 0.31748 -0.00395734 4.74324 2.65924e-06 10.1663C0.00396266 15.598 4.40584 20 9.83484 20C12.2702 20.0034 14.6195 19.0993 16.425 17.4639C16.6208 17.2885 16.6375 16.9874 16.4622 16.7915C16.4563 16.7849 16.4502 16.7785 16.444 16.7722L15.0957 15.423C14.9186 15.2459 14.6346 15.2363 14.4461 15.4012C11.5521 17.949 7.14188 17.6669 4.59564 14.7709C2.0494 11.875 2.3314 7.46188 5.22544 4.914C8.11948 2.36612 12.5297 2.64828 15.0759 5.54424C15.2755 5.77124 15.4601 6.01096 15.6287 6.26188L11.6024 6.06864C11.3398 6.05616 11.1169 6.25896 11.1044 6.52168C11.104 6.5294 11.1038 6.53712 11.1039 6.54484V8.4262C11.1039 8.6892 11.3169 8.9024 11.5798 8.9024H19.5242C19.787 8.9024 20 8.6892 20 8.4262V0.4762C20 0.2132 19.787 2.75843e-07 19.5241 2.75843e-07Z"
          fill="#1F3641"
        />
      </svg>
    </Button>
  </div>
</template>
