/**
 *
 * FieldBookingRoom
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
// eslint-disable-next-line import/no-unresolved
import { Controller, useFormContext } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import * as yup from 'yup';

import MenuItem from '@mui/material/MenuItem';

import Select from 'components/Mui/Select';

import KEY from 'containers/Common/Booking/List/store/constants';
import { makeSelectBookingRooms } from 'containers/Common/Booking/List/store//selectors';
import BookingListReducer, {
  BookingListPropTypes,
} from 'containers/Common/Booking/List/store//reducer';

import messages from './messages';

export const keyBookingRoom = 'roomId';
export const schemaBookingRoom = yup
  .number()
  .typeError(<FormattedMessage {...messages.validationRequired} />);

export const FieldBookingRoom = ({ rooms, disabled, fullWidth }) => {
  useInjectReducer({ key: KEY, reducer: BookingListReducer });
  const intl = useIntl();
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={keyBookingRoom}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          id={keyBookingRoom}
          value={value || ''}
          name={keyBookingRoom}
          required
          label={intl.formatMessage(messages.label)}
          onChange={onChange}
          error={Boolean(error)}
          helperText={error?.message}
          disabled={disabled}
          fullWidth={fullWidth}
        >
          {rooms.map((room) => (
            <MenuItem key={room.name} value={room.id}>
              {room.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

FieldBookingRoom.propTypes = {
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  rooms: BookingListPropTypes.rooms,
};

const mapStateToProps = createStructuredSelector({
  rooms: makeSelectBookingRooms(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(FieldBookingRoom);
