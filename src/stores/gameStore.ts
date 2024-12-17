import { defineStore } from 'pinia'
import { useGameState } from './gameState'
import { useGameUtility } from './gameUtility'
import { useGameMoves } from './gameMoves'
import { storeToRefs } from 'pinia'
import  { type GameMode, type PlayerMark } from '../types'

export const useGameStore = defineStore(
  'game',
  () => {
    const {
      scores,
      gameMode,
      playerOneMark,
      board,
      currentPlayer,
      gameStatus,
      winner,
      isPlayerOrComputer,
      isGameInProgress
    } = storeToRefs(useGameState())

    const {
      checkWinner,
      winnerMessage,
      findWinningPosition,
    } = storeToRefs(useGameUtility())
    
    const initGame = (mode: GameMode, mark: PlayerMark) => {
      gameMode.value = mode
      playerOneMark.value = mark
      useGameUtility().resetGame()
    }

    return {
      //Game State
      scores,
      gameMode,
      isGameInProgress,
      playerOneMark,
      board,
      currentPlayer,
      gameStatus,
      winner,
      //Game Actions
      quitGame: useGameUtility().quitGame,
      nextRound: useGameMoves().nextRound,
      makeMove: useGameMoves().makeMove,
      initGame,
      resetGame: useGameUtility().resetGame,
      // Game Utility
      winnerMessage,
      checkWinner,
      isPlayerOrComputer,
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
