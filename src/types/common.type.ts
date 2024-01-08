export interface IErrorAPI {
    response: {
        data: {
            error?: string
            message: string
            success?: boolean
        }

        [key: string]: any
    }
}

export interface IFilterCommonParams {
    limit?: number;
    page?: number;
    isAsc?: boolean;
    sortCategory?: number | string;
    search?: string;
}

export type TFilterParams<T = object> = IFilterCommonParams & Partial<T>;