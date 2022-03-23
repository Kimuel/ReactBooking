/**
 *
 * TextField.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { styled, spacing } from '@mui/system';

import { buttonClasses } from '@mui/material/Button';
import Box from '@mui/material/Box';
import { inputAdornmentClasses } from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'selectAdornment' && prop !== 'spinner',
})(({ theme, spinner, selectAdornment }) => ({
  ...(selectAdornment && {
    [`& .${inputBaseClasses.adornedStart}`]: {
      paddingLeft: 0,
      [`& .${inputAdornmentClasses.root}`]: {
        borderRight: `1px solid ${theme.palette.divider}`,
      },
      [`& .${buttonClasses.sizeMedium}`]: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    [`& .${inputBaseClasses.adornedEnd}`]: {
      paddingRight: 0,
      [`& .${inputAdornmentClasses.root}`]: {
        borderLeft: `1px solid ${theme.palette.divider}`,
      },
      [`& .${buttonClasses.sizeMedium}`]: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
    [`& .${inputAdornmentClasses.root}`]: {
      height: '100%',
      maxHeight: '100%',
    },
    [`& .${buttonClasses.sizeMedium}`]: {
      ...spacing({ py: 2 }),
    },
  }),
  ...(!spinner && {
    [`& .${inputBaseClasses.input}`]: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      '&[type=number]': {
        MozAppearance: 'textfield',
      },
    },
  }),
}));

const TextFieldComponent = React.forwardRef(
  ({ id, label, required, selectAdornment, error, spinner, ...rest }, ref) => {
    const textField = (
      <StyledTextField
        ref={ref}
        variant="outlined"
        id={id}
        selectAdornment={selectAdornment}
        error={error}
        spinner={spinner}
        {...rest}
      />
    );

    if (label) {
      return (
        <Box>
          <InputLabel
            sx={{ pb: 1 }}
            htmlFor={id}
            required={required}
            error={error}
          >
            {label}
          </InputLabel>
          {textField}
        </Box>
      );
    }

    return textField;
  },
);

TextFieldComponent.default = {
  selectAdornment: false,
};

TextFieldComponent.propTypes = {
  id: PropTypes.any,
  label: PropTypes.any,
  error: PropTypes.bool,
  spinner: PropTypes.bool,
  required: PropTypes.bool,
  selectAdornment: PropTypes.bool,
};

export default TextFieldComponent;
