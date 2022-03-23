/**
 *
 * Reducer
 *
 */

import produce from 'immer';
import PropTypes from 'prop-types';
import { ROWS_PER_PAGE_DEFAULT } from 'utils/constants';

import { UPDATE_BOOKING_LIST_FIELD, RESET_BOOKING_LIST } from './constants';

export const initialState = {
  bookingList: [],
  pagination: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: ROWS_PER_PAGE_DEFAULT,
  },
  loading: false,
};

export const BookingListPropTypes = {
  bookingList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      roomId: PropTypes.number,
      roomName: PropTypes.string,
      hostName: PropTypes.string,
      guestName: PropTypes.string,
      bookingDate: PropTypes.any,
      bookingTimeStart: PropTypes.any,
      bookingTimeEnd: PropTypes.any,
    }),
  ),
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
  }),

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
