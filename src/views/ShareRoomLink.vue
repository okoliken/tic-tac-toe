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
import type { MultiplerGameMode } from '@/types'
import {
  databases,
  realtime,
  GAMES_COLLECTION,
  DATABASE_ID,
} from '@/services/appwrite'
import { ID } from 'appwrite'
import { toast } from 'vue-sonner'
import { ToastMessage } from '@/constants/toast'

const router = useRouter()
const { text, copy, copied, isSupported } = useClipboard()

const roomId = computed(() => useGameUtility().generateRoomId())

const getJoinGameUrl = computed(() => 
  `${window.location.origin}/join-game/${roomId.value}`
)

const createGame = async () => {
  try {
    await databases.createDocument(DATABASE_ID, GAMES_COLLECTION, ID.unique(), {
      roomId: roomId.value,
      status: 'waiting',
      players: ['P1'],
      currentBoard: Array(9).fill(null),
      currentPlayer: 'X',
    })
    toast.success(ToastMessage.GAME_CREATED, {
      style: {
        background: '#65E9E4',
        border: 'none',
        color: '#DBE8ED',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '1rem',
        fontWeight: '500',
        boxShadow: '0px -8px 0px 0px #31C3BD inset',
      },
    })
    router.push('/waiting-room/' + roomId.value)
  } catch (error) {
    toast.error(ToastMessage.GAME_CREATE_ERROR)
  }
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
                @click="() => (isSupported ? copy(getJoinGameUrl) : null)"
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
        @click="createGame"
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
