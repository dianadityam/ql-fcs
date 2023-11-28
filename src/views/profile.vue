<template>
  <LayoutMain>
    <div class="px-9 min-h-screen">
      <h1>Profile List</h1>
      <div class="content-section">
        <router-link to="/create/profile">
          <button class="border-[#428BCA] p-3">Create New</button>
        </router-link>
        <div class="my-5">
          <TableData
            :data="user"
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
import LayoutMain from '../layouts/LayoutMain.vue';
import TableData from '@/components/TableData.vue';
import { ref, onMounted } from 'vue';
import service from '../services';

const tableOptions = {
  responsive: true,
  processing: true,
};

const tableHeader = [
  { id: 1, title: 'No.' },
  { id: 2, title: 'User Log in' },
  { id: 3, title: 'Nama' },
  { id: 4, title: 'Tipe User' },
  { id: 5, title: 'Status' },
  { id: 6, title: 'Created' },
];

const user = ref(null);

const columns = [
  { data: null, render: (data, type, row, meta) => meta.row + 1 },
  { data: 'email' },
  { data: 'username' },
  { data: 'usertype' },
  { data: 'status' },
  { data: 'created_at' },
];

const fetchData = async () => {
  const result = await service({
    method: 'GET',
    url: 'operation/default_users?paginate=100',
    token: true,
  });
  if (result.status === 200) {
    user.value = result.response.data;
    // console.log(user);
  }
};

onMounted(() => {
  fetchData();
});
</script>
