import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  IRemovePayload,
  IResponseApiDetail,
  IResponseApiListWithoutPagination,
  TCreateEditPayload,
  TFilterParams,
} from '~/types';
import { IBanner } from '~/types/banner.type';
import { BANNER_INDEX_SCREEN_NAME } from '~constants/endpoint';
import bannerAPI from '~services/api/banner.api';
import { messageCud } from '~utils/funcHelper';
import { bannerActions } from './bannerSlice';

function* handleFetchData(action: PayloadAction<TFilterParams>) {
  try {
    const params = action.payload;

    const response: IResponseApiListWithoutPagination<IBanner> = yield call(
      bannerAPI.getAll,
      params,
    );

    yield put(bannerActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(bannerActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleGetDetail(action: PayloadAction<number>) {
  try {
    const id = action.payload;
    const response: IResponseApiDetail<IBanner> = yield call(bannerAPI.getDetail, id);

    if (response.data) {
      yield put(bannerActions.getDetailSuccess(response.data || {}));
    } else {
      yield put(bannerActions.getDetailFalse('Banner Not Found'));
    }
  } catch (error) {
    yield put(bannerActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleCreate(action: PayloadAction<{ params: IBanner; onCreatedSuccess: () => void }>) {
  const { failedMessage, successMessage } = messageCud(BANNER_INDEX_SCREEN_NAME, 'CREATE');

  try {
    const { params, onCreatedSuccess } = action.payload;
    const response: IBanner = yield call(bannerAPI.create, params);

    if (response) {
      yield put(bannerActions.createSuccess(successMessage));
      onCreatedSuccess();
    } else {
      yield put(bannerActions.createFalse(failedMessage));
    }
  } catch (error) {
    yield put(bannerActions.createFalse(failedMessage));
  }
}

function* handleEdit(action: PayloadAction<{ params: IBanner; onUpdateSuccess: () => void }>) {
  const { failedMessage, successMessage } = messageCud(BANNER_INDEX_SCREEN_NAME, 'UPDATE');

  try {
    const { onUpdateSuccess, params } = action.payload;
    const response: IBanner = yield call(bannerAPI.edit, params);

    if (response) {
      yield put(bannerActions.editSuccess(successMessage));
      onUpdateSuccess();
    } else {
      yield put(bannerActions.editFalse(failedMessage));
    }
  } catch (error) {
    yield put(bannerActions.editFalse(failedMessage));
  }
}

function* handleRemove(action: PayloadAction<{ id: number; onDeleteSuccess: () => void }>) {
  const { failedMessage, successMessage } = messageCud(BANNER_INDEX_SCREEN_NAME, 'DELETE');
  try {
    const { id: bannerId, onDeleteSuccess } = action.payload;
    const resposen: IResponseApiDetail<IBanner> = yield call(bannerAPI.remove, bannerId);

    if (resposen.data) {
      yield put(bannerActions.removeSuccess(successMessage));
      onDeleteSuccess?.();
    } else {
      yield put(bannerActions.removeFalse(failedMessage));
    }
  } catch (error) {
    yield put(bannerActions.removeFalse(failedMessage));
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
