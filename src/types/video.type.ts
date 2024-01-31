import { IFacility } from './facility.type';

export interface IVideoPlayer {
  id: number;
  video_id: string;
  name: string;
  description?: any;
  thumbnail_url: string;
  duration: number;
  tags: string;
  images?: any;
  long_description: string;
  schedule_start_at?: any;
  schedule_end_at?: any;
  published_at: string;
  custom_fields: string;
  folder_id: string;
  original_filename: string;
  last_updated_administrator_seq_no: number;
  state: string;
  economics: string;
  delivery_type: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted_at?: any;
  facility_name: string;
  content: IContentVideo;
}
export interface IContentVideo {
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

interface Data {
  id: number;
  video_id: string;
  name: string;
  description?: any;
  thumbnail_url: string;
  duration: number;
  tags: string;
  images?: any;
  long_description: string;
  schedule_start_at?: any;
  schedule_end_at?: any;
  published_at: string;
  custom_fields: string;
  folder_id: string;
  original_filename: string;
  last_updated_administrator_seq_no: number;
  state: string;
  economics: string;
  delivery_type: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted_at?: string;
}
