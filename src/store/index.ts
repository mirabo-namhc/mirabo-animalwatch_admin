import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './auth/authSlice';
import couponReducer from './coupon/couponSlice';
import eventReducer from './event/eventSlice';
import facilityReducer from './facility/facilitySlice';
import formReducer from './form/formSlice';
import quizReducer from './quiz/quiz.slice';
import rootSaga from './rootSaga';
import bannerReducer from './banner/bannerSlice';
import videoReducer from './video/videoSlice';

const reducers = combineReducers({
  auth: authReducer,
  facility: facilityReducer,
  coupon: couponReducer,
  event: eventReducer,
  quiz: quizReducer,
  form: formReducer,
  banner: bannerReducer,
  video: videoReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
