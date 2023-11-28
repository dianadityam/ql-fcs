<template>
  <DataTable
    :data="user"
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
  <button @click="getData">Get Data</button>
</template>

<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-select';
import 'datatables.net-responsive';
import { onMounted, ref } from 'vue';
import service from '../services';

let dt;
const table = ref(null);

const emit = defineEmits(['get-row-data']);

onMounted(() => {
  dt = table.value.dt;
  console.log('Brow', dt);
});

function getData() {
  dt.rows({ selected: true }).every(function () {
    console.log(this.data());
  });
}

// defineProps({
//   tableHeader: {
//     type: Array,
//     required: true,
//   },
//   tableOptions: {
//     type: Object,
//   },
//   data: {
//     type: Array,
//   },
// });

DataTable.use(DataTablesCore);

const tableOptions = {
  select: true,
  responsive: true,
  processing: true,
};

const tableHeader = [
  { id: 1, title: 'No.' },
  { id: 2, title: 'User Log in' },
  { id: 3, title: 'Nama' },
  { id: 4, title: 'Tipe User' },
  { id: 5, title: 'Status' },
  { id: 6, title: 'Created' },
];

const user = ref(null);

const columns = [
  { data: null, render: (data, type, row, meta) => meta.row + 1 },
  { data: 'email' },
  { data: 'username' },
  { data: 'usertype' },
  { data: 'status' },
  { data: 'created_at' },
];

const fetchData = async () => {
  const result = await service({
    method: 'GET',
    url: 'operation/default_users?paginate=100',
    token: true,
  });
  if (result.status === 200) {
    user.value = result.response.data;
    // console.log(user);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style>
@import 'datatables.net-dt';
</style>
