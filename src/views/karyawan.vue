<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Master Karyawan Form</h1>
      <div class="content-section">
        <strong>Master Karyawan Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid grid-cols-2 my-5">
          <FormField label="Nama">
            <FormControl />
          </FormField>
          <FormField label="NIK">
            <FormControl />
          </FormField>
          <FormField label="Tempat Tgl Lahir">
            <FormControl />
            <FormControl type="date" />
          </FormField>
          <FormField label="No ID">
            <FormControl />
          </FormField>
          <FormField label="Divisi">
            <FormControl />
          </FormField>
          <FormField label="Tanggal Masuk">
            <FormControl />
          </FormField>
          <FormField label="Training">
            <FormControl />
          </FormField>
          <FormField label="Tanggal Selesai">
            <FormControl />
          </FormField>
          <FormField label="Jenis Kelamin">
            <FormControl v-model="form.gender" type="select" :options="genderOptions" />
          </FormField>
          <FormField label="Agama">
            <FormControl v-model="form.religion" type="select" :options="religionOptions" />
          </FormField>
          <FormField label="Alamat KTP">
            <FormControl type="textarea" />
          </FormField>
          <FormField label="RT / RW">
            <FormControl />
          </FormField>
          <FormField label="Provinsi">
            <FormControl />
          </FormField>
          <FormField label="Kota">
            <FormControl />
          </FormField>
          <FormField label="Kecamatan">
            <FormControl />
          </FormField>
        </div>
        <div class="grid grid-cols-2">
          <FormField label="Alamat Domisili">
            <FormControl type="textarea" />
          </FormField>
          <FormField label="RT / RW">
            <FormControl />
          </FormField>
          <FormField label="Provinsi">
            <FormControl />
          </FormField>
          <FormField label="Kota">
            <FormControl />
          </FormField>
          <FormField label="Kecamatan">
            <FormControl />
          </FormField>
          <FormField label="Email">
            <FormControl />
          </FormField>
          <FormField label="Foto">
            <FormControl />
          </FormField>
          <FormField label="Phone">
            <FormControl />
          </FormField>
          <FormField label="Status">
            <FormControl />
          </FormField>
          <FormField>
            <FormControl />
          </FormField>
          <FormField label="Catatan">
            <FormControl />
          </FormField>
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

const genderOptions = [
  { id: 1, label: 'L' },
  { id: 2, label: 'P' },
];

const religionOptions = [
  { id: 1, label: 'ISLAM' },
  { id: 2, label: 'KRISTEN' },
  { id: 3, label: 'HINDU' },
  { id: 4, label: 'BUDDHA' },
  { id: 5, label: 'KONGHUCU' },
];

const form = reactive({
  gender: genderOptions[0],
  religion: religionOptions[0],
});
</script>
