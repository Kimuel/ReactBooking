/**
 *
 * Saga
 *
 */

import { takeLatest, put, all, delay } from 'redux-saga/effects';
import moment from 'moment';

import { updateBookingDetailsField } from './actions';
import {
  LOAD_BOOKING_DETAILS,
  LOAD_BOOKING_DETAILS_ITEM,
  DELETE_BOOKING_DETAILS,
} from './constants';

const img1 = '';

const orderDetails = {
  id: 2,
  details: {
    orderId: '12345',
    date: moment('2021-12-30T00:00:00Z'),
    status: 1,
    orderFrom: 'Store 1',
  },
  customer: {
    fname: 'John',
    lname: 'Doe',
    email: 'Johndoe@email.com',
    phone: '1234567890',
    country: 'PH',
  },
  paymentInfo: {
    tender: 'E-Wallet',
    transactionIds: [
      {
        id: 1,
        transactionId: '2a894b9e',
      },
      {
        id: 2,
        transactionId: '2a894b9e',
      },
    ],
    totalAmount: 1500,
  },
};

const orderItems = [
  {
    id: 1,
    image: img1,
    name: 'Product 1',
    qty: 2,
    variations: [
      {
        name: 'Richness of Taste (Rich)',
        price: 0,
      },
      {
        name: 'Special Sauce (Heavy)',
        price: 0,
      },
      {
        name: 'Garlic (Heavy)',
        price: 0,
      },
      {
        name: 'Pork (None)',
        price: 0,
      },
      {
        name: 'Vegetable (Green Onion)',
        price: 0,
      },
    ],
    price: 100,
  },
  {
    id: 2,
    image: img1,
    name: 'Product 2',
    qty: 1,
    variations: [
      {
        name: 'Richness of Taste (Rich)',
        price: 0,
      },
      {
        name: 'Special Sauce (Heavy)',
        price: 0,
      },
      {
        name: 'Garlic (Heavy)',
        price: 0,
      },
      {
        name: 'Pork (None)',
        price: 0,
      },
      {
        name: 'Vegetable (Green Onion)',
        price: 0,
      },
    ],
    price: 100,
  },
];

export function* loadOrderDetails() {
  try {
    // call api
    yield put(updateBookingDetailsField('loading', true));
    yield delay(2000);
    yield put(updateBookingDetailsField('bookingDetails', orderDetails));
  } catch (e) {
    // console.log(e);
  }

  yield put(updateBookingDetailsField('loading', false));
}

export function* loadOrderDetailsItem() {
  try {
    // call api
    yield put(updateBookingDetailsField('loadingItems', true));
    yield delay(2000);
    yield put(updateBookingDetailsField('bookingItems', orderItems));
  } catch (e) {
    // console.log(e);
  }

  yield put(updateBookingDetailsField('loadingItems', false));
}

export function* deleteOrderDetails() {
  try {
    // call api
    yield put(updateBookingDetailsField('deleting', true));
    yield delay(2000);
  } catch (e) {
    // console.log(e);
  }

  yield put(updateBookingDetailsField('deleting', false));
}

// Root saga
export default function* rootSaga() {
  yield all([
    takeLatest(LOAD_BOOKING_DETAILS, loadOrderDetails),
    takeLatest(LOAD_BOOKING_DETAILS_ITEM, loadOrderDetailsItem),
    takeLatest(DELETE_BOOKING_DETAILS, deleteOrderDetails),
  ]);
}
