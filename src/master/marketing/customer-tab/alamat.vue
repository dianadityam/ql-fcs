<template>
  <div class="grid grid-cols-2 mt-5">
    <InputField label="Nama Lokasi" required>
      <Input v-model="form.nama_lokasi" placeholder="C0001" />
    </InputField>
    <InputField label="Area Delivery" required>
      <Input v-model="form.delivery_area" />
    </InputField>
    <InputField label="Alamat">
      <Input v-model="form.alamat" />
    </InputField>
    <InputField label="Provinsi" required>
      <Input v-model="form.provinsi" />
    </InputField>
    <InputField label="Kota" required>
      <Input v-model="form.kota" />
    </InputField>
    <InputField label="Kecamatan" required>
      <Input v-model="form.kecamatan" />
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

const props = defineProps(['alamat', 'tableData']);
const emit = defineEmits(['update:alamat']);

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
    // nama_lokasi: form.nama_lokasi,
    // delivery_area: form.delivery_area,
    // provinsi: form.provinsi,
    // alamat: form.alamat,
    ...form,
  };
  emit('update:alamat', listData);
  form.nama_lokasi = '';
  form.delivery_area = '';
  form.provinsi = '';
  form.alamat = '';
  form.kecamatan = '';
  form.kota = '';
};

const tableHeader = [
  { id: 1, title: 'No.' },
  { id: 2, title: 'Nama Lokasi' },
  { id: 3, title: 'Kode Area' },
  { id: 4, title: 'Alamat' },
  { id: 5, title: 'Provinsi' },
  { id: 6, title: null },
];
const columns = [
  { data: null, render: (data, type, row, meta) => meta.row + 1 },
  { data: 'nama_lokasi' },
  { data: 'delivery_area' },
  { data: 'alamat' },
  { data: 'provinsi' },
  {
    data: null,
    className: 'delete-button cursor-pointer',
    defaultContent: '<p>X</p>',
    orderable: false,
  },
];

const form = reactive({
  nama_lokasi: '',
  delivery_area: '',
  provinsi: '',
  alamat: '',
  kota: '',
  kecamatan: '',
});

const isFormValid = computed(() => {
  return (
    form.nama_lokasi.trim() !== '' &&
    form.delivery_area.trim() !== '' &&
    form.provinsi.trim() !== '' &&
    form.alamat.trim() !== '' &&
    form.kecamatan.trim() !== '' &&
    form.kota.trim() !== ''
  );
});
</script>
