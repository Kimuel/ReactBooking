/**
 *
 * Reducer
 *
 */

import produce from 'immer';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  UPDATE_BOOKING_DETAILS_FIELD,
  RESET_BOOKING_DETAILS,
} from './constants';

export const initialState = {
  bookingDetails: {},
  loading: false,
};

export const BookingDetailsPropTypes = {
  bookingDetails: PropTypes.shape({
    id: PropTypes.number,
    details: PropTypes.shape({
      orderId: PropTypes.any,
      date: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.instanceOf(moment),
      ]),
      orderStatus: PropTypes.number,
      orderFrom: PropTypes.string,
    }),
    customer: PropTypes.shape({
      fname: PropTypes.string,
      lname: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      country: PropTypes.string,
    }),
    paymentInfo: PropTypes.shape({
      tender: PropTypes.string,
      transactionIds: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          transactionId: PropTypes.string,
        }),
      ),
      totalAmount: PropTypes.number,
    }),
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
