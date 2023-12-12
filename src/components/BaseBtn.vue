<template>
  <button :type="type" :class="setClass()">
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  bg: { type: String, default: "bg-submit" },
  shadow: { type: String, default: "shadow-primary" },
  type: { type: String, default: "button" },
  flat: { type: Boolean, default: true },
  color: { type: String, default: "text-white" },
  textSize: { type: String, default: "text-sm" },
  outline: Boolean,
});

const setClass = () => {
  let base = `${props.outline ? "bg-white" : props.bg} rounded bg-[#4CAE4C]`;
  let hover = `hover:bg-opacity-90`;
  let focus = `focus:${props.bg} focus:outline-none focus:ring-0`;
  let active = `active:brightness-90`;
  let shadow = `shadow-md ${props.shadow}/50 hover:shadow-lg hover:${props.shadow}/50 focus:shadow-md focus:${props.shadow}/50 active:shadow-lg active:${props.shadow}/50`;
  let transition = "transition duration-150 ease-in-out";
  let font = `${props.color} font-medium ${props.textSize} leading-tight`;

  let dynamicClass = `${base} ${
    props.flat ? "" : shadow
  } ${transition} ${hover} ${focus} ${active} ${font}`;
  return dynamicClass;
};
</script>

<style></style>
