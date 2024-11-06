import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  const modalType = ref<'win' | 'draw' | 'restart'>('win')

  const showModal = (type: 'win' | 'draw' | 'restart') => {
    modalType.value = type
    isOpen.value = true
  }

  const hideModal = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    modalType,
    showModal,
    hideModal
  }
}) 
