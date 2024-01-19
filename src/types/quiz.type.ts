import dayjs from 'dayjs';
import { IPagination } from './common.type';
import { EActiveField } from './enum.type';

export interface IQuizState {
  loading: boolean;
  reloadList: boolean;
  loadingCreate: boolean;
  loadingDelete: boolean;
  loadingUpdate: boolean;
  listData: IQuiz[];
  pagination?: IPagination;
  detailData?: IQuiz | null;
}

export interface IQuiz {
  id?: number;
  title?: string;
  question?: string;
  correct_answer?: string;
  answer_a?: string;
  answer_b?: string;
  answer_c?: string;
  image_url?: string;
  explanation_content?: string | null;
  explanation_image_url?: string | null;
  is_active?: EActiveField;
  end_date?: string | dayjs.Dayjs;
  start_date?: string | dayjs.Dayjs;
  created_at?: string;
  updated_at?: string;
}

export enum IQuizStatus {}
