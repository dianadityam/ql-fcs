<template>
  <LayoutMain>
    <p>Notification Pagesdasdsad</p>
    <div>
      <FormField label="Grouped with icons">
        <FormControl v-model="form.name" :icon="mdiAccount" />
        <FormControl v-model="form.email" type="email" :icon="mdiMail" />
      </FormField>
    </div>
  </LayoutMain>
  />
</template>
<script setup>
import { reactive } from "vue";
import LayoutMain from "../layouts/LayoutMain.vue";
import { mdiAccount, mdiMail } from "@mdi/js";
import FormControl from "../components/FormControl.vue";
import FormField from "../components/FormField.vue";

const form = reactive({
  name: "",
});
</script>
