<template>
  <div>
    <div
      class="grid grid-cols-11 items-center border rounded-t-sm font-semibold"
    >
      <div class="col-span-4 grid grid-cols-8 p-2">
        <p class="col-span-1">No.</p>
        <p class="col-span-4">Nama Barang</p>
        <div class="col-span-3 flex items-center gap-5">
          <!-- <BaseIcon
            :path="mdiCheckboxBlankOutline"
            class="text-black h-4"
            size="20"
          /> -->
          <input type="checkbox" class="w-4 h-4 rounded" />
          <p>History</p>
        </div>
      </div>
      <div class="col-span-5 grid grid-cols-5 border-x">
        <p class="col-span-5 text-center border-b p-1">Warna</p>
        <p class="col-span-1 p-1 text-center border">Putih</p>
        <p class="col-span-1 p-1 text-center border">Muda</p>
        <p class="col-span-1 p-1 text-center border">Sedang</p>
        <p class="col-span-1 p-1 text-center border">Tua</p>
        <p class="col-span-1 p-1 text-center border">Tua Spesial</p>
      </div>
      <div class="col-span-2 flex text-center justify-center">Eceran</div>
    </div>
  </div>
  <div>
    <div
      v-for="(item, index) in 4"
      :key="index"
      :class="`grid grid-cols-11 items-center border rounded-t-sm ${
        (index + 1) % 2 != 0 ? 'bg-[#F9F9F9]' : ''
      }`"
    >
      <div class="col-span-4 grid grid-cols-8 p-2 items-center">
        <p class="col-span-1">{{ index + 1 }}</p>
        <p class="col-span-4">Nama Barang</p>
        <div class="col-span-3 flex items-center gap-7">
          <!-- <BaseIcon
            :path="mdiCheckboxBlankOutline"
            class="text-black h-4"
            size="20"
          /> -->
          <input type="checkbox" class="w-4 h-4 rounded" />
          <Btn class="p-1.5 px-2">
            <mdicon :path="mdiEye" class="w-5 h-5" />
          </Btn>
        </div>
      </div>
      <div class="col-span-5 grid grid-cols-5">
        <div class="col-span-1 px-2">
          <input type="number" placeholder="0.00" :class="styleInput" />
        </div>
        <div class="col-span-1 px-2">
          <input type="number" placeholder="0.00" :class="styleInput" />
        </div>
        <div class="col-span-1 px-2">
          <input type="number" placeholder="0.00" :class="styleInput" />
        </div>
        <div class="col-span-1 px-2">
          <input type="number" placeholder="0.00" :class="styleInput" />
        </div>
        <div class="col-span-1 px-2">
          <input type="number" placeholder="0.00" :class="styleInput" />
        </div>
      </div>
      <div class="col-span-2 flex text-center justify-center">
        <div class="flex items-center justify-center gap-2">
          <BaseIcon :path="mdiPlus" class="text-black" />
          <input
            type="number"
            placeholder="0.00"
            class="w-32 outline-none text-sm border p-1 px-2 focus:ring-2 rounded-[4px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseIcon from "@/components/BaseIcon.vue";
import { mdiCheckboxBlankOutline, mdiEye, mdiPlus } from "@mdi/js";

const styleInput =
  "w-full outline-none text-sm border p-1 px-2 focus:ring-2 rounded-[4px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
</script>
