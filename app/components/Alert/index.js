/**
 *
 * Alert
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

const AlertComponent = ({ messages, ...rest }) => (
  <Alert severity="error" {...rest}>
    {messages.map((message) => (
      <Typography key={message}>{message}</Typography>
    ))}
  </Alert>
);

AlertComponent.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
};

export default AlertComponent;
