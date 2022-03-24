import { createSelector } from 'reselect';
import { initialState } from './reducer';
import KEY from './constants';

/**
 * Direct selector to the Booking state domain
 */
const selectBookingList = (globalState) => globalState[KEY] || initialState;

/**
 * Select data
 */
const makeSelectBookingList = () =>
  createSelector(selectBookingList, (state) => state.bookingList);

/**
 * Select data
 */
const makeSelectBookingRooms = () =>
  createSelector(selectBookingList, (state) => state.rooms);

/**
 * Select loading
 */
const makeSelectBookingListLoading = () =>
  createSelector(selectBookingList, (state) => state.loading);

/**
 * Select loaded
 */
const makeSelectBookingListLoaded = () =>
  createSelector(selectBookingList, (state) => state.loaded);

export {
  selectBookingList,
  makeSelectBookingList,
  makeSelectBookingRooms,
  makeSelectBookingListLoaded,
  makeSelectBookingListLoading,
};
