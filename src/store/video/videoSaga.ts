import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import videoAPI from '~services/api/video.api';
import { videoActions } from './videoSlice';

function* handleSyncVideo() {
    try {
        yield call(videoAPI.syncVideo);

        yield put(videoActions.syncVideoSuccess());
    } catch (error) {
        yield put(videoActions.syncVideoFailed());
    }
}

function* watchApiFlow() {
    yield all([
        takeLatest(videoActions.syncVideo.type, handleSyncVideo),
    ]);
}

export function* videoSaga() {
    yield fork(watchApiFlow);
}
