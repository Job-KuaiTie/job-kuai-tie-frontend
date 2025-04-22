<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';

import api from '@/utils/axios'
import type { Job, JobPayload } from '@/types/job'

const jobs = ref<Job[]>([])
const loading = ref(false)

const tiers = [
  { label: '夢想工作', value: 1 },
  { label: '務實選擇', value: 2 },
  { label: '保底放心', value: 3 },
]
const getTierLabel = (value: number) => {
  const tier = tiers.find(t => t.value === value)
  console.log(tier)
  console.log(value)
  return tier ? tier.label : value
}

const getStatusLabel = (status) => {
  switch (status) {
      case 1:
          return 'success';

      case 2:
          return 'warn';

      case 3:
          return 'danger';

      default:
          return null;
  }
};

const fetchJobs = async () => {
  loading.value = true
  try {
    const response = await api.get<Job[]>('/jobs')
    jobs.value = response
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}


const formatDate = (dateStr: string | null) => {
  return dateStr ? new Date(dateStr).toLocaleDateString() : '-'
}

const visible = ref(false);
const formData = ref<JobPayload>({
  name: '',
  tier: 1,
  applied_at: null,
  min_yearly_salary: null,
  max_yearly_salary: null,
  description: '',
})

// Button actions

const onCreateJob = async () => {
  try {
    const response = await api.post<Job>('/jobs', formData.value)
    jobs.value.push(response) // update UI with new job
    visible.value = false // close dialog
    resetForm()
  } catch (error) {
    console.error('Create failed:', error)
  }
}

const onCancelDialog = () => {
  visible.value = false // close dialog
  resetForm()
}

const resetForm = () => {
  formData.value = {
    name: '',
    tier: 1,
    applied_at: null,
    min_yearly_salary: null,
    max_yearly_salary: null,
    description: '',
  }
}

const onEditJob = async (id: string, updatedData: Partial<JobPayload>) => {
  try {
    const response = await api.patch<Job>(`/jobs/${id}`, updatedData)
    const index = jobs.value.findIndex(job => job.id === id)
    if (index !== -1) {
      jobs.value[index] = response // Update local state
    }
  } catch (error) {
    console.error('Update failed:', error)
  }
}

const onDeleteJob = async (id: string) => {
  try {
    await api.delete(`/jobs/${id}`)
    jobs.value = jobs.value.filter(job => job.id !== id) // Remove from local state
  } catch (error) {
    console.error('Delete failed:', error)
  }
}

onMounted(fetchJobs)
</script>

<template>
  <div class="card">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">職缺清單</h2>
      <!-- <Button label="新增職缺" icon="pi pi-plus" @click="onCreateJob" /> -->
      <Button label="新增職缺" icon="pi pi-plus" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="新增職缺" :style="{ width: '25rem' }">
            <div class="flex items-center gap-4 mb-4">
                <label for="name" class="font-semibold w-24">職缺名稱</label>
                <InputText id="name" class="flex-auto" v-model="formData.name" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="tier" class="font-semibold w-24">優先順位</label>
                <Dropdown
                  id="tier"
                  class="flex-auto"
                  :options="tiers"
                  optionLabel="label"
                  optionValue="value"
                  v-model="formData.tier"
                  required
                />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="applied_at" class="font-semibold w-24">投遞時間</label>
                <DatePicker id="applied_at" class="flex-auto" v-model="formData.applied_at"/>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="min_yearly_salary" class="font-semibold w-24">年薪下限</label>
                <InputNumber id="min_yearly_salary" class="flex-auto" v-model="formData.min_yearly_salary" suffix=" 元"/>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="max_yearly_salary" class="font-semibold w-24">年薪上限</label>
                <InputNumber id="max_yearly_salary" class="flex-auto" v-model="formData.max_yearly_salary" suffix=" 元"/>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="description" class="font-semibold w-24">職缺描述</label>
                <Textarea id="description" class="flex-auto" v-model="formData.description" autocomplete="off" rows="5" cols="30"/>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="onCancelDialog"></Button>
                <Button type="button" label="Save" @click="onCreateJob" />
            </div>
        </Dialog>
    </div>
    <DataTable :value="jobs" tableStyle="min-width: 60rem" :loading="loading">
      <Column field="name" header="職缺名稱" sortable></Column>
      <Column field="tier" header="優先順位" sortable>
          <!-- <template #editor="{ data, field }">
              <Select v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                  <template #option="slotProps">
                      <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                  </template>
              </Select>
          </template> -->
          <template #body="slotProps">
            <Tag
              :value="getTierLabel(slotProps.data.tier)"
              :severity="getStatusLabel(slotProps.data.tier)"
            />
          </template>
      </Column>
      <Column field="min_yearly_salary" header="年薪下限（NTD）" sortable></Column>
      <Column field="max_yearly_salary" header="年薪上限（NTD）" sortable></Column>
      <Column field="applied_at" header="投遞時間" sortable>
        <template #body="{ data }">
          {{ formatDate(data.applied_at) }}
        </template>
      </Column>
      <Column field="description" header="職缺描述" sortable></Column>
      <Column header="操作">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="mr-2" @click="onEditJob(data)" />
          <Button icon="pi pi-trash" severity="danger" @click="onDeleteJob(data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
