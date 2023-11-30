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
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-select';
import 'datatables.net-responsive';
import { onMounted, ref } from 'vue';

let dt;
const table = ref(null);

const emit = defineEmits(['get-row-data']);

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
@import 'datatables.net-dt';
table {
  margin: 0 0 150px 0 !important;
}
.datatable {
  font-size: 14px;
}
.dataTables_wrapper .dataTables_length select {
  margin: 0 10px;
  padding: 4px 6px;
  border: 1px solid #cccccc;
}
.dataTables_wrapper .dataTables_filter input {
  margin: 0 0 0 10px;
  border: 1px solid #cccccc;
}
.dataTables_wrapper .dataTables_filter {
  margin: 0 0 30px 0;
}
.dataTables_wrapper .dataTables_length {
  margin: 0 0 30px 0;
}
.dataTables_wrapper .dataTables_paginate .paginate_button.current,
.dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
  background: #2f80ed !important;
  color: white !important;
}
.dataTables_wrapper .dataTables_paginate .paginate_button.disabled,
.dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover,
.dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {
  border: solid 1px #cccccc;
  border-radius: 3px;
}
</style>
