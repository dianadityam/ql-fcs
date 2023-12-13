<template>
  <LayoutMain>
    <div class="px-9">
      <h1>Master General</h1>
      <div class="content-section">
        <strong>Master General Header</strong>
        <p v-if="!$route.params.id" class="font-bold text-red-600 mt-5">New Data</p>
        <div class="grid my-5 w-2/4">
          <InputField label="Kode" required>
            <Input v-model="form.kode" :options="userOptions" />
          </InputField>
          <InputField label="Deskripsi" required>
            <Input v-model="form.deskripsi" type="textarea" :options="warehouseOptions" />
          </InputField>
          <InputField label="Group">
            <Input v-model="form.group" :options="groupOptions" />
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
            <router-link to="/master/general">
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
import { reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { id } = route.params;

onMounted(() => {
  if (id) {
    updateValue();
  }
});

const fillForm = (data) => {
  for (const key in form) {
    if (key in data) {
      form[key] = data[key];
    }
  }
};

const updateValue = async () => {
  const result = await service({
    method: 'GET',
    url: `/operation/m_general/${id}`,
    token: true,
  });
  if (result.status === 200) {
    const response = result.response.data;
    fillForm(response);
    form.status = response.is_active ? statusOptions[1] : statusOptions[0];
  }
};

const onSubmit = async () => {
  const dataToSubmit = {
    ...form,
    is_active: form.status.id,
  };
  console.log(dataToSubmit);
  const result = await service({
    method: id ? 'PUT' : 'POST',
    url: id ? '/operation/m_general/' + id : '/operation/m_general',
    token: true,
    data: dataToSubmit,
  });
  if (result.status === 200) {
    router.push('/master/general');
  }
};

const statusOptions = [
  { id: 0, label: 'INAKTIF' },
  { id: 1, label: 'AKTIF' },
];

const groupOptions = ['VEHICLE TYPE', 'BANK'];

const form = reactive({
  kode: '',
  deskripsi: '',
  group: groupOptions[0],
  status: statusOptions[0],
});

const isFormValid = computed(() => {
  return form.kode.trim() !== '' && form.deskripsi.trim() !== '';
});
</script>
