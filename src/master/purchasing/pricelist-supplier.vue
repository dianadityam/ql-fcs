<template>
  <LayoutMain>
    <div class="px-5 pb-10">
      <p class="font-medium text-lg mb-3">Form Pricelist Supplier</p>
      <div class="bg-white rounded-lg p-5 h-full">
        <div>
          <p class="font-medium mb-3">Pricelist Supplier Header</p>
          <p class="font-medium text-red-400">New Data</p>
          <div class="flex items-center w-full gap-14">
            <p class="font-medium">Supplier</p>
            <div class="w-full max-w-xs relative">
              <input
                placeholder="SUP0001"
                class="text-sm border px-2 py-1 focus:ring-1 bg-[#D2D6DE] focus:outline-none rounded-[4px] text-black w-full"
              />
              <BaseIcon
                :path="mdiMagnify"
                size="18"
                class="absolute right-0 h-7 w-9 border rounded-sm top-[1px]"
              />
            </div>
          </div>
        </div>
        <div class="pt-5">
          <div class="grid grid-cols-4 max-w-lg gap-1">
            <p
              @click="
                $router.push('/master/pricelist-supplier?tab=knitting-kain')
              "
              :class="
                $route.query?.tab == 'knitting-kain'
                  ? tabActiveStyle
                  : 'cursor-pointer text-center'
              "
            >
              Knitting Kain
            </p>
            <p
              @click="
                $router.push(
                  '/master/pricelist-supplier?tab=knitting-aksesoris'
                )
              "
              :class="
                $route.query?.tab == 'knitting-aksesoris'
                  ? tabActiveStyle
                  : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Knitting Aksesoris
            </p>
            <p
              @click="$router.push('/master/pricelist-supplier?tab=woven')"
              :class="
                $route.query?.tab == 'woven'
                  ? tabActiveStyle
                  : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Woven
            </p>
            <p
              @click="$router.push('/master/pricelist-supplier?tab=lain-lain')"
              :class="
                $route.query?.tab == 'lain-lain'
                  ? tabActiveStyle
                  : 'cursor-pointer text-center hover:font-semibold'
              "
            >
              Lain-lain
            </p>
          </div>
          <KnittingKain v-if="$route.query.tab == 'knitting-kain'" />
          <KnittingAksesoris v-if="$route.query.tab == 'knitting-aksesoris'" />
          <Woven v-if="$route.query.tab == 'woven'" />
          <LainLain v-if="$route.query.tab == 'lain-lain'" />
        </div>
      </div>
    </div>
  </LayoutMain>
</template>
<script setup>
import { mdiMagnify, mdiPlus } from "@mdi/js";
import BaseIcon from "@/components/BaseIcon.vue";
import { defineAsyncComponent, ref, watch } from "vue";

const KnittingKain = defineAsyncComponent(() =>
  import("../purchasing/tabs/knitting-kain.vue")
);
const KnittingAksesoris = defineAsyncComponent(() =>
  import("../purchasing/tabs/knitting-aksesoris.vue")
);
const Woven = defineAsyncComponent(() =>
  import("../purchasing/tabs/woven.vue")
);
const LainLain = defineAsyncComponent(() =>
  import("../purchasing/tabs/lain-lain.vue")
);

const tabActiveStyle =
  "border-b-[3px] pb-1.5 text-center border-blue-500 font-semibold cursor-pointer";
</script>
