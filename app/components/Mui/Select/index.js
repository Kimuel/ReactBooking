/**
 *
 * Select.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

function SelectComponent({
  id,
  label,
  required,
  helperText,
  error,
  value,
  onChange,
  children,
  ...rest
}) {
  return (
    <Box>
      {label && (
        <InputLabel
          error={error}
          required={required}
          sx={{ pb: 1 }}
          htmlFor={id}
        >
          {label}
        </InputLabel>
      )}
      <FormControl variant="outlined" error={error} {...rest}>
        <Select id={id} value={value} onChange={onChange}>
          {children}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

SelectComponent.propTypes = {
  id: PropTypes.any,
  label: PropTypes.any,
  helperText: PropTypes.node,
  error: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]),
  onChange: PropTypes.func,
};

export default SelectComponent;
