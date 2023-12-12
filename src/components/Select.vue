<template>
  <div>
    <div>
      <slot />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: Boolean,
  options: {
    type: Array,
    default: [],
  },
});
</script>
