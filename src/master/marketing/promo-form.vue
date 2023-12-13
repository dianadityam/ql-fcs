<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Master Promo Form</h1>
      <div class="content-section">
        <strong>Master Promo</strong>
        <p v-if="!$route.params.id" class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid grid-cols-2 mt-5">
          <InputField label="Kode" required>
            <Input v-model="form.kode" placeholder="C0001" />
          </InputField>
          <InputField> <Input class="hidden" /> </InputField>
          <InputField label="Nama Promo" required>
            <Input v-model="form.nama" placeholder="Promo Juli" />
          </InputField>
          <InputField label="Tipe Promo" required>
            <Input v-model="form.tipe" placeholder="Pembelian minimal Rp. XXX" />
          </InputField>
          <InputField label="Target Promo" required>
            <Input v-model="form.target" :options="paymentOptions" />
          </InputField>
          <InputField label="Bisa Digabung">
            <Input type="checkbox" v-model="form.is_bisa_digabung" label="YA" />
          </InputField>
          <InputField label="Start Date" required>
            <Input v-model="form.from" type="date" />
          </InputField>
          <InputField label="End Date">
            <Input v-model="form.to" type="date" />
          </InputField>
          <InputField label="Max Qty Promo" required>
            <Input v-model="form.max_qty" placeholder="10" />
          </InputField>
          <InputField label="Max Amount Promo" required>
            <Input v-model="form.max_amount" />
          </InputField>
          <InputField label="Bisa Digabung">
            <Input type="checkbox" v-model="form.is_roll" label="YA" />
          </InputField>
          <InputField label="Status">
            <Input v-model="form.status" :options="statusOptions" />
          </InputField>
          <InputField label="Catatan">
            <Input v-model="form.catatan" type="textarea" />
          </InputField>
        </div>
        <div class="pt-5">
          <strong>Customer Detail</strong>
          <div class="grid grid-cols-4 gap-1 mt-5">
            <p
              @click="changeTab(1)"
              :class="
                activeTab == 1 ? tabActiveStyle : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Detail Syarat
            </p>
            <p
              @click="changeTab(2)"
              :class="
                activeTab == 2 ? tabActiveStyle : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Detail Promo Member
            </p>
          </div>
          <Syarat v-if="activeTab == 1" @update:syarat="updateSyarat" :tableData="syaratDetail" />
          <Member v-if="activeTab == 2" @update:member="updateMember" :tableData="memberDetail" />
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
              :disabled="form.processing"
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
import Button from '@/components/Button.vue';
import Syarat from './promo-tab/syarat.vue';
import Member from './promo-tab/member.vue';
import { reactive, watch, computed, ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const activeTab = ref(1);
const route = useRoute();

onMounted(() => {
  if (route.params.id) {
    updateValue();
  }
});

const changeTab = (tab) => {
  activeTab.value = tab;
};

const tabActiveStyle =
  'border-b-[3px] pb-1.5 text-center border-blue-500 font-semibold cursor-pointer';

const memberDetail = ref([]);
const syaratDetail = ref([]);
const updateSyarat = (syarat) => {
  syaratDetail.value.push(syarat);
};

const updateMember = (member) => {
  memberDetail.value.push(member);
};

const onSubmit = () => {
  form.processing = true;
  const dataToSubmit = {
    ...form,
    is_active: form.status.is_active,
  };
  console.log(dataToSubmit);
  service({
    method: route.params.id ? 'PUT' : 'POST',
    url: route.params.id ? '/operation/m_customer/' + route.params.id : '/operation/m_customer',
    token: true,
    data: dataToSubmit,
  });
  form.processing = false;
};

const paymentOptions = ['TUNAI', 'TRANSFER'];

const pkpOptions = ['TIDAK', 'YA'];

const statusOptions = [
  { is_active: 0, label: 'Inaktif' },
  { is_active: 1, label: 'Aktif' },
];

const form = reactive({
  processing: false,
  kode: '',
  nama: '',
  tipe: '',
  target: '',
  is_bisa_digabung: false,
  from: '',
  to: '',
  max_qty: '',
  max_amount: '',
  is_roll: false,
  status: statusOptions[1],
  catatan: '',
  m_promo_det_syarat: syaratDetail.value,
  m_promo_det_member: memberDetail.value,
});

const updateValue = async () => {
  const result = await service({
    method: 'GET',
    url: '/operation/m_customer/' + route.params.id,
    token: true,
  });
  if (result.status === 200) {
    const response = result.response.data;
    const nameSplit = response.nama.split(' ');
    form.tipe = nameSplit[0];
    form.last_name = nameSplit[1];
    memberDetail.value = response.m_customer_det_npwp;
    bankDetail.value = response.m_customer_det_bank;
    syaratDetail.value = response.m_customer_det_almt;
    fillForm(response);
    form.nama = pkpOptions.find((x) => x === response.nama);
    form.target = paymentOptions.find((x) => x === response.cara_bayar);
  }
};

const fillForm = (data) => {
  for (const key in form) {
    if (key in data) {
      form[key] = data[key];
    }
  }
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
</script>
