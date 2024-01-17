import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { IEvent, IRemovePayload, IResponseApiDetailEvent, IResponseApiList, TCreateEditPayload, TFilterParams } from '~/types';
import eventAPI from '~services/api/event.api';
import { eventActions } from './eventSlice';

function* handleFetchData(action: PayloadAction<TFilterParams>) {
    try {
        const params = action.payload;
        const response: IResponseApiList<IEvent> = yield call(eventAPI.getAll, params);

        yield put(eventActions.fetchDataSuccess(response));
    } catch (error) {
        yield put(eventActions.fetchDataFalse('An error occurred, please try again'));
    }
}

function* handleGetDetail(action: PayloadAction<number>) {
    try {
        const id = action.payload;
        const response: IResponseApiDetailEvent<IEvent> = yield call(eventAPI.getDetail, id);
        const dataEvent = {
            ...response.data,
            ...response.data?.content
        }
        yield put(eventActions.getDetailSuccess(dataEvent || {}));
    } catch (error) {
        yield put(eventActions.fetchDataFalse('An error occurred, please try again'));
    }
}

function* handleCreate(action: PayloadAction<TCreateEditPayload<IEvent>>) {
    try {
        const params = action.payload;
        const response: IEvent = yield call(eventAPI.create, params);

        yield put(eventActions.createSuccess(response));

        action.payload.onNavigate?.();
    } catch (error) {
        yield put(eventActions.createFalse('An error occurred, please try again'));
    }
}

function* handleEdit(action: PayloadAction<TCreateEditPayload<IEvent>>) {
    try {
        const params = action.payload;
        const response: IEvent = yield call(eventAPI.edit, params);

        yield put(eventActions.editSuccess(response));

        action.payload.onNavigate?.();
    } catch (error) {
        yield put(eventActions.editFalse('An error occurred, please try again'));
    }
}

function* handleRemove(action: PayloadAction<IRemovePayload>) {
    try {
        const id = action.payload.id;
        yield call(eventAPI.remove, id);

        yield put(eventActions.removeSuccess());
        action?.payload?.onNavigate?.()
    } catch (error) {
        yield put(eventActions.removeFalse());
    }
}

function* watchApiFlow() {
    yield all([
        takeLatest(eventActions.fetchData.type, handleFetchData),
        takeLatest(eventActions.getDetail.type, handleGetDetail),
        takeLatest(eventActions.create.type, handleCreate),
        takeLatest(eventActions.edit.type, handleEdit),
        takeLatest(eventActions.remove.type, handleRemove),
    ]);
}

export function* eventSaga() {
    yield fork(watchApiFlow);
}
