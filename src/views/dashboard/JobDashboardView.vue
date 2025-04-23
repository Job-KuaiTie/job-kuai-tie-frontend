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
import { useFlashMessageStore } from '@/stores/flashMessageStore'

import api from '@/utils/axios'
import type { Job, JobPayload } from '@/types/job'

const jobs = ref<Job[]>([])
const newJob = ref(false);
const loading = ref(false)

const JobDialog = ref(false);
const deleteJobDialog = ref(false);

const flashMessageStore = useFlashMessageStore()

const tiers = [
  { label: '夢想工作', value: 1 },
  { label: '務實選擇', value: 2 },
  { label: '保底放心', value: 3 },
]
const getTierLabel = (value: number) => {
  const tier = tiers.find(t => t.value === value)
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
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${m} 月 ${d} 日 ${y} 年`
}

const jobData = ref<JobPayload>({
  id: null,
  name: '',
  description: null,
  url: null,
  tier: 1,
  min_yearly_salary: null,
  max_yearly_salary: null,
  company_id: null,
  owner_id: null,
  applied_at: null,
  created_at: null,
  updated_at: null,
})

// Button actions

const openNewJob = () => {
  // Shows this is a new job
  newJob.value = true;
  JobDialog.value = true;
};

const onSaveJob = async () => {
  if (newJob.value) {
    await onCreateJob()
  } else {
    await onEditJob()
  }
}

const onCreateJob = async () => {
  try {
    const response = await api.post<Job>('/jobs', jobData.value)
    jobs.value.push(response) // update UI with new job
    JobDialog.value = false // close dialog
    resetForm()
    flashMessageStore.setFlashMessage('新增職缺成功', 'success')
  } catch (error) {
    console.error('Create failed:', error)
  }
}

const onEditJob = async () => {
  try {
    const id = jobData.value.id
    const response = await api.patch<Job>(`/jobs/${id}`, jobData.value)
    const index = jobs.value.findIndex(job => job.id === id)
    if (index !== -1) {
      jobs.value[index] = response // Update local state
    }
    JobDialog.value = false // close dialog
    resetForm()
    flashMessageStore.setFlashMessage('更新職缺成功', 'success')
  } catch (error) {
    console.error('Update failed:', error)
  }
}

const onCancelDialog = () => {
  JobDialog.value = false // close dialog
  resetForm()
}

const resetForm = () => {
  newJob.value = false; // cancel new job creation
  jobData.value = {
    id: null,
    name: '',
    description: null,
    url: null,
    tier: 1,
    min_yearly_salary: null,
    max_yearly_salary: null,
    company_id: null,
    owner_id: null,
    applied_at: null,
    created_at: null,
    updated_at: null,
  }
}

const mapJobData = (data: Job) => {
  jobData.value = {
    id: data.id,
    name: data.name,
    description: data.description,
    url: data.url,
    tier: data.tier,
    applied_at: data.applied_at,
    min_yearly_salary: data.min_yearly_salary,
    max_yearly_salary: data.max_yearly_salary,
    company_id: data.company_id,
    owner_id: data.owner_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }
}

const editJob = (data: Job) => {
  console.log("Before mapJobData")
  console.log(data)
  newJob.value = false;
  mapJobData(data)
  console.log("After mapJobData")
  console.log(data)
  JobDialog.value = true;
};


const confirmDeleteJob = (data: Job) => {
  mapJobData(data)
  deleteJobDialog.value = true;
};
const onDeleteJob = async () => {
  try {
    const id = jobData.value.id
    await api.delete(`/jobs/${id}`)
    jobs.value = jobs.value.filter(job => job.id !== id) // Remove from local state
    deleteJobDialog.value = false; // close the dialog
    resetForm()
    flashMessageStore.setFlashMessage('已刪除職缺！', 'success')
  } catch (error) {
    console.error('Delete failed:', error)
  }
}

onMounted(fetchJobs)
</script>

<template>
    <Dialog v-model:visible="JobDialog" modal header="新增職缺" :style="{ width: '25rem' }">
      <div class="flex items-center gap-4 mb-4">
          <label for="name" class="font-semibold w-24">職缺名稱</label>
          <InputText id="name" class="flex-auto" v-model="jobData.name" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
          <label for="tier" class="font-semibold w-24">優先順位</label>
          <Dropdown
            id="tier"
            class="flex-auto"
            :options="tiers"
            optionLabel="label"
            optionValue="value"
            placeholder="選擇順位"
            v-model="jobData.tier"
            required
          />
      </div>
      <div class="flex items-center gap-4 mb-4">
          <label for="applied_at" class="font-semibold w-24">投遞日期</label>
          <DatePicker id="applied_at" class="flex-auto" v-model="jobData.applied_at"/>
      </div>
      <div class="flex items-center gap-4 mb-4">
          <label for="min_yearly_salary" class="font-semibold w-24">年薪下限</label>
          <InputNumber id="min_yearly_salary" class="flex-auto" v-model="jobData.min_yearly_salary" prefix="NTD "/>
      </div>
      <div class="flex items-center gap-4 mb-4">
          <label for="max_yearly_salary" class="font-semibold w-24">年薪上限</label>
          <InputNumber id="max_yearly_salary" class="flex-auto" v-model="jobData.max_yearly_salary" prefix="NTD "/>
      </div>
      <div class="flex items-center gap-4 mb-4">
          <label for="description" class="font-semibold w-24">職缺描述</label>
          <Textarea id="description" class="flex-auto" v-model="jobData.description" autocomplete="off" rows="5" cols="30"/>
      </div>
      <div class="flex justify-end gap-2">
          <Button type="button" label="Cancel" severity="secondary" @click="onCancelDialog"></Button>
          <Button type="button" label="Save" @click="onSaveJob" />
      </div>
  </Dialog>
  <Dialog v-model:visible="deleteJobDialog" :style="{ width: '25rem' }" header="確認刪除？" :modal="true">
          <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="jobData.name"
                  >你確定你想要刪除 <span class="font-semibold">{{ jobData.name }}</span
                  >?</span
              >
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteJobDialog = false" />
              <Button label="Yes" icon="pi pi-check" @click="onDeleteJob" />
          </template>
  </Dialog>
  <div class="card">
    <div class="flex justify-end items-end mb-4">
      <!-- <h2 class="text-xl font-semibold">職缺清單</h2> -->
      <!-- <Button label="新增職缺" icon="pi pi-plus" @click="onCreateJob" /> -->
      <Button label="新增職缺" icon="pi pi-plus" @click="openNewJob" />
    </div>
    <DataTable :value="jobs" tableStyle="min-width: 60rem"  :loading="loading" dataKey="id">
      <Column field="name" header="職缺名稱" sortable>
      </Column>
      <Column field="tier" header="優先順位" sortable>
          <template #body="slotProps">
            <Tag
              :value="getTierLabel(slotProps.data.tier)"
              :severity="getStatusLabel(slotProps.data.tier)"
            />
          </template>
      </Column>
      <Column field="applied_at" header="投遞日期" sortable>
        <template #body="{ data }">
          {{ formatDate(data.applied_at) }}
        </template>
      </Column>
      <Column field="min_yearly_salary" header="年薪下限（NTD）" sortable>
      </Column>
      <Column field="max_yearly_salary" header="年薪上限（NTD）" sortable>
      </Column>
      <Column field="created_at" header="新增職缺日期" sortable>
        <template #body="{ data }">
          {{ formatDate(data.created_at) }}
        </template>
      </Column>
      <Column field="description" header="職缺描述" sortable>
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editJob(slotProps.data)" />
            <Button icon="pi pi-trash" text severity="danger" @click="confirmDeleteJob(slotProps.data)" />
        </template>
    </Column>
      <template #footer> 總共收藏了 {{ jobs ? jobs.length : 0 }} 個職缺！ </template>
    </DataTable>
  </div>
</template>
