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
            <input
              type="text"
              v-model="form.levelType"
              class="bg-[#D2D6DE] w-1/2 px-3 text-sm"
              disabled
            />
          </InputField>
          <InputField label="Catatan Header">
            <Input v-model="form.catatan" type="textarea" />
          </InputField>
        </div>
        <div class="flex justify-between border-t-2 py-3">
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
            <router-link to="/master/user-approval">
              <Button
                type="submit"
                color="white"
                label="Cancel"
                class="ml-2"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
                small
              />
            </router-link>
          </div>
        </div>
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
    user_id: form.user_id.label,
    warehouse: form.warehouse.label,
    level: form.level.label,
    table_name: form.tableName.label,
    status: form.status.is_active,
    leveltype: form.levelType,
    note: form.catatan,
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
  { is_active: 0, label: 'INAKTIF' },
  { is_active: 1, label: 'AKTIF' },
];

const levelOptions = [
  { id: 1, label: 'Level 1' },
  { id: 2, label: 'Level 2' },
  { id: 3, label: 'Level 3' },
];

const form = reactive({
  user_id: userOptions[0],
  warehouse: warehouseOptions[0],
  level: levelOptions[0],
  tableName: tableNameOptions[0],
  status: statusOptions[0],
  levelType: 'Proccess',
  catatan: '',
});

watch(
  () => form.level,
  (newValue) => {
    console.log(newValue);
    if (newValue.label === 'Level 3') {
      form.levelType = 'Final';
    } else {
      form.levelType = 'Process';
    }
  }
);
</script>
