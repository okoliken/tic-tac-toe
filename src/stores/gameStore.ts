import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useModalStore } from './modalStore'
import  { type GameMode, type PlayerMark, PlayerType } from '../types'

export const useGameStore = defineStore(
  'game',
  () => {
    const router = useRouter()
    const modalStore = useModalStore()

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

    // Game Score
    const scores = ref({
      x: 0,
      o: 0,
      ties: 0,
    })

    // Game configuration
    const gameMode = ref<GameMode>('player')
    const playerOneMark = ref<PlayerMark>(PlayerType.X)
    const board = ref<string[]>(Array(9).fill(''))
    const currentPlayer = ref<PlayerMark>(PlayerType.X)
    const gameStatus = ref<'playing' | 'won' | 'draw'>('playing')
    const winner = ref<PlayerMark | null>(null)
    const isGameInProgress = ref(false)

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
        return winner.value === playerOneMark.value
          ? 'YOU WON!'
          : 'OH NO, YOU LOST...'
      }

      return `PLAYER ${winner.value === playerOneMark.value ? '1' : '2'} WINS!`
    })

    // find winning position used for cpu move
    const findWinningPosition = computed(() => {
      return WINNING_COMBINATIONS.find(combination => {
        return combination.every(
          index => board.value[index] === currentPlayer.value,
        )
      })
    })

    // Actions
    const quitGame = () => {
      modalStore.hideModal()
      resetGame()
      router.push('/')
    }

    const nextRound = async () => {
      modalStore.hideModal()
      board.value = Array(9).fill('')

      // Reset the current player based on the game mode
      if (gameMode.value === 'cpu') {
        // If the computer lost the previous round, it should go first
        if (winner.value === playerOneMark.value) {
          currentPlayer.value = PlayerType.O
          await makeCPUMove()
        } else {
          currentPlayer.value = PlayerType.X
        }
      } else {
        // For player vs player mode, always start with player 1's mark
        currentPlayer.value = playerOneMark.value
      }

      gameStatus.value = 'playing'
      winner.value = null
    }

    const makeMove = async (index: number) => {
      if (board.value[index] || gameStatus.value !== 'playing') return
      if (
        gameMode.value === 'cpu' &&
        currentPlayer.value !== playerOneMark.value
      )
        return

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
      isGameInProgress.value = true

      if (checkWinner.value) {
        gameStatus.value = 'won'
        winner.value = currentPlayer.value
        return
      }

      if (checkDraw.value) {
        gameStatus.value = 'draw'
        return
      }

      currentPlayer.value = currentPlayer.value === PlayerType.X ? PlayerType.O : PlayerType.X
    }

    // Improved CPU move logic
    const makeCPUMove = async () => {
      // Add small delay to make it feel more natural
      await new Promise(resolve => setTimeout(resolve, 800))

      // Check if CPU can win on the next move
      const winningMove = findWinningMove(currentPlayer.value)
      if (winningMove !== -1) {
        placeMark(winningMove)
        return
      }

      // Check if player can win on the next move and block them
      const blockingMove = findWinningMove(playerOneMark.value)
      if (blockingMove !== -1) {
        placeMark(blockingMove)
        return
      }

      // If no winning or blocking move, make a random move
      const emptySpots = board.value
        .map((cell, index) => (cell === '' ? index : -1))
        .filter(index => index !== -1)

      if (emptySpots.length > 0) {
        const randomIndex =
          emptySpots[Math.floor(Math.random() * emptySpots.length)]
        placeMark(randomIndex)
      }
    }

    // Helper function to find a winning move
    const findWinningMove = (mark: PlayerMark) => {
      for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i]
        if (
          board.value[a] === mark &&
          board.value[b] === mark &&
          board.value[c] === ''
        ) {
          return c
        }
        if (
          board.value[a] === mark &&
          board.value[b] === '' &&
          board.value[c] === mark
        ) {
          return b
        }
        if (
          board.value[a] === '' &&
          board.value[b] === mark &&
          board.value[c] === mark
        ) {
          return a
        }
      }
      return -1
    }

    const updateScores = () => {
      if (gameStatus.value === 'won') {
        if (winner.value === PlayerType.X) scores.value.x++
        else scores.value.o++
      } else if (gameStatus.value === 'draw') {
        scores.value.ties++
      }
    }

    const resetGame = () => {
      board.value = Array(9).fill('')
      currentPlayer.value = playerOneMark.value
      gameStatus.value = 'playing'
      winner.value = null
      scores.value = {
        x: 0,
        o: 0,
        ties: 0,
      }
      modalStore.hideModal()
      // reset the game in progress flag
      isGameInProgress.value = false
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
      resetGame,
      isGameInProgress,
      checkWinner,
      findWinningPosition,
    }
  },
  {
    persist: {
      key: 'game-state',
      storage: localStorage
    },
  },
)
