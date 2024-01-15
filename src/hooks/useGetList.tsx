import { CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/_lib/redux/hooks';
import { RootState } from '~store/index';
import { TFilterParams } from '~types';

type TRootState = Omit<RootState, 'auth'>;

interface UseGetListProps {
  params: TFilterParams;
  action: CaseReducerActions<SliceCaseReducers<any>, string>;
  nameState: keyof TRootState;
}

export default function useGetList<T>({ params, action, nameState }: UseGetListProps) {
  const dispatch = useAppDispatch();
  const { listData, pagination, reloadList, loading } = useAppSelector(
    (state: TRootState) => state[nameState],
  );

  const fetchData = useCallback(
    (params: TFilterParams) => {
      try {
        const paramsApi = { ...params };
        dispatch(action?.fetchData?.(paramsApi || {}));
      } catch (error) {
        console.error({ error });
      }
    },
    [params, reloadList],
  );

  useEffect(() => {
    fetchData(params);
  }, [params, reloadList]);

  return { listData: listData as T, pagination, reloadList, loading };
}
