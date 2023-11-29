<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="py-5 px-6 xl:mx-auto bg-white">
    <div class="text-center md:text-left">
      <b
        >Copyright &copy; {{ year }}
        <a class="text-blue-600" href="https://qqltech.com/" target="_blank">Quantum Leap</a>.</b
      >
      <slot />
    </div>
  </footer>
</template>
