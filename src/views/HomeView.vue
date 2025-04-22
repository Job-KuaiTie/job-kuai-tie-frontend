<script setup lang="ts">
import HomeViewBanner from '@/views/HomeViewBanner.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div class="flex flex-col gap-y-6">
    <div v-if="!authStore.token">
      <section class="max-w-6xl mt-4">
        <HomeViewBanner />
      </section>
    </div>
    <div v-else>
      <DashboardView />
    </div>
  </div>
</template>
