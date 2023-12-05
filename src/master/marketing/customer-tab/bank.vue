<template>
  <div class="grid grid-cols-2 mt-5">
    <InputField label="Nama Bank" required>
      <Input v-model="form.nama_bank" placeholder="C0001" />
    </InputField>
    <InputField label="No. Rekening" required>
      <Input v-model="form.no_rekening" />
    </InputField>
    <InputField label="Kode Area Bank" required>
      <Input v-model="form.kode_area" />
    </InputField>
    <InputField label="Nama Rekening">
      <Input v-model="form.nama_rekening" />
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

const props = defineProps(['bank', 'tableData']);
const emit = defineEmits(['update:bank']);

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
    nama_bank: form.nama_bank,
    no_rekening: form.no_rekening,
    kode_area: form.kode_area,
    nama_rekening: form.nama_rekening,
  };
  emit('update:bank', listData);
  form.nama_bank = '';
  form.no_rekening = '';
  form.kode_area = '';
  form.nama_rekening = '';
};

const tableHeader = [
  { id: 1, title: 'No.' },
  { id: 2, title: 'Nama Bank' },
  { id: 3, title: 'No. Rekening' },
  { id: 4, title: 'Nama Rekening' },
  { id: 5, title: 'Kode Area' },
  { id: 6, title: null },
];
const columns = [
  { data: null, render: (data, type, row, meta) => meta.row + 1 },
  { data: 'nama_bank' },
  { data: 'no_rekening' },
  { data: 'nama_rekening' },
  { data: 'kode_area' },
  {
    data: null,
    className: 'delete-button cursor-pointer',
    defaultContent: '<p>X</p>',
    orderable: false,
  },
];

const form = reactive({
  nama_bank: '',
  no_rekening: '',
  kode_area: '',
  nama_rekening: '',
});

const isFormValid = computed(() => {
  return (
    form.nama_bank.trim() !== '' &&
    form.no_rekening.trim() !== '' &&
    form.kode_area.trim() !== '' &&
    form.nama_rekening.trim() !== ''
  );
});
</script>
