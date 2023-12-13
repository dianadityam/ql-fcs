<template>
  <div class="grid grid-cols-2 mt-5">
    <InputField label="Nama NPWP" required>
      <Input v-model="form.nama_npwp" placeholder="C0001" />
    </InputField>
    <InputField label="NPWP" required>
      <Input v-model="form.no_npwp" />
    </InputField>
    <InputField label="Alamat NPWP" required>
      <Input v-model="form.alamat_npwp" type="textarea" />
    </InputField>
    <InputField label="Foto NPWP">
      <InputFile />
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
    <!-- <TableData
      :tableHeader="detailListHeader"
      :tableOptions="tableOptions"
      :columns="columns"
      :data="tableData"
    /> -->
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
import InputFile from '@/components/InputFile.vue';
import { reactive, ref, onMounted, computed } from 'vue';
import Button from '@/components/Button.vue';

DataTable.use(DataTablesCore);

const props = defineProps(['npwp', 'tableData']);
const emit = defineEmits(['update:npwp']);

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
    nama_npwp: form.nama_npwp,
    no_npwp: form.no_npwp,
    alamat_npwp: form.alamat_npwp,
  };
  emit('update:npwp', listData);
  form.nama_npwp = '';
  form.no_npwp = '';
  form.alamat_npwp = '';
};

const tableHeader = [
  { id: 1, title: 'No.' },
  { id: 2, title: 'Nama NPWP' },
  { id: 3, title: 'No. NPWP' },
  { id: 4, title: 'Default' },
  { id: 5, title: 'Status' },
  { id: 6, title: null },
];
const columns = [
  { data: null, render: (data, type, row, meta) => meta.row + 1 },
  { data: 'nama_npwp' },
  { data: 'no_npwp' },
  { data: 'alamat_npwp' },
  { data: 'alamat_npwp' },
  {
    data: null,
    className: 'delete-button cursor-pointer',
    defaultContent: '<p class="text-red-500 font-bold">x</p>',
    orderable: false,
  },
];

const form = reactive({
  nama_npwp: '',
  no_npwp: '',
  alamat_npwp: '',
});

const isFormValid = computed(() => {
  return (
    form.nama_npwp.trim() !== '' && form.no_npwp.trim() !== '' && form.alamat_npwp.trim() !== ''
  );
});
</script>
