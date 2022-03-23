/**
 *
 * Saga
 *
 */

import { takeLatest, put, all, delay } from 'redux-saga/effects';

import { updateBookingListField } from './actions';
import { LOAD_BOOKING_LIST } from './constants';

// Temporary
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rooms = [
  {
    id: 1,
    name: 'Room 1',
  },
  {
    id: 2,
    name: 'Room 2',
  },
  {
    id: 3,
    name: 'Room 3',
  },
  {
    id: 4,
    name: 'Room 4',
  },
  {
    id: 5,
    name: 'Room 5',
  },
];

const bookingList = Array(100)
  .fill()
  .map((_item, index) => {
    const id = index + 1;
    return {
      id,
      roomId: randomIntFromInterval(1, 5),
      hostName: `Host ${id}`,
      guestsName: [`Guest ${id}`],
      bookingDate: '2022-03-23T00:00:00Z',
      bookingTimeStart: '2022-03-23T01:32:00Z',
      bookingTimeEnd: '2022-03-23T05:32:00Z',
    };
  });

export function* loadBookingList() {
  yield put(updateBookingListField('loading', true));
  yield delay(5000);
  yield put(updateBookingListField('bookingList', bookingList));
  yield put(updateBookingListField('loading', false));
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
