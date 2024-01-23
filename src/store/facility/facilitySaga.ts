import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  IFacility,
  IRemovePayload,
  IResponseApiDetail,
  IResponseApiList,
  TCreateEditPayload,
  TFilterParams,
} from '~/types';
import facilityAPI from '~services/api/facility.api';
import { facilityActions } from './facilitySlice';

function* handleFetchData(action: PayloadAction<TFilterParams>) {
  try {
    const params = action.payload;
    const response: IResponseApiList<IFacility> = yield call(facilityAPI.getAll, params);

    yield put(facilityActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(facilityActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleGetDetail(action: PayloadAction<number>) {
  try {
    const id = action.payload;
    const response: IResponseApiDetail<IFacility> = yield call(facilityAPI.getDetail, id);

    yield put(facilityActions.getDetailSuccess(response.data || {}));
  } catch (error) {
    yield put(facilityActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleCreate(action: PayloadAction<TCreateEditPayload<IFacility>>) {
  try {
    const params = action.payload;
    const response: IFacility = yield call(facilityAPI.create, params);

    yield put(facilityActions.createSuccess(response));

    action.payload.onNavigate?.();
  } catch (error) {
    yield put(facilityActions.createFalse('An error occurred, please try again'));
  }
}

function* handleEdit(action: PayloadAction<TCreateEditPayload<IFacility>>) {
  try {
    const params = action.payload;
    const response: IFacility = yield call(facilityAPI.edit, params);

    yield put(facilityActions.editSuccess(response));

    action.payload.onNavigate?.();
  } catch (error) {
    yield put(facilityActions.editFalse('An error occurred, please try again'));
  }
}

function* handleRemove(action: PayloadAction<IRemovePayload>) {
  try {
    const id = action.payload.id;
    yield call(facilityAPI.remove, id);

    yield put(facilityActions.removeSuccess());
    action?.payload?.onNavigate?.();
  } catch (error) {
    yield put(facilityActions.removeFalse());
  }
}

function* watchApiFlow() {
  yield all([
    takeLatest(facilityActions.fetchData.type, handleFetchData),
    takeLatest(facilityActions.getDetail.type, handleGetDetail),
    takeLatest(facilityActions.create.type, handleCreate),
    takeLatest(facilityActions.edit.type, handleEdit),
    takeLatest(facilityActions.remove.type, handleRemove),
  ]);
}

export function* facilitySaga() {
  yield fork(watchApiFlow);
}
