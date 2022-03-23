/**
 * Messages
 *
 * This contains all the text for this module.
 *
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Common.Booking.List';

export default defineMessages({
  tableId: {
    id: `${scope}.tableId`,
    defaultMessage: 'ID',
  },
  tableRoomName: {
    id: `${scope}.tableRoomName`,
    defaultMessage: 'Room Name',
  },
  tableHostName: {
    id: `${scope}.tableHostName`,
    defaultMessage: 'Host Name',
  },
  tableGuestName: {
    id: `${scope}.tableGuestName`,
    defaultMessage: 'Guests Name',
  },
  tableDateOfBooking: {
    id: `${scope}.tableDateOfBooking`,
    defaultMessage: 'Date of booking',
  },
  tableTimeStart: {
    id: `${scope}.tableTimeStart`,
    defaultMessage: 'From',
  },
  tableTimeEnd: {
    id: `${scope}.tableTimeEnd`,
    defaultMessage: 'To',
  },
  tableActions: {
    id: `${scope}.tableActions`,
    defaultMessage: 'Actions',
  },
  tableActionsEdit: {
    id: `${scope}.tableActionsEdit`,
    defaultMessage: 'Edit',
  },
  tableActionsDelete: {
    id: `${scope}.tableActionsDelete`,
    defaultMessage: 'Delete',
  },
});
