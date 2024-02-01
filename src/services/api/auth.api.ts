import request from "~/_lib/axios";
import { ILoginPayload, IResetPassPayload } from '~/types';

const authAPI = {
    login(params: ILoginPayload) {
        const url = '/auth/login';
        return request.post(url, params);
    },
    resetPassword(params: IResetPassPayload) {
        const url = '/auth/resetpassword';
        return request.post(url, params);
    },
};

export default authAPI;
