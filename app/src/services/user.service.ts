import { $axios } from "@baloise/vue-axios";
import { getToken } from "@baloise/vue-keycloak";

const axiosApiInstance = $axios.create()

axiosApiInstance.interceptors.request.use(
  async config => {
    const token = await getToken();
    config.headers = {
      Authorization: `Bearer ${token}`
    };
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
