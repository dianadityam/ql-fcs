<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Form Warehouse</h1>
      <div class="content-section">
        <strong>Warehouse Header</strong>
        <p class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid my-5 w-2/4">
          <InputField label="Kode" required>
            <Input v-model="form.kode" :options="userOptions" />
          </InputField>
          <InputField label="Merk Kendaraan" required>
            <Input v-model="form.merk" />
          </InputField>
          <InputField label="Kapasitas Kendaraan">
            <Input v-model="form.kapasitas" />
          </InputField>
          <InputField label="Plat Nomor Kendaraan">
            <Input v-model="form.plat_no" />
          </InputField>
          <InputField label="Note">
            <Input v-model="form.note" />
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
              :disabled="form.processing || !isFormValid"
              small
            />
            <Button
              type="submit"
              color="white"
              label="Cancel"
              @click="$router.push('/master/kendaraan')"
              class="ml-2"
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing"
              small
              outline
            />
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
import { reactive, computed } from 'vue';

const onSubmit = () => {
  const dataToSubmit = {
    ...form,
    is_active: form.status.id,
  };
  console.log(dataToSubmit);
  service({
    method: 'POST',
    url: '/operation/m_kend',
    token: true,
    data: dataToSubmit,
  });
};

const statusOptions = [
  { id: 0, label: 'INAKTIF' },
  { id: 1, label: 'AKTIF' },
];

const form = reactive({
  kode: '',
  merk: '',
  kapasitas: '',
  plat_no: '',
  note: '',
  status: statusOptions[0],
});

const isFormValid = computed(() => {
  return (
    form.kode.trim() !== '' &&
    form.merk.trim() !== '' &&
    form.kapasitas.trim() !== '' &&
    form.plat_no.trim() !== ''
  );
});
</script>
