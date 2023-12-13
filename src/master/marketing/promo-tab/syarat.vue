<template>
  <div class="grid grid-cols-2 mt-5">
    <InputField label="Syarat Bonus" required>
      <Input v-model="form.nama_lokasi" :options="reqOptions" />
    </InputField>
  </div>
  <div class="mt-5">
    <Button
      @click="handleAddDetail"
      color="info"
      class="mb-5"
      label="Add To List"
      :disabled="!isFormValid"
      small
    />
    <DataTable
      :data="tableData"
      :columns="columns"
      :table-header="tableHeader"
      :options="tableOptions"
      class="stripe pageResize"
      ref="table"
    >
      <thead>
        <tr>
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
  </div>
</template>
<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-select';
import 'datatables.net-responsive';
import { reactive, ref, onMounted, computed } from 'vue';
import Button from '@/components/Button.vue';

DataTable.use(DataTablesCore);

const props = defineProps(['syarat', 'tableData']);
const emit = defineEmits(['update:syarat']);

const reqOptions = ['Product', 'Product 2', 'Product 3'];

const tableOptions = {
  paging: false,
  searching: false,
  responsive: true,
  processing: true,
};
const tableData = ref(props.tableData);
const table = ref(null);
onMounted(() => {
  table.value.dt.on('click', 'td.delete-button', function (e) {
    tableData.value.splice(e.target.closest('tr').rowIndex - 1, 1);
  });
});
const handleAddDetail = () => {
  const listData = {
    ...form,
  };
  emit('update:syarat', listData);
};

const tableHeader = [
  { id: 1, title: 'No.' },
  { id: 2, title: 'Artikel' },
  { id: 3, title: 'Item' },
  { id: 4, title: 'Barcode' },
  { id: 5, title: 'Syarat Promo' },
  { id: 6, title: 'Harga' },
  { id: 7, title: null },
];
const columns = [
  { data: null, render: (data, type, row, meta) => meta.row + 1 },
  { data: 'item_articel' },
  { data: 'item_name' },
  { data: 'item_barcode' },
  { data: 'syarat' },
  { data: 'harga' },
  {
    data: null,
    className: 'delete-button cursor-pointer',
    defaultContent: '<p class="text-red-500 font-bold">x</p>',
    orderable: false,
  },
];

const form = reactive({
  item_articel: '',
  item_name: '',
  item_barcode: '',
  syarat: '',
  harga: '',
});

// const isFormValid = computed(() => {
//   return (
//     form.nama_lokasi.trim() !== '' &&
//     form.delivery_area.trim() !== '' &&
//     form.provinsi.trim() !== '' &&
//     form.syarat.trim() !== '' &&
//     form.kecamatan.trim() !== '' &&
//     form.kota.trim() !== ''
//   );
// });
</script>
