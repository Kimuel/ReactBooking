/**
 *
 * GoBack.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import IconButton from '@mui/material/IconButton';

const GoBackComponent = React.forwardRef(({ path, ...rest }, ref) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(path || -1);
  };

  return (
    <IconButton ref={ref} onClick={goBack} {...rest}>
      <ArrowBackIcon />
    </IconButton>
  );
});

GoBackComponent.propTypes = {
  path: PropTypes.string,
};

export default GoBackComponent;
