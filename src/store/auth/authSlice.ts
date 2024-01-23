import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthState, ILoginPayload, IRegisterPayload, IResponseAuth, IUserData } from '~/types';
import { getAuth, setAuth } from '~utils/auth';
import { RootState } from '..';
import { message } from 'antd';

const api_token = getAuth()?.api_token;

const initialState: IAuthState = {
  isLoggedIn: api_token ? true : false, // logged
  logging: false, // loading
  loadingRegister: false,
  userData: undefined, // info user if login success
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<ILoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<IResponseAuth['data']>) {
      state.isLoggedIn = true;
      state.logging = false;
      // todo:
      // state.userData = action.payload;
      setAuth({
        api_token: action.payload.token,
        user: undefined,
      })
    },
    loginFailed(state) {
      state.logging = false;
      message.error("ログインに失敗しました。");
    },

    logout(state, action: PayloadAction<unknown>) {
      state.isLoggedIn = false;
      state.userData = undefined;
    },

    register(state, action: PayloadAction<IRegisterPayload>) {
      state.loadingRegister = true;
    },
    registerSuccess(state, action: PayloadAction<IUserData>) {
      state.isLoggedIn = true;
      state.loadingRegister = false;
      state.userData = action.payload;
    },
    registerFailed(state, action: PayloadAction<string>) {
      state.loadingRegister = false;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
