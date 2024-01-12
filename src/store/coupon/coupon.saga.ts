import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { IResponseApiList, TFilterParams } from '~/types';
import { couponActions } from './couponSlice';
import { ICoupon } from '~/types/coupon.type';
import couponAPI from '~services/api/coupon.api';

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
    const response: ICoupon = yield call(couponAPI.getDetail, id);

    yield put(couponActions.getDetailSuccess(response));
  } catch (error) {
    yield put(couponActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleCreate(action: PayloadAction<{ params: ICoupon; onCreatedSuccess: () => void }>) {
  try {
    const { params, onCreatedSuccess } = action.payload;
    const response: ICoupon = yield call(couponAPI.create, params);

    if (response) {
      yield put(couponActions.createSuccess('Create Coupon Success'));
      onCreatedSuccess();
    }
  } catch (error) {
    yield put(couponActions.createFalse('An error occurred, please try again'));
  }
}

function* handleEdit(action: PayloadAction<{ params: ICoupon; onUpdateSuccess: () => void }>) {
  try {
    const { params, onUpdateSuccess } = action.payload;
    const response: ICoupon = yield call(couponAPI.edit, params);

    if (response) {
      yield put(couponActions.editSuccess('Update Coupon Success'));
      onUpdateSuccess();
    }
  } catch (error) {
    yield put(couponActions.editFailed('An error occurred, please try again'));
  }
}

function* handleDelete(action: PayloadAction<{ params: number; onDeleteSuccess: () => void }>) {
  try {
    const { params: couponId, onDeleteSuccess } = action.payload;
    const response: ICoupon = yield call(couponAPI.remove, couponId);

    if (response.status) {
      yield put(couponActions.deleteSuccess('Deleted Coupon Success'));
      onDeleteSuccess();
    }
  } catch (error) {
    yield put(couponActions.deleteFailed('An error occurred, please try again'));
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
