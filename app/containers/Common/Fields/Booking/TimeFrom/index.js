/**
 *
 * FieldBookingTimeFrom
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import * as yup from 'yup';
import moment from 'moment';
import { DATETIME_FORMAT } from 'utils/constants';

import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';

import TextField from 'components/Mui/TextField';

import { keyBookingDate } from 'containers/Common/Fields/Booking/Date';

import messages from './messages';

export const keyBookingTimeFrom = 'timeStart';
export const schemaBookingTimeFrom = yup
  .date()
  .nullable()
  .required(<FormattedMessage {...messages.validationRequired} />);

export const FieldBookingTimeFrom = ({ DatePickerProps, ...rest }) => {
  const intl = useIntl();
  const { control, setValue, getValues } = useFormContext();
  const bookingDate = getValues(keyBookingDate);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        control={control}
        name={keyBookingTimeFrom}
        render={({ field: { value }, fieldState: { error } }) => (
          <MobileTimePicker
            label={intl.formatMessage(messages.label)}
            ampm
            inputFormat="hh:mm A"
            value={value}
            onChange={(val) => {
              const newValue = moment(
                `${moment(bookingDate).format('YYYY-MM-DD')}T${val.format(
                  'HH:mm:ss',
                )}`,
              ).format(DATETIME_FORMAT);
              setValue(keyBookingTimeFrom, newValue, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            minutesStep={5}
            minTime={moment(new Date(0, 0, 0, 8))}
            maxTime={moment(new Date(0, 0, 0, 17))}
            renderInput={(params) => (
              <TextField
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

FieldBookingTimeFrom.propTypes = {
  DatePickerProps: PropTypes.object,
};

export default FieldBookingTimeFrom;
