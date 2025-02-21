import { defineStore } from 'pinia'
import {
  databases,
  realtime,
  GAMES_COLLECTION,
  DATABASE_ID,
} from '@/services/appwrite'
import { Query } from 'appwrite'
import { ref, type Ref } from 'vue'

// Defines the structure of a game state
interface GameState {
  roomId: string          // Unique identifier for the game room
  status: 'waiting' | 'ready' | 'finished'  // Current game status
  players: string[]       // Array of players in the game
  currentBoard: (string | null)[]  // Game board state
  currentPlayer: 'X' | 'O'         // Current player's turn
}

// Creates a Pinia store for managing multiplayer game state
export const useGameMultiplayer = defineStore('gameMultiplayer', () => {
  // Reactive references to track game state
  const gameId = ref<string | null>(null)        // Current game document ID
  const currentGame = ref<GameState | null>(null) // Current game state
  const unsubscribe: Ref<(() => void) | null> = ref(null) // Cleanup function for realtime subscription

  // Handles realtime updates from the database
  function handleGameUpdate(response: any) {
    if (response.events.includes('databases.*.collections.*.documents.*.update')) {
      const payload = response.payload
      currentGame.value = payload
    }
  }

  // Updates the game document in the database
  async function updateGame(updates: any) {
    if (!gameId.value) return

    try {
      await databases.updateDocument(
        DATABASE_ID,
        GAMES_COLLECTION,
        gameId.value,
        updates,
      )
    } catch (error) {
      console.error('Error updating game:', error)
    }
  }

  // Joins an existing game room
  async function joinGame(roomId: string) {
    try {
      // Query for games with matching roomId
      const games = await databases.listDocuments(
        DATABASE_ID,
        GAMES_COLLECTION,
        [Query.equal('roomId', roomId)],
      )

      if (games.documents.length > 0) {
        const game = games.documents[0]
        currentGame.value = game as unknown as GameState
        gameId.value = game.$id

        // Subscribe to realtime updates for this game
        unsubscribe.value = realtime.subscribe(
          [`databases.${DATABASE_ID}.collections.${GAMES_COLLECTION}.documents.${gameId.value}`],
          handleGameUpdate,
        )

        // If there's only one player, add second player and set status to ready
        if (game.players.length === 1) {
          await updateGame({
            players: [...game.players, 'player2'],
            status: 'ready',
          })
        }
      }
    } catch (error) {
      console.error('Error joining game:', error)
      throw error
    }
  }

  // Cleanup function to reset state and remove subscriptions
  function cleanup() {
    if (unsubscribe.value) {
      unsubscribe.value()
      unsubscribe.value = null
    }
    gameId.value = null
    currentGame.value = null
  }

  // Expose necessary functions and state
  return {
    currentGame,
    joinGame,
    cleanup,
    updateGame,
  }
})
