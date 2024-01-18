import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { IRemovePayload, IResponseApiDetail, IResponseApiListWithoutPagination, TCreateEditPayload, TFilterParams } from '~/types';
import { bannerActions } from './bannerSlice';
import { IBanner } from '~/types/banner.type';
import bannerAPI from '~services/api/banner.api';

function* handleFetchData(action: PayloadAction<TFilterParams>) {
  try {
    const params = action.payload;
    
    const response: IResponseApiListWithoutPagination<IBanner> = yield call(bannerAPI.getAll, params);
    
    yield put(bannerActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(bannerActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleGetDetail(action: PayloadAction<number>) {
  try {
    const id = action.payload;
    const response: IResponseApiDetail<IBanner> = yield call(bannerAPI.getDetail, id);

    yield put(bannerActions.getDetailSuccess(response.data || {}));
  } catch (error) {
    yield put(bannerActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleCreate(action: PayloadAction<{ params: IBanner; onCreatedSuccess: () => void }>) {
  try {
    const { params, onCreatedSuccess } = action.payload;
    const response: IBanner = yield call(bannerAPI.create, params);

    if (response) {
      yield put(bannerActions.createSuccess('Create Banner Success'));
      onCreatedSuccess();
    }
  } catch (error) {
    yield put(bannerActions.createFalse('An error occurred, please try again'));
  }
}

function* handleEdit(action: PayloadAction<TCreateEditPayload<IBanner>>) {
  try {
    const params = action.payload;    
    const response: IBanner = yield call(bannerAPI.edit, params);

    yield put(bannerActions.editSuccess(response));

    action.payload.onNavigate?.();
  } catch (error) {
    yield put(bannerActions.editFalse('An error occurred, please try again'));
  }
}

function* handleRemove(action: PayloadAction<IRemovePayload>) {
  try {
    const id = action.payload.id;
    yield call(bannerAPI.remove, id);

    yield put(bannerActions.removeSuccess());
    action?.payload?.onNavigate?.();
  } catch (error) {
    yield put(bannerActions.removeFalse());
  }
}

function* watchApiFlow() {
  yield all([
    takeLatest(bannerActions.fetchData.type, handleFetchData),
    takeLatest(bannerActions.getDetail.type, handleGetDetail),
    takeLatest(bannerActions.create.type, handleCreate),
    takeLatest(bannerActions.edit.type, handleEdit),
    takeLatest(bannerActions.remove.type, handleRemove),
  ]);
}

export function* bannerSaga() {
  yield fork(watchApiFlow);
}
