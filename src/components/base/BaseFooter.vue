<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="flex flex-row justify-center bg-stone-100 p-4">
    <section class="flex flex-col w-[1024px] mt-2 text-sm">
      <div>
        <RouterLink to="/about" class="text-stone-900 hover:text-primary-400 font-title"
          >關於求職快貼</RouterLink
        >
      </div>
      <Divider />
      <div>
        <p class="font-title">© 2024 Tang Juan.</p>
      </div>
    </section>
  </footer>
</template>

<style scoped></style>
