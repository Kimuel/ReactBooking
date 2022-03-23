/**
 *
 * Messages
 *
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.common.Fields.Booking.Date';

export default defineMessages({
  label: {
    id: `${scope}.label`,
    defaultMessage: 'Date',
  },
  validationRequired: {
    id: `${scope}.validationRequired`,
    defaultMessage: 'Date is required',
  },
});
