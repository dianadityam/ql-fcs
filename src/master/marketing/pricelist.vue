<template>
  <LayoutMain>
    <div class="px-9 min-h-screen">
      <h1>Pricelist List</h1>
      <div class="content-section">
        <router-link to="/form/pricelist">
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
  { id: 2, title: 'Last Update' },
  { id: 3, title: 'Catatan' },
];

const data = ref(null);

const columns = [{ width: '5%', data: 'id' }, { data: 'kode' }, { data: 'note' }];

const fetchData = async () => {
  const result = await service({
    method: 'GET',
    url: 'operation/m_kend',
    token: true,
  });
  if (result.status === 200) {
    data.value = result.response.data;
  }
};

onMounted(() => {
  fetchData();
});
</script>
