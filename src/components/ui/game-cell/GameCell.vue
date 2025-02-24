<script setup lang="ts">
import { css } from '../../../../styled-system/css'
import { Icon } from '@iconify/vue'
import { computed, ref, markRaw } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { storeToRefs } from 'pinia'
import { PlayerType } from '../../../types'
import { useElementHover } from '@vueuse/core'
import { useGameState } from '@/stores/gameState'
import CircleOutlined from '@/components/icons/CircleOutlined.vue'
import CloseOutlined from '@/components/icons/CloseOutlined.vue'

const { findWinningPosition, winner } = storeToRefs(useGameStore())
const { playerOneMark } = storeToRefs(useGameState())

const props = defineProps<{
  value: string
  index: number
}>()

const hoverableCellElement = ref<HTMLElement | null>(null)
const isHovered = useElementHover(hoverableCellElement, {
  delayEnter: 600,
})

const icon = computed(() => {
  if (props.value === PlayerType.X) return 'fa:close'
  if (props.value === PlayerType.O) return 'fa6-solid:circle-dot'
  return ''
})

const iconColor = computed(() => {
  if (props.value === PlayerType.X) return 'primary.200'
  if (props.value === PlayerType.O) return 'secondary.200'
  return ''
})

const winningPositionClass = computed(() => {
  if (winner.value === PlayerType.X) {
    return {
      bg: 'primary.200',
      color: 'darkNavy.100',
      shadowColor: '0px -8px 0px 0px #118C87 inset',
    }
  }
  if (winner.value === PlayerType.O) {
    return {
      bg: 'secondary.200',
      color: 'darkNavy.100',
      shadowColor: '0px -8px 0px 0px #CC8B13 inset',
    }
  }
  return {
    bg: 'darkNavy.100',
    color: iconColor.value,
    shadowColor: '0px -8px 0px 0px #10212A inset',
  }
})

const hoverOutlinedIcon = computed(() => {
  return playerOneMark.value === PlayerType.X 
    ? markRaw(CloseOutlined) 
    : markRaw(CircleOutlined)
})
</script>

<template>
  <div
    role="button"
    ref="hoverableCellElement"
    :class="
      css({
        w: '100%',
        maxW: '8.75rem',
        aspectRatio: '1',
        bg: findWinningPosition?.includes(index)
          ? winningPositionClass.bg
          : 'darkNavy.100',
        borderRadius: '0.938rem',
        boxShadow: findWinningPosition?.includes(index)
          ? winningPositionClass.shadowColor
          : '0px -8px 0px 0px #10212A inset',
        _hover: {
          cursor: props.value ? 'default' : 'pointer',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })
    "
  >
    <Transition mode="out-in" name="slide-up">
      <div v-if="value">
        <Icon
          :class="
            css({
              w: { base: '2.5rem', sm: '4rem' },
              h: { base: '2.5rem', sm: '4rem' },
              aspectRatio: '1',
              color: findWinningPosition?.includes(index)
                ? winningPositionClass.color
                : iconColor,
            })
          "
          :icon="icon"
        />
      </div>
      <div v-else-if="!value && isHovered">
        <component
          :is="hoverOutlinedIcon"
          :class="
            css({
              w: { base: '2.5rem', sm: '4rem' },
              h: { base: '2.5rem', sm: '4rem' },
              aspectRatio: '1'
            })
          "
        />
      </div>
    </Transition>
  </div>
</template>
