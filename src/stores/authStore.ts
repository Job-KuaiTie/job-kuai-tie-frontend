import { defineStore } from 'pinia'
import { ref } from 'vue'
// import api from '@/utils/axios' // Your custom axios instance

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)

  function setToken(newToken: string) {
    token.value = newToken
    // api.setAuthToken(newToken)
    localStorage.setItem('authToken', newToken)
  }

  function loadTokenFromStorage() {
    const saved = localStorage.getItem('authToken')
    if (saved) {
      token.value = saved
      // api.setAuthToken(saved)
    }
  }

  function logout() {
    token.value = null
    // api.setAuthToken(null)
    localStorage.removeItem('authToken')
  }

  return { token, setToken, loadTokenFromStorage, logout }
})
