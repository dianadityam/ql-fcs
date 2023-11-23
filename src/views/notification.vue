<template>
  <LayoutMain>
    <div class="p-5">
      <p>Notification Pagesdasdsad</p>
      <p>Name : {{ form.name }}</p>
      <p>Email: {{ form.email }}</p>
      <p>Alamat: {{ form.email }}</p>
      <div>
        <FormField label="Grouped with icons">
          <FormControl v-model="form.name" :icon="mdiAccount" />
          <FormControl v-model="form.email" type="email" :icon="mdiMail" />
        </FormField>
        <FormField label="Grouped with icons">
          <FormControl v-model="form.name" :icon="mdiAccount" />
          <FormControl v-model="form.email" type="email" :icon="mdiMail" />
        </FormField>
      </div>
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
  name: "ahdi",
  email: "",
});
</script>
