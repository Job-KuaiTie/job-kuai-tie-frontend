<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')

// Check if email exists in sessionStorage
const checkEmail = () => {
  const emailFromSession = sessionStorage.getItem('registration_email')

  if (emailFromSession) {
    email.value = emailFromSession
  } else {
    // Redirect to homepage if email is not found
    router.push({ name: 'home' })
  }
}

// Run this logic after component mounts
onMounted(() => {
  checkEmail()
})
</script>

<template>
  <div class="flex flex-col justify-between gap-y-4 w-[448px] border-yellow-300 border-2 bg-yellow-50 p-6 m-8 rounded">
    <h1 class="text-title text-xl">
      註冊驗證信已經寄出
    </h1>
    <div>
      您的註冊驗證信件已經寄到 {{ email }}，請至該信箱查看註冊驗證信件，以完成註冊。
    </div>
  </div>
</template>

<style scoped></style>
