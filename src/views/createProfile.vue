<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Form Profile</h1>
      <div class="content-section">
        <strong>Profile Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid grid-cols-2 my-5">
          <FormField label="NIK">
            <div>
              <input type="text" class="border-2 px-2" v-model="form.nik" disabled />
              <button @click="showKaryawanModal">Cari</button>
            </div>
          </FormField>
          <FormField label="Nama">
            <input type="text" class="border-2 px-2" disabled v-model="form.nama" />
          </FormField>
          <FormField label="User Login">
            <FormControl v-model="form.username" />
          </FormField>
          <FormField label="Tipe User">
            <FormControl v-model="form.usertype" type="select" :options="typeOptions" />
          </FormField>
          <FormField label="Password">
            <FormControl v-model="form.password" />
          </FormField>
          <FormField label="Status">
            <FormControl v-model="form.status" type="select" :options="statusOptions" />
          </FormField>
          <FormField label="Catatan Header">
            <FormControl v-model="form.catatan" type="textarea" />
          </FormField>
        </div>
        <div class="">
          <strong>Profile Detail</strong>
          <button @click="toggleModal">Add To List</button>
          <TableData :tableHeader="tableHeader" :tableOptions="tableOptions" />
        </div>
        <Button
          type="submit"
          color="info"
          label="Confirm"
          @click="onSubmit"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        />
      </div>
    </div>
    <Modal
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
    </Modal>
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

let dt;
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
    ...form,
    usertype: form.usertype.label,
    status: form.status.label,
  };
  console.log(dataToSubmit);
  service({
    method: 'POST',
    url: '/operation/default_users',
    token: true,
    data: dataToSubmit,
  });
};

function setData() {
  table.value.dt.rows({ selected: true }).every(function () {
    selectedKaryawan.value.push(this.data());
    isShowKaryawan.value = false;
  });
}

const tableOptions = {
  paging: false,
  searching: false,
  responsive: true,
  processing: true,
};

DataTable.use(DataTablesCore);
const tableKaryawanOptions = {
  select: {
    selector: 'td:first-child',
  },
};

const tableHeader = [
  { id: 1, title: 'NIK' },
  { id: 2, title: 'Nama' },
  { id: 3, title: 'Alamat' },
  { id: 4, title: null },
];

const columns = [{ data: 'nik' }, { data: 'nama' }, { data: 'alamat_d' }, { data: 'id' }];

const typeOptions = [
  { id: 1, label: 'SUPER ADMIN' },
  { id: 2, label: 'ADMIN' },
  { id: 3, label: 'MARKETING' },
  { id: 4, label: 'USER' },
];

const statusOptions = [
  { id: 1, label: 'AKTIF' },
  { id: 2, label: 'TIDAK AKTIF' },
];

const form = reactive({
  nik: null,
  nama: '',
  usertype: typeOptions[0],
  status: statusOptions[0],
  password: '',
  catatan: '',
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
