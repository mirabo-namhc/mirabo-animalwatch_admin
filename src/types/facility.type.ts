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

export interface IFacility extends IIsActiveFacility {
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

  img_cover_path?: string;
  list_active?: (keyof IIsActiveFacility)[];
}

export interface IIsActiveFacility {
  is_active_movie?: boolean;
  is_active_picture?: boolean;
  is_active_deals?: boolean;
  is_active_information?: boolean;
  is_active_youtube?: boolean;
  is_active_sns?: boolean;
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
