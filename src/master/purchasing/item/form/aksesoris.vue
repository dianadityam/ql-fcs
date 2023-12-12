<template>
  <div
    v-if="field && field?.length"
    class="col-span-10 rounded border text-sm font-semibold"
  >
    <div class="p-5">
      <div
        v-for="(akss, i) in field"
        :key="i"
        class="grid grid-cols-6 gap-x-20 gap-y-3 mb-5"
      >
        <p class="col-span-6 text-primary font-semibold">
          {{ akss.name }}
        </p>
        <div
          v-for="(form, j) in akss.form"
          :key="j"
          class="col-span-3 grid grid-cols-3 items-center"
        >
          <p class="col-span-1">{{ form.label }}</p>
          <div
            v-if="form.label == 'Spandex'"
            class="col-span-2 flex items-center gap-3"
          >
            <mdicon
              size="18"
              @click="form.disabled = !form.disabled"
              :path="form.disabled ? mdiCheckCircle : mdiRadioboxBlank"
              :class="`cursor-pointer ${form.disabled ? 'text-blue-500' : ''}`"
            />
            <p>Ya</p>
            <FormControl
              v-if="form.disabled"
              v-model="form.value"
              class="w-full"
              type="select"
            />
            <input
              v-else
              disabled
              type="text"
              placeholder="Masukan Disini"
              class="p-1.5 border-2 rounded text-sm w-full bg-[#EEE]"
            />
          </div>
          <div v-else class="col-span-2">
            <FormControl v-model="form.value" type="select" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import FormControl from "@/components/FormControl.vue";
import { mdiCheckCircle, mdiRadioboxBlank } from "@mdi/js";
import { ref } from "vue";

const props = defineProps({
  field: null,
});
</script>
