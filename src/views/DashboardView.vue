<script setup lang="ts">
// await api.post<unknown>('accounts', formData);

// // const statuses = ref([
// //     { label: '夢想工作', value: '1' },
// //     { label: '務實選擇', value: '2' },
// //     { label: '保底放心', value: '3' }
// // ]);
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import api from '@/utils/axios'
import type { Job } from '@/types/job'

const jobs = ref<Job[]>([])
const loading = ref(false)

const fetchJobs = async () => {
  loading.value = true
  try {
    const response = await api.get<Job[]>('/jobs')
    console.log(response)
    jobs.value = response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const formatSalaryRange = (min: number | null, max: number | null) => {
  if (min && max) return `$${min} - $${max}`
  if (min) return `≥ $${min}`
  if (max) return `≤ $${max}`
  return '-'
}

const formatDate = (dateStr: string | null) => {
  return dateStr ? new Date(dateStr).toLocaleDateString() : '-'
}

// Button actions
const onCreateJob = () => {
  // TODO: open job creation form
  console.log('Create Job')
}

const onEditJob = (job: Job) => {
  // TODO: open edit form for selected job
  console.log('Edit Job:', job)
}

const onDeleteJob = (job: Job) => {
  // TODO: confirm and delete job
  console.log('Delete Job:', job)
}

onMounted(fetchJobs)
</script>

<template>
  <div class="card">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">求職清單</h2>
      <Button label="新增職缺" icon="pi pi-plus" @click="onCreateJob" />
    </div>
    <DataTable :value="jobs" tableStyle="min-width: 60rem" :loading="loading">
      <Column field="name" header="職缺名稱" sortable></Column>
      <Column field="tier" header="優先順位" sortable></Column>
      <Column header="薪資範圍">
        <template #body="{ data }">
          {{ formatSalaryRange(data.min_yearly_salary, data.max_yearly_salary) }}
        </template>
      </Column>
      <Column field="description" header="職缺描述" sortable></Column>
      <Column field="applied_at" header="已投遞" sortable>
        <template #body="{ data }">
          {{ formatDate(data.applied_at) }}
        </template>
      </Column>
      <Column header="操作">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="mr-2" @click="onEditJob(data)" />
          <Button icon="pi pi-trash" severity="danger" @click="onDeleteJob(data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
