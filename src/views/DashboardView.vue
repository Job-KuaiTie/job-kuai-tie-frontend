<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const activeTab = ref(route.path)

const items = [
  { label: '職缺', icon: 'pi pi-briefcase', route: '/dashboard/job' },
  { label: '公司', icon: 'pi pi-building', route: '/dashboard/company' },
  { label: '分類', icon: 'pi pi-tags', route: '/dashboard/category' }
]

watch(() => route.path, (newPath) => {
  activeTab.value = newPath
})

</script>

<template>
  <Tabs v-model="activeTab">
    <TabList>
      <Tab
        v-for="tab in items"
        :key="tab.label"
        :value="tab.route"
      >
        <router-link
          v-slot="{ href, navigate }"
          :to="tab.route"
          custom
        >
          <a
            v-ripple
            :href="href"
            @click="navigate"
            class="flex items-center gap-2 text-inherit"
          >
            <i :class="tab.icon" />
            <span>{{ tab.label }}</span>
          </a>
        </router-link>
      </Tab>
    </TabList>
  </Tabs>

  <RouterView />
</template>
