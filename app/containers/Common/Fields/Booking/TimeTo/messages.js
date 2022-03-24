/**
 *
 * Messages
 *
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.common.Fields.Booking.TimeTo';

export default defineMessages({
  label: {
    id: `${scope}.label`,
    defaultMessage: 'Duration',
  },
  validationRequired: {
    id: `${scope}.validationRequired`,
    defaultMessage: 'You must specify Duration',
  },
  menuItemHalfHour: {
    id: `${scope}.menuItemHalfHour`,
    defaultMessage: '30 minutes',
  },
  menuItemHour: {
    id: `${scope}.menuItemHour`,
    defaultMessage: '1 hour',
  },
});
