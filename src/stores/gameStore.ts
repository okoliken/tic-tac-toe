import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useModalStore } from './modalStore'

type GameMode = 'cpu' | 'player'
type PlayerMark = 'X' | 'O'

export const useGameStore = defineStore('game', () => {
  const router = useRouter()
  const modalStore = useModalStore()

  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  // Game Score
  const scores = ref({
    x: 0,
    o: 0,
    ties: 0
  })

  // Game configuration
  const gameMode = ref<GameMode>('player')
  const playerOneMark = ref<PlayerMark>('X')
  const board = ref<string[]>(Array(9).fill(''))
  const currentPlayer = ref<PlayerMark>('X')
  const gameStatus = ref<'playing' | 'won' | 'draw'>('playing')
  const winner = ref<PlayerMark | null>(null)


  const checkWinner = computed(() => {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return board.value[index] === currentPlayer.value
      })
    })
  })

  const checkDraw = computed(() => {
    return board.value.every(cell => cell !== '')
  })


  const initGame = (mode: GameMode, mark: PlayerMark) => {
    gameMode.value = mode
    playerOneMark.value = mark
    resetGame()
  }

  // Computed Properties
  const winnerMessage = computed(() => {
    if (gameStatus.value !== 'won') return ''

    if (gameMode.value === 'cpu') {
      return winner.value === playerOneMark.value ? 'YOU WON!' : 'OH NO, YOU LOST...'
    }

    return `PLAYER ${winner.value === playerOneMark.value ? '1' : '2'} WINS!`
  })

  // Actions
  const quitGame = () => {
    modalStore.hideModal()
    resetGame()
    router.push('/')
  }

  const nextRound = () => {
    modalStore.hideModal()
    board.value = Array(9).fill('')
    currentPlayer.value = 'X'
    gameStatus.value = 'playing'
    winner.value = null
  }

  const makeMove = async (index: number) => {
    if (board.value[index] || gameStatus.value !== 'playing') return
    if (gameMode.value === 'cpu' && currentPlayer.value !== playerOneMark.value) return

    placeMark(index)

    // Check game end conditions
    if (gameStatus.value !== 'playing') {
      updateScores()
      modalStore.showModal(gameStatus.value === 'won' ? 'win' : 'draw')
      return
    }

    // Handle CPU turn
    if (gameMode.value === 'cpu' && gameStatus.value === 'playing') {
      await makeCPUMove()
      if (gameStatus.value !== 'playing') {
        updateScores()
        modalStore.showModal(gameStatus.value === 'won' ? 'win' : 'draw')
      }
    }
  }

  // Helper function to place a mark
  const placeMark = (index: number) => {
    board.value[index] = currentPlayer.value

    if (checkWinner.value) {
      gameStatus.value = 'won'
      winner.value = currentPlayer.value
      return
    }

    if (checkDraw.value) {
      gameStatus.value = 'draw'
      return
    }

    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }

  // Simple CPU move - can be made smarter later
  const makeCPUMove = async () => {
    // Add small delay to make it feel more natural
    await new Promise(resolve => setTimeout(resolve, 500))

    const emptySpots = board.value
      .map((cell, index) => cell === '' ? index : -1)
      .filter(index => index !== -1)

    if (emptySpots.length > 0) {
      const randomIndex = emptySpots[Math.floor(Math.random() * emptySpots.length)]
      placeMark(randomIndex)
    }
  }

  const updateScores = () => {
    if (gameStatus.value === 'won') {
      if (winner.value === 'X') scores.value.x++; else scores.value.o++;
    } else if (gameStatus.value === 'draw') {
      scores.value.ties++
    }
  }

  const resetGame = () => {
    board.value = Array(9).fill('')
    currentPlayer.value = 'X'
    gameStatus.value = 'playing'
    winner.value = null
  }

  return {
    // State
    scores,
    gameMode,
    playerOneMark,
    board,
    currentPlayer,
    gameStatus,
    winner,

    // Computed
    winnerMessage,

    // Actions
    quitGame,
    nextRound,
    makeMove,
    initGame,
    resetGame
  }
})