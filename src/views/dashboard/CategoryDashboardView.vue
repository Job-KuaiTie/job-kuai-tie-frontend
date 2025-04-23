<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import { useFlashMessageStore } from '@/stores/flashMessageStore'
import api from '@/utils/axios'
import type { Category, CategoryPayload } from '@/types/category'

const categories = ref<Category[]>([])
const newCategory = ref(false)
const loading = ref(false)

const CategoryDialog = ref(false)
const deleteCategoryDialog = ref(false)

const flashMessageStore = useFlashMessageStore()

const colorOptions = [
  { label: '大膽紅', value: '#f87171' }, // Red
  { label: '鮮明黃', value: '#facc15' }, // Yellow
  { label: '朝氣綠', value: '#4ade80' }, // Green
  { label: '清新藍', value: '#38bdf8' }, // Blue
  { label: '夢幻紫', value: '#a78bfa' }, // Purple
  { label: '活力橘', value: '#fb923c' }, // Orange
  { label: '柔和粉', value: '#f472b6' }, // Pink
  { label: '穩重灰', value: '#94a3b8' }, // Gray
]

const getColorLabel = (value: string) => {
  const option = colorOptions.find((opt) => opt.value === value)
  return option ? option.label : ''
}

const fetchCategories = async () => {
  loading.value = true
  try {
    const response = await api.get<Category[]>('/categories')
    categories.value = response
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

const categoryData = ref<CategoryPayload>({
  id: null,
  name: '',
  color: '#fb923c',
  description: null,
  owner_id: null,
  created_at: null,
  updated_at: null,
})

// Button actions

const openNewCategory = () => {
  // Shows this is a new category
  newCategory.value = true
  CategoryDialog.value = true
}

const onSaveCategory = async () => {
  if (newCategory.value) {
    await onCreateCategory()
  } else {
    await onEditCategory()
  }
}

const onCreateCategory = async () => {
  try {
    const response = await api.post<Category>('/categories', categoryData.value)
    categories.value.push(response) // update UI with new category
    CategoryDialog.value = false // close dialog
    resetForm()
    flashMessageStore.setFlashMessage('新增分類成功', 'success')
  } catch (error) {
    console.error('Create failed:', error)
  }
}

const onEditCategory = async () => {
  try {
    const id = categoryData.value.id
    const response = await api.patch<Category>(`/categories/${id}`, categoryData.value)
    const index = categories.value.findIndex((category) => category.id === id)
    if (index !== -1) {
      categories.value[index] = response // Update local state
    }
    CategoryDialog.value = false // close dialog
    resetForm()
    flashMessageStore.setFlashMessage('更新分類成功', 'success')
  } catch (error) {
    console.error('Update failed:', error)
  }
}

const onCancelDialog = () => {
  CategoryDialog.value = false // close dialog
  resetForm()
}

const resetForm = () => {
  newCategory.value = false // cancel new category creation
  categoryData.value = {
    id: null,
    name: '',
    color: '#fb923c',
    description: null,
    owner_id: null,
    created_at: null,
    updated_at: null,
  }
}

const mapCategoryData = (data: Category) => {
  categoryData.value = {
    id: data.id,
    name: data.name,
    description: data.description,
    color: data.color,
    owner_id: data.owner_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }
}

const editCategory = (data: Category) => {
  newCategory.value = false
  mapCategoryData(data)
  CategoryDialog.value = true
}

const confirmDeleteCategory = (data: Category) => {
  mapCategoryData(data)
  deleteCategoryDialog.value = true
}
const onDeleteCategory = async () => {
  try {
    const id = categoryData.value.id
    await api.delete(`/categories/${id}`)
    categories.value = categories.value.filter((category) => category.id !== id) // Remove from local state
    deleteCategoryDialog.value = false // close the dialog
    resetForm()
    flashMessageStore.setFlashMessage('已刪除分類！', 'success')
  } catch (error) {
    console.error('Delete failed:', error)
  }
}

onMounted(fetchCategories)
</script>

<template>
  <Dialog v-model:visible="CategoryDialog" modal header="新增分類" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">分類名稱</label>
      <InputText id="name" class="flex-auto" v-model="categoryData.name" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="color" class="font-semibold w-24">分類顏色</label>
      <Select
        v-model="categoryData.color"
        :options="colorOptions"
        optionLabel="label"
        optionValue="value"
        class="w-full md:w-56"
      >
        <template #value="slotProps">
          <div class="flex items-center gap-4">
            <div
              class="w-6 h-6 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
              :style="{ backgroundColor: slotProps.value }"
            />
            <div>{{ getColorLabel(slotProps.value) }}</div>
          </div>
        </template>
        <template #option="slotProps">
          <div class="flex items-center gap-4">
            <div
              class="w-6 h-6 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
              :style="{ backgroundColor: slotProps.option.value }"
            />
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </Select>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="description" class="font-semibold w-24">分類描述</label>
      <Textarea
        id="description"
        class="flex-auto"
        v-model="categoryData.description"
        autocomplete="off"
        rows="5"
        cols="30"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="onCancelDialog"></Button>
      <Button type="button" label="Save" @click="onSaveCategory" />
    </div>
  </Dialog>
  <Dialog
    v-model:visible="deleteCategoryDialog"
    :style="{ width: '25rem' }"
    header="確認刪除？"
    :modal="true"
  >
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle !text-3xl" />
      <span v-if="categoryData.name"
        >你確定你想要刪除 <span class="font-semibold">{{ categoryData.name }}</span
        >?</span
      >
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="deleteCategoryDialog = false" />
      <Button label="Yes" icon="pi pi-check" @click="onDeleteCategory" />
    </template>
  </Dialog>
  <div class="card">
    <div class="flex justify-end items-end mb-4">
      <!-- <h2 class="text-xl font-semibold">分類清單</h2> -->
      <!-- <Button label="新增分類" icon="pi pi-plus" @click="onCreateCategory" /> -->
      <Button label="新增分類" icon="pi pi-plus" @click="openNewCategory" />
    </div>
    <DataTable :value="categories" tableStyle="min-width: 30rem" :loading="loading" dataKey="id">
      <Column field="color" header="分類顏色" sortable>
        <template #body="{ data }">
          <div
            class="w-6 h-6 ml-6 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
            :style="{ backgroundColor: data.color }"
          ></div>
        </template>
      </Column>
      <Column field="name" header="分類名稱" sortable> </Column>
      <Column field="created_at" header="新增分類日期" sortable>
        <template #body="{ data }">
          {{ formatDate(data.created_at) }}
        </template>
      </Column>
      <Column field="description" header="分類描述" sortable> </Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="editCategory(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            text
            severity="danger"
            @click="confirmDeleteCategory(slotProps.data)"
          />
        </template>
      </Column>
      <template #footer> 總共收藏了 {{ categories ? categories.length : 0 }} 個分類！ </template>
    </DataTable>
  </div>
</template>
