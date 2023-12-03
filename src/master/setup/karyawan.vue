<template>
  <LayoutMain>
    <div class="px-9 min-h-screen">
      <h1>Role List</h1>
      <div class="content-section">
        <router-link to="/form/karyawan">
          <Button class="py-2" color="info" outline label="Create New" small />
        </router-link>
        <div class="my-5">
          <TableData
            :data="karyawan"
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
  { id: 2, title: 'Nama Karyawan' },
  { id: 3, title: 'No. ID' },
  { id: 4, title: 'Divisi' },
  { id: 5, title: 'Tanggal Masuk' },
  { id: 6, title: 'Catatan' },
  { id: 7, title: 'Status' },
];

const karyawan = ref(null);

const columns = [
  { width: '5%', data: 'id' },
  { data: 'nama' },
  { data: 'nid' },
  { data: 'divisi' },
  { data: 'tgl_masuk' },
  { data: 'catatan' },
  { data: 'is_active', render: (data) => (data ? 'Aktif' : 'Inaktif') },
];

const fetchData = async () => {
  const result = await service({
    method: 'GET',
    url: 'operation/m_karyawan',
    token: true,
  });
  if (result.status === 200) {
    karyawan.value = result.response.data;
    console.log(karyawan);
  }
};

onMounted(() => {
  fetchData();
});
</script>
