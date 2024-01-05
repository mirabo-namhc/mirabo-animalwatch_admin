import type { InternalAxiosRequestConfig } from 'axios';
import cache from '~utils/cache';

const requestHandler = (config: InternalAxiosRequestConfig<unknown>) => {
  const token = cache.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
};

export default requestHandler;
