import { all } from 'redux-saga/effects';
import { authSaga } from './auth/authSaga';
import { facilitySaga } from './facility/facilitySaga';
import { couponSaga } from './coupon/coupon.saga';
import { eventSaga } from './event/eventSaga';

export default function* rootSaga() {
  yield all([authSaga(), facilitySaga(), couponSaga(), eventSaga()]);
}
