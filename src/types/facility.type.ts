import { IPagination } from './common.type';
import { EActiveField } from './enum.type';

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
  img_cover_url?: string;
  img_cover_path?: string;
  folder_id?: string;
  is_active?: EActiveField;
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
