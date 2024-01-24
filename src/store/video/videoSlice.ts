import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

const initialState = {
    loading: false,
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
    },
});

// Actions
export const videoActions = videoSlice.actions;

// Reducer
const videoReducer = videoSlice.reducer;
export default videoReducer;
