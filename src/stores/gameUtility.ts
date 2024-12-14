import { defineStore } from "pinia";
import { useRouter } from 'vue-router'
import { useModalStore } from './modalStore'
import { useGameState } from './gameState'
import { storeToRefs } from 'pinia'
import { PlayerType } from "@/types";
import { computed } from "vue";

export const useGameUtility = defineStore("gameutility", () => {
    const router = useRouter()
    const modalStore = useModalStore()

    const { scores, gameMode, playerOneMark, board, currentPlayer, gameStatus, winner, isGameInProgress } = storeToRefs(useGameState())


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
        isGameInProgress.value = false
    }

    const updateScores = () => {
        if (gameStatus.value === 'won') {
            if (winner.value === PlayerType.X) scores.value.x++
            else scores.value.o++
        } else if (gameStatus.value === 'draw') {
            scores.value.ties++
        }
    }


    const checkWinner = computed(() => {
        return useGameState().WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return board.value[index] === currentPlayer.value
            })
        })
    })

    const winnerMessage = computed(() => {
        if (gameStatus.value !== 'won') return ''

        if (gameMode.value === 'cpu') {
            return winner.value === playerOneMark.value
                ? 'YOU WON!'
                : 'OH NO, YOU LOST...'
        }

        return `PLAYER ${winner.value === playerOneMark.value ? '1' : '2'} WINS!`
    })

    const findWinningPosition = computed(() => {
        return useGameState().WINNING_COMBINATIONS.find(combination => {
            return combination.every(
                index => board.value[index] === currentPlayer.value,
            )
        })
    })

    const quitGame = () => {
        modalStore.hideModal()
        resetGame()
        router.push('/')
    }

    return {
        quitGame,
        updateScores,
        resetGame,
        checkWinner,
        checkDraw: computed(() => board.value.every(cell => cell !== '')),
        winnerMessage,
        findWinningPosition
    }
})

