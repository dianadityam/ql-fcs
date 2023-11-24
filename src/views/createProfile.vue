<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Form Profile</h1>
      <div class="content-section">
        <strong>Profile Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid grid-cols-2 my-5">
          <FormField label="NIK">
            <FormControl />
          </FormField>
          <FormField label="Nama">
            <FormControl />
          </FormField>
          <FormField label="User Login">
            <FormControl />
          </FormField>
          <FormField label="Tipe User">
            <FormControl v-model="form.usertype" type="select" :options="typeOptions" />
          </FormField>
          <FormField label="Password">
            <FormControl />
          </FormField>
          <FormField label="Status">
            <FormControl v-model="form.status" type="select" :options="statusOptions" />
          </FormField>
          <FormField label="Catatan Header">
            <FormControl type="textarea" />
          </FormField>
        </div>
        <div class="grid grid-cols-2">
          <strong>Profile Detail</strong>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>

<script setup>
import LayoutMain from '@/layouts/LayoutMain.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import { reactive } from 'vue';

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
  usertype: typeOptions[0],
  status: statusOptions[0],
});
</script>
