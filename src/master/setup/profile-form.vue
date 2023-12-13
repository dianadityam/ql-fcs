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
              v-model="form.name"
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
          <Button @click="showDetailModal" color="info" class="" label="Add To List" small />
          <DataTable
            :data="roleDetail"
            :columns="roleColumns"
            :table-header="detailListHeader"
            :options="tableOptions"
            class="stripe pageResize"
            ref="table"
          >
            <thead>
              <tr>
                <th v-for="item in detailListHeader" :key="item.id">{{ item.title }}</th>
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
      @submit="setDataKaryawan"
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
      @submit="addRole"
      submitLabel="Tambah"
    >
      <template #header>Custom header</template>
      <template #content>
        <DataTable
          :data="roleData"
          :columns="roleColumns"
          :table-header="roleHeader"
          :options="tableKaryawanOptions"
          class="stripe pageResize"
          ref="tableRole"
        >
          <thead>
            <tr>
              <th v-for="item in roleHeader" :key="item.id">{{ item.title }}</th>
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
import { useRoute } from 'vue-router';

DataTable.use(DataTablesCore);

const route = useRoute();
const { id } = route.params;

const selectedKaryawan = ref([]);
const isShowKaryawan = ref(false);
const dataKaryawan = ref(null);
const table = ref(null);
const roleData = ref(null);
const tableRole = ref(null);
const roleDetail = ref([]);
const isShowDetail = ref(false);

onMounted(() => {
  fetchDataKaryawan();
  fetchRoleData();
  if (id) {
    updateValue();
  }
});

const updateValue = async () => {
  const result = await service({
    method: 'GET',
    url: `/operation/default_users/${id}`,
    token: true,
  });
  if (result.status === 200) {
    const response = result.response.data;
    fillForm(response);
    form.status = statusOptions.find((x) => x.id === response.is_active);
  }
};

const fillForm = () => {
  for (const key in form) {
    if (key in data) {
      form[key] = data[key];
    }
  }
};
const fetchDataKaryawan = async () => {
  const result = await service({
    method: 'GET',
    url: 'operation/m_karyawan?paginate=100',
    token: true,
  });
  if (result.status === 200) {
    dataKaryawan.value = result.response.data;
  }
};

const fetchRoleData = async () => {
  const result = await service({
    method: 'GET',
    url: 'operation/m_roles',
    token: true,
  });
  if (result.status === 200) {
    roleData.value = result.response.data;
  }
};

const onSubmit = () => {
  const dataToSubmit = {
    ...form,
    is_active: form.status.id,
  };
  console.log(dataToSubmit);
  service({
    method: 'POST',
    url: '/operation/default_users',
    token: true,
    data: dataToSubmit,
  });
};

const setDataKaryawan = () => {
  table.value.dt.rows({ selected: true }).every(function () {
    selectedKaryawan.value.push(this.data());
    isShowKaryawan.value = false;
  });
};

const addRole = () => {
  tableRole.value.dt.rows({ selected: true }).every(function () {
    roleDetail.value.push(this.data());
    isShowDetail.value = false;
  });
};

const detailListHeader = [
  { id: 1, title: 'No.' },
  { id: 2, title: 'Kode Role' },
  { id: 3, title: 'Nama Role' },
];

const tableHeader = [
  { id: 1, title: 'NIK' },
  { id: 2, title: 'Nama' },
  { id: 3, title: 'Alamat' },
  { id: 4, title: null },
];

const roleHeader = [
  { id: 1, title: 'ID' },
  { id: 2, title: 'Kode Role' },
  { id: 3, title: 'Nama Role' },
];

const columns = [{ data: 'nik' }, { data: 'nama' }, { data: 'alamat_d' }, { data: 'id' }];

const roleColumns = [{ data: 'id' }, { data: 'kode' }, { data: 'nama' }];

const tableOptions = {
  paging: false,
  searching: false,
  responsive: true,
  processing: true,
};

const tableKaryawanOptions = {
  select: true,
};

const typeOptions = ['SUPER ADMIN', 'ADMIN', 'USER'];

const statusOptions = [
  { id: 0, label: 'TIDAK AKTIF' },
  { id: 1, label: 'AKTIF' },
];

const form = reactive({
  nik: '',
  name: '',
  username: '',
  usertype: typeOptions[2],
  status: statusOptions[1],
  password: '',
  catatan: '',
  default_user_roles: roleDetail.value,
});

watch(
  () => selectedKaryawan,
  (newSelected) => {
    const selectedRow = newSelected.value[0];
    console.log(selectedRow);
    if (selectedRow) {
      form.nik = selectedRow.nik;
      form.name = selectedRow.nama;
    }
  },
  { deep: true }
);

const isFormValid = computed(() => {
  return (
    form.nik.trim() !== '' &&
    form.name.trim() !== '' &&
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

const showDetailModal = () => {
  isShowDetail.value = !isShowDetail.value;
};
</script>
