import { IPagination } from './common.type';
import { EActiveField } from './enum.type';

export interface IFacilityState {
  loading: boolean;
  reloadList: boolean;
  loadingForm: boolean;
  listData: IFacility[];
  pagination?: IPagination;
  detailData?: IFacility | null;
  reloadDataDetail?: boolean;
}

export interface IFacility {
  id?: number;
  name?: string;
  description?: string | null;
  img_cover_url?: string;
  start_date?: string;
  end_date?: string;
  is_active?: EActiveField;
  group_id?: EGroupFacility;
  order?: number;
  folder_id?: string;
  instagram_token_id?: string;
  youtube_channel_id?: string;
  created_at?: string;
  updated_at?: string;
  is_active_movie?: number;
  is_active_picture?: number;
  is_active_deals?: number;
  is_active_information?: number;
  is_active_youtube?: number;
  is_active_sns?: number;
  img_cover_path?: string;
}

export interface IResponseSortFacility {
  code?: string;
  data?: TParamsSort;
  message?: string;
}

export type TParamsSort = { id?: number; order?: number }[];

export enum EGroupFacility {
  ZOO = 1,
  AQUARIUM,
  JCOM,
  PET,
  WORLD_ANIMAL,
}

export enum ETypeSortFacility {
  MOVE_UP = 1,
  MOVE_DOWN,
  TO_TOP,
  DOWN_BOTTOM,
}
