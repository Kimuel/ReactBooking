/**
 *
 * Reducer
 *
 */

import produce from 'immer';
import PropTypes from 'prop-types';
import moment from 'moment';
import { bookingDuration } from 'enums/booking.enum';

import {
  UPDATE_BOOKING_DETAILS_FIELD,
  RESET_BOOKING_DETAILS,
} from './constants';

export const initialState = {
  bookingDetails: {
    id: null,
    roomId: null,
    hostName: '',
    guestsName: [],
    date: moment().format(),
    timeStart: moment().set({ hour: 8, minute: 0 }).format(),
    duration: bookingDuration.HALF_HOUR,
  },
  loading: false,
};

export const BookingDetailsPropTypes = {
  bookingDetails: PropTypes.shape({
    id: PropTypes.number,
    roomId: PropTypes.number,
    hostName: PropTypes.string,
    guestsName: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.any,
    timeStart: PropTypes.any,
    duration: PropTypes.oneOf([
      bookingDuration.HALF_HOUR,
      bookingDuration.HOUR,
    ]),
  }),
  loading: PropTypes.bool,
};

/* eslint-disable default-case, no-param-reassign, default-param-last */
const BookingDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_BOOKING_DETAILS_FIELD:
        draft[action.field] = action.value;
        break;
      case RESET_BOOKING_DETAILS:
        Object.keys(initialState).forEach((key) => {
          draft[key] = initialState[key];
        });
        break;
    }
  });

export default BookingDetailsReducer;
