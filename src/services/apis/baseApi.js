import axios from "axios";
import queryString from "query-string";

import PATH_URL from "@common/config/pathURL";
import cache from "@common/utils/cache";
import { BASE_URL } from "@common/config/endpoint";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = cache.get("token");
    // eslint-disable-next-line no-param-reassign
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      const refreshToken = cache.get("refreshToken");

      try {
        const res = await api.post("/api/admin/refresh-token", {
          refreshToken,
        });

        cache.set("token", res.accessToken);
        cache.set("refreshToken", res.refreshToken);
        return api(originalRequest);
      } catch (err) {
        cache.remove("token");
        cache.remove("refreshToken");
        cache.remove("persist:root");
        window.location = PATH_URL.LOGIN;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
