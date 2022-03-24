/**
 *
 * Selectors
 *
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import KEY from './constants';

/**
 * Direct selector to the state domain
 */
const selectBookingDetails = (globalState) => globalState[KEY] || initialState;

/**
 * Select data
 */
const makeSelectBookingDetails = () =>
  createSelector(selectBookingDetails, (state) => state.bookingDetails);

/**
 * Select loading
 */
const makeSelectBookingDetailsLoading = () =>
  createSelector(selectBookingDetails, (state) => state.loading);

export {
  selectBookingDetails,
  makeSelectBookingDetails,
  makeSelectBookingDetailsLoading,
};
