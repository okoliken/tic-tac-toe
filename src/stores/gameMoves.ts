import { defineStore } from 'pinia'
import { useGameState } from './gameState'
import { useGameUtility } from './gameUtility'
import { storeToRefs } from 'pinia'
import { PlayerType, type ISPLAYERORCOMPUTER, type PlayerMark } from "@/types";
import { useModalStore } from './modalStore';

export const useGameMoves = defineStore('gameMoves', () => {
    const { board, gameMode, playerOneMark, currentPlayer, gameStatus, winner, isGameInProgress, isPlayerOrComputer } = storeToRefs(useGameState())
    const { checkWinner, checkDraw } = storeToRefs(useGameUtility())
    const modalStore = useModalStore()

    const makeMove = async (index: number, player?: string) => {
        if (board.value[index] || gameStatus.value !== 'playing') return
        if (
            gameMode.value === 'cpu' &&
            currentPlayer.value !== playerOneMark.value
        )
            return

        isPlayerOrComputer.value = player as 'player' | 'computer' 
        placeMark(index)

        if (gameStatus.value !== 'playing') {
            useGameUtility().updateScores()
            setTimeout(() => {
                modalStore.showModal(gameStatus.value === 'won' ? 'win' : 'draw')
            }, 500)
            return
        }

        if (gameMode.value === 'cpu' && gameStatus.value === 'playing') {
            await makeCPUMove()
            if (gameStatus.value !== 'playing') {
                useGameUtility().updateScores()
                setTimeout(() => {
                    modalStore.showModal(gameStatus.value === 'won' ? 'win' : 'draw')
                }, 500)
            }
        }
    }

    const placeMark = (index: number) => {
        board.value[index] = currentPlayer.value as 'X' | 'O'
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


    const makeCPUMove = async () => {
        // Add small delay to make it feel more natural
        await new Promise(resolve => setTimeout(resolve, 800))
        isPlayerOrComputer.value = 'computer'

        // Check if CPU can win on the next move
        const winningMove = findWinningMove(currentPlayer.value as 'X' | 'O')
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

    const nextRound = async () => {
        modalStore.hideModal()
        board.value = Array(9).fill('')
  
        if (gameMode.value === 'cpu') {
          if (winner.value === PlayerType.O && playerOneMark.value === PlayerType.O) {
            currentPlayer.value = PlayerType.X
            await makeCPUMove()
          } else {
            if (playerOneMark.value === PlayerType.O && gameStatus.value === 'draw') {
                currentPlayer.value = PlayerType.X
                await makeCPUMove()
            }
            else{
                currentPlayer.value = PlayerType.O
                await makeCPUMove()
            }
          }
        } else {
          // For player vs player mode, always start with player 1's mark
          currentPlayer.value = playerOneMark.value
        }
  
        gameStatus.value = 'playing'
        winner.value = null
      }
      
    const findWinningMove = (mark: PlayerMark) => {
        for (let i = 0; i < useGameState().WINNING_COMBINATIONS.length; i++) {
            const [a, b, c] = useGameState().WINNING_COMBINATIONS[i]
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


    return {
        makeMove,
        findWinningMove,
        makeCPUMove,
        placeMark,
        nextRound
    }
})