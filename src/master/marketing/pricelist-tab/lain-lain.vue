<template>
  <div>
    <div class="grid grid-cols-11 items-center border rounded-t-sm font-semibold">
      <div class="col-span-8 grid grid-cols-8 p-2">
        <p class="col-span-1">No.</p>
        <p class="col-span-7">Nama Barang</p>
      </div>
      <div class="col-span-1 flex text-center justify-center">Satuan</div>
      <div class="col-span-2 flex text-center justify-center">Harga</div>
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
      <div class="col-span-8 grid grid-cols-8 p-2 items-center">
        <p class="col-span-1">{{ index + 1 }}</p>
        <p class="col-span-7">Nama Barang</p>
      </div>
      <div class="col-span-3 grid grid-cols-3">
        <div class="col-span-1 px-2">
          <input type="number" placeholder="0.00" :class="styleInput" />
        </div>
        <div class="col-span-2 px-2">
          <input type="number" placeholder="0.00" :class="styleInput" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseIcon from '@/components/BaseIcon.vue';
import { mdiCheckboxBlankOutline, mdiEye, mdiPlus } from '@mdi/js';

const styleInput =
  'w-full outline-none text-sm border p-1 px-2 focus:ring-2 rounded-[4px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';
</script>
