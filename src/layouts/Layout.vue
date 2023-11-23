<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import sidebarMenu from '../sidebarMenu.js';

const layoutAsidePadding = 'xl:pl-64';

const router = useRouter();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    darkModeStore.set();
  }

  if (item.isLogout) {
    //
  }
};
</script>

<template>
  <div
    class=""
    :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen flex justify-center transition-position lg:w-auto bg-gray-50"
    >
      <Sidebar
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="sidebarMenu"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <slot />
    </div>
  </div>
</template>
