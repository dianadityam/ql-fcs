<script setup>
import { computed, useSlots } from 'vue';

defineProps({
  label: {
    type: String,
    default: null,
  },
  labelFor: {
    type: String,
    default: null,
  },
  help: {
    type: String,
    default: null,
  },
  required: {
    type: Boolean,
  },
});

const slots = useSlots();

const wrapperClass = computed(() => {
  const base = [];
  const slotsLength = slots.default().length;

  if (slotsLength > 0) {
    base.push('grid grid-cols-1 gap-3');
  }

  if (slotsLength === 2) {
    base.push('md:grid-cols-2');
  }

  return base;
});
</script>

<template>
  <div class="mb-6 last:mb-0 form-grid">
    <label v-if="label" :for="labelFor" class="font-bold text-sm"
      >{{ label }}<span v-if="required" class="text-red-500">*</span></label
    >
    <div :class="wrapperClass">
      <slot />
    </div>
    <div v-if="help" class="text-xs text-gray-500 dark:text-slate-400 mt-1">
      {{ help }}
    </div>
  </div>
</template>
