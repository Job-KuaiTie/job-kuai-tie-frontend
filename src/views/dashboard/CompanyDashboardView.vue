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
import type { Company, CompanyPayload } from '@/types/company'

const companies = ref<Company[]>([])
const newCompany = ref(false);
const loading = ref(false)

const CompanyDialog = ref(false);
const deleteCompanyDialog = ref(false);

const flashMessageStore = useFlashMessageStore()

const fetchCompanies = async () => {
  loading.value = true
  try {
    const response = await api.get<Company[]>('/companies')
    companies.value = response
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

const companyData = ref<CompanyPayload>({
  id: null,
  name: '',
  description: null,
  url: null,
  size: null,
  owner_id: null,
  created_at: null,
  updated_at: null,
})

// Button actions

const openNewCompany = () => {
  // Shows this is a new company
  newCompany.value = true;
  CompanyDialog.value = true;
};

const onSaveCompany = async () => {
  if (newCompany.value) {
    await onCreateCompany()
  } else {
    await onEditCompany()
  }
}

const onCreateCompany = async () => {
  try {
    const response = await api.post<Company>('/companies', companyData.value)
    companies.value.push(response) // update UI with new company
    CompanyDialog.value = false // close dialog
    resetForm()
    flashMessageStore.setFlashMessage('新增公司成功', 'success')
  } catch (error) {
    console.error('Create failed:', error)
  }
}

const onEditCompany = async () => {
  try {
    const id = companyData.value.id
    const response = await api.patch<Company>(`/companies/${id}`, companyData.value)
    const index = companies.value.findIndex(company => company.id === id)
    if (index !== -1) {
      companies.value[index] = response // Update local state
    }
    CompanyDialog.value = false // close dialog
    resetForm()
    flashMessageStore.setFlashMessage('更新公司成功', 'success')
  } catch (error) {
    console.error('Update failed:', error)
  }
}

const onCancelDialog = () => {
  CompanyDialog.value = false // close dialog
  resetForm()
}

const resetForm = () => {
  newCompany.value = false; // cancel new company creation
  companyData.value = {
    id: null,
    name: '',
    description: null,
    url: null,
    size: null,
    owner_id: null,
    created_at: null,
    updated_at: null,
  }
}

const mapCompanyData = (data: Company) => {
  companyData.value = {
    id: data.id,
    name: data.name,
    description: data.description,
    url: data.url,
    size: data.size,
    owner_id: data.owner_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }
}

const editCompany = (data: Company) => {
  console.log("Before mapCompanyData")
  console.log(data)
  newCompany.value = false;
  mapCompanyData(data)
  console.log("After mapCompanyData")
  console.log(data)
  CompanyDialog.value = true;
};


const confirmDeleteCompany = (data: Company) => {
  mapCompanyData(data)
  deleteCompanyDialog.value = true;
};
const onDeleteCompany = async () => {
  try {
    const id = companyData.value.id
    await api.delete(`/companies/${id}`)
    companies.value = companies.value.filter(company => company.id !== id) // Remove from local state
    deleteCompanyDialog.value = false; // close the dialog
    resetForm()
    flashMessageStore.setFlashMessage('已刪除公司！', 'success')
  } catch (error) {
    console.error('Delete failed:', error)
  }
}

onMounted(fetchCompanies)
</script>

<template>
    <Dialog v-model:visible="CompanyDialog" modal header="新增公司" :style="{ width: '25rem' }">
      <div class="flex items-center gap-4 mb-4">
          <label for="name" class="font-semibold w-24">公司名稱</label>
          <InputText id="name" class="flex-auto" v-model="companyData.name" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
          <label for="size" class="font-semibold w-24">公司規模</label>
          <InputNumber id="size" class="flex-auto" v-model="companyData.size" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
          <label for="description" class="font-semibold w-24">公司描述</label>
          <Textarea id="description" class="flex-auto" v-model="companyData.description" autocomplete="off" rows="5" cols="30"/>
      </div>
      <div class="flex justify-end gap-2">
          <Button type="button" label="Cancel" severity="secondary" @click="onCancelDialog"></Button>
          <Button type="button" label="Save" @click="onSaveCompany" />
      </div>
  </Dialog>
  <Dialog v-model:visible="deleteCompanyDialog" :style="{ width: '25rem' }" header="確認刪除？" :modal="true">
          <div class="flex items-center gap-4">
              <i class="pi pi-exclamation-triangle !text-3xl" />
              <span v-if="companyData.name"
                  >你確定你想要刪除 <span class="font-semibold">{{ companyData.name }}</span
                  >?</span
              >
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteCompanyDialog = false" />
              <Button label="Yes" icon="pi pi-check" @click="onDeleteCompany" />
          </template>
  </Dialog>
  <div class="card">
    <div class="flex justify-end items-end mb-4">
      <!-- <h2 class="text-xl font-semibold">公司清單</h2> -->
      <!-- <Button label="新增公司" icon="pi pi-plus" @click="onCreateCompany" /> -->
      <Button label="新增公司" icon="pi pi-plus" @click="openNewCompany" />
    </div>
    <DataTable :value="companies" tableStyle="min-width: 60rem"  :loading="loading" dataKey="id">
      <Column field="name" header="公司名稱" sortable>
      </Column>
      <Column field="size" header="公司規模" sortable>
      </Column>
      <Column field="created_at" header="新增公司日期" sortable>
        <template #body="{ data }">
          {{ formatDate(data.created_at) }}
        </template>
      </Column>
      <Column field="description" header="公司描述" sortable>
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editCompany(slotProps.data)" />
            <Button icon="pi pi-trash" text severity="danger" @click="confirmDeleteCompany(slotProps.data)" />
        </template>
    </Column>
      <template #footer> 總共收藏了 {{ companies ? companies.length : 0 }} 個公司！ </template>
    </DataTable>
  </div>
</template>
