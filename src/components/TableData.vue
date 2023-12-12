<template>
  <DataTable
    :data="data"
    :columns="columns"
    :table-header="tableHeader"
    :options="tableOptions"
    class="stripe pageResize"
    ref="table"
  >
    <thead>
      <tr>
        <th v-if="checkable" />
        <th v-for="item in tableHeader" :key="item.id">{{ item.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>
          {{ item }}
        </td>
      </tr>
    </tbody>
  </DataTable>
</template>

<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-select";
import "datatables.net-responsive";
import { onMounted, ref } from "vue";

let dt;
const table = ref(null);

const emit = defineEmits(["get-row-data"]);

onMounted(() => {
  dt = table.value.dt;
  console.log(dt);
});

defineProps({
  tableHeader: {
    type: Array,
    required: true,
  },
  tableOptions: {
    type: Object,
  },
  data: {
    type: Array,
  },
});

DataTable.use(DataTablesCore);
</script>

<style>
@import "datatables.net-dt";
</style>
