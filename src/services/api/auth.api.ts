import request from "~/_lib/axios";
import { ILoginPayload } from '~/types';

const authAPI = {
    login(params: ILoginPayload) {
        const url = '/auth/login';
        return request.post(url, params);
    },
};

export default authAPI;
