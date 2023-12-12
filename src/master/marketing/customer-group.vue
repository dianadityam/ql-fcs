<template>
  <LayoutMain>
    <div class="px-9 min-h-screen">
      <h1>Customer Group List</h1>
      <div class="content-section">
        <router-link to="/form/customer-group">
          <Button class="py-2" color="info" outline label="Create New" small />
        </router-link>
        <div class="my-5">
          <TableData
            :data="data"
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
  { id: 3, title: 'Nama' },
  { id: 4, title: 'Credit Limit' },

  { id: 8, title: 'Status' },
];

const data = ref(null);

const columns = [
  { width: '5%', data: 'id' },
  {
    data: 'kode',
    render: (data, type, row, meta) =>
      `<a class="text-blue-500 cursor-pointer" href="/form/customer/${row.id}">${data}</a>`,
  },
  { data: 'nama' },
  { data: 'credit_limit' },

  { data: 'is_active', render: (data) => (data ? 'Aktif' : 'Inaktif') },
];

const fetchData = async () => {
  const result = await service({
    method: 'GET',
    url: 'operation/m_group_cust',
    token: true,
  });
  if (result.status === 200) {
    data.value = result.response.data;
    console.log(data);
  }
};

onMounted(() => {
  fetchData();
});
</script>
