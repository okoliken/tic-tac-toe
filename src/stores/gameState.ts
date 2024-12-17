import  { PlayerType, type GameMode, type PlayerMark, type ISPLAYERORCOMPUTER } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameState = defineStore('gameState', () => {

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]
  
     const scores = ref({
        x: 0,
        o: 0,
        ties: 0,
      })
  
      const gameMode = ref<GameMode>('player')
      const playerOneMark = ref<PlayerMark>(PlayerType.X)
      const board = ref<string[]>(Array(9).fill(''))
      const currentPlayer = ref<PlayerMark | null>(playerOneMark.value)
      const gameStatus = ref<'playing' | 'won' | 'draw'>('playing')
      const winner = ref<PlayerMark | null>(null)
      const isGameInProgress = ref(false)
      const isPlayerOrComputer = ref<ISPLAYERORCOMPUTER>('')

    return {
        scores,
        gameMode,
        playerOneMark,
        board,
        currentPlayer,
        gameStatus,
        winner,
        isGameInProgress,
        WINNING_COMBINATIONS,
        isPlayerOrComputer
    }
})