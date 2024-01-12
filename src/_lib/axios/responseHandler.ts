/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { AxiosError, AxiosResponse } from 'axios';
import { handleLogout } from '~utils/auth';

const responseHandler = async (response: AxiosResponse<any, any>) => {
  return response.data;
};

const errorHandler = async (error: AxiosError) => {
  if (error?.response) {
    const status = error.response.status
    switch (status) {
      case 401:
      case 403:
        handleLogout();
        break;

      // todo: 
      // case 500:
      //   history.replace('/500');
      //   break;
    }
  }
  return Promise.reject(error);
};

export { responseHandler, errorHandler };
