/**
 *
 * FieldBookingGuestsName
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { Controller, useFormContext } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import * as yup from 'yup';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import TextField from 'components/Mui/TextField';

import messages from './messages';

export const keyBookingGuestsName = 'guestsName';
export const schemaBookingGuestsName = yup
  .array()
  .min(1, <FormattedMessage {...messages.validationRequired} />)
  .required(<FormattedMessage {...messages.validationRequired} />);

const filter = createFilterOptions();

export const FieldBookingGuestsName = ({ AutocompletProps, ...rest }) => {
  const intl = useIntl();
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={keyBookingGuestsName}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          value={value}
          multiple
          freeSolo
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          options={[]}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            if (inputValue !== '') {
              filtered.push(inputValue);
            }

            return filtered;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label={intl.formatMessage(messages.label)}
              placeholder={intl.formatMessage(messages.placeholder)}
              fullWidth
              error={Boolean(error)}
              helperText={error?.message}
              {...rest}
            />
          )}
          onChange={(_event, newValue) => {
            onChange(newValue);
          }}
          {...AutocompletProps}
        />
      )}
    />
  );
};

FieldBookingGuestsName.propTypes = {
  AutocompletProps: PropTypes.object,
};

export default FieldBookingGuestsName;
