/**
 *
 * Reducer
 *
 */

import produce from 'immer';
import PropTypes from 'prop-types';

import { UPDATE_BOOKING_LIST_FIELD, RESET_BOOKING_LIST } from './constants';

export const initialState = {
  bookingList: [],
  rooms: [],
  loaded: false,
  loading: false,
};

export const BookingListPropTypes = {
  bookingList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      roomId: PropTypes.number,
      hostName: PropTypes.string,
      guestsName: PropTypes.arrayOf(PropTypes.string),
      bookingDate: PropTypes.any,
      bookingTimeStart: PropTypes.any,
      duration: PropTypes.number,
    }),
  ),
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  loaded: PropTypes.bool,
  loading: PropTypes.bool,
};

/* eslint-disable default-case, no-param-reassign, default-param-last */
const BookingListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_BOOKING_LIST_FIELD:
        draft[action.field] = action.value;
        break;
      case RESET_BOOKING_LIST:
        Object.keys(initialState).forEach((key) => {
          draft[key] = initialState[key];
        });
        break;
    }
  });

export default BookingListReducer;
