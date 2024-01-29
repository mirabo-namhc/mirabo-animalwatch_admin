import { CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/_lib/redux/hooks';
import { RootState } from '~store/index';
import { TFilterParams } from '~types';

type TRootState = Omit<RootState, 'auth' | 'form'>;

export interface IUseGetListProps {
  params?: TFilterParams;
  action?: CaseReducerActions<SliceCaseReducers<any>, string>;
  nameState?: keyof TRootState;
}

export default function useGetList<T>({ params, action, nameState }: IUseGetListProps) {
  const dispatch = useAppDispatch();
  const { listData, pagination, reloadList, loading } = useAppSelector(
    (state: TRootState) => state[nameState ?? 'facility'],
  );

  const fetchData = useCallback(
    (params?: TFilterParams) => {
      try {
        if (nameState && action) {
          const paramsApi = { ...params };
          dispatch(action?.fetchData?.(paramsApi || {}));
        }
      } catch (error) {
        console.error({ error });
      }
    },
    [params, nameState, reloadList],
  );

  useEffect(() => {
    fetchData(params);
  }, [params, reloadList, nameState]);

  return { listData: listData as T, pagination, reloadList, loading };
}
