import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { IResponseApiDetail, IResponseApiList, TFilterParams } from '~/types';
import { couponActions } from './couponSlice';
import { ICoupon } from '~/types/coupon.type';
import couponAPI from '~services/api/coupon.api';
import { COUPON_INDEX_SCREEN_NAME } from '~constants/endpoint';
import { messageCud } from '~utils/funcHelper';

function* handleFetchData(action: PayloadAction<TFilterParams>) {
  try {
    const params = action.payload;
    const response: IResponseApiList<ICoupon> = yield call(couponAPI.getAll, params);

    yield put(couponActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(couponActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleGetDetail(action: PayloadAction<number>) {
  try {
    const id = action.payload;
    const response: IResponseApiDetail<ICoupon> = yield call(couponAPI.getDetail, id);

    if (response.data) {
      yield put(couponActions.getDetailSuccess(response.data));
    } else {
      yield put(couponActions.getDetailFalse('Coupon Not Found'));
    }
  } catch (error) {
    yield put(couponActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleCreate(action: PayloadAction<{ params: ICoupon; onCreatedSuccess: () => void }>) {
  const { failedMessage, successMessage } = messageCud(COUPON_INDEX_SCREEN_NAME, 'CREATE');

  try {
    const { params, onCreatedSuccess } = action.payload;
    const response: ICoupon = yield call(couponAPI.create, params);

    if (response) {
      yield put(couponActions.createSuccess(successMessage));
      onCreatedSuccess();
    } else {
      yield put(couponActions.createFalse(failedMessage));
    }
  } catch (error) {
    yield put(couponActions.createFalse(failedMessage));
  }
}

function* handleEdit(action: PayloadAction<{ params: ICoupon; onUpdateSuccess: () => void }>) {
  const { failedMessage, successMessage } = messageCud(COUPON_INDEX_SCREEN_NAME, 'UPDATE');

  try {
    const { params, onUpdateSuccess } = action.payload;
    const response: ICoupon = yield call(couponAPI.edit, params);

    if (response) {
      yield put(couponActions.editSuccess(successMessage));
      onUpdateSuccess();
    } else {
      yield put(couponActions.editFailed(failedMessage));
    }
  } catch (error) {
    yield put(couponActions.editFailed(failedMessage));
  }
}

function* handleDelete(action: PayloadAction<{ params: number; onDeleteSuccess: () => void }>) {
  const { failedMessage, successMessage } = messageCud(COUPON_INDEX_SCREEN_NAME, 'DELETE');

  try {
    const { params: couponId, onDeleteSuccess } = action.payload;
    const response: ICoupon = yield call(couponAPI.remove, couponId);

    if (response) {
      yield put(couponActions.deleteSuccess(successMessage));
      onDeleteSuccess();
    } else {
      yield put(couponActions.deleteFailed(failedMessage));
    }
  } catch (error) {
    yield put(couponActions.deleteFailed(failedMessage));
  }
}

function* watchApiFlow() {
  yield all([
    takeLatest(couponActions.fetchData.type, handleFetchData),
    takeLatest(couponActions.getDetail.type, handleGetDetail),
    takeLatest(couponActions.create.type, handleCreate),
    takeLatest(couponActions.edit.type, handleEdit),
    takeLatest(couponActions.delete.type, handleDelete),
  ]);
}

export function* couponSaga() {
  yield fork(watchApiFlow);
}
