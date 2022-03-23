/**
 *
 * Messages
 *
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.common.Fields.Booking.TimeFrom';

export default defineMessages({
  label: {
    id: `${scope}.label`,
    defaultMessage: 'From',
  },
  validationRequired: {
    id: `${scope}.validationRequired`,
    defaultMessage: 'Time From is required',
  },
});
