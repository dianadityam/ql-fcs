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
              v-model="form.kode"
              class="bg-[#D2D6DE] w-1/2 px-3 text-sm"
              disabled
            />
          </InputField>
          <InputField label="Nama">
            <Input v-model="form.nama" placeholder="Nama Ekspedisi" />
          </InputField>
          <InputField label="Credit Limit">
            <Input v-model="form.credit_limit" />
          </InputField>
          <InputField label="Payment Default">
            <Input v-model="form.default_payment" />
          </InputField>
          <InputField label="Credit Limit Terpakai">
            <Input v-model="form.credit_limit_used" type="numbers" placeholder="08123456789" />
          </InputField>
          <div>
            <InputField label="Batas Jatuh Tempo">
              <Input v-model="form.batas_jatuh_tempo" />
            </InputField>
            <InputField>
              <Input type="checkbox" v-model="form.is_bjt" label="BJT Buka Tutup" />
              <Input type="number" />
            </InputField>
          </div>
          <InputField label="Piutang Giro">
            <Input v-model="form.piutang_giro" type="numbers" />
          </InputField>
          <InputField label="Sisa Credit Limit">
            <Input v-model="form.credit_limit_sisa" />
          </InputField>
          <InputField label="Catatan">
            <Input v-model="form.catatan" />
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
  kode: '',
  nama: '',
  credit_limit: '',
  default_payment: '',
  credit_limit_used: '',
  piutang_giro: '',
  credit_limit_sisa: '',
  catatan: '',
  batas_jatuh_tempo: '',
  status: statusOptions[0],
  is_bjt: false,
});
</script>
