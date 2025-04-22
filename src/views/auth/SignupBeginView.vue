<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFlashMessageStore } from '@/stores/flashMessageStore';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';
import api from '@/utils/axios';
import TextInputField from '@/components/form/TextInputField.vue';
const router = useRouter();
const flashMessageStore = useFlashMessageStore();

// Define form schema and validation
interface SignupBeginForm {
  email: string;
}

const { values, errors, handleSubmit, defineField, setFieldError } = useForm<SignupBeginForm>({
  validationSchema: toTypedSchema(
    object({
      email: string().email('請輸入有效的電子信箱').required('電子信箱為必填欄位'),
    }),
  ),
  initialValues: {
    email: '', // Default value
  },
});

const [email, emailAttrs] = defineField('email');

// Handle form submission
const onSubmit = handleSubmit(async (formData) => {
  try {
    await api.post<unknown>('api/v1/register', formData);

    // Success logic
    sessionStorage.setItem('registration_email', formData.email);
    flashMessageStore.setFlashMessage('已將驗證信寄至您的信箱，請前往收信', 'success');
    router.push({ name: 'signup-email-sent' });
  } catch (err: any) {
    if (err.response?.data?.error?.fields) {
      Object.entries(err.response.data.error?.fields).forEach(([field, errorMessage]) => {
        // Narrow field type to match LoginForm keys
        if (field in values) {
          setFieldError(field as keyof SignupBeginForm, errorMessage as string);
        }
      });
    }
  }
});
</script>
<template>
  <div class="flex flex-col justify-between gap-y-4 w-[448px] border-yellow-300 border-2 bg-yellow-50 p-8 m-8 rounded">
    <h1 class="text-2xl font-title">註冊</h1>
    <div class="flex flex-col justify-between gap-y-2"></div>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-y-4">
      <TextInputField label="電子信箱" name="email" v-model.trim="email" v-bind="emailAttrs" :invalid="!!errors['email']"
        :error="errors.email" fluid />
      <div>
        <Button type="submit" label="下一步" class="text-title" fluid />
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
