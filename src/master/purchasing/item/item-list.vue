<template>
  <LayoutMain>
    <div class="p-5">
      <div>
        <p class="text-lg font-medium mb-3">Item List</p>
      </div>
      <div class="p-5 bg-white rounded border-t-4 border-primary">
        <div>
          <Btn
            @click="dialog = true"
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
            <tr>
              <td
                :class="'text-sm p-2'"
                v-for="(item, index) in header"
                :key="index"
              >
                Supplier A
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <selectItem :dialog="dialog" @close="dialog = false" />
  </LayoutMain>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { mdiChevronDown } from "@mdi/js";
import selectItem from "./select-item.vue";

const dialog = ref(false);

const header = [
  "No.",
  "Artikel",
  "Nama Barang",
  "Safety Stok",
  "Supplier",
  "Catatan",
  "Status",
];
</script>
