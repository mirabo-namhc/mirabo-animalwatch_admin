import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { IErrorAPI, ILoginPayload, ILogoutPayload, IResponseAuth, IUserData } from '~/types';
import authAPI from '~services/api/auth.api';
import { logout } from '~utils/auth';
import { authActions } from './authSlice';


function* handleLogin(action: PayloadAction<ILoginPayload>) {
  const payload = action.payload;
  try {
    const response: IResponseAuth = yield call(authAPI.login, payload);

    yield put(authActions.loginSuccess(response.data as IResponseAuth['data']));

    action.payload.onNavigate?.();
  } catch (error: IErrorAPI | unknown) {
    console.error(error);
    yield put(authActions.loginFailed());
  }
}

function* handleLogout(action: PayloadAction<ILogoutPayload>) {
  yield delay(500);

  logout()
  action.payload.onNavigate?.();
}

function* watchLoginFlow() {
  yield all([takeLatest(authActions.login.type, handleLogin), takeLatest(authActions.logout.type, handleLogout)]);
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
