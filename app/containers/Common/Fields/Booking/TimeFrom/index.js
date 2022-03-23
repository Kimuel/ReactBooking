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

import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import TextField from 'components/Mui/TextField';

// import { keyBookingSpecialPriceActive } from 'containers/Common/Fields/Booking/SpecialPriceActive';
// import { keyBookingSpecialPriceTo } from 'containers/Common/Fields/Booking/SpecialPriceTo';

import messages from './messages';

export const keyBookingTimeFrom = 'keyBookingTimeFrom';
export const schemaBookingTimeFrom = yup
  .date()
  .nullable()
  .when('product-special-price-active', {
    is: true,
    then: yup
      .date()
      .nullable()
      .required(<FormattedMessage {...messages.validationRequired} />),
  })
  .when('product-special-price-to', (specialPriceTo, schema) =>
    specialPriceTo && moment(specialPriceTo).isValid()
      ? schema.max(specialPriceTo)
      : schema,
  );

export const FieldBookingTimeFrom = ({ DatePickerProps, ...rest }) => {
  const intl = useIntl();
  const { control, setValue, getValues } = useFormContext();
  const dateTo = getValues('product-special-price-to');

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        control={control}
        name={keyBookingTimeFrom}
        render={({ field: { value }, fieldState: { error } }) => (
          <DatePicker
            label={intl.formatMessage(messages.label)}
            inputFormat="MM/DD/yyyy"
            value={value}
            onChange={(val) => {
              setValue(keyBookingTimeFrom, val?.utc().format(), {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            maxDate={dateTo && moment(dateTo)}
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

FieldBookingTimeFrom.propTypes = {
  DatePickerProps: PropTypes.object,
};

export default FieldBookingTimeFrom;
