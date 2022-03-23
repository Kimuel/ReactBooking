import { takeLatest, put, all, delay } from 'redux-saga/effects';
// import moment from 'moment';
// import { DATE_FORMAT, TIME_FORMAT } from 'utils/constants';

import { updateBookingListField } from './actions';
import { LOAD_BOOKING_LIST } from './constants';

const bookingList = Array(100)
  .fill()
  .map((_item, index) => {
    const id = index + 1;
    return {
      id,
      roomId: id,
      roomName: `Room ${id}`,
      hostName: `Host ${id}`,
      guestName: `Guest ${id}`,
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

// Root saga
export default function* rootSaga() {
  yield all([takeLatest(LOAD_BOOKING_LIST, loadBookingList)]);
}
