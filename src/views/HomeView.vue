<script setup lang="ts">
import { ref } from 'vue'
import HomeViewBanner from '@/views/HomeViewBanner.vue';
import BaseLineChart from '@/components/base/BaseLineChart.vue';
import HomePageForm from '@/components/form/HomePageForm.vue';

const chartData = ref();
</script>

<template>
  <div class="flex flex-col gap-y-6">
    <section class="max-w-6xl mt-4">
      <HomeViewBanner />
    </section>
    <section class="max-w-6xl mt-4">
      <BaseLineChart v-model:data="chartData" />
    </section>
    <section class="border-yellow-300 border-2 bg-yellow-50 p-6 m-8 rounded flex flex-col w-[1024px] gap-6">
      <HomePageForm v-model:chartData="chartData" />
    </section>
  </div>
</template>
