import { IPagination } from './common.type';

export interface IFacilityState {
  loading: boolean;
  reloadList: boolean;
  loadingForm: boolean;
  listData: IFacility[];
  pagination?: IPagination;
  detailData?: IFacility;
  reloadDataDetail?: boolean;
}

export interface IFacility {
  id?: number;
  name?: string;
  group_id?: EGroupFacility;
  youtube_channel_id?: string;
  instagram_token_id?: string;
  image_thumnail_url?: string;
  folder_id?: string;
  is_active?: boolean;
  start_date?: string;
  end_date?: string;
  order?: number;
}

export enum EGroupFacility {
  ZOO = 1,
  AQUARIUM,
  JCOM,
  PET,
  WORLD_ANIMAL,
}
