/**
 *
 * BookingDeleteButton
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import { useIntl } from 'react-intl';
import { useNavigate, useLocation } from 'react-router-dom';
import paths from 'utils/paths';

import Button from '@mui/material/Button';
import DialogConfirmation from 'components/Dialog/Confirmation';

import KEY from '../List/store/constants';
import { updateBookingListField } from '../List/store/actions';
import { makeSelectBookingList } from '../List/store/selectors';
import BookingListReducer, {
  BookingListPropTypes,
} from '../List/store/reducer';
import BookingListSaga from '../List/store/saga';

import messages from './messages';

const BookingDeleteButton = ({
  actionUpdateBookingListField,
  bookingList,
  children,
  id,
  ...rest
}) => {
  useInjectReducer({ key: KEY, reducer: BookingListReducer });
  useInjectSaga({ key: KEY, saga: BookingListSaga, mode: DAEMON });
  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const dialogId = 'booking-confirmation-dialog-title';
  const dialogDesc = 'booking-confirmation-dialog-description';

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    actionUpdateBookingListField(
      'bookingList',
      bookingList.filter((item) => item.id !== id),
    );

    handleClose();

    // redirect to list
    const urlParams = new URLSearchParams(location.search);
    navigate({
      pathname: paths.bookingList,
      search: `?${urlParams}`,
    });
  };

  return (
    <>
      {children ? (
        React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onClick: child.props.onClick || handleOpen,
          }),
        )
      ) : (
        <Button
          variant="contained"
          color="error"
          disableElevation
          onClick={handleOpen}
          {...rest}
        >
          {intl.formatMessage(messages.buttonText)}
        </Button>
      )}

      <DialogConfirmation
        open={open}
        titleId={dialogId}
        descriptionId={dialogDesc}
        title={intl.formatMessage(messages.dialogTitle)}
        description={intl.formatMessage(messages.dialogMessage)}
        ButtonConfirmProps={{ variant: 'contained', color: 'error' }}
        onClose={handleClose}
        onConfirm={handleDelete}
        confirmText={intl.formatMessage(messages.dialogConfirm)}
        cancelText={intl.formatMessage(messages.dialogCancel)}
      />
    </>
  );
};

BookingDeleteButton.propTypes = {
  actionUpdateBookingListField: PropTypes.func,
  bookingList: BookingListPropTypes.bookingList,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]),
  id: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bookingList: makeSelectBookingList(),
});

function mapDispatchToProps(dispatch) {
  return {
    actionUpdateBookingListField: (field, value) =>
      dispatch(updateBookingListField(field, value)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BookingDeleteButton);
