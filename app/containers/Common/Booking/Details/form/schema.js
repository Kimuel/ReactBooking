import * as yup from 'yup';
import moment from 'moment';
import { DATETIME_FORMAT } from 'utils/constants';
import { bookingDuration } from 'enums/booking.enum';

import {
  keyBookingRoom,
  schemaBookingRoom,
} from 'containers/Common/Fields/Booking/Room';
import {
  keyBookingHostName,
  schemaBookingHostName,
} from 'containers/Common/Fields/Booking/HostName';
import {
  keyBookingGuestsName,
  schemaBookingGuestsName,
} from 'containers/Common/Fields/Booking/GuestsName';
import {
  keyBookingDate,
  schemaBookingDate,
} from 'containers/Common/Fields/Booking/Date';
import {
  keyBookingTimeFrom,
  schemaBookingTimeFrom,
} from 'containers/Common/Fields/Booking/TimeFrom';
import {
  keyBookingTimeTo,
  schemaBookingTimeTo,
} from 'containers/Common/Fields/Booking/TimeTo';

export const Schema = yup.object().shape({
  [keyBookingRoom]: schemaBookingRoom,
  [keyBookingHostName]: schemaBookingHostName,
  [keyBookingGuestsName]: schemaBookingGuestsName,
  [keyBookingDate]: schemaBookingDate,
  [keyBookingTimeFrom]: schemaBookingTimeFrom,
  [keyBookingTimeTo]: schemaBookingTimeTo,
});

export const getInitialValues = (form) => ({
  [keyBookingRoom]: form?.roomId || null,
  [keyBookingHostName]: form?.hostName || '',
  [keyBookingGuestsName]: form?.guestsName || [],
  [keyBookingDate]: form?.date || moment().format(DATETIME_FORMAT),
  [keyBookingTimeFrom]:
    form?.timeStart ||
    moment().set({ hour: 8, minute: 0 }).format(DATETIME_FORMAT),
  [keyBookingTimeTo]: form?.duration || bookingDuration.HALF_HOUR,
});

export default Schema;
