<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="flex flex-row justify-center bg-amber-100 p-4">
    <section class="flex flex-col w-[1024px] mt-2 text-sm">
      <div>
        <RouterLink to="/about" class="text-amber-900 hover:text-primary-400 font-title"
          >關於求職快貼</RouterLink
        >
      </div>
      <Divider class="border-t border-amber-300 my-4" />
      <div>
        <p class="font-title text-amber-900">© 2025 Job KuaiTie.</p>
      </div>
    </section>
  </footer>
</template>

<style scoped></style>
