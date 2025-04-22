<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import NumberInputGroup from '@/components/form/NumberInputGroup.vue'
import api from '@/utils/axios'

// Explicitly define the type for formInput
interface FormInput {
  salary_amount: number
  expense_amount: number
  investment_ratio: number
  investment_amount: number
  start_year: number
  house_start_year: number
  child_born_at_age: number
  retire_age: number
  house_amount: number
  down_payment: number
  interest: number
  loan_term: number
}

// Make `formInput` a reactive object with explicit type
const formInput = reactive<FormInput>({
  salary_amount: 50000,
  expense_amount: 10000,
  investment_ratio: 70,
  investment_amount: 1000000,
  start_year: 26,
  house_start_year: 36,
  child_born_at_age: 34,
  retire_age: 65,
  house_amount: 10000000,
  down_payment: 2000000,
  interest: 1.05,
  loan_term: 30,
})

const chartData = defineModel('chartData')
const error = ref<string | null>()

const fetchData = async () => {
  try {
    const response = await api.post<unknown>('process', formInput) // Replace with actual API endpoint
    chartData.value = response.data
  } catch (err) {
    error.value = 'Failed to send data'
    console.error(err)
  }
}

// Trigger data fetch on mount
onMounted(() => {
  fetchData()
})

// Function for button-triggered fetch
const submit = () => {
  fetchData()
}
</script>

<template>
  <div>
    <div class="flex flex-row">
      <i class="pi pi-wallet pt-1.5 pr-2"></i>
      <div class="font-title text-xl mb-4">日常理財</div>
    </div>
    <div class="grid grid-cols-7 gap-4">
      <NumberInputGroup
        label="起始薪資"
        type="integer"
        icon=""
        name="salary_amount"
        :min="0"
        :max="10e8"
        v-model:value="formInput!.salary_amount"
        mode="currency"
        currency="NTD"
        locale="tw-TW"
        class="col-span-2"
      />
      <NumberInputGroup
        label="起始生活費"
        type="integer"
        icon=""
        name="expense_amount"
        :min="0"
        :max="10e6"
        v-model:value="formInput!.expense_amount"
        mode="currency"
        currency="NTD"
        locale="tw-TW"
        class="col-span-2"
      />
      <NumberInputGroup
        label="餘額轉投資比率"
        type="float"
        icon=""
        name="investment_ratio"
        :min="0"
        :max="100"
        v-model:value="formInput!.investment_ratio"
        class="col-span-1"
        suffix="%"
      />
      <NumberInputGroup
        label="起始總投資金額"
        type="integer"
        icon=""
        name="investment_amount"
        :min="0"
        :max="10e12"
        v-model:value="formInput!.investment_amount"
        mode="currency"
        currency="NTD"
        locale="tw-TW"
        class="col-span-2"
      />
    </div>
  </div>
  <div>
    <div class="flex flex-row">
      <i class="pi pi-calendar pt-1.5 pr-2"></i>
      <div class="font-title text-xl mb-4">人生規劃</div>
    </div>
    <div class="grid grid-cols-7 gap-4">
      <NumberInputGroup
        label="起始年齡"
        type="integer"
        icon=""
        name="start_year"
        :min="0"
        :max="150"
        v-model:value="formInput!.start_year"
        suffix=" 歲"
        class="col-span-1"
      />
      <NumberInputGroup
        label="購屋時年齡"
        type="integer"
        icon=""
        name="house_start_year"
        :min="0"
        :max="150"
        v-model:value="formInput!.house_start_year"
        suffix=" 歲"
        class="col-span-2"
      />
      <NumberInputGroup
        label="預計生小孩時年齡"
        type="integer"
        icon=""
        name="child_born_at_age"
        :min="0"
        :max="150"
        v-model:value="formInput!.child_born_at_age"
        suffix=" 歲"
        class="col-span-2"
      />
      <NumberInputGroup
        label="退休年齡"
        type="integer"
        icon=""
        name="retire_age"
        :min="0"
        :max="150"
        v-model:value="formInput!.retire_age"
        class="col-span-2"
        suffix=" 歲"
      />
    </div>
  </div>
  <div>
    <div class="flex flex-row">
      <i class="pi pi-building pt-1.5 pr-2"></i>
      <div class="font-title text-xl mb-4">房屋規劃</div>
    </div>
    <div class="grid grid-cols-7 gap-4">
      <NumberInputGroup
        label="房屋總價"
        type="integer"
        icon=""
        name="house_amount"
        :min="0"
        :max="10e12"
        v-model:value="formInput!.house_amount"
        mode="currency"
        currency="NTD"
        locale="tw-TW"
        class="col-span-3"
      />
      <NumberInputGroup
        label="頭期款金額"
        type="integer"
        icon=""
        name="down_payment"
        :min="0"
        :max="10e12"
        v-model:value="formInput!.down_payment"
        mode="currency"
        currency="NTD"
        locale="tw-TW"
        class="col-span-2"
      />
      <NumberInputGroup
        label="年利率"
        type="float"
        icon=""
        name="interest"
        :min="0"
        :max="100"
        v-model:value="formInput!.interest"
        prefix="%"
        class="col-span-1"
      />
      <NumberInputGroup
        label="貸款年限"
        type="integer"
        icon=""
        name="loan_term"
        :min="0"
        :max="50"
        v-model:value="formInput!.loan_term"
        class="col-span-1"
        suffix=" 年"
      />
    </div>
  </div>
  <Button @click="submit" label="送出" class="text-title" />
</template>
