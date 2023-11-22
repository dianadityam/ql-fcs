<script setup>
import SidebarLayer from './SidebarLayer.vue';
import Overlay from './Overlay.vue';

defineProps({
  menu: {
    type: Array,
    required: true,
  },
  isAsideMobileExpanded: Boolean,
  isAsideLgActive: Boolean,
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
  <SidebarLayer
    :menu="menu"
    :class="[
      isAsideMobileExpanded ? 'left-0' : '-left-60 lg:left-0',
      { 'lg:hidden xl:flex': !isAsideLgActive },
    ]"
    @menu-click="menuClick"
    @aside-lg-close-click="asideLgCloseClick"
  />
  <Overlay v-show="isAsideLgActive" z-index="z-30" @overlay-click="asideLgCloseClick" />
</template>
