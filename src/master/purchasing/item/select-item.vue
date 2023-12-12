<template>
  <BaseDialog :dialog="dialog" @close="$emit('close')">
    <div
      class="w-full max-w-3xl bg-white rounded-lg p-8 grid grid-cols-3 gap-10"
    >
      <div
        @click="onselect(item)"
        v-for="(item, index) in items"
        :key="index"
        :class="`col-span-1 bg-[#22AAE926] rounded-md hover:scale-110 transition duration-300 cursor-pointer shadow-lg hover:ring-2 ${
          item.select ? 'scale-110 ring-2' : ''
        }`"
      >
        <div class="p-3">
          <img :src="item.img" class="w-full h-28 rounded-t-md" />
        </div>
        <div
          class="p-3 text-white bg-primary rounded-b-md text-center font-medium"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="col-span-3 flex justify-center">
        <Btn @click="$router.push(selected.path)" class="p-2 px-5">Pilih</Btn>
        {{ selected }}
      </div>
    </div>
  </BaseDialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import benang from "@/assets/svg/Benang.svg";
import greigeKnitting from "../../../assets/svg/greige-knitting-1.svg";
import greigeWoven from "../../../assets/svg/greige-woven.svg";
import kainKnitting from "../../../assets/svg/kain-knitting.svg";
import kainWoven from "../../../assets/svg/kain-woven.svg";
import lainLain from "../../../assets/svg/lain-lain.svg";

const selected = reactive({});

const props = defineProps({
  dialog: Boolean,
});

const items = ref([
  {
    title: "Benang",
    img: benang,
    select: false,
    path: "/master/item-benang",
  },
  {
    title: "greige-knitting",
    img: greigeKnitting,
    select: false,
    path: "/master/item-greige-knitting",
  },
  {
    title: "Greige Woven",
    img: greigeWoven,
    select: false,
    path: "/master/item-greige-woven",
  },
  {
    title: "Kain Knitting",
    img: kainKnitting,
    select: false,
    path: "/master/item-kain-knitting",
  },
  {
    title: "Kain woven",
    img: kainWoven,
    select: false,
    path: "/master/item-kain-woven",
  },
  {
    title: "Lain Lain",
    img: lainLain,
    select: false,
    path: "/master/item-lain-lain",
  },
]);

const onselect = (item) => {
  let check = items.value.every((el) => el.select == false);
  if (!check) {
    items.value.forEach((el) => (el.select = false));
  }
  items.value.find((el) => el.title === item.title).select = true;
  selected.path = item.path;
};
</script>
