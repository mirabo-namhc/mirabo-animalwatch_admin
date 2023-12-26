import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import auth from "./slices/authSlice";
import project from "./slices/projectSlice";
import layout from "./slices/layoutSlice";

const reducers = combineReducers({
  auth,
  project,
  layout,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
