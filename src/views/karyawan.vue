<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Master Karyawan Form</h1>
      <div class="content-section">
        <strong>Master Karyawan Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid grid-cols-2 my-5">
          <FormField label="Nama">
            <FormControl v-model="form.nama" />
          </FormField>
          <FormField label="NIK">
            <FormControl v-model="form.nik" />
          </FormField>
          <FormField label="Tempat Tgl Lahir">
            <FormControl v-model="form.tempat_lahir" />
            <FormControl type="date" v-model="form.tgl_lahir" />
          </FormField>
          <FormField label="No ID">
            <FormControl v-model="form.nid" />
          </FormField>
          <FormField label="Divisi">
            <FormControl v-model="form.divisi" />
          </FormField>
          <FormField label="Tanggal Masuk">
            <FormControl v-model="form.tgl_masuk" type="date" />
          </FormField>
          <FormField label="Training">
            <FormControl type="checkbox" v-model="form.training" />
          </FormField>
          <FormField label="Tanggal Selesai">
            <FormControl v-model="form.tgl_selesai" type="date" />
          </FormField>
          <FormField label="Jenis Kelamin">
            <FormControl v-model="form.jenis_kelamin" type="select" :options="genderOptions" />
          </FormField>
          <FormField label="Agama">
            <FormControl v-model="form.agama" type="select" :options="religionOptions" />
          </FormField>
          <FormField label="Alamat KTP">
            <FormControl type="textarea" v-model="form.alamat_ktp" />
          </FormField>
          <FormField label="RT / RW">
            <FormControl v-model="form.rt_rw_ktp" />
          </FormField>
          <FormField label="Provinsi">
            <FormControl v-model="form.provinsi_ktp" />
          </FormField>
          <FormField label="Kota">
            <FormControl v-model="form.kota_ktp" />
          </FormField>
          <FormField label="Kecamatan">
            <FormControl v-model="form.kecamatan_ktp" />
          </FormField>
        </div>
        <div class="grid grid-cols-2">
          <FormField label="Alamat Domisili">
            <FormControl type="checkbox" v-model="form.sesuai_ktp" />
          </FormField>
          <FormField label="RT / RW">
            <FormControl v-model="form.rt_rw_d" />
          </FormField>
          <FormField label=" ">
            <FormControl type="textarea" v-model="form.alamat_d" />
          </FormField>
          <FormField label="Provinsi">
            <FormControl v-model="form.provinsi_d" />
          </FormField>
          <FormField label="Kota">
            <FormControl v-model="form.kota_d" />
          </FormField>
          <FormField label="Kecamatan">
            <FormControl v-model="form.kecamatan_d" />
          </FormField>
          <FormField label="Email">
            <FormControl v-model="form.email" />
          </FormField>
          <FormField label="Foto">
            <FormControl />
          </FormField>
          <FormField label="Phone">
            <FormControl v-model="form.phone" />
          </FormField>
          <FormField label="Status">
            <FormControl v-model="form.status" type="select" :options="statusOptions" />
          </FormField>
          <!-- <FormField>
            <FormControl />
          </FormField> -->
          <FormField label="Catatan">
            <FormControl v-model="form.catatan" />
          </FormField>
        </div>
        <button class="bg-red-600 text-white p-2 m-10" @click="onSubmit">Submit</button>
      </div>
    </div>
  </LayoutMain>
</template>

<script setup>
import LayoutMain from '@/layouts/LayoutMain.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import service from '../services';
import { reactive, watch } from 'vue';

const onSubmit = () => {
  const dataToSubmit = {
    ...form,
    agama: form.agama.label,
    jenis_kelamin: form.jenis_kelamin.label,
    status: form.status.label,
  };
  console.log(dataToSubmit);
  service({
    method: 'POST',
    url: '/operation/m_karyawan',
    token: true,
    data: dataToSubmit,
  });
};

const genderOptions = [
  { id: 1, label: 'Laki-laki' },
  { id: 2, label: 'Perempuan' },
];

const religionOptions = [
  { id: 1, label: 'ISLAM' },
  { id: 2, label: 'KRISTEN' },
  { id: 3, label: 'HINDU' },
  { id: 4, label: 'BUDDHA' },
  { id: 5, label: 'KONGHUCU' },
];

const statusOptions = [
  { id: 1, label: 'Aktif' },
  { id: 2, label: 'Inaktif' },
];

const form = reactive({
  nama: '',
  nik: '',
  tempat_lahir: '',
  tgl_lahir: '',
  nid: '',
  divisi: '',
  tgl_masuk: '',
  training: false,
  tgl_selesai: '',
  jenis_kelamin: genderOptions[0],
  agama: religionOptions[0],
  alamat_ktp: '',
  rt_rw_ktp: '',
  provinsi_ktp: '',
  kota_ktp: '',
  kecamatan_ktp: '',
  sesuai_ktp: false,
  alamat_d: '',
  rt_rw_d: '',
  provinsi_d: '',
  kota_d: '',
  kecamatan_d: '',
  email: '',
  phone: '',
  status: statusOptions[0],
  catatan: '',
});

watch(
  () => form.sesuai_ktp,
  (newValue) => {
    if (newValue) {
      form.alamat_d = form.alamat_ktp;
      form.rt_rw_d = form.rt_rw_ktp;
      form.provinsi_d = form.provinsi_ktp;
      form.kota_d = form.kota_ktp;
      form.kecamatan_d = form.kecamatan_ktp;
    } else {
      form.alamat_d = '';
      form.rt_rw_d = '';
      form.provinsi_d = '';
      form.kota_d = '';
      form.kecamatan_d = '';
    }
  }
);

console.log(form, 'form');
// onMounted(() => {});
</script>
