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
interface SignupBeginForm {
  name: string
  email: string
  password: string
}

const { values, errors, handleSubmit, defineField, setFieldError } = useForm<SignupBeginForm>({
  validationSchema: toTypedSchema(
    object({
      name: string().required('暱稱為必填欄位'),
      email: string().email('請輸入有效的電子信箱').required('電子信箱為必填欄位'),
      password: string().min(6, '密碼長度需至少 6 個字元').required('密碼為必填欄位'),
    }),
  ),
  initialValues: {
    name: '',
    email: '', // Default value
    password: '',
  },
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

// Handle form submission
const onSubmit = handleSubmit(async (formData) => {
  try {
    // Step 1: Attempt to create the account
    await api.post<unknown>('accounts', formData)

    // Step 2: If signup succeeds, send login request
    const params = new URLSearchParams()
    params.append('username', formData.email)
    params.append('password', formData.password)

    const data = await api.post<{ access_token: string }>('token', params)

    // Step 3: Store token & redirect
    authStore.setToken(data.access_token)
    flashMessageStore.setFlashMessage('註冊並登入成功', 'success')
    router.push({ name: 'home' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // If error is in registration (account exists, etc.)
    if (err.response?.config?.url?.includes('accounts')) {
      if (err.response?.data?.error?.fields) {
        Object.entries(err.response.data.error.fields).forEach(([field, errorMessage]) => {
          if (field in values) {
            setFieldError(field as keyof SignupBeginForm, errorMessage as string)
          }
        })
      }
    } else if (err.response?.config?.url?.includes('token')) {
      // Login failed after signup succeeded
      // flashMessageStore.setFlashMessage('註冊成功但登入失敗，請手動登入', 'error');
      router.push({ name: 'login' })
    }
  }
})
</script>
<template>
  <div
    class="flex flex-col justify-between gap-y-4 w-[448px] border-yellow-300 border-2 bg-yellow-50 p-8 m-8 rounded"
  >
    <h1 class="text-2xl font-title">註冊</h1>
    <div class="flex flex-col justify-between gap-y-2"></div>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-y-4">
      <TextInputField
        label="暱稱"
        name="name"
        v-model.trim="name"
        v-bind="nameAttrs"
        :invalid="!!errors['name']"
        :error="errors.name"
        fluid
      />
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
        name="name"
        v-model.trim="password"
        v-bind="passwordAttrs"
        :invalid="!!errors['password']"
        :error="errors.password"
        fluid
      />
      <div>
        <Button type="submit" label="註冊" class="text-title" fluid />
      </div>
    </form>
    <Divider />
    <div class="flex flex-row justify-center">
      <div class="text-sm text-stone-500">
        已經有帳號？
        <RouterLink to="/login" class="text-primary-400">登入</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
