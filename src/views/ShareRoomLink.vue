<script setup lang="ts">
import { css } from '../../styled-system/css'
import { vstack } from '../../styled-system/patterns'
import GameLogo from '../components/GameLogo.vue'
import Copy from '../components/icons/Copy.vue'
import Copied from '../components/icons/Copied.vue'
import Button from '../components/ui/button/Button.vue'
import { useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import { useGameUtility } from '@/stores/gameUtility'
import { ref, computed } from 'vue'

const router = useRouter()
const source = ref('Hello')
const { text, copy, copied, isSupported } = useClipboard({ source })

const roomId = computed(() => useGameUtility().generateRoomId())
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
            h: '12rem',
            bg: 'darkNavy.100',
            boxShadow: '0px -8px 0px 0px #10212A inset',
            borderRadius: '0.938rem',
            p: '6',
            mb: '2.5rem',
          })
        "
      >
        <p
          :class="
            css({
              fontSize: 'heading.xs',
              textAlign: 'center',
              color: 'sliver.100',
              fontWeight: 'bold',
            })
          "
        >
          YOUR ROOM LINK
        </p>
        <div
          :class="
            css({
              width: 'min(25.75rem, 100%)',
              bg: 'darkNavy.200',
              borderRadius: '0.625rem',
              marginTop: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: '1rem',
            })
          "
        >
          <div
            :class="
              css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                bg: 'darkNavy.100',
                borderRadius: '0.625rem',
                p: '0.5rem',
                w: '100%',
              })
            "
          >
            <p
              :class="
                css({
                  fontSize: 'heading.xs',
                  textAlign: 'center',
                  color: 'sliver.200',
                  fontWeight: 'bold',
                })
              "
            >
              {{ roomId }}
            </p>
            <Transition
              mode="out-in"
              name="fade"
              :class="
                css({ display: 'flex', alignItems: 'center', gap: '0.5rem' })
              "
            >
              <button
                :disabled="!isSupported"
                :style="
                  isSupported
                    ? 'cursor: pointer'
                    : 'cursor: not-allowed; opacity: 0.5'
                "
                type="button"
                v-if="!copied"
                @click="() => (isSupported ? copy(roomId) : null)"
              >
                <Copy />
              </button>

              <button type="button" v-else style="cursor: default">
                <Copied />
              </button>
            </Transition>
          </div>
        </div>
        <p style="color: #dbe8ed; font-size: 0.75rem" v-if="copied">
          Room Link Copied
        </p>
        <p style="color: #dbe8ed; font-size: 0.75rem" v-if="!isSupported">
          Your browser does not support Clipboard API
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
        @click="() => router.push('/waiting-room/' + roomId)"
        visual="secondary"
        size="lg"
        :disabled="!text && !copied"
      >
        {{ text ? 'Start Game' : 'Copy Room Link' }}
      </Button>
      <Button @click="() => router.push('/')" visual="silver" size="lg">
        BACK TO MENU
      </Button>
    </div>
  </div>
</template>
