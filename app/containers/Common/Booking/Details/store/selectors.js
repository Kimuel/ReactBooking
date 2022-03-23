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
 * Select order items
 */
const makeSelectBookingDetailsItem = () =>
  createSelector(selectBookingDetails, (state) => state.bookingItems);

/**
 * Select loading
 */
const makeSelectBookingDetailsLoading = () =>
  createSelector(selectBookingDetails, (state) => state.loading);

/**
 * Select loadingItem
 */
const makeSelectBookingDetailsItemLoading = () =>
  createSelector(selectBookingDetails, (state) => state.loadingItems);

/**
 * Select statusCode
 */
const makeSelectBookingDetailsErrorCode = () =>
  createSelector(selectBookingDetails, (state) => state.statusCode);

export {
  selectBookingDetails,
  makeSelectBookingDetails,
  makeSelectBookingDetailsItem,
  makeSelectBookingDetailsLoading,
  makeSelectBookingDetailsItemLoading,
  makeSelectBookingDetailsErrorCode,
};
