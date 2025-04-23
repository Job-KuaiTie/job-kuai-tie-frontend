<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useFlashMessageStore } from '@/stores/flashMessageStore'

const authStore = useAuthStore()
const router = useRouter()
const flashMessageStore = useFlashMessageStore()

const logout = () => {
  authStore.logout() // Remove token from store and localStorage
  router.push('/') // Redirect to home page
  flashMessageStore.setFlashMessage('登出成功，下次見！', 'info')
}
const isLoggedIn = computed(() => !!authStore.token)
</script>

<template>
  <header class="flex flex-row justify-center bg-primary-50 p-4 border-b-2 border-amber-200">
    <nav class="flex flex-row justify-between w-screen mx-4 max-w-5xl">
      <RouterLink to="/" class="hover:bg-inherit">
        <img
          alt="Job KuaiTei logo"
          class="logo"
          src="@/assets/logo_vertical.svg"
          width="220"
          height="220"
        />
      </RouterLink>
      <section class="flex flex-row items-center">
        <div class="p-2">
          <div v-if="!isLoggedIn">
            <RouterLink to="/login" class="font-medium text-xl text-primary-400 font-title mx-3"
              >登入</RouterLink
            >
            <RouterLink to="/signup" class="font-medium text-xl text-primary-400 font-title mx-3"
              >註冊</RouterLink
            >
          </div>
          <div v-else>
            <RouterLink to="/jobs" class="font-medium text-xl text-primary-400 font-title mx-3">
              <i class="pi pi-briefcase text-lg mr-1" />
              職缺
            </RouterLink>

            <RouterLink
              to="/companies"
              class="font-medium text-xl text-primary-400 font-title mx-3"
            >
              <i class="pi pi-building text-lg mr-1" />

              公司</RouterLink
            >
            <RouterLink
              to="/categories"
              class="font-medium text-xl text-primary-400 font-title mx-3"
            >
              <i class="pi pi-tags text-lg mr-1" />
              類別</RouterLink
            >
            <button
              @click="logout"
              class="ml-8 font-medium text-xl text-primary-400 font-title mx-3"
            >
              登出
            </button>
          </div>
        </div>
      </section>
    </nav>
  </header>
</template>

<style scoped></style>
