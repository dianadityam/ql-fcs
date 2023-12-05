<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Form Customer</h1>
      <div class="content-section">
        <strong>Customer Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid grid-cols-2 mt-5">
          <InputField label="Kode" required>
            <Input v-model="form.kode" placeholder="C0001" />
          </InputField>
          <InputField label="PKP" required>
            <Input v-model="form.pkp" :options="pkpOptions" />
          </InputField>
          <InputField label="Nama" required>
            <Input v-model="form.first_name" placeholder="PT" />
            <Input v-model="form.last_name" />
          </InputField>
          <InputField label="Cara Bayar" required>
            <Input v-model="form.payment" :options="paymentOptions" />
          </InputField>
          <InputField label="ToP" required>
            <Input v-model="form.ToP" />
          </InputField>
          <InputField label="Tipe Customer" required>
            <Input v-model="form.customer_type1" :options="customerTypeOptions1" />
            <Input v-model="form.customer_type2" :options="customerTypeOptions2" />
          </InputField>
          <InputField label="Credit Limit (IDR)">
            <Input v-model="form.credit_limit" />
          </InputField>
          <InputField label="Tolerance ToP (Day)" required>
            <Input v-model="form.toleransi_top" placeholder="30" />
          </InputField>
          <InputField label="Foto KTP">
            <InputFile />
          </InputField>
          <InputField label="Sisa Kredit Limit" required>
            <input
              type="text"
              v-model="form.sisa_credit_limit"
              class="bg-[#D2D6DE] px-3 text-sm h-8"
              disabled
            />
          </InputField>
          <InputField label="SPPKP">
            <InputFile />
          </InputField>
          <InputField label="Surat Pernyataan">
            <InputFile />
          </InputField>
          <InputField label="Alamat" required>
            <Input type="textarea" v-model="form.alamat" />
          </InputField>
          <InputField label="Provinsi" required>
            <Input v-model="form.provinsi" />
          </InputField>
          <InputField label="Kota" required>
            <Input v-model="form.kota" />
          </InputField>
          <InputField label="Kecamatan" required>
            <Input v-model="form.kecamatan" />
          </InputField>
          <InputField label="Kode Pos">
            <Input v-model="form.kode_pos" />
          </InputField>
        </div>
        <div class="grid grid-cols-2 mt-3">
          <InputField label="Fax 1">
            <Input v-model="form.fax1" />
          </InputField>
          <InputField label="Fax 2">
            <Input v-model="form.fax2" />
          </InputField>
          <InputField label="Phone 1">
            <Input v-model="form.phone1" />
          </InputField>
          <InputField label="Phone 2">
            <Input v-model="form.phone2" />
          </InputField>
          <InputField label="Contact person 1" required>
            <Input v-model="form.cp1" />
          </InputField>
          <InputField label="Contact person 2">
            <Input v-model="form.cp2" />
          </InputField>
          <InputField label="Phone CP 1" required>
            <Input v-model="form.phone_cp1" />
          </InputField>
          <InputField label="Phone CP 2">
            <Input v-model="form.phone_cp2" />
          </InputField>
          <InputField label="Email CP 1">
            <Input v-model="form.email_cp1" />
          </InputField>
          <InputField label="Email CP 2">
            <Input v-model="form.email_cp2" />
          </InputField>
          <InputField label="Delivery Area">
            <Input v-model="form.delivery_area" />
          </InputField>
        </div>
        <div class="grid grid-cols-2 mt-3">
          <InputField label="Bank Penerima">
            <Input v-model="form.bank_penerima" />
          </InputField>
          <InputField label="No. Rekening">
            <Input v-model="form.no_rekening" />
          </InputField>
          <InputField label="Nama Penerima">
            <Input v-model="form.nama_penerima" />
          </InputField>
          <InputField label="Kode Area">
            <Input v-model="form.kode_area" />
          </InputField>
          <InputField label="Lattitude" required>
            <Input v-model="form.lattitude" />
          </InputField>
          <InputField label="Longitude">
            <Input v-model="form.longitude" />
          </InputField>
          <InputField label="Catatan">
            <Input v-model="form.catatan" type="textarea" />
          </InputField>
          <InputField label="Status">
            <Input v-model="form.status" :options="statusOptions" />
          </InputField>
        </div>
        <div class="pt-5">
          <strong>Customer Detail</strong>
          <div class="grid grid-cols-4 max-w-lg gap-1 mt-5">
            <p
              @click="changeTab(1)"
              :class="
                activeTab == 1 ? tabActiveStyle : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Detail Alamat
            </p>
            <p
              @click="changeTab(2)"
              :class="
                activeTab == 2 ? tabActiveStyle : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Item Favorite
            </p>
            <p
              @click="changeTab(3)"
              :class="
                activeTab == 3 ? tabActiveStyle : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Bank Detail
            </p>
            <p
              @click="changeTab(4)"
              :class="
                activeTab == 4 ? tabActiveStyle : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              NPWP Detail
            </p>
          </div>
          <AlamatDetail
            v-if="activeTab == 1"
            @update:alamat="updateAlamat"
            :tableData="alamatDetail"
          />
          <FavItem v-if="activeTab == 2" />
          <BankDetail v-if="activeTab == 3" @update:bank="updateBank" :tableData="bankDetail" />
          <NpwpDetail v-if="activeTab == 4" @update:npwp="updateNpwp" :tableData="npwpList" />
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
            <Button
              type="submit"
              color="success"
              label="TeST"
              @click="handleConsole"
              :class="{ 'opacity-25': form.processing }"
              small
            />
            <router-link to="/master/customer">
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
import AlamatDetail from './customer-tab/alamat.vue';
import NpwpDetail from './customer-tab/npwp.vue';
import BankDetail from './customer-tab/bank.vue';
import FavItem from './customer-tab/favourite.vue';
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
  ToP: '',
  customer_type1: customerTypeOptions1[0],
  customer_type2: customerTypeOptions2[0],
  credit_limit: '',
  toleransi_top: '',
  sisa_kredit_limit: '',
  alamat: '',
  provinsi: '',
  kota: '',
  kecamatan: '',
  kode_pos: '',
  fax1: '',
  fax2: '',
  phone1: '',
  phone2: '',
  cp1: '',
  cp2: '',
  phone_cp1: '',
  phone_cp2: '',
  email_cp1: '',
  email_cp2: '',
  delivery_area: '',
  bank_penerima: '',
  no_rekening: '',
  nama_penerima: '',
  kode_area: '',
  lattitude: '',
  longitude: '',
  status: statusOptions[1],
  catatan: '',
  npwp: npwpList.value,
  bankDetail: bankDetail.value,
  alamatDetail: alamatDetail.value,
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
