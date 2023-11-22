<script setup>
import SidebarItem from './SidebarItem.vue';

defineProps({
  isDropdownList: Boolean,
  menu: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['menu-click']);

const menuClick = (event, item) => {
  emit('menu-click', event, item);
};
</script>

<template>
  <ul>
    <SidebarItem
      v-for="(item, index) in menu"
      :key="index"
      :item="item"
      :is-dropdown-list="isDropdownList"
      @menu-click="menuClick"
    />
  </ul>
</template>
