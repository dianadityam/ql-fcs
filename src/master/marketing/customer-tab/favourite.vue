<template>
  <div class="grid grid-cols-2 mt-5">
    <InputField label="NIK" required>
      <div>
        <div class="w-full max-w-xs relative">
          <input
            placeholder="Cari Data"
            class="text-sm border px-2 py-1 focus:ring-1 bg-[#D2D6DE] focus:outline-none rounded-[4px] text-black w-full"
            v-model="form.nik"
            disabled
          />
          <BaseIcon
            :path="mdiMagnify"
            size="18"
            class="absolute right-0 h-7 w-9 border rounded-sm top-[1px] cursor-pointer"
            @click="showKaryawanModal"
          />
        </div>
      </div>
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
  </Modal>
</template>
<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-select';
import 'datatables.net-responsive';
import { reactive, ref, onMounted, computed } from 'vue';
import { mdiMagnify } from '@mdi/js';
import BaseIcon from '@/components/BaseIcon.vue';
import Modal from '@/components/Modal.vue';
import Button from '@/components/Button.vue';

DataTable.use(DataTablesCore);

const selectedKaryawan = ref([]);
const isShowKaryawan = ref(false);
const dataKaryawan = ref(null);

const props = defineProps(['bank', 'tableData']);
const emit = defineEmits(['update:bank']);

const showKaryawanModal = () => {
  isShowKaryawan.value = !isShowKaryawan.value;
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
