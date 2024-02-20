import axios from 'axios';

import { BASE_URL } from '~constants/endpoint';
import { errorHandler, responseHandler } from './responseHandler';
import requestHandler from './requestHandler';

const X_API_KEY = process.env.REACT_APP_X_API_KEY;

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': X_API_KEY,
  },
});

request.interceptors.request.use(requestHandler);

request.interceptors.response.use(responseHandler, errorHandler);

export default request;
