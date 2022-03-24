/**
 *
 * Saga
 *
 */

import { takeLatest, put, all, delay } from 'redux-saga/effects';

import rooms from 'json/rooms.json';
import schedules from 'json/schedules.json';

import { updateBookingListField } from './actions';
import { LOAD_BOOKING_LIST } from './constants';

export function* loadBookingList() {
  yield put(updateBookingListField('loading', true));
  yield delay(2000);
  yield put(updateBookingListField('bookingList', schedules));
  yield put(updateBookingListField('loading', false));
  yield put(updateBookingListField('loaded', true));
}

export function* loadRooms() {
  yield put(updateBookingListField('rooms', rooms));
}

// Root saga
export default function* rootSaga() {
  yield all([
    takeLatest(LOAD_BOOKING_LIST, loadBookingList),
    takeLatest(LOAD_BOOKING_LIST, loadRooms),
  ]);
}
