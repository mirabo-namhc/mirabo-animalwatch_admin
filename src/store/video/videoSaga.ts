import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import videoAPI from '~services/api/video.api';
import { videoActions } from './videoSlice';
import { IResponseApiList, IVideoPlayer, TFilterParams } from '~types';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleSyncVideo() {
  try {
    yield call(videoAPI.syncVideo);

    yield put(videoActions.syncVideoSuccess());
  } catch (error) {
    yield put(videoActions.syncVideoFailed());
  }
}

function* handleFetchData(action: PayloadAction<TFilterParams>) {
  try {
    const params = action.payload;
    const response: IResponseApiList<IVideoPlayer> = yield call(videoAPI.getAll, params);

    yield put(videoActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(videoActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* watchApiFlow() {
  yield all([
    takeLatest(videoActions.syncVideo.type, handleSyncVideo),
    takeLatest(videoActions.fetchData.type, handleFetchData),
  ]);
}

export function* videoSaga() {
  yield fork(watchApiFlow);
}
