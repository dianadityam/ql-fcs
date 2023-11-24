<template>
  <LayoutMain>
    <div class="px-5">
      <p class="font-medium text-lg mb-3">Form Pricelist Supplier</p>
      <div class="bg-white rounded-lg p-5 h-full">
        <p class="font-medium mb-3">Pricelist Supplier Header</p>
        <p class="font-medium text-red-400">New Data</p>
        <div class="flex items-center w-full gap-14">
          <p class="font-medium">Supplier</p>
          <div class="w-full max-w-lg">
            <Input
              placeholder="SUP0001"
              :icon="mdiMagnify"
              class="bg-slate-400"
            />
          </div>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>
<script setup>
import { mdiMagnify } from "@mdi/js";
</script>
