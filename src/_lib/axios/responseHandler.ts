/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { AxiosError, AxiosResponse } from "axios";

const responseHandler = async (response: AxiosResponse<any, any>) => {
    return response.data;
};

const errorHandler = async (error: AxiosError) => {
    return Promise.reject(error);
};

export { responseHandler, errorHandler };
