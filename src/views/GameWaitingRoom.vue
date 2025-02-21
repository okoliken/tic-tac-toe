<script setup lang="ts">
import { css } from '../../styled-system/css'
import GameLogo from '../components/GameLogo.vue'
import GameLoader from '../components/ui/Loader.vue'
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { databases, realtime, GAMES_COLLECTION, DATABASE_ID } from '@/services/appwrite'
import { Query } from 'appwrite'
import { computed } from 'vue'
import { toast } from 'vue-sonner'

const route = useRoute()
const router = useRouter()
const roomId = route.params.roomId as string
const isJoining = computed(() => route.path.includes('join-game'))

let unsubscribe: () => void

onMounted(async () => {
  try {
    // Find the game document
    const games = await databases.listDocuments(
      DATABASE_ID,
      GAMES_COLLECTION,
      [Query.equal('roomId', roomId)]
    )

    if (games.documents.length === 0) {
      router.push('/')
      return
    }

    const game = games.documents[0]

    // If this is a joining player
    if (isJoining.value) {
      // Validate game isn't full and player 2 hasn't joined yet
      if (game.players && (game.players.length >= 2 || game.players.includes('P2'))) {
        toast.error('Game is full or player already joined')
        router.push('/')
        return
      }

      // Add player 2
      try {
        await databases.updateDocument(
          DATABASE_ID,
          GAMES_COLLECTION,
          game.$id,
          {
            players: ['P1', 'P2'],
            status: 'ready'
          }
        )
        toast.success('Successfully joined the game!')
      } catch (error) {
        toast.error('Failed to join the game')
        router.push('/')
      }
    }

    // Both players subscribe to game updates
    unsubscribe = realtime.subscribe([
      `databases.${DATABASE_ID}.collections.${GAMES_COLLECTION}.documents`,
    ], (response) => {
      if (response.events.includes('databases.*.collections.*.documents.*.update')) {
        const payload = response.payload as { roomId: string; status: string }
        if (payload.roomId === roomId && payload.status === 'ready') {
          router.push('/game')
        }
      }
    })
  } catch (error) {
    console.error('Error in waiting room:', error)
    router.push('/')
  }
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          w: '100%',
          gap: '2.5rem',
        })
      "
    >
      <GameLogo />
      <p
        :class="
          css({
            fontSize: 'heading.sm',
            color: 'sliver.200',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'center',
          })
        "
      >
        WAITING FOR PLAYER 2 ...
      </p>
      <GameLoader />
    </div>
  </div>
</template>
