export interface IErrorAPI {
  response: {
    data: {
      error?: string;
      message: string;
      success?: boolean;
    };

    [key: string]: any;
  };
}

export interface ICommonParams {
  limit?: number;
  page?: number;
  isAsc?: boolean;
  sortCategory?: number | string;
  search?: string;
}

export type TFilterParams<T = object> = ICommonParams & Partial<T>;

export interface IDefaultState<T> {
  loading: boolean;
  reloadList: boolean;
  pagination: any; // todo
  listData: T[];
}