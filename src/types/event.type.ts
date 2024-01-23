import { IPagination } from './common.type';

export interface IEventState {
    loading: boolean;
    reloadList: boolean;
    loadingForm: boolean;
    listData: IEvent[];
    pagination?: IPagination;
    detailData?: IEvent;
    reloadDataDetail?: boolean;
}

export interface IEvent {
    id?: number
    title?: string
    name?: string
    overview?: string
    image_url?: string
    is_active?: boolean
    start_date?: string
    end_date?: string
    facility_id?: number
    contentable_type?: string
}

export interface IResponseApiDetailEvent<T> {
    code?: string;
    data?: {
        content?: T
    } & T;
    message?: string;
}