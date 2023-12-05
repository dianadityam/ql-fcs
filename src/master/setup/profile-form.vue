<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Form Profile</h1>
      <div class="content-section">
        <strong>Profile Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid grid-cols-2 my-5">
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
          <InputField label="Nama">
            <input
              type="text"
              class="border-2 px-2 text-sm bg-[#D2D6DE]"
              disabled
              v-model="form.nama"
            />
          </InputField>
          <InputField label="User Login" required>
            <Input v-model="form.username" />
          </InputField>
          <InputField label="Tipe User">
            <Input v-model="form.usertype" type="select" :options="typeOptions" />
          </InputField>
          <InputField label="Password" required>
            <Input v-model="form.password" type="password" />
          </InputField>
          <InputField label="Status">
            <Input v-model="form.status" type="select" :options="statusOptions" />
          </InputField>
          <InputField label="Catatan Header">
            <Input v-model="form.catatan" type="textarea" />
          </InputField>
        </div>
        <div class="">
          <strong class="block my-2">Profile Detail</strong>
          <Button @click="toggleModal" color="info" class="" label="Add To List" small />
          <TableData :tableHeader="detailListHeader" :tableOptions="tableOptions" />
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
              @click="$router.push('/master/profile')"
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
      <template #footer>Custom content</template>
    </Modal>
    <Modal
      :showModal="isShowDetail"
      @toggle-modal="showDetailModal"
      @submit="setData"
      submitLabel="Pilih"
    >
      <template #header>Custom header</template>
      <template #content>
        <TableData
          :data="user"
          :columns="columns"
          :tableHeader="tableHeader"
          :tableOptions="tableOptions"
        />
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

const detailListHeader = [
  { id: 1, title: 'No.' },
  { id: 2, title: 'Kode Role' },
  { id: 3, title: 'Nama Role' },
];

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
  { id: 3, label: 'USER' },
];

const statusOptions = [
  { id: 1, label: 'AKTIF' },
  { id: 2, label: 'TIDAK AKTIF' },
];

const form = reactive({
  nik: '',
  nama: '',
  username: '',
  usertype: typeOptions[2],
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

const isFormValid = computed(() => {
  return (
    form.nik.trim() !== '' &&
    form.nama.trim() !== '' &&
    form.username.trim() !== '' &&
    form.password.trim() !== ''
  );
});
const showKaryawanModal = () => {
  if (!isShowKaryawan.value && selectedKaryawan.value.length > 0) {
    selectedKaryawan.value = [];
    isShowKaryawan.value = !isShowKaryawan.value;
  } else {
    isShowKaryawan.value = !isShowKaryawan.value;
  }
};
</script>
