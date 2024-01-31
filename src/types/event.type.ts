import { IPagination } from './common.type';
import { IFacility } from './facility.type';

export interface IEventState {
  loading: boolean;
  reloadList: boolean;
  loadingForm: boolean;
  listData: IEvent[];
  pagination?: IPagination;
  detailData?: IEvent | null;
  reloadDataDetail?: boolean;
}

interface Data {
  id: number;
  name: string;
  title: string;
  overview: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  image_path: string;
}

export interface IContentEvent {
  id: number;
  is_active: number;
  is_recommend: number;
  start_date?: any;
  end_date?: any;
  facility_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  type: string;
  data: Data;
  facility: IFacility;
}

export interface IEvent {
  id?: number;
  title?: string;
  name?: string;
  overview?: string;
  image_url?: string;
  image_path?: string;
  is_active?: boolean;
  start_date?: string;
  end_date?: string;
  facility_id?: number;
  content?: any;
  contentable_type?: string;
}

export interface IResponseApiDetailEvent<T> {
  code?: string;
  data?: {
    content?: T;
  } & T;
  message?: string;
}
