<template>
  <LayoutMain>
    <div class="px-9 min-h-screen">
      <h1>Profile List</h1>
      <div class="content-section">
        <router-link to="/form/profile">
          <Button class="mb-4" color="info" outline label="Create New" small />
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
import Button from '@/components/Button.vue';
import { ref, onMounted, render } from 'vue';
import service from '../../services';

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
  { width: '5%', data: 'id' },
  {
    data: 'username',
    render: (data, type, row, meta) =>
      `<a class="text-blue-500 cursor-pointer" href="/form/profile/${row.id}">${data}</a>`,
  },
  { data: 'name' },
  { data: 'usertype' },
  { data: 'is_active', render: (data) => (data ? 'Aktif' : 'Inaktif') },

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
