<style scoped></style>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFlashMessageStore } from '@/stores/flashMessageStore'
import { useAuthStore } from '@/stores/authStore'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string } from 'yup'
import api from '@/utils/axios'
import TextInputField from '@/components/form/TextInputField.vue'
import PasswordInputField from '@/components/form/PasswordInputField.vue'

const authStore = useAuthStore()
const router = useRouter()
const flashMessageStore = useFlashMessageStore()

// Define form schema and validation
interface LoginForm {
  email: string
  password: string
}

const { values, errors, handleSubmit, defineField, setFieldError } = useForm<LoginForm>({
  validationSchema: toTypedSchema(
    object({
      email: string().email('請輸入有效的電子信箱').required('電子信箱為必填欄位'),
      password: string().min(6, '密碼長度需至少 6 個字元').required('密碼為必填欄位'),
    }),
  ),
  initialValues: {
    email: '', // Default value
    password: '',
  },
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

// Handle form submission
const onSubmit = handleSubmit(async (formData) => {
  try {
    const params = new URLSearchParams()
    params.append('username', formData.email)
    params.append('password', formData.password)

    const data = await api.post<{ access_token: string }>('token', params);

    authStore.setToken(data.access_token)
    flashMessageStore.setFlashMessage('登入成功', 'success')
    router.push({ name: 'home' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response?.data?.error?.fields) {
      Object.entries(err.response.data.error?.fields).forEach(([field, errorMessage]) => {
        // Narrow field type to match LoginForm keys
        if (field in values) {
          setFieldError(field as keyof LoginForm, errorMessage as string)
        }
      })
    }
  }
})
</script>
<template>
  <div
    class="flex flex-col justify-between gap-y-4 w-[448px] border-yellow-300 border-2 bg-yellow-50 p-8 m-8 rounded"
  >
    <h1 class="text-2xl font-title">登入</h1>
    <div class="flex flex-col justify-between gap-y-2"></div>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-y-4">
      <TextInputField
        label="電子信箱"
        name="email"
        v-model.trim="email"
        v-bind="emailAttrs"
        :invalid="!!errors['email']"
        :error="errors.email"
        fluid
      />
      <PasswordInputField
        label="密碼"
        name="password"
        v-model.trim="password"
        v-bind="passwordAttrs"
        :invalid="!!errors['password']"
        :error="errors.password"
        fluid
      />
      <div>
        <Button type="submit" label="登入" class="text-title" fluid />
      </div>
    </form>
    <Divider />
    <div class="flex flex-row justify-center">
      <div class="text-sm text-stone-500">
        第一次用躺卷？
        <RouterLink to="/signup" class="text-primary-400">註冊</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
