import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { IErrorAPI, ILoginPayload, ILogoutPayload, IResetPassPayload, IResponseAuth, IUserData } from '~/types';
import authAPI from '~services/api/auth.api';
import { logout } from '~utils/auth';
import { authActions } from './authSlice';


function* handleLogin(action: PayloadAction<ILoginPayload>) {
  const payload = action.payload;
  try {
    const response: IResponseAuth = yield call(authAPI.login, payload);
    const dataAuth: IResponseAuth['data'] = {...response.data, username: payload.username}

    yield put(authActions.loginSuccess(dataAuth));

    action.payload.onNavigate?.();
  } catch (error: IErrorAPI | unknown) {
    console.error(error);
    yield put(authActions.loginFailed());
  }
}

function* handleResetPass(action: PayloadAction<IResetPassPayload>) {
  const payload = action.payload;
  try {
    yield call(authAPI.resetPassword, payload);

    action?.payload?.onHanldeSuccess?.()
    yield put(authActions.resetPasswordSuccess());

    action.payload.onNavigate?.();
  } catch (error: IErrorAPI | unknown) {
    console.error(error);
    yield put(authActions.resetPasswordFailed(error as IErrorAPI));
  }
}

function* handleLogout(action: PayloadAction<ILogoutPayload>) {
  yield delay(500);

  logout()
  action.payload.onNavigate?.();
}

function* watchLoginFlow() {
  yield all([takeLatest(authActions.login.type, handleLogin), takeLatest(authActions.resetPassword.type, handleResetPass), takeLatest(authActions.logout.type, handleLogout)]);
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
