import axios from 'axios';

import { BASE_URL } from '~constants/endpoint';
import { errorHandler, responseHandler } from './responseHandler';
import requestHandler from './requestHandler';

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(requestHandler);

request.interceptors.response.use(responseHandler, errorHandler);

export default request;
