import cache from "@common/utils/cache";
import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    mode: null,
    role: null,
    token: cache.get("token"),
    data: {},
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload && action.payload.accessToken;
      state.role = action.payload && action.payload.role;
      state.mode = action.payload && action.payload.mode;
      cache.set("token", state.token);
      cache.set("refreshToken", action.payload.refreshToken);
    },
    logoutSuccess: (state) => {
      state.authUser = null;
      state.token = null;
      cache.remove("token");
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutSuccess, setMode, setRole, setData } =
  slice.actions;

// Get value from state
export const authStore = (state) => state.auth;

export default slice.reducer;
