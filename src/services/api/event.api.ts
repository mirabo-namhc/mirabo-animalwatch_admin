import request from "~/_lib/axios";
import { IEvent } from "~/types/event.type";
import { TFilterParams } from '~types';

const eventAPI = {
    getAll(params: TFilterParams<IEvent>) {
        const url = '/event';
        return request.get(url, { params });
    },
    create(params: IEvent) {
        const url = '/event';
        return request.post(url, params);
    },
    edit(params: IEvent) {
        const url = `/event/${params?.id}`;
        return request.put(url, params);
    },
    getDetail(id: IEvent['id']) {
        const url = `/event/${id}`;
        return request.get(url);
    },
    remove(id: IEvent['id']) {
        const url = `/event/${id}`;
        return request.delete(url);
    },
};

export default eventAPI;
