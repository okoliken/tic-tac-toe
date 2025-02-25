import { defineStore } from "pinia";
import { useRouter } from 'vue-router'
import { useModalStore } from './modalStore'
import { useGameState } from './gameState'
import { storeToRefs } from 'pinia'
import { computed } from "vue";

export const useGameUtility = defineStore("gameutility", () => {
    const router = useRouter()
    const modalStore = useModalStore()

    const { scores, gameMode, playerOneMark, board, currentPlayer, gameStatus, winner, isGameInProgress } = storeToRefs(useGameState())

    //   this function resets the game
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
    //   this function updates the scores
    const updateScores = () => {
        if (gameStatus.value === 'won') {
            if (winner.value === playerOneMark.value) scores.value.x++
            else scores.value.o++
        } else if (gameStatus.value === 'draw') {
            scores.value.ties++
        }
    }

    //  utility function to check if there is a winner
    const checkWinner = computed(() => {
        return useGameState().WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return board.value[index] === currentPlayer.value
            })
        })
    })
    

    // utility function to display game status message
    const winnerMessage = computed(() => {
        if (gameStatus.value !== 'won') return ''

        if (gameMode.value === 'cpu') {
            return winner.value === playerOneMark.value
                ? 'YOU WON!'
                : 'OH NO, YOU LOST...'
        }

        return `PLAYER ${winner.value === playerOneMark.value ? '1' : '2'} WINS!`
    })

    // utility function to find the winning position - this is used to highlight the winning position i.e green or orange hehehe
    const findWinningPosition = computed(() => {
        return useGameState().WINNING_COMBINATIONS.find(combination => {
            return combination.every(
                index => board.value[index] === currentPlayer.value,
            )
        })
    })

    // this function resets and quits the game
    const quitGame = () => {
        modalStore.hideModal()
        resetGame()
        router.push('/')
    }
    // this function generates a random room id
    const generateRoomId = () => {
        const timestamp = Date.now().toString(36)
        const randomStr = Math.random().toString(36).substring(2, 7)
        return `room-id-${timestamp}-${randomStr}`
    }

    return {
        quitGame,
        updateScores,
        resetGame,
        checkWinner,
        checkDraw: computed(() => board.value.every(cell => cell !== '')),
        winnerMessage,
        findWinningPosition,
        generateRoomId
    }
})

