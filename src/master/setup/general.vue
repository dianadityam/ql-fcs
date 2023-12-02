<template>
  <LayoutMain>
    <div class="px-9 min-h-screen">
      <h1>Role List</h1>
      <div class="content-section">
        <router-link to="/form/general">
          <Button class="py-2" color="info" outline label="Create New" small />
        </router-link>
        <div class="my-5">
          <TableData
            :data="roles"
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
  { id: 3, title: 'Deskripsi' },
  { id: 4, title: 'Group' },
  { id: 5, title: 'Status' },
  { id: 6, title: 'Created' },
];

const roles = ref(null);

const columns = [
  { width: '5%', data: 'id' },
  { data: 'kode' },
  { data: 'deskripsi' },
  { data: 'group' },
  { data: 'is_active', render: (data) => (data ? 'Aktif' : 'Inaktif') },
  { data: 'created_at' },
];

const fetchData = async () => {
  const result = await service({
    method: 'GET',
    url: 'operation/m_general',
    token: true,
  });
  if (result.status === 200) {
    roles.value = result.response.data;
    console.log(roles);
  }
};

onMounted(() => {
  fetchData();
});
</script>
