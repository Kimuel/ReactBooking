/**
 *
 * Messages
 *
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.common.Fields.Booking.RoomName';

export default defineMessages({
  label: {
    id: `${scope}.label`,
    defaultMessage: 'Room Name',
  },
  validationRequired: {
    id: `${scope}.validationRequired`,
    defaultMessage: 'You must specify room name',
  },
});
