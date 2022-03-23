/**
 *
 * Actions
 *
 */

import {
  UPDATE_BOOKING_LIST_FIELD,
  LOAD_BOOKING_LIST,
  RESET_BOOKING_LIST,
} from './constants';

export function loadBookingList() {
  return { type: LOAD_BOOKING_LIST };
}

export function updateBookingListField(field, value) {
  return { type: UPDATE_BOOKING_LIST_FIELD, field, value };
}

export function resetBookingList() {
  return { type: RESET_BOOKING_LIST };
}
