<template>
  <div class="grid grid-cols-2 bg-white">
    <div>
      <img src="../assets/login.png" alt="login" class="login-image" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <img src="../assets/logo.png" alt="" width="188" />
      <div class="w-80 my-8">
        <h1 class="text-[#2F80ED] font-semibold">Login</h1>
        <p class="text-xs text-[#8F8F8F]">Selamat datang! Masukkan kredensial Anda</p>
      </div>
      <div class="w-80 leading-loose">
        <label class="text-xs" for="username">Username</label>
        <Input placeholder="Username" v-model="userData.email" :icon="mdiAccountOutline" />
        <label class="text-xs" for="password">Password</label>
        <Input
          placeholder="Password"
          type="password"
          v-model="userData.password"
          :icon="mdiLockOutline"
        />
        <div class="flex items-center my-3">
          <input type="checkbox" />
          <label class="pl-2 text-xs">Ingat Saya</label>
        </div>
        <Button
          class="w-full text-white text-sm"
          label="Login"
          color="primaryBlue"
          @click="handleLogin"
        />
        <div v-if="errMessage" class="my-3">
          <p class="text-red-500 text-xs">* {{ errMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mdiAccountOutline, mdiLockOutline } from '@mdi/js';
import Button from '@/components/Button.vue';
import { useRouter } from 'vue-router';
import service from '../services';
import { reactive, ref } from 'vue';

const errMessage = ref(null);

const router = useRouter();

const handleLogin = async () => {
  const result = await service({
    method: 'POST',
    url: '/login',
    data: userData,
  });
  if (result.status === 200) {
    localStorage.setItem('authToken', result.response.token);
    router.push('/');
  } else {
    errMessage.value = result.data;
  }
};

const userData = reactive({
  email: '',
  password: '',
});
</script>

<style>
.login-image {
  min-height: 100vh;
}
</style>
