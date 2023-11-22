<script setup>
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { mdiChevronLeft, mdiChevronDown } from '@mdi/js';
import SidebarList from './SidebarList.vue';
import BaseIcon from './BaseIcon.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isDropdownList: Boolean,
});

const emit = defineEmits(['menu-click']);

const hasDropDown = computed(() => !props.item.menu);

const isDropdownActive = ref(false);

const sidebarMenuActiveClass = computed(() => 'bg-[#2f80ed]');

const componentClass = computed(() => [props.isDropdownList ? 'py-3 px-6 text-sm' : 'py-3']);

const menuClick = (event) => {
  emit('menu-click', event, props.item);

  if (hasDropDown.value) {
    isDropdownActive.value = !isDropdownActive.value;
  }
};
</script>

<template>
  <li>
    <component
      :is="item.to ? RouterLink : 'a'"
      v-slot="vSlot"
      :to="item.to ?? null"
      :href="item.href ?? null"
      :target="item.target ?? null"
      class="flex cursor-pointer"
      :class="componentClass"
      @click="menuClick"
    >
      <BaseIcon
        v-if="item.icon"
        :path="item.icon"
        class="flex-none"
        :class="[vSlot && vSlot.isExactActive ? sidebarMenuActiveClass : '']"
        w="w-16"
        :size="18"
      />
      <span
        class="grow text-ellipsis line-clamp-1"
        :class="[
          { 'pr-12': !hasDropDown },
          vSlot && vSlot.isExactActive ? sidebarMenuActiveClass : '',
        ]"
        w="w-12"
      >
        {{ item.label }}
      </span>
      <BaseIcon
        v-if="hasDropDown"
        :path="isDropdownActive ? mdiChevronLeft : mdiChevronDown"
        class="flex-none"
        :class="[vSlot && vSlot.isExactActive ? sidebarMenuActiveClass : '']"
        w="w-16"
        :size="18"
      />
    </component>
    <SidebarList
      v-if="hasDropdown"
      :menu="item.menu"
      :class="['aside-menu-dropdown', isDropdownActive ? 'block dark:bg-slate-800/50' : 'hidden']"
      is-dropdown-list
    />
  </li>
</template>
