<template>
  <DataTable :data="data" :columns="columns" :table-header="tableHeader" class="display">
    <thead>
      <tr>
        <th v-for="item in tableHeader" :key="item.id">{{ item.title }}</th>
      </tr>
    </thead>
  </DataTable>
</template>

<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

defineProps({
  tableHeader: {
    type: Array,
    required: true,
  },
});

DataTable.use(DataTablesCore);
</script>

<style>
@import 'datatables.net-dt';
</style>
