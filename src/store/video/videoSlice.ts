import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { IPagination, IResponseApiList, IVideoPlayer, TFilterParams } from '~types';
import { getPaginationInfo } from '~utils/funcHelper';

export interface IVideoPlayerState {
  loading: boolean;
  reloadList: boolean;
  listData: IVideoPlayer[];
  pagination?: IPagination;
}

const initialState: IVideoPlayerState = {
  loading: false,
  reloadList: false,
  listData: [],
  pagination: {},
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    syncVideo(state) {
      state.loading = true;
    },
    syncVideoSuccess(state) {
      state.loading = false;
      message.success('動画データを成功に同期しました。');
    },
    syncVideoFailed(state) {
      state.loading = false;
      message.error('データ同期に失敗しました。もう一度お試しください。');
    },

    // GET LIST
    fetchData(state, action: PayloadAction<TFilterParams>) {
      state.loading = true;
    },
    fetchDataSuccess(state, action: PayloadAction<IResponseApiList<IVideoPlayer>>) {
      state.loading = false;
      state.listData = (action?.payload?.data?.data || []) as IVideoPlayer[];
      state.pagination = getPaginationInfo(action?.payload?.data);
    },
    fetchDataFalse(state, action) {
      state.loading = false;
      message.error(action.payload);
    },
    clearData(state) {
      state.listData = [];
    },
  },
});

// Actions
export const videoActions = videoSlice.actions;

// Reducer
const videoReducer = videoSlice.reducer;
export default videoReducer;
