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
  per_page?: number;
  current_page?: number;
  isAsc?: boolean;
  sortCategory?: number | string;
  keyword?: string;
}

export type TFilterParams<T = object> = ICommonParams & Partial<T>;

export interface IResponseApiList<T> extends IPagination {
  code?: string;
  data?: {
    data?: T[];
    meta?: IPagination;
  };
  message?: string;
}

export interface IResponseApiDetail<T> {
  code?: string;
  data?: T;
  message?: string;
}

export interface IPagination {
  total_page?: number;
  per_page?: number;
  current_page?: number;
  last_page?: number;
}

export type TCreateEditPayload<T> = {
  onNavigate?(): void;
} & { [P in keyof T]?: T[P] | undefined };

export interface IRemovePayload {
  id: number;
  onNavigate?(): void;
}
