import axios from 'axios';

const getAuthToken = (options) => {
  let result = {};
  const dataUser = localStorage.getItem('authToken');
  if (dataUser) {
    result = {
      Authorization: 'Bearer ' + dataUser,
    };
  }
  result['Content-Type'] = options.formData ? 'multipart/form-data' : 'application/json';
  return result;
};

const serviceApi = async (options) => {
  let axiosConfig = {
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 100000,
  };

  axiosConfig.headers = getAuthToken(options);
  const instance = axios.create(axiosConfig);
  return await instance(options)
    .then((res) => {
      return { response: res.data, status: res.status };
    })
    .catch((err) => {
      return err.response;
    });
};

export default serviceApi;
