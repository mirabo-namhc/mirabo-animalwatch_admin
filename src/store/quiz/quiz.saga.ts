import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { IResponseApiList, IResponseApiDetail, TFilterParams } from '~/types';
import { quizActions } from './quiz.slice';
import { IQuiz } from '~/types/quiz.type';
import quizAPI from '~services/api/quiz.api';

function* handleFetchData(action: PayloadAction<TFilterParams>) {
  try {
    const params = action.payload;
    const response: IResponseApiList<IQuiz> = yield call(quizAPI.getAll, params);

    yield put(quizActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(quizActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleGetDetail(action: PayloadAction<number>) {
  try {
    const id = action.payload;
    const response: IResponseApiDetail<IQuiz> = yield call(quizAPI.getDetail, id);

    if (response.data) {
      yield put(quizActions.getDetailSuccess(response.data));
    } else {
      yield put(quizActions.getDetailFalse('Quiz Not Found'));
    }
  } catch (error) {
    yield put(quizActions.getDetailFalse('Quiz Not Found'));
  }
}

function* handleCreate(action: PayloadAction<{ params: IQuiz; onCreatedSuccess: () => void }>) {
  try {
    const { params, onCreatedSuccess } = action.payload;
    const response: IQuiz = yield call(quizAPI.create, params);

    if (response) {
      yield put(quizActions.createSuccess('Create Coupon Success'));
      onCreatedSuccess();
    }
  } catch (error) {
    yield put(quizActions.createFalse('An error occurred, please try again'));
  }
}

function* handleEdit(action: PayloadAction<{ params: IQuiz; onUpdateSuccess: () => void }>) {
  try {
    const { params, onUpdateSuccess } = action.payload;
    const response: IQuiz = yield call(quizAPI.edit, params);

    if (response) {
      yield put(quizActions.editSuccess('Update Coupon Success'));
      onUpdateSuccess();
    }
  } catch (error) {
    yield put(quizActions.editFailed('An error occurred, please try again'));
  }
}

function* handleDelete(action: PayloadAction<{ params: number; onDeleteSuccess: () => void }>) {
  try {
    const { params: couponId, onDeleteSuccess } = action.payload;
    const response: IQuiz = yield call(quizAPI.remove, couponId);

    if (response) {
      yield put(quizActions.deleteSuccess('Deleted Coupon Success'));
      onDeleteSuccess();
    }
  } catch (error) {
    yield put(quizActions.deleteFailed('An error occurred, please try again'));
  }
}

function* watchApiFlow() {
  yield all([
    takeLatest(quizActions.fetchData.type, handleFetchData),
    takeLatest(quizActions.getDetail.type, handleGetDetail),
    takeLatest(quizActions.create.type, handleCreate),
    takeLatest(quizActions.edit.type, handleEdit),
    takeLatest(quizActions.delete.type, handleDelete),
  ]);
}

export function* quizSaga() {
  yield fork(watchApiFlow);
}
