<template>
  <aside
    id="aside"
    class="w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden"
  >
    <div class="aside flex-1 flex flex-col overflow-hidden bg-[#091943]">
      <div
        class="aside-brand flex flex-row h-14 items-center justify-between px-6 bg-[#041339]"
      >
        <div class="text-white flex-1 xl:pl-0">
          <p class="font-white">MENU</p>
        </div>
        <button
          class="hidden lg:inline-block xl:hidden p-3"
          @click.prevent="asideLgCloseClick"
        >
          <BaseIcon :path="mdiClose" />
        </button>
      </div>
      <div
        class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate] text-sm"
      >
        <div
          class="text-white p-0.5"
          v-for="(item, index) in menu"
          :key="index"
        >
          <button
            @click="handleClick(item)"
            :class="`w-full p-2 py-3 text-left hover:font-bold rounded flex justify-between items-center ${
              item.toggle ? 'bg-[#2F80ED] font-bold' : ''
            }`"
          >
            <div class="flex items-center gap-2">
              <mdicon :path="item.icon" size="18" class="" />
              <p>
                {{ item.label }}
              </p>
            </div>
            <mdicon v-if="item.menu" :path="mdiPlus" class="mr-5" size="20" />
          </button>
          <!-- </router-link> -->
          <div v-if="item.menu">
            <Collapse :when="item?.toggle" class="v-collapse">
              <div v-for="(sub, j) in item.menu" :key="j">
                <button
                  @click="subMenuClik(sub, index)"
                  :class="`w-full p-1.5 pl-5 text-left hover:font-bold  flex items-center justify-between ${
                    sub.toggle ? ' font-bold' : ''
                  }`"
                >
                  <div class="flex items-center gap-2">
                    <mdicon :path="mdiBookMultipleOutline" />
                    {{ sub.label }}
                  </div>
                  <mdicon
                    v-if="item.menu"
                    :path="mdiChevronDown"
                    :class="`mr-5 transition duration-150 ${
                      sub.toggle ? 'rotate-180' : 'rotate-0'
                    }`"
                    size="20"
                  />
                </button>
                <div v-if="sub.menu">
                  <Collapse :when="sub.toggle">
                    <button
                      v-for="(submenu, h) in sub.menu"
                      @click="$router.push(submenu.to)"
                      :key="h"
                      :class="`w-full p-2 pl-8 text-left hover:font-bold  flex items-center  transition duration-700 ${
                        $route.path === submenu.to ? ' font-bold' : ''
                      }`"
                    >
                      <mdicon :path="mdiBookMultipleOutline" />
                      {{ submenu.label }}
                    </button>
                  </Collapse>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
      <ul>
        <p class="text-white">{{ $route.path }}</p>
      </ul>
    </div>
  </aside>
</template>
<script setup>
import {
  mdiLogout,
  mdiClose,
  mdiPlus,
  mdiBookMultipleOutline,
  mdiChevronDown,
} from "@mdi/js";
import { computed, ref } from "vue";
import menu from "@/menuAside";
import { Collapse } from "vue-collapsed";
import BaseIcon from "../components/BaseIcon.vue";
import { useRouter } from "vue-router";

defineProps({
  menu: {
    type: Array,
    required: true,
  },
});

const router = useRouter();
const emit = defineEmits(["menu-click", "aside-lg-close-click"]);
const logoutItem = computed(() => ({
  label: "Logout",
  icon: mdiLogout,
  color: "info",
  isLogout: true,
}));

const handleClick = (item) => {
  if (!item.toggle) {
    menu.value.find((el) => el.label == item.label).toggle = true;
  } else {
    menu.value.find((el) => el.label == item.label).toggle = false;
  }
};

const subMenuClik = (item, parentIndex) => {
  if (!item.toggle) {
    menu.value[parentIndex].menu.find(
      (el) => el.label == item.label
    ).toggle = true;
  } else {
    menu.value[parentIndex].menu.find(
      (el) => el.label == item.label
    ).toggle = false;
  }
};
</script>
