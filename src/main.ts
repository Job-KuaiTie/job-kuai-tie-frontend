import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { MyPreset } from './primevue/preset' // Import from preset.ts
import { useAuthStore } from '@/stores/authStore'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

// Load the token from localStorage when the app starts
const authStore = useAuthStore()
authStore.loadTokenFromStorage()

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
})
app.mount('#app')
