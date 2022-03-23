/**
 *
 * Messages
 *
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.common.Fields.Booking.HostName';

export default defineMessages({
  label: {
    id: `${scope}.label`,
    defaultMessage: 'Host Name',
  },
  validationRequired: {
    id: `${scope}.validationRequired`,
    defaultMessage: 'Host Name is required',
  },
});
