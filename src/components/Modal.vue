<template>
  <div
    :showModal="showModal"
    :submit="submit"
    v-if="showModal"
    class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
  >
    <div class="relative w-4/5 my-6 mx-auto max-w-7xl">
      <div
        class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        ref="target"
      >
        <div
          class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
        >
          <slot name="header">default header</slot>
        </div>
        <div class="relative p-6 flex-auto">
          <slot name="content">default body</slot>
        </div>
        <div
          class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
        >
          <Button type="submit" color="white" label="Cancel" @click="isShowModal" small />
          <Button
            type="submit"
            color="success"
            :label="submitLabel"
            @click="submit"
            class="ml-2"
            small
          />
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script setup>
import { ref } from 'vue';
import Button from './Button.vue';

defineProps({
  showModal: {
    type: Boolean,
  },
  submitLabel: {
    type: String,
  },
});

const emit = defineEmits(['toggle-modal', 'submit']);

const target = ref(null);

const isShowModal = () => {
  emit('toggle-modal');
};

const submit = () => {
  emit('submit');
};
</script>
