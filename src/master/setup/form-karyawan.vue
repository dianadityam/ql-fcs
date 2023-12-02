<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Master Karyawan Form</h1>
      <div class="content-section">
        <strong>Master Karyawan Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid grid-cols-2 my-5">
          <InputField label="Nama" required>
            <Input v-model="form.nama" />
          </InputField>
          <InputField label="NIK" required>
            <Input v-model="form.nik" />
          </InputField>
          <InputField label="Tempat Tgl Lahir" required>
            <Input v-model="form.tempat_lahir" />
            <Input type="date" v-model="form.tgl_lahir" />
          </InputField>
          <InputField label="No ID" required>
            <Input v-model="form.nid" />
          </InputField>
          <InputField label="Divisi" required>
            <Input v-model="form.divisi" />
          </InputField>
          <InputField label="Tanggal Masuk" required>
            <Input v-model="form.tgl_masuk" type="date" />
          </InputField>
          <InputField label="Training">
            <Input type="checkbox" v-model="form.training" label="YA" />
          </InputField>
          <InputField label="Tanggal Selesai">
            <Input v-model="form.tgl_selesai" type="date" />
          </InputField>
          <InputField label="Jenis Kelamin" required>
            <Input v-model="form.jenis_kelamin" type="select" :options="genderOptions" />
          </InputField>
          <InputField label="Agama" required>
            <Input v-model="form.agama" type="select" :options="religionOptions" />
          </InputField>
          <InputField label="Alamat KTP" required>
            <Input type="textarea" v-model="form.alamat_ktp" />
          </InputField>
          <InputField label="RT / RW" required>
            <Input v-model="form.rt_rw_ktp" />
          </InputField>
          <InputField label="Provinsi" required>
            <Input v-model="form.provinsi_ktp" />
          </InputField>
          <InputField label="Kota" required>
            <Input v-model="form.kota_ktp" />
          </InputField>
          <InputField label="Kecamatan" required>
            <Input v-model="form.kecamatan_ktp" />
          </InputField>
        </div>
        <div class="grid grid-cols-2">
          <InputField label="Alamat Domisili">
            <Input type="checkbox" id="sesuai_ktp" v-model="form.sesuai_ktp" label="Sesuai KTP" />
          </InputField>
          <InputField label=" "><Input class="hidden" /></InputField>
          <InputField label=" ">
            <Input type="textarea" v-model="form.alamat_d" />
          </InputField>
          <InputField label="RT / RW">
            <Input v-model="form.rt_rw_d" />
          </InputField>
          <InputField label="Provinsi">
            <Input v-model="form.provinsi_d" />
          </InputField>
          <InputField label="Kota">
            <Input v-model="form.kota_d" />
          </InputField>
          <InputField label="Kecamatan">
            <Input v-model="form.kecamatan_d" />
          </InputField>
          <InputField label=" "><Input class="hidden" /> </InputField>
          <InputField label="Email" required>
            <Input v-model="form.email" required />
          </InputField>
          <InputField label="Phone" required>
            <Input v-model="form.phone" required />
          </InputField>
          <InputField label="Foto">
            <InputFile />
          </InputField>
          <div>
            <InputField label="Status" required>
              <Input v-model="form.status" type="select" :options="statusOptions" required />
            </InputField>
            <div class="mt-3">
              <InputField label="Catatan">
                <Input v-model="form.catatan" type="textarea" />
              </InputField>
            </div>
          </div>
        </div>
        <div class="flex justify-between border-t-2 py-3 mt-5">
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
              :disabled="form.processing || !isFormValid"
              small
            />
            <router-link to="/master/karyawan">
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
import service from '@/services';
import InputFile from '@/components/InputFile.vue';
import Button from '@/components/Button.vue';
import { reactive, watch, computed } from 'vue';

const onSubmit = () => {
  form.processing = true;
  const dataToSubmit = {
    ...form,
    agama: form.agama.label,
    jenis_kelamin: form.jenis_kelamin.label,
    is_active: form.status.id,
  };
  console.log(dataToSubmit);
  service({
    method: 'POST',
    url: '/operation/m_karyawan',
    token: true,
    data: dataToSubmit,
  });
  form.processing = false;
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
  { id: 0, label: 'Inaktif' },
  { id: 1, label: 'Aktif' },
];

const form = reactive({
  processing: false,
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
  status: statusOptions[1],
  catatan: '',
});

const isFormValid = computed(() => {
  return (
    form.nama.trim() !== '' &&
    form.nik.trim() !== '' &&
    form.tempat_lahir.trim() !== '' &&
    form.tgl_lahir.trim() !== '' &&
    form.nid.trim() !== '' &&
    form.divisi.trim() !== '' &&
    form.tgl_masuk.trim() !== '' &&
    form.alamat_ktp.trim() !== '' &&
    form.rt_rw_ktp.trim() !== '' &&
    form.provinsi_ktp.trim() !== '' &&
    form.kota_ktp.trim() !== '' &&
    form.kecamatan_ktp.trim() !== '' &&
    form.email.trim() !== '' &&
    form.phone.trim() !== ''
  );
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
</script>
