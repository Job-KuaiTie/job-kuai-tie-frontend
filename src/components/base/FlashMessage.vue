<script setup lang="ts">
import { useFlashMessageStore } from '@/stores/flashMessageStore'

const flashMessageStore = useFlashMessageStore()
</script>

<template>
  <div class="flex flex-row justify-center">
    <Message
      v-if="flashMessageStore.message"
      :severity="flashMessageStore.type"
      class="w-[448px] text-title"
      >{{ flashMessageStore.message }}</Message
    >
  </div>
</template>

<style scoped></style>
