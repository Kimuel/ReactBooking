/**
 *
 * Actions
 *
 */

import {
  LOAD_BOOKING_DETAILS,
  LOAD_BOOKING_DETAILS_ITEM,
  UPDATE_BOOKING_DETAILS_FIELD,
  DELETE_BOOKING_DETAILS,
  RESET_BOOKING_DETAILS,
} from './constants';

export function loadBookingDetails(id) {
  return { type: LOAD_BOOKING_DETAILS, id };
}

export function loadBookingDetailsItem(id) {
  return { type: LOAD_BOOKING_DETAILS_ITEM, id };
}

export function deleteBookingDetails(id) {
  return { type: DELETE_BOOKING_DETAILS, id };
}

export function updateBookingDetailsField(field, value) {
  return { type: UPDATE_BOOKING_DETAILS_FIELD, field, value };
}

export function resetBookingDetails() {
  return { type: RESET_BOOKING_DETAILS };
}
