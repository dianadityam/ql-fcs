<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Form Profile</h1>
      <div class="content-section">
        <strong>Role Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid grid-cols-2 my-5">
          <FormField label="Code">
            <FormControl v-model="form.kode" />
          </FormField>
          <FormField label="Status">
            <FormControl v-model="form.status" type="select" :options="statusOptions" />
          </FormField>
          <FormField label="Nama">
            <FormControl v-model="form.nama" />
          </FormField>
        </div>
        <strong class="block my-2">Role Detail</strong>
        <div class="grid grid-cols-2 my-5">
          <FormField label="Module">
            <FormControl v-model="form.module" type="select" :options="moduleOptions" />
          </FormField>
          <FormField label="Type">
            <FormControl v-model="form.type" type="select" :options="typeOptions" />
          </FormField>
        </div>
        <Button @click="handleAddDetail" color="info" class="mb-5" label="Add To List" small />
        <TableData
          :tableHeader="detailListHeader"
          :tableOptions="tableOptions"
          :columns="columns"
          :data="roleDetail"
        />
        <div class="flex justify-between">
          <div>
            <p>Created by</p>
          </div>
          <div>
            <Button
              type="submit"
              color="success"
              label="Save"
              @click="onSubmit"
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing"
              small
            />
            <Button
              type="submit"
              color="white"
              label="Cancel"
              @click="onSubmit"
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing"
              small
              outline
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <Modal
      :showModal="isShowKaryawan"
      @toggle-modal="showKaryawanModal"
      @submit="setData"
      submitLabel="Pilih Karyawan"
    >
      <template #header>Custom header</template>
      <template #content>
        <DataTable
          :data="dataKaryawan"
          :columns="columns"
          :table-header="tableHeader"
          :options="tableKaryawanOptions"
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
      <template #footer>Custom content</template>
    </Modal> -->
  </LayoutMain>
</template>

<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-select';
import 'datatables.net-responsive';
import LayoutMain from '@/layouts/LayoutMain.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import TableData from '@/components/TableData.vue';
import Modal from '@/components/Modal.vue';
import Button from '@/components/Button.vue';
import service from '../services';
import { reactive, ref, onMounted, watch } from 'vue';

const selectedKaryawan = ref([]);
const isShowKaryawan = ref(false);
const dataKaryawan = ref(null);
const table = ref(null);

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  const result = await service({
    method: 'GET',
    url: 'operation/m_karyawan?paginate=100',
    token: true,
  });
  if (result.status === 200) {
    dataKaryawan.value = result.response.data;
  }
};

const onSubmit = () => {
  const dataToSubmit = {
    kode: form.kode,
    nama: form.nama,
    status: form.status.label,
    m_roles_permission: roleDetail.value,
  };
  console.log(dataToSubmit);
  service({
    method: 'POST',
    url: '/operation/m_roles',
    token: true,
    data: dataToSubmit,
  });
};

const roleDetail = ref([]);

const handleAddDetail = () => {
  roleDetail.value.push({
    modul: form.module.label,
    path: form.type.label,
    menu: 'Departemen',
    endpoint: `~${form.type.label.toLowerCase()}/${form.module.label.toLowerCase()}`,
  });
  console.log(roleDetail);
};

// function setData() {
//   table.value.dt.rows({ selected: true }).every(function () {
//     selectedKaryawan.value.push(this.data());
//     isShowKaryawan.value = false;
//   });
// }

const detailListHeader = [
  { id: 1, title: 'No.' },
  { id: 2, title: 'Module' },
  { id: 3, title: 'Type' },
  { id: 4, title: 'Menu Name' },
  { id: 5, title: 'URL' },
];

const columns = [
  { data: null, render: (data, type, row, meta) => meta.row + 1 },
  { data: 'modul' },
  { data: 'path' },
  { data: 'menu' },
  { data: 'endpoint' },
];

const tableOptions = {
  paging: false,
  searching: false,
  responsive: true,
  processing: true,
};

DataTable.use(DataTablesCore);

const typeOptions = [{ label: 'Master' }, { label: 'Transaction' }];

const moduleOptions = [
  { label: 'SETUP' },
  { label: 'MARKETING' },
  { label: 'PURCHASING' },
  { label: 'ACCOUNTING' },
  { label: 'HRIS' },
];

const statusOptions = [
  { id: 1, label: 'AKTIF' },
  { id: 2, label: 'TIDAK AKTIF' },
];

const form = reactive({
  kode: '',
  nama: '',
  module: moduleOptions[2],
  type: typeOptions[0],
  status: statusOptions[0],
});

watch(
  () => selectedKaryawan,
  (newSelected) => {
    const selectedRow = newSelected.value[0];
    console.log(selectedRow);
    if (selectedRow) {
      form.nik = selectedRow.nik;
      form.nama = selectedRow.nama;
    }
  },
  { deep: true }
);
const showKaryawanModal = () => {
  if (!isShowKaryawan.value && selectedKaryawan.value.length > 0) {
    selectedKaryawan.value = [];
    isShowKaryawan.value = !isShowKaryawan.value;
  } else {
    isShowKaryawan.value = !isShowKaryawan.value;
  }
};
</script>
