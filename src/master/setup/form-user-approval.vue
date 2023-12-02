<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Form User Approval</h1>
      <div class="content-section">
        <strong>User Approval Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid grid-cols-2 my-5">
          <InputField label="User ID">
            <Input v-model="form.user_id" :options="userOptions" />
          </InputField>
          <InputField label="Warehouse">
            <Input v-model="form.warehouse" :options="warehouseOptions" />
          </InputField>
          <InputField label="Level">
            <Input v-model="form.level" :options="levelOptions" />
          </InputField>
          <InputField label="Table Name">
            <Input v-model="form.tableName" type="select" :options="tableNameOptions" />
          </InputField>
          <InputField label="Status">
            <Input v-model="form.status" type="select" :options="statusOptions" />
          </InputField>
          <InputField label="Level Type">
            <Input v-model="form.levelType" type="select" :options="levelTypeOptions" disabled />
          </InputField>
          <InputField label="Catatan Header">
            <Input v-model="form.catatan" type="textarea" />
          </InputField>
        </div>
        <Button color="success" @click="onSubmit" label="Submit" small />
      </div>
    </div>
  </LayoutMain>
</template>

<script setup>
import LayoutMain from '@/layouts/LayoutMain.vue';
import service from '@/services';
import Button from '@/components/Button.vue';
import { reactive, watch } from 'vue';

const onSubmit = () => {
  const dataToSubmit = {
    ...form,
  };
  console.log(dataToSubmit);
  service({
    method: 'POST',
    url: '/operation/m_approval',
    token: true,
    data: dataToSubmit,
  });
};

const userOptions = [
  { id: 1, label: 'Admin' },
  { id: 2, label: 'User' },
];

const warehouseOptions = [
  { id: 1, label: 'GUDANG A' },
  { id: 2, label: 'GUDANG B' },
  { id: 3, label: 'GUDANG C' },
  { id: 4, label: 'GUDANG D' },
];

const tableNameOptions = [
  { id: 1, label: 'Additional Product Transform' },
  { id: 2, label: 'Product Transform' },
];

const statusOptions = [
  { id: 1, label: 'AKTIF' },
  { id: 2, label: 'INAKTIF' },
];

const levelOptions = [
  { id: 1, label: 'Level 1' },
  { id: 2, label: 'Level 2' },
  { id: 3, label: 'Level 3' },
];

const levelTypeOptions = [
  { id: 1, label: 'Process' },
  { id: 2, label: 'Final' },
];

const form = reactive({
  user_id: userOptions[0],
  warehouse: warehouseOptions[0],
  level: levelOptions[0],
  tableName: tableNameOptions[0],
  status: statusOptions[0],
  levelType: levelOptions[2] ? levelTypeOptions[1] : levelTypeOptions[0],
  catatan: '',
});

// watch(
//   () => form.sesuai_ktp,
//   (newValue) => {
//     if (newValue) {
//       form.alamat_d = form.alamat_ktp;
//       form.rt_rw_d = form.rt_rw_ktp;
//       form.provinsi_d = form.provinsi_ktp;
//       form.kota_d = form.kota_ktp;
//       form.kecamatan_d = form.kecamatan_ktp;
//     } else {
//       form.alamat_d = '';
//       form.rt_rw_d = '';
//       form.provinsi_d = '';
//       form.kota_d = '';
//       form.kecamatan_d = '';
//     }
//   }
// );
</script>

<style></style>
