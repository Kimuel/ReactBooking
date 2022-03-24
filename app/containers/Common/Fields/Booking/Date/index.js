/**
 *
 * FieldBookingDate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { Controller, useFormContext } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import * as yup from 'yup';
import moment from 'moment';
import { DATETIME_FORMAT } from 'utils/constants';

import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import TextField from 'components/Mui/TextField';

import messages from './messages';

export const keyBookingDate = 'bookingDate';
export const schemaBookingDate = yup
  .date()
  .nullable()
  .required(<FormattedMessage {...messages.validationRequired} />);

export const FieldBookingDate = ({ DatePickerProps, ...rest }) => {
  const intl = useIntl();
  const { control, setValue, getValues } = useFormContext();
  const startTime = getValues('timeStart');

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        control={control}
        name={keyBookingDate}
        render={({ field: { value }, fieldState: { error } }) => (
          <DatePicker
            label={intl.formatMessage(messages.label)}
            inputFormat="MM/DD/yyyy"
            value={value}
            onChange={(val) => {
              const newValue = moment(
                `${val.format('YYYY-MM-DD')}T${moment(startTime).format(
                  'HH:mm:ss',
                )}`,
              ).format(DATETIME_FORMAT);
              setValue(keyBookingDate, val.format(DATETIME_FORMAT), {
                shouldValidate: true,
                shouldDirty: true,
              });
              setValue('timeStart', newValue, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            renderInput={(params) => (
              <TextField
                type="date"
                fullWidth
                required
                {...params}
                error={Boolean(error) || Boolean(params?.error)}
                helperText={error?.message || params?.error}
                {...rest}
              />
            )}
            {...DatePickerProps}
          />
        )}
      />
    </LocalizationProvider>
  );
};

FieldBookingDate.propTypes = {
  DatePickerProps: PropTypes.object,
};

export default FieldBookingDate;
