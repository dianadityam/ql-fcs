<template>
  <LayoutMain>
    <div class="px-9 min-h-screen">
      <h1>Warehouse List</h1>
      <div class="content-section">
        <router-link to="/form/warehouse">
          <Button class="py-2" color="info" outline label="Create New" small />
        </router-link>
        <div class="my-5">
          <TableData
            :data="warehouse"
            :columns="columns"
            :tableHeader="tableHeader"
            :tableOptions="tableOptions"
            checkable
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
  { id: 4, title: 'Catatan' },
];

const warehouse = ref(null);

const columns = [
  { width: '5%', data: 'id' },
  { data: 'kode' },
  { data: 'nama' },
  { data: 'catatan' },
];

const fetchData = async () => {
  const result = await service({
    method: 'GET',
    url: 'operation/m_warehouse',
    token: true,
  });
  if (result.status === 200) {
    warehouse.value = result.response.data;
    console.log(warehouse);
  }
};

onMounted(() => {
  fetchData();
});
</script>
