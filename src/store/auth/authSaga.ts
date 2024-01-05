import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { IErrorAPI, ILoginPayload, IResponseAuth, IUserData } from '~/types'
import { authActions } from './authSlice'
import { setAuth } from '~utils/auth';

const fakeApiLogin = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const dataFromApi = { key: 'value' };
            resolve(dataFromApi);
        }, 1000);
    });
};

function* handleLogin(action: PayloadAction<ILoginPayload>) {
    const payload = action.payload
    try {
        const response: IResponseAuth<IUserData> = yield call(fakeApiLogin)

        setAuth({
            api_token: 'api_token',
            user: undefined,
        })

        yield put(authActions.loginSuccess(response.data as IUserData))
    } catch (error: IErrorAPI | unknown) {
        console.error(error)
    }
}

function* watchLoginFlow() {
    yield all([
        takeLatest(authActions.login.type, handleLogin),
    ])
}

export function* authSaga() {
    yield fork(watchLoginFlow)
}
