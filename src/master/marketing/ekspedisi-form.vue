<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Master Ekspedisi</h1>
      <div class="content-section">
        <strong>Master Ekspedisi Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid grid-cols-2 my-5">
          <InputField label="Kode">
            <input
              type="text"
              v-model="form.code"
              class="bg-[#D2D6DE] w-1/2 px-3 text-sm"
              disabled
            />
          </InputField>
          <InputField label="Nama">
            <Input v-model="form.nama" placeholder="Nama Ekspedisi" />
          </InputField>
          <InputField label="Cabang">
            <Input v-model="form.cabang" placeholder="Cabang A" />
          </InputField>
          <InputField label="Contact Person">
            <Input v-model="form.cp" />
          </InputField>
          <InputField label="No. Telepon">
            <Input v-model="form.no_telp" type="numbers" placeholder="08123456789" />
          </InputField>
          <InputField label="Nama Bank">
            <Input v-model="form.bank" type="select" :options="bankOptions" />
          </InputField>
          <InputField label="No. Rekening">
            <Input v-model="form.no_rekening" type="numbers" />
          </InputField>
          <InputField label="Kode Area Bank">
            <Input v-model="form.kode_area" />
          </InputField>
          <InputField label="Nama Rekening">
            <Input v-model="form.nama_rekening" />
          </InputField>
          <InputField label="Status">
            <Input v-model="form.status" type="select" :options="statusOptions" />
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
            <router-link to="/master/ekspedisi">
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
    ...form,
    is_active: form.status.is_active,
  };
  console.log(dataToSubmit);
  service({
    method: 'POST',
    url: '/operation/m_ekspedisi',
    token: true,
    data: dataToSubmit,
  });
};

const bankOptions = ['BCA', 'BNI', 'BRI', 'Mandiri'];

const statusOptions = [
  { is_active: 0, label: 'INAKTIF' },
  { is_active: 1, label: 'AKTIF' },
];

const form = reactive({
  code: '',
  nama: '',
  cabang: '',
  cp: '',
  no_telp: '',
  no_rekening: '',
  kode_area: '',
  nama_rekening: '',
  bank: bankOptions[0],
  status: statusOptions[0],
});

// watch(
//   () => form.level,
//   (newValue) => {
//     console.log(newValue);
//     if (newValue.label === 'Level 3') {
//       form.levelType = 'Final';
//     } else {
//       form.levelType = 'Process';
//     }
//   }
// );
</script>
