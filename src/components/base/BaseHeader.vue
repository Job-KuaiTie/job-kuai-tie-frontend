<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="flex flex-row justify-center bg-primary-300 p-2">
    <nav class="flex flex-row justify-between w-screen mx-4 max-w-5xl">
      <RouterLink to="/" class="hover:bg-inherit">
        <img alt="Tangjuan logo" class="logo" src="@/assets/logo_vertical.svg" width="125" height="125" />
      </RouterLink>
      <section class="flex flex-row items-center">
        <div class="p-2">
          <RouterLink to="/login" class="font-medium text-xl text-stone-900 font-title mx-3">登入</RouterLink>
          <RouterLink to="/signup" class="font-medium text-xl text-stone-900 font-title mx-3">註冊</RouterLink>
        </div>
      </section>
    </nav>
  </header>
</template>

<style scoped></style>
