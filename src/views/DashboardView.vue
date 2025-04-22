<script setup lang="ts">
import { onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';

onMounted(() => {
    ProductService.getProductsMini().then((data) => (products.value = data));
});

// const statuses = ref([
//     { label: '夢想工作', value: '1' },
//     { label: '務實選擇', value: '2' },
//     { label: '保底放心', value: '3' }
// ]);
</script>

<template>
    <div class="card">
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
    </div>
</template>
