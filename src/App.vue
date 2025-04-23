<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from '@/components/base/BaseHeader.vue'
import BaseFooter from '@/components/base/BaseFooter.vue'
import FlashMessage from '@/components/base/FlashMessage.vue'

import { onMounted } from 'vue'
import api from '@/utils/axios'

onMounted(() => {
  if (!sessionStorage.getItem('apiWarmed')) {
    api.get('/') // or your health check endpoint
      .then(() => {
        console.log('✅ API warmed up')
        sessionStorage.setItem('apiWarmed', 'true')
      })
      .catch((err) => {
        console.warn('⚠️ API warm-up failed', err)
      })
  }
})
</script>

<template>
  <BaseHeader />
  <main class="flex flex-col items-center py-4 bg-primary-50 flex-1">
    <FlashMessage />
    <RouterView />
  </main>
  <BaseFooter />
</template>

<style scoped></style>
