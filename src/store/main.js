import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useMainStore = defineStore('main', () => {
  const env = ref(import.meta.env.VITE_APP_BASE_URL)
  const token = ref(localStorage.getItem('authToken'))
  const isFieldFocusRegistered = ref(false);

  function setUser(payload) {
    if (payload.name) {
      userName.value = payload.name;
    }
    if (payload.email) {
      userEmail.value = payload.email;
    }
  }

  const getApi = async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
      let res = await axios.get(`${env.value}/${data.path}`, config)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }
  const postApi = async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
      let res = await axios.post(`${env.value}/${data.path}`, data.body, config)
      return res.data
    } catch (error) {
      throw error.response.data
    }
  }
  const updateApi = async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
      let res = await axios.put(`${env.value}/${data.path}`, data.body, config)
      return res.data
    } catch (error) {
      throw error
    }
  }

  return {
    isFieldFocusRegistered,
    setUser,
    getApi,
    postApi,
    updateApi
  };
});
