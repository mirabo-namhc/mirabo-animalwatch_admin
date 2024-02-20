import dayjs from 'dayjs';
import { IPagination } from './common.type';
import { EActiveField } from './enum.type';

export enum EBannerTypeEnum {
  FACILITY = 'facility',
  VIDEO = 'video',
  QUIZ = 'quiz',
  COUPON = 'coupon',
  EVENT = 'event',
}

export interface IBannerState {
  loading: boolean;
  reloadList: boolean;
  loadingForm: boolean;
  listData: IBanner[];
  pagination?: IPagination;
  detailData: IBanner | null;
  reloadDataDetail?: boolean;
}

export interface IBanner {
  id?: number;
  is_active?: EActiveField;
  order?: number;
  type: EBannerTypeEnum;
  reference_id: number;
  reference_name: string;
  status?: string;
  end_date?: string | dayjs.Dayjs;
  start_date?: string | dayjs.Dayjs;
  image_url?: string;
}

export enum IBannerStatus {}
