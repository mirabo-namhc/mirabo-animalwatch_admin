import { CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/_lib/redux/hooks';
import { RootState } from '~store/index';
import { useURLInfo } from '.';

type TRootState = Omit<RootState, 'auth'>;

interface UseGetListProps {
  action: CaseReducerActions<SliceCaseReducers<any>, string>;
  nameState: keyof TRootState;
  isGetApi?: boolean;
}

export default function useGetDetail({ action, nameState, isGetApi = true }: UseGetListProps) {
  const { id, pathname } = useURLInfo();
  const dispatch = useAppDispatch();
  const { detailData, loading } = useAppSelector((state: TRootState) => state[nameState]);

  const fetchData = useCallback(
    (id: number) => {
      try {
        dispatch(action?.getDetail?.(id));
      } catch (error) {
        console.error({ error });
      }
    },
    [id, pathname],
  );

  useEffect(() => {
    if (isGetApi) fetchData(Number(id));

    return () => {
      dispatch(action?.clearData?.(id));
    };
  }, [id, pathname]);

  return { detailData, loading: loading };
}
