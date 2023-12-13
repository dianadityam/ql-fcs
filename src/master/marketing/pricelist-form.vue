<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Form Pricelist</h1>
      <div class="content-section">
        <strong>Pricelist Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="pt-5">
          <strong>Pricelist Detail</strong>
          <div class="grid grid-cols-4 max-w-lg gap-1 mt-5">
            <p
              @click="changeTab(1)"
              :class="
                activeTab == 1 ? tabActiveStyle : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Knitting Kain
            </p>
            <p
              @click="changeTab(2)"
              :class="
                activeTab == 2 ? tabActiveStyle : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Knitting Aksesoris
            </p>
            <p
              @click="changeTab(3)"
              :class="
                activeTab == 3 ? tabActiveStyle : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Woven
            </p>
            <p
              @click="changeTab(4)"
              :class="
                activeTab == 4 ? tabActiveStyle : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Lain-lain
            </p>
          </div>
          <KnittingKain v-if="activeTab == 1" />
          <KnittingAksesoris v-if="activeTab == 2" />
          <Woven v-if="activeTab == 3" />
          <LainLain v-if="activeTab == 4" />
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
            <!-- <Button
              type="submit"
              color="success"
              label="TeST"
              @click="handleConsole"
              :class="{ 'opacity-25': form.processing }"
              small
            /> -->
            <router-link to="/master/pricelist">
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
import KnittingKain from './pricelist-tab/knitting-kain.vue';
import KnittingAksesoris from './pricelist-tab/knitting-aksesoris.vue';
import Woven from './pricelist-tab/woven.vue';
import LainLain from './pricelist-tab/lain-lain.vue';
import { reactive, watch, computed, ref } from 'vue';
import { onMounted } from 'vue';
import { mdiMagnify, mdiPlus } from '@mdi/js';
import BaseIcon from '@/components/BaseIcon.vue';
import { useRouter } from 'vue-router';

const activeTab = ref(1);

const changeTab = (tab) => {
  activeTab.value = tab;
};

const tabActiveStyle =
  'border-b-[3px] pb-1.5 text-center border-blue-500 font-semibold cursor-pointer';

const npwpList = ref([]);
const bankDetail = ref([]);
const alamatDetail = ref([]);
const updateNpwp = (npwp) => {
  npwpList.value.push(npwp);
};

const updateBank = (bank) => {
  bankDetail.value.push(bank);
};

const updateAlamat = (alamat) => {
  alamatDetail.value.push(alamat);
};

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
    url: '/operation/m_customer',
    token: true,
    data: dataToSubmit,
  });
  form.processing = false;
};

const paymentOptions = [
  { id: 1, label: 'TUNAI' },
  { id: 2, label: 'TRANSFER' },
];

const customerTypeOptions1 = [
  { id: 1, label: 'LOKAL' },
  { id: 2, label: 'EKSTERNAL' },
];

const customerTypeOptions2 = [
  { id: 1, label: 'AGEN' },
  { id: 2, label: 'CUSTOMER' },
];

const pkpOptions = [
  { id: 1, label: 'TIDAK' },
  { id: 2, label: 'YA' },
];

const statusOptions = [
  { id: 0, label: 'Inaktif' },
  { id: 1, label: 'Aktif' },
];

const form = reactive({
  processing: false,
  kode: '',
  pkp: pkpOptions[0],
  first_name: '',
  last_name: '',
  payment: paymentOptions[0],
});

const handleConsole = () => {
  console.log(form.npwp, 'Npwp');
  console.log(form.bankDetail, 'bank');
};

// const isFormValid = computed(() => {
//   return (
//     form.nama.trim() !== '' &&
//     form.nik.trim() !== '' &&
//     form.tempat_lahir.trim() !== '' &&
//     form.tgl_lahir.trim() !== '' &&
//     form.nid.trim() !== '' &&
//     form.divisi.trim() !== '' &&
//     form.tgl_masuk.trim() !== '' &&
//     form.alamat_ktp.trim() !== '' &&
//     form.rt_rw_ktp.trim() !== '' &&
//     form.provinsi_ktp.trim() !== '' &&
//     form.kota_ktp.trim() !== '' &&
//     form.kecamatan_ktp.trim() !== '' &&
//     form.email.trim() !== '' &&
//     form.phone.trim() !== ''
//   );
// });

watch(
  () => npwpList.value,
  (newValue) => {
    if (newValue) {
      console.log(newValue);
    }
  }
);
</script>
