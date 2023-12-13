<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Form Profile</h1>
      <div class="content-section">
        <strong>Role Header</strong>
        <p v-if="$route.params.id" class="font-bold text-red-600 mt-5">Edit Data</p>
        <p v-else class="font-bold text-red-600 mt-5">New Data</p>
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
              @click="$router.push('/master/role')"
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing"
              small
              outline
            />
          </div>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>

<script setup>
import LayoutMain from '@/layouts/LayoutMain.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import TableData from '@/components/TableData.vue';
import Button from '@/components/Button.vue';
import service from '@/services';
import { useRoute } from 'vue-router';
import { reactive, ref, onMounted, watch } from 'vue';

const route = useRoute();

onMounted(() => {
  if (route.params.id) {
    updateValue();
  }
});

const onSubmit = () => {
  const dataToSubmit = {
    kode: form.kode,
    nama: form.nama,
    is_active: form.status.id,
    m_roles_permission: roleDetail.value,
  };
  console.log(dataToSubmit);
  service({
    method: route.params.id ? 'PUT' : 'POST',
    url: route.params.id ? '/operation/m_roles/' + route.params.id : '/operation/m_roles',
    token: true,
    data: dataToSubmit,
  });
};

const roleDetail = ref([]);

const handleAddDetail = () => {
  roleDetail.value.push({
    modul: form.module,
    path: form.type,
    menu: 'Departemen',
    endpoint: `~${form.type.label.toLowerCase()}/${form.module.label.toLowerCase()}`,
  });
  console.log(roleDetail);
};

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

const typeOptions = ['Master', 'Transaction'];

const moduleOptions = ['SETUP', 'MARKETING', 'PURCHASING', 'ACCOUNTING', 'HRIS'];

const statusOptions = [
  { id: 0, label: 'TIDAK AKTIF' },
  { id: 1, label: 'AKTIF' },
];

const form = reactive({
  kode: '',
  nama: '',
  module: moduleOptions[2],
  type: typeOptions[0],
  status: statusOptions[1],
});

const updateValue = async () => {
  const result = await service({
    method: 'GET',
    url: '/operation/m_roles/' + route.params.id,
    token: true,
  });
  if (result.status === 200) {
    console.log(result);
    const response = result.response.data;
    form.kode = response.kode;
    form.nama = response.nama;
    form.module = moduleOptions.find((x) => x === response.m_roles_permission[0].modul);
    form.type = typeOptions.find((x) => x === response.m_roles_permission[0].path);
    form.status = response.is_active ? statusOptions[1] : statusOptions[0];
    roleDetail.value = response.m_roles_permission;
  }
};
</script>
