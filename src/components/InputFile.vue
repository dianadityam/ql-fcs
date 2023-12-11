<template>
  <div class="border-[#CCCCCC] border-[1px] rounded-sm">
    <input type="file" class="file-input" />
  </div>
  <div>
    <img src="../assets/img-preview.svg" alt="" />
  </div>
</template>
<script></script>
<style scoped>
.file-input {
  font-size: 14px;
  color: #8f8f8f;
  margin: 5px;
}
input::file-selector-button {
  border: #e0e0e0 1px solid;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 0 10px;
  color: #8f8f8f;
  cursor: pointer;
}
</style>
