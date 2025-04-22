// src/stores/flashMessageStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFlashMessageStore = defineStore('flashMessage', () => {
  const message = ref<string | null>(null) // Current flash message
  const type = ref<'error' | 'success' | 'info' | 'warn' | 'secondary' | 'contrast'>('success')

  const setFlashMessage = (msg: string, msgType: 'error' | 'success' | 'info') => {
    message.value = msg
    type.value = msgType

    // Automatically clear the message after 5 seconds
    setTimeout(() => {
      clearFlashMessage()
    }, 5000)
  }

  const clearFlashMessage = () => {
    message.value = null
    type.value = 'success'
  }

  return {
    message,
    type,
    setFlashMessage,
    clearFlashMessage,
  }
})
