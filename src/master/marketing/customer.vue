<template>
  <LayoutMain>
    <div class="px-9 min-h-screen">
      <h1>Customer List</h1>
      <div class="content-section">
        <router-link to="/form/customer">
          <Button class="py-2" color="info" outline label="Create New" small />
        </router-link>
        <div class="my-5">
          <TableData
            :data="user"
            :columns="columns"
            :tableHeader="tableHeader"
            :tableOptions="tableOptions"
          />
        </div>
      </div>
    </div>
  </LayoutMain>
</template>

<script setup>
import LayoutMain from '@/layouts/LayoutMain.vue';
import TableData from '@/components/TableData.vue';
import Button from '@/components/Button.vue';
import { ref, onMounted } from 'vue';
import service from '@/services';

const tableOptions = {
  responsive: true,
  processing: true,
};

const tableHeader = [
  { id: 1, title: 'No.' },
  { id: 2, title: 'Kode' },
  { id: 3, title: 'Nama Customer' },
  { id: 4, title: 'Tipe' },
  { id: 5, title: 'Alamat' },
  { id: 6, title: 'No. Telepon' },
  { id: 7, title: 'Email' },
  { id: 8, title: 'Status' },
];

const user = ref(null);

const columns = [
  { width: '5%', data: 'id' },
  { data: 'kode' },
  { data: 'nama' },
  { data: 'customer_type' },
  { data: 'alamat' },
  { data: 'phone1' },
  { data: 'email' },
  { data: 'is_active', render: (data) => (data ? 'Aktif' : 'Inaktif') },
];

const fetchData = async () => {
  const result = await service({
    method: 'GET',
    url: 'operation/m_customer',
    token: true,
  });
  if (result.status === 200) {
    user.value = result.response.data;
    console.log(user);
  }
};

onMounted(() => {
  fetchData();
});
</script>
