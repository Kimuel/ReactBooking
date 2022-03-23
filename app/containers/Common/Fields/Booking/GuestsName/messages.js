/**
 *
 * Messages
 *
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.common.Fields.Booking.GuestsName';

export default defineMessages({
  label: {
    id: `${scope}.label`,
    defaultMessage: 'Guests Name',
  },
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Add Guest',
  },
  validationRequired: {
    id: `${scope}.validationRequired`,
    defaultMessage: 'Guests Name is required',
  },
});
