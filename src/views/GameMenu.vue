<script setup lang="ts">
import { css } from '../../styled-system/css'
import { vstack } from '../../styled-system/patterns'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import Button from '../components/ui/button/Button.vue'
import GameLogo from '../components/GameLogo.vue'
import { useGameStore } from '@/stores/gameStore'

const activeButton = ref('X')
const router = useRouter()
const gameStore = useGameStore()

const handleNavigation = (mode: 'cpu' | 'player') => {
  gameStore.initGame(mode, activeButton.value as 'X' | 'O')
  router.push('/game')
}
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
    <GameLogo :class="css({ marginBottom: '2.5rem' })" />

    <div :class="vstack({ gap: '2.5rem', alignItems: 'center', w: '100%' })">
      <div
        :class="
          css({
            w: 'min(28.75rem, 100%)',
            h: '12.813rem',
            bg: 'darkNavy.100',
            boxShadow: '0px -8px 0px 0px #10212A inset',
            borderRadius: '0.938rem',
            p: '6',
          })
        "
      >
        <div
          :class="
            vstack({
              gap: '2',
              alignItems: 'center',
              justify: 'space-between',
              h: '100%',
            })
          "
        >
          <h3
            :class="
              css({
                fontSize: 'heading.xs',
                textTransform: 'uppercase',
                color: 'sliver.100',
                textAlign: 'center',
                fontWeight: 'bold',
              })
            "
          >
            PICK PLAYER 1’S MARK
          </h3>

          <div
            :class="
              css({
                width: 'min(25.75rem, 100%)',
                height: 'min(17.438rem, 100%)',
                bg: 'darkNavy.200',
                borderRadius: '0.625rem',
                marginTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: '0.5rem',
              })
            "
          >
            <button
              @click="activeButton = 'X'"
              :class="
                css({
                  flex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bg: activeButton === 'X' ? 'sliver.200' : 'transparent',
                  h: '3.375rem',
                  borderRadius: '0.625rem',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                })
              "
            >
              <Icon
                icon="fa:close"
                :class="
                  css({
                    w: '2rem',
                    h: '2rem',
                    color: activeButton === 'X' ? 'darkNavy.100' : 'sliver.200',
                    transition: 'all 0.2s ease-in-out',
                  })
                "
              />
            </button>
            <button
              @click="activeButton = 'O'"
              :class="
                css({
                  flex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bg: activeButton === 'O' ? 'sliver.200' : 'transparent',
                  h: '3.375rem',
                  borderRadius: '0.625rem',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                })
              "
            >
              <Icon
                icon="fa6-solid:circle-dot"
                :class="
                  css({
                    w: '2rem',
                    h: '2rem',
                    color: activeButton === 'O' ? 'darkNavy.100' : 'sliver.200',
                    transition: 'all 0.2s ease-in-out',
                  })
                "
              />
            </button>
          </div>

          <p
            :class="
              css({
                fontSize: 'heading.xxs',
                textAlign: 'center',
                color: 'sliver.200',
                textTransform: 'uppercase',
                letterSpacing: '0.055rem',
                opacity: '0.5',
              })
            "
          >
            REMEMBER : X GOES FIRST
          </p>
        </div>
      </div>
      <div
        :class="
          vstack({
            gap: '1.25rem',
            alignItems: 'center',
            flexDirection: 'column',
            w: '100%',
          })
        "
      >
        <Button
          @click="() => handleNavigation('cpu')"
          visual="secondary"
          size="lg"
        >
          NEW GAME (VS CPU)
        </Button>
        <Button
          @click="() => handleNavigation('player')"
          visual="primary"
          size="lg"
        >
          NEW GAME (VS PLAYER)
        </Button>
      </div>
    </div>
  </div>
</template>
