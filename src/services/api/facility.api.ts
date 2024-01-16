import request from "~/_lib/axios";
import { IFacility } from "~/types/facility.type";
import { TFilterParams } from '~types';

const facilityAPI = {
    getAll(params: TFilterParams<IFacility>) {
        const url = '/facility';
        return request.get(url, { params });
    },
    create(params: IFacility) {
        const url = '/facility';
        return request.post(url, params);
    },
    edit(params: IFacility) {
        const url = `/facility/${params?.id}`;
        return request.put(url, params);
    },
    getDetail(id: IFacility['id']) {
        const url = `/facility/${id}`;
        return request.get(url);
    },
    remove(id: IFacility['id']) {
        const url = `/facility/${id}`;
        return request.delete(url);
    },
};

export default facilityAPI;
