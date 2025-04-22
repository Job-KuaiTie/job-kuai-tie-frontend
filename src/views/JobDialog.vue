<!-- <script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { Dialog } from 'primevue/dialog'
import { InputText } from 'primevue/inputtext'
import { Dropdown } from 'primevue/dropdown'
import { InputTextarea } from 'primevue/inputtextarea'
import Button from 'primevue/button'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  job: {
    type: Object,
    default: () => null,
  },
  isEditMode: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:visible', 'submit'])

const tiers = [
  { label: '夢想工作', value: '1' },
  { label: '務實選擇', value: '2' },
  { label: '保底放心', value: '3' },
]

const form = ref({
  name: '',
  tier: '',
  salary: '',
  description: '',
})

watch(() => props.job, (job) => {
  if (job && props.isEditMode) {
    form.value = { ...job }
  }
})

const onSubmit = () => {
  emit('submit', form.value)
  onCancel()
}

const onCancel = () => {
  emit('update:visible', false)
}

</script>

<template>
  <Dialog
    v-model="visible"
    :header="isEditMode ? '編輯職缺' : '新增職缺'"
    :footer="footerTemplate"
    :closable="false"
    showHeader
  >
    <form @submit.prevent="onSubmit">
      <div class="p-fluid">
        <div class="p-field">
          <label for="name">職缺名稱</label>
          <InputText id="name" v-model="form.name" required />
        </div>
        <div class="p-field">
          <label for="tier">優先順位</label>
          <Dropdown
            id="tier"
            v-model="form.tier"
            :options="tiers"
            optionLabel="label"
            optionValue="value"
            required
          />
        </div>
        <div class="p-field">
          <label for="salary">薪資範圍</label>
          <InputText id="salary" v-model="form.salary" />
        </div>
        <div class="p-field">
          <label for="description">職缺描述</label>
          <InputTextarea id="description" v-model="form.description" rows="4" />
        </div>
      </div>
      <template #footer>
        <Button label="取消" icon="pi pi-times" @click="onCancel" />
        <Button
          label="提交"
          icon="pi pi-check"
          type="submit"
          :disabled="!form.name || !form.tier"
        />
      </template>
    </form>
  </Dialog>
</template>

<style scoped>
.p-fluid .p-field {
  margin-bottom: 1rem;
}
</style> -->
