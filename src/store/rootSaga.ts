import { all } from 'redux-saga/effects';
import { authSaga } from './auth/authSaga';
import { facilitySaga } from './facility/facilitySaga';

export default function* rootSaga() {
  yield all([authSaga(), facilitySaga()]);
}
