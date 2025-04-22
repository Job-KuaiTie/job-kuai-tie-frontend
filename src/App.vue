<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from '@/components/base/BaseHeader.vue'
import BaseFooter from '@/components/base/BaseFooter.vue'
import FlashMessage from '@/components/base/FlashMessage.vue'
</script>

<template>
  <BaseHeader />
  <main class="flex flex-col items-center py-4 bg-stone-50 flex-1">
    <FlashMessage />
    <RouterView />
  </main>
  <BaseFooter />
</template>

<style scoped></style>
