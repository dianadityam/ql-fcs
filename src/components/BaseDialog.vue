<template>
  <transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0 ease-in-out"
    enter-active-class="transition ease-in-out duration-300"
    leave-active-class="transition ease-in-out duration-300"
  >
    <div
      class="fixed w-screen h-screen inset-0 bg-gray-600 bg-opacity-50 top-0 left-0 z-50 flex justify-center items-center"
      role="dialog"
      v-if="dialog"
      @click.self="closeDialog"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  dialog: Boolean,
});

const emit = defineEmits(["update:dialog", "close"]);
const closeDialog = () => {
  emit("close");
};
</script>

<style></style>
