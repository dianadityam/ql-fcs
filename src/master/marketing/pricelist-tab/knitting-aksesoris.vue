>
<template>
  <div class="grid grid-cols-3 max-w-md items-center gap-5 py-4">
    <p class="font-semibold">Tanggal Berlaku</p>
    <div>
      <input type="date" class="text-sm border p-1 rounded-[4px]" />
    </div>
    <div>
      <Btn class="p-2 px-5 whitespace-nowrap">Perubahan Harga</Btn>
    </div>
  </div>
  <div class="gap-5 pb-4 items-center grid grid-cols-3 max-w-md">
    <p class="font-semibold">Spandex</p>
    <div class="flex justify-between items-center gap-2 -ml-6">
      <BaseIcon :path="mdiPlus" class="text-black" />
      <input
        type="number"
        placeholder="0.00"
        class="outline-none text-sm border p-1.5 focus:ring-2 rounded-[4px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  </div>
  <div>
    <div class="grid grid-cols-11 font-semibold border p-1.5 rounded-t-sm">
      <p class="col-span-3 text-center">Aksesoris</p>
      <p class="col-span-6">Roll</p>
      <p class="col-span-2">Eceran</p>
    </div>
    <div
      v-for="(aksesoris, index) in knittingAksesoris"
      :key="index"
      class="grid grid-cols-11 rounded-t-sm text-sm"
    >
      <div class="col-span-1 p-5 border">{{ aksesoris.name }}</div>
      <div class="col-span-10 border grid grid-cols-10">
        <div
          v-for="(item, index) in aksesoris.aksesoris"
          :key="index"
          :class="`col-span-10 grid grid-cols-10 items-center px-2 ${
            (index + 1) % 2 != 0 ? 'bg-[#F9F9F9] ' : ''
          }`"
        >
          <p class="col-span-2">{{ item.name }}</p>
          <div class="col-span-6 flex items-center gap-2 -ml-6">
            <BaseIcon :path="mdiPlus" class="text-black" />
            <input
              type="number"
              placeholder="0.00"
              class="outline-none text-sm border p-1.5 focus:ring-2 rounded-[4px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div class="col-span-2 flex items-center gap-2 -ml-6">
            <BaseIcon :path="mdiPlus" class="text-black" />
            <input
              type="number"
              placeholder="0.00"
              class="outline-none text-sm border p-1.5 focus:ring-2 rounded-[4px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseIcon from "@/components/BaseIcon.vue";
import { mdiPlus } from "@mdi/js";

const knittingAksesoris = [
  {
    name: "RIB",
    aksesoris: [
      {
        name: "RIB 1x1",
        rol: "0.00",
        eceran: "0.00",
      },
      {
        name: "RIB 1x1",
        rol: "0.00",
        eceran: "0.00",
      },
    ],
  },
  {
    name: "kerah",
    aksesoris: [
      {
        name: "Regular",
        rol: "0.00",
        eceran: "0.00",
      },
      {
        name: "Regular",
        rol: "0.00",
        eceran: "0.00",
      },
      {
        name: "Yarndyed",
        rol: "0.00",
        eceran: "0.00",
      },
    ],
  },
  {
    name: "kerah",
    aksesoris: [
      {
        name: "Regular",
        rol: "0.00",
        eceran: "0.00",
      },
      {
        name: "Regular",
        rol: "0.00",
        eceran: "0.00",
      },
      {
        name: "Yarndyed",
        rol: "0.00",
        eceran: "0.00",
      },
    ],
  },
];
</script>
