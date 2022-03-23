/**
 *
 * Messages
 *
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.common.Booking.DeleteButton';

export default defineMessages({
  buttonText: {
    id: `${scope}.buttonText`,
    defaultMessage: 'Delete Item',
  },
  dialogTitle: {
    id: `${scope}.dialogTitle`,
    defaultMessage: 'Delete from bookings?',
  },
  dialogMessage: {
    id: `${scope}.dialogMessage`,
    defaultMessage:
      'This item will delete from your current store booking list.',
  },
  dialogConfirm: {
    id: `${scope}.dialogConfirm`,
    defaultMessage: 'Delete',
  },
  dialogCancel: {
    id: `${scope}.dialogCancel`,
    defaultMessage: 'Cancel',
  },
});
