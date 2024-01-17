import dayjs from 'dayjs';
import { IPagination } from './common.type';

export interface IBannerState {
  loading: boolean;
  reloadList: boolean;
  loadingForm: boolean;
  listData: IBanner[];
  pagination?: IPagination;
  detailData?: IBanner;
  reloadDataDetail?: boolean;
}

export interface IBanner {
  id?: number;
  link?: string;
  is_active?: number | boolean;
  order?: number;
  type?: string;
  reference_id?: number;
  status?: string;
  end_date?: string;
  start_date?: string;
  image_url?: string;
}

export enum IBannerStatus {}
