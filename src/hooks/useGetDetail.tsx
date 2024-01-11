import { CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/_lib/redux/hooks';
import { RootState } from '~store/index';

type TRootState = Omit<RootState, 'auth'>;

interface UseGetListProps {
  id: number;
  action: CaseReducerActions<SliceCaseReducers<any>, string>;
  nameState: keyof TRootState;
  isGetApi?: boolean;
}

export default function useGetDetail({ id, action, nameState, isGetApi = true }: UseGetListProps) {
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
    [id],
  );

  useEffect(() => {
    if (isGetApi) fetchData(id);

    return () => {
      dispatch(action?.clearData?.(id));
    };
  }, [id]);

  return { detailData, loading: loading };
}
