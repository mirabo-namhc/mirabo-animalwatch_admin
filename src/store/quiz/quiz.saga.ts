import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { IResponseApiList, IResponseApiDetail, TFilterParams } from '~/types';
import { quizActions } from './quiz.slice';
import { IQuiz } from '~/types/quiz.type';
import quizAPI from '~services/api/quiz.api';
import { messageCud } from '~utils/funcHelper';
import { QUIZ_INDEX_SCREEN_NAME } from '~constants/endpoint';

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
  const { failedMessage, successMessage } = messageCud(QUIZ_INDEX_SCREEN_NAME, 'CREATE');
  try {
    const { params, onCreatedSuccess } = action.payload;
    const response: IQuiz = yield call(quizAPI.create, params);

    if (response) {
      yield put(quizActions.createSuccess(successMessage));
      onCreatedSuccess();
    } else {
      yield put(quizActions.createFalse(failedMessage));
    }
  } catch (error) {
    yield put(quizActions.createFalse(failedMessage));
  }
}

function* handleEdit(action: PayloadAction<{ params: IQuiz; onUpdateSuccess: () => void }>) {
  const { failedMessage, successMessage } = messageCud(QUIZ_INDEX_SCREEN_NAME, 'UPDATE');
  try {
    const { params, onUpdateSuccess } = action.payload;
    const response: IQuiz = yield call(quizAPI.edit, params);

    if (response) {
      yield put(quizActions.editSuccess(successMessage));
      onUpdateSuccess();
    } else {
      yield put(quizActions.editFailed(failedMessage));
    }
  } catch (error) {
    yield put(quizActions.editFailed(failedMessage));
  }
}

function* handleDelete(action: PayloadAction<{ params: number; onDeleteSuccess: () => void }>) {
  const { failedMessage, successMessage } = messageCud(QUIZ_INDEX_SCREEN_NAME, 'DELETE');
  try {
    const { params: quizId, onDeleteSuccess } = action.payload;
    const response: IQuiz = yield call(quizAPI.remove, quizId);

    if (response) {
      yield put(quizActions.deleteSuccess(successMessage));
      onDeleteSuccess();
    } else {
      yield put(quizActions.deleteFailed(failedMessage));
    }
  } catch (error) {
    yield put(quizActions.deleteFailed(failedMessage));
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
