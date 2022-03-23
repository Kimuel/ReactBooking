/**
 *
 * DialogConfirmation.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const DialogConfirmation = ({
  ButtonCancelProps,
  ButtonConfirmProps,
  cancelText,
  confirmText,
  description,
  descriptionId,
  open,
  onCancel,
  onClose,
  onConfirm,
  title,
  titleId,
  ...rest
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby={titleId}
    aria-describedby={descriptionId}
    {...rest}
  >
    {title && <DialogTitle id={titleId}>{title}</DialogTitle>}
    {description && (
      <DialogContent>
        <DialogContentText id={descriptionId}>{description}</DialogContentText>
      </DialogContent>
    )}
    <DialogActions>
      <Button onClick={onCancel || onClose} {...ButtonCancelProps}>
        {cancelText}
      </Button>
      <Button
        onClick={onConfirm}
        disableElevation
        autoFocus
        {...ButtonConfirmProps}
      >
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);

DialogConfirmation.defaultProps = {
  ButtonCancelProps: {},
  ButtonConfirmProps: {},
  cancelText: 'Cancel',
  confirmText: 'Confirm',
};

DialogConfirmation.propTypes = {
  ButtonCancelProps: PropTypes.object,
  ButtonConfirmProps: PropTypes.object,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  description: PropTypes.string,
  descriptionId: PropTypes.string,
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.node,
  titleId: PropTypes.string,
};

export default DialogConfirmation;
