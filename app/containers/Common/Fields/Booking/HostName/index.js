/**
 *
 * FieldBookingHostName
 *
 */

import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Controller, useFormContext } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import * as yup from 'yup';

import TextField from 'components/Mui/TextField';

import messages from './messages';

export const keyBookingHostName = 'bookingHostName';
export const schemaBookingHostName = yup
  .string()
  .required(<FormattedMessage {...messages.validationRequired} />);

export const FieldBookingHostName = (props) => {
  const intl = useIntl();
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={keyBookingHostName}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          name={keyBookingHostName}
          required
          label={intl.formatMessage(messages.label)}
          value={value}
          onChange={onChange}
          error={Boolean(error)}
          helperText={error?.message}
          {...props}
        />
      )}
    />
  );
};

export default FieldBookingHostName;
