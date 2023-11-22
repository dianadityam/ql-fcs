<script setup>
import { mdiClose } from '@mdi/js';
import { computed } from 'vue';
import SidebarItem from './SidebarItem.vue';
import SidebarList from './SidebarList.vue';
import BaseIcon from './BaseIcon.vue';

defineProps({
  menu: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['menu-click', 'aside-lg-close-click']);

const menuClick = (event, item) => {
  emit('menu-click', event, item);
};

const asideLgCloseClick = (event) => {
  emit('aside-lg-close-click', event);
};
</script>

<template>
  <aside id="aside" class="w-64 fixed flex z-40 top-0 h-screen transition-position overflow-hidden">
    <div class="aside flex-1 flex flex-col overflow-hidden text-white">
      <div class="aside-brand flex flex-row h-14 items-center justify-between">
        <div class="text-center flex-1 lg:text-left lg:px-5 lg:py-2">MENU</div>
        <button class="hidden lg:inline-block xl:hidden p-3" @click.prevent="asideLgCloseClick">
          <BaseIcon :path="mdiClose" />
        </button>
      </div>
      <div
        class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]"
      >
        <SidebarList :menu="menu" @menu-click="menuClick" />
      </div>
    </div>
  </aside>
</template>
