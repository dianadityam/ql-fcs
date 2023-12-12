<template>
  <LayoutMain>
    <div class="p-5">
      <div>
        <p class="text-lg font-medium mb-3">Item List</p>
      </div>
      <div class="p-5 bg-white rounded border-t-4 border-primary">
        <div>
          <Btn
            @click="$router.push('/master/supplier/create')"
            bg="primary"
            class="p-2 border-2 border-primary text-primary"
            outline
            color="text-primary"
            >Create New</Btn
          >
        </div>
        <div class="py-5 flex items-center justify-between w-full">
          <div class="flex gap-2 items-center">
            <p>Show</p>
            <Btn
              color="text-gray-500"
              bg="primary"
              class="p-2 border-2 text-gray-600 flex items-center gap-1"
              outline
              >10 <mdicon :path="mdiChevronDown" size="20"
            /></Btn>
            <p>entries</p>
          </div>
          <div class="flex gap-2 items-center">
            <label for="search">Search</label>
            <input
              id="search"
              type="text"
              class="border-2 text-sm focus:outline-none focus:ring-1 p-1"
              placeholder=""
            />
          </div>
        </div>
        <table class="w-full">
          <thead>
            <tr>
              <th
                v-for="(item, index) in header"
                :key="index"
                class="text-sm p-2 text-left"
              >
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              :class="(index + 1) % 2 == 0 ? '' : 'bg-[#F9F9F9]'"
              v-for="(item, index) in data"
              :key="index"
            >
              <td :class="'text-sm p-2'" :key="index">{{ index + 1 }}</td>
              <td :class="'text-sm p-2'" :key="index">{{ item.nama }}</td>
              <td :class="'text-sm p-2'" :key="index">{{ item.alamat }}</td>
              <td :class="'text-sm p-2'" :key="index">
                {{ item.no_rekening }}
              </td>
              <td :class="'text-sm p-2'" :key="index">{{ item.no_telp }}</td>
              <td :class="'text-sm p-2'" :key="index">
                {{ item.is_active ? "Aktif" : "Tidak Aktif" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </LayoutMain>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { mdiChevronDown } from "@mdi/js";
import { useMainStore } from "@/store/main";

const store = useMainStore();
const data = ref([]);

const getData = () => {
  let config = {
    path: "operation/m_supplier",
  };
  store
    .getApi(config)
    .then((res) => {
      data.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const dialog = ref(false);

const header = [
  "No.",
  "Nama Supplier",
  "Alamat",
  "No. Rekening",
  "No. Telepon",
  "Status",
];

onMounted(() => {
  getData();
});
</script>
