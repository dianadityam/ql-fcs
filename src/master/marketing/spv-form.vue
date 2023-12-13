<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Master SPV Form</h1>
      <div class="content-section">
        <strong>Master SPV Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="my-5">
          <InputField label="Kode">
            <input
              type="text"
              class="border-2 px-2 text-sm bg-[#D2D6DE] max-w-xs px-2 py-1 rounded-[4px] my-1"
              disabled
              v-model="form.kode"
            />
          </InputField>
          <InputField label="Nama SPV" required>
            <div>
              <div class="w-full max-w-xs relative my-1">
                <input
                  placeholder="Cari Data"
                  class="text-sm border px-2 py-1 focus:ring-1 bg-[#D2D6DE] focus:outline-none rounded-[4px] text-black w-full"
                  v-model="form.spv"
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
          <InputField label="Status">
            <Input v-model="form.status" type="select" :options="statusOptions" />
          </InputField>
        </div>
        <div class="">
          <strong class="block my-2">Master SPV Detail</strong>
          <InputField label="Nama Sales" required>
            <div>
              <div class="w-full max-w-xs relative">
                <input
                  placeholder="Cari Data"
                  class="text-sm border px-2 py-1 focus:ring-1 bg-[#D2D6DE] focus:outline-none rounded-[4px] text-black w-full"
                  v-model="form.sales"
                  disabled
                />
                <BaseIcon
                  :path="mdiMagnify"
                  size="18"
                  class="absolute right-0 h-7 w-9 border rounded-sm top-[1px] cursor-pointer"
                  @click="showSalesModal"
                />
              </div>
            </div>
          </InputField>
          <Button @click="toggleModal" color="info" class="" label="Add To List" small />
          <TableData
            :tableHeader="detailListHeader"
            :tableOptions="tableOptions"
            :data="selectedSales"
            :columns="detailListColumns"
          />
        </div>
        <div class="flex justify-between">
          <div>
            <p>Test</p>
          </div>
          <div>
            <Button
              type="submit"
              color="success"
              label="Save"
              @click="onSubmit"
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing || !isFormValid"
              small
            />
            <Button
              type="submit"
              color="white"
              label="Cancel"
              class="ml-2"
              @click="$router.push('/master/spv')"
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing"
              small
              outline
            />
          </div>
        </div>
      </div>
    </div>
    <Modal
      :showModal="isShowKaryawan"
      @toggle-modal="showKaryawanModal"
      @submit="setDataSpv"
      submitLabel="Pilih SPV"
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
      <template #footer>Custom content</template>
    </Modal>
    <Modal
      :showModal="isShowSales"
      @toggle-modal="showSalesModal"
      @submit="setDataSales"
      submitLabel="Pilih Sales"
    >
      <template #header>Custom header</template>
      <template #content>
        <!-- <TableData
          :data="user"
          :columns="columns"
          :tableHeader="tableHeader"
          :tableOptions="tableOptions"
        /> -->
        <DataTable
          :data="dataKaryawan"
          :columns="columns"
          :table-header="tableHeader"
          :options="tableKaryawanOptions"
          class="stripe pageResize"
          ref="tableSales"
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
      <template #footer>Custom content</template>
    </Modal>
  </LayoutMain>
</template>

<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-select';
import 'datatables.net-responsive';
import Modal from '@/components/Modal.vue';
import Button from '@/components/Button.vue';
import service from '@/services';
import BaseIcon from '@/components/BaseIcon.vue';
import { mdiMagnify } from '@mdi/js';
import { reactive, ref, onMounted, watch, computed } from 'vue';

const selectedKaryawan = ref([]);
const selectedSales = ref([]);
const isShowKaryawan = ref(false);
const isShowSales = ref(false);
const dataKaryawan = ref(null);
const tableSales = ref(null);
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
  const spvDet = selectedSales.value.map((item) => {
    item.nama;
  });
  const dataToSubmit = {
    ...form,
    is_active: form.status.id,
    m_spv_det: selectedSales.value,
  };
  console.log(dataToSubmit);
  service({
    method: 'POST',
    url: '/operation/m_spv',
    token: true,
    data: dataToSubmit,
  });
};

const setDataSpv = () => {
  table.value.dt.rows({ selected: true }).every(function () {
    selectedKaryawan.value.push(this.data());
    isShowKaryawan.value = false;
  });
};

const setDataSales = () => {
  tableSales.value.dt.rows({ selected: true }).every(function () {
    selectedSales.value.push(this.data());
    isShowSales.value = false;
  });
};

const detailListHeader = [
  { id: 1, title: 'No.' },
  { id: 2, title: 'Nama Sales' },
];

const detailListColumns = [
  { data: null, render: (data, type, row, meta) => meta.row + 1 },
  { data: 'nama' },
];

const tableOptions = {
  paging: false,
  searching: false,
  responsive: true,
  processing: true,
};

DataTable.use(DataTablesCore);
const tableKaryawanOptions = {
  select: true,
};

const tableHeader = [
  { id: 1, title: 'NIK' },
  { id: 2, title: 'Nama' },
  { id: 3, title: 'Alamat' },
  { id: 4, title: null },
];

const columns = [{ data: 'nik' }, { data: 'nama' }, { data: 'alamat_d' }, { data: 'id' }];

const statusOptions = [
  { id: 0, label: 'TIDAK AKTIF' },
  { id: 1, label: 'AKTIF' },
];

const form = reactive({
  kode: 'SPV001',
  spv: '',
  sales: '',
  status: statusOptions[0],
  spv_id: '',
});

watch(
  () => selectedKaryawan,
  (newSelected) => {
    const selectedRow = newSelected.value[0];
    console.log(selectedRow);
    if (selectedRow) {
      form.spv = selectedRow.nama;
      form.spv_id = selectedRow.id;
    }
  },
  { deep: true }
);

const isFormValid = computed(() => {
  return selectedSales.value.length > 0 && form.spv.trim() !== '';
});
const showKaryawanModal = () => {
  if (!isShowKaryawan.value && selectedKaryawan.value.length > 0) {
    selectedKaryawan.value = [];
    isShowKaryawan.value = !isShowKaryawan.value;
  } else {
    isShowKaryawan.value = !isShowKaryawan.value;
  }
};

const showSalesModal = () => {
  isShowSales.value = !isShowSales.value;
};
</script>
