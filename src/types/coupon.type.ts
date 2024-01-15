import dayjs from 'dayjs';
import { IPagination } from './common.type';

export interface ICouponState {
  loading: boolean;
  reloadList: boolean;
  loadingCreate: boolean;
  loadingDelete: boolean;
  loadingUpdate: boolean;
  listData: ICoupon[];
  pagination?: IPagination;
  detailData?: ICoupon;
}

export interface ICoupon {
  id?: number;
  facility_name?: number | string;
  title?: string;
  status?: string;
  flag?: number;
  end_date?: string | dayjs.Dayjs;
  start_date?: string | dayjs.Dayjs;
}

export enum ICouponStatus {}
