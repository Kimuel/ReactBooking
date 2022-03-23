import * as yup from 'yup';

import {
  keyBookingRoomName,
  schemaBookingRoomName,
} from 'containers/Common/Fields/Booking/RoomName';
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

export const Schema = yup.object().shape({
  [keyBookingRoomName]: schemaBookingRoomName,
  [keyBookingHostName]: schemaBookingHostName,
  [keyBookingGuestsName]: schemaBookingGuestsName,
  [keyBookingDate]: schemaBookingDate,
});

export const getInitialValues = (form) => ({
  [keyBookingRoomName]: form?.roomId || '',
  [keyBookingHostName]: form?.hostName || '',
  [keyBookingGuestsName]: form?.guestsName || [],
  [keyBookingDate]: form?.date || '',
});

export default Schema;
