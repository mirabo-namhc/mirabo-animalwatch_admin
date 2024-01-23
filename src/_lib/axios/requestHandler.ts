import type { InternalAxiosRequestConfig } from 'axios';
import { getAuth } from '~utils/auth';

const requestHandler = (config: InternalAxiosRequestConfig<unknown>) => {
  const token = getAuth()?.api_token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

export default requestHandler;
