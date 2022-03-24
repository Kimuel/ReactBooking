/**
 *
 * FieldBookingTimeTo
 *
 */

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import * as yup from 'yup';
import { bookingDuration } from 'enums/booking.enum';

import MenuItem from '@mui/material/MenuItem';

import Select from 'components/Mui/Select';

import messages from './messages';

export const keyBookingTimeTo = 'duration';
export const schemaBookingTimeTo = yup
  .number()
  .typeError(<FormattedMessage {...messages.validationRequired} />);

export const FieldBookingTimeTo = (props) => {
  const intl = useIntl();
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={keyBookingTimeTo}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          id={keyBookingTimeTo}
          value={value}
          name={keyBookingTimeTo}
          required
          label={intl.formatMessage(messages.label)}
          onChange={onChange}
          error={Boolean(error)}
          helperText={error?.message}
          {...props}
        >
          <MenuItem value={bookingDuration.HALF_HOUR}>
            {intl.formatMessage(messages.menuItemHalfHour)}
          </MenuItem>
          <MenuItem value={bookingDuration.HOUR}>
            {intl.formatMessage(messages.menuItemHour)}
          </MenuItem>
        </Select>
      )}
    />
  );
};

export default FieldBookingTimeTo;
