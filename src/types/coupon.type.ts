import dayjs from 'dayjs';
import { IPagination } from './common.type';
import { EActiveField } from './enum.type';
import { IFacility } from './facility.type';

export interface ICouponState {
  loading: boolean;
  reloadList: boolean;
  loadingCreate: boolean;
  loadingDelete: boolean;
  loadingUpdate: boolean;
  listData: ICoupon[];
  pagination?: IPagination;
  detailData?: ICoupon | null;
}

export interface ICouponFile {
  id?: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICouponContent {
  id?: number;
  title?: string;
  is_active?: EActiveField;
  end_date?: string;
  start_date?: string;
  type?: string;
  facility_id?: number;
  facility?: IFacility;
  data?: ICouponFile;
  created_at?: string;
  updated_at?: string;
}

export interface ICoupon {
  content?: ICouponContent;
  id?: number;
  image_path?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICouponMutate {
  is_active?: EActiveField;
  facility_id?: number;
  image_url?: string;
  image_path?: string;
  end_date?: string | dayjs.Dayjs;
  start_date?: string | dayjs.Dayjs;
}

export enum ICouponStatus {}
