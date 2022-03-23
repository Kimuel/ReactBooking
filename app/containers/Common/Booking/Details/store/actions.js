/**
 *
 * Actions
 *
 */

import {
  LOAD_BOOKING_DETAILS,
  UPDATE_BOOKING_DETAILS_FIELD,
  RESET_BOOKING_DETAILS,
} from './constants';

export function loadBookingDetails(id) {
  return { type: LOAD_BOOKING_DETAILS, id };
}

export function updateBookingDetailsField(field, value) {
  return { type: UPDATE_BOOKING_DETAILS_FIELD, field, value };
}

export function resetBookingDetails() {
  return { type: RESET_BOOKING_DETAILS };
}
