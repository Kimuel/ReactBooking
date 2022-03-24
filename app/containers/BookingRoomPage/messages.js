/**
 *
 * Messages
 *
 * This contains all the text for this module.
 *
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BookingRoomPage';

export default defineMessages({
  headerTitle: {
    id: `${scope}.headerTitle`,
    defaultMessage: 'Room',
  },
  btnNewBooking: {
    id: `${scope}.btnNewBooking`,
    defaultMessage: 'New Meeting',
  },
});
