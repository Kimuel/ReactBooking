/**
 *
 * BookingDetails
 *
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import { useIntl } from 'react-intl';
// eslint-disable-next-line import/no-unresolved
import { FormProvider, useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import update from 'immutability-helper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { bookingDuration } from 'enums/booking.enum';
import moment from 'moment';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Alert from 'components/Alert';
import SectionContainer from 'components/Container/Section';
import FieldBookingRoom from 'containers/Common/Fields/Booking/Room';
import FieldBookingHostName from 'containers/Common/Fields/Booking/HostName';
import FieldBookingGuestsName from 'containers/Common/Fields/Booking/GuestsName';
import FieldBookingDate from 'containers/Common/Fields/Booking/Date';
import FieldBookingTimeFrom from 'containers/Common/Fields/Booking/TimeFrom';
import FieldBookingTimeTo from 'containers/Common/Fields/Booking/TimeTo';

import BookingDetailsSchema, { getInitialValues } from './form/schema';
import KEY_DETAILS from './store/constants';
import {
  loadBookingDetails,
  updateBookingDetailsField,
  resetBookingDetails,
} from './store/actions';
import {
  makeSelectBookingDetails,
  makeSelectBookingDetailsLoading,
} from './store/selectors';
import BookingDetailsReducer, {
  BookingDetailsPropTypes,
  initialState,
} from './store/reducer';

import KEY_LIST from '../List/store/constants';
import { loadBookingList, updateBookingListField } from '../List/store/actions';
import { makeSelectBookingList } from '../List/store/selectors';
import BookingListReducer, {
  BookingListPropTypes,
} from '../List/store/reducer';
import BookingListSaga from '../List/store/saga';

import messages from './messages';

const BookingDetails = ({
  actionLoadBookingList,
  actionResetBookingDetails,
  actionUpdateBookingDetailsField,
  actionUpdateBookingListField,
  bookingDetails,
  bookingList,
  id,
  isNew,
  loading,
}) => {
  // Inject Reducer/Saga
  useInjectReducer({ key: KEY_DETAILS, reducer: BookingDetailsReducer });
  useInjectReducer({ key: KEY_LIST, reducer: BookingListReducer });
  useInjectSaga({ key: KEY_LIST, saga: BookingListSaga, mode: DAEMON });

  // State and Hooks declarations
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const intl = useIntl();
  const [errorMessages, setErrorMessages] = useState([]);
  const [initialBookingDetails, setInitialDetailsData] = useState(
    initialState.bookingDetails,
  );

  // Initialize the Form validation
  const form = useForm({
    mode: 'onChange',
    defaultValues: useMemo(() => getInitialValues(), []),
    resolver: yupResolver(BookingDetailsSchema),
  });

  // Load List if not loaded
  useEffect(() => {
    if (bookingList.length === 0) {
      actionLoadBookingList();
    }
  }, []);

  // get the booking details if it is edit mode
  useEffect(() => {
    if (!isNew) {
      const details = bookingList.find((item) => item.id === id);
      if (details) {
        actionUpdateBookingDetailsField('bookingDetails', details);
      }
    } else {
      actionResetBookingDetails();
    }
  }, [bookingList, id, isNew]);

  // get room id
  const roomId = useMemo(() => {
    const value = new URLSearchParams(location.search).get('roomId');
    return parseInt(value, 10) || '';
  }, [location]);

  // populate field values
  useEffect(() => {
    form.reset(
      getInitialValues({
        roomId: roomId || initialBookingDetails.roomId,
        hostName: initialBookingDetails.hostName,
        guestsName: initialBookingDetails.guestsName,
        date: initialBookingDetails.bookingDate,
        timeStart: initialBookingDetails.bookingTimeStart,
        duration: initialBookingDetails.duration,
      }),
    );
  }, [initialBookingDetails]);

  // set reducer details to state details
  useEffect(() => {
    setInitialDetailsData(bookingDetails);
  }, [bookingDetails]);

  // Check if your new data have conflicts with the room schedule
  const hasConflict = useCallback(
    (roomId, startTime) => {
      // Get room with same room id
      const currentRooms = bookingList.filter(
        (room) => room.roomId === roomId && room.id !== id,
      );

      // Check rooms if have conflict
      const conflict = currentRooms.some((room) => {
        const bookingTimeStart = room.bookingTimeStart;
        const start = moment(bookingTimeStart);
        let end = moment(bookingTimeStart).add(30, 'm');
        if (room.duration === bookingDuration.HOUR) {
          end = moment(bookingTimeStart).add(1, 'h');
        }

        return moment(startTime).isBetween(start, end, 'minute');
      });

      return conflict;
    },
    [bookingList, id],
  );

  // Append new data to list
  const addNewBooking = useCallback(
    (newData) => {
      // Get the highest id
      const maxId = Math.max(...bookingList.map((item) => item.id), 1);

      // Append the new data
      actionUpdateBookingListField('bookingList', [
        ...bookingList,
        {
          id: maxId + 1,
          roomId: newData.roomId,
          hostName: newData.hostName,
          guestsName: newData.guestsName,
          bookingDate: newData.bookingDate,
          bookingTimeStart: newData.timeStart,
          duration: newData.duration,
        },
      ]);
    },
    [bookingList],
  );

  // Update data from list
  const updateBooking = useCallback(
    (data) => {
      // Get the index
      const index = bookingList.findIndex((item) => item.id === id);

      // Update the data
      const updatedData = update(bookingList[index], {
        hostName: { $set: data.hostName },
        guestsName: { $set: data.guestsName },
      });

      // New Constructed Data
      const newData = update(bookingList, {
        $splice: [[index, 1, updatedData]],
      });

      // Update the list
      actionUpdateBookingListField('bookingList', newData);
    },
    [bookingList],
  );

  // Handle submit function
  const onSubmit = (newData) => {
    setErrorMessages([]);
    if (hasConflict(newData.roomId, newData.timeStart)) {
      setErrorMessages(['There`s conflict with your set schedule']);
      return;
    }

    if (isNew) {
      addNewBooking(newData);
    } else {
      updateBooking(newData);
    }

    // Back to list
    navigate(-1);
  };

  return (
    <Card elevation={0}>
      <CardContent>
        {errorMessages.length > 0 && (
          <SectionContainer>
            <Alert messages={errorMessages} />
          </SectionContainer>
        )}

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <SectionContainer>
              <FieldBookingRoom disabled={loading || id} fullWidth />
            </SectionContainer>

            <SectionContainer>
              <FieldBookingHostName disabled={loading} fullWidth />
            </SectionContainer>

            <SectionContainer>
              <FieldBookingGuestsName disabled={loading} fullWidth />
            </SectionContainer>

            <SectionContainer>
              <FieldBookingDate
                DatePickerProps={{ disabled: loading || id }}
                fullWidth
              />
            </SectionContainer>

            <SectionContainer>
              <FieldBookingTimeFrom
                DatePickerProps={{ disabled: loading || id }}
                fullWidth
              />
            </SectionContainer>

            <SectionContainer>
              <FieldBookingTimeTo disabled={loading || id} fullWidth />
            </SectionContainer>

            <Button
              type="submit"
              disabled={loading || !form.formState.isValid}
              variant="contained"
              disableElevation
              fullWidth={isMobile}
            >
              {intl.formatMessage(messages.buttonSubmit)}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

BookingDetails.propTypes = {
  id: PropTypes.number,
  isNew: PropTypes.bool,
  actionResetBookingDetails: PropTypes.func,
  actionLoadBookingDetails: PropTypes.func,
  actionLoadBookingList: PropTypes.func,
  actionUpdateBookingDetailsField: PropTypes.func,
  actionUpdateBookingListField: PropTypes.func,
  bookingDetails: BookingDetailsPropTypes.bookingDetails,
  loading: BookingDetailsPropTypes.loading,
  bookingList: BookingListPropTypes.bookingList,
};

const mapStateToProps = createStructuredSelector({
  bookingDetails: makeSelectBookingDetails(),
  bookingList: makeSelectBookingList(),
  loading: makeSelectBookingDetailsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    actionLoadBookingList: () => dispatch(loadBookingList()),
    actionLoadBookingDetails: (id) => dispatch(loadBookingDetails(id)),
    actionUpdateBookingDetailsField: (field, value) =>
      dispatch(updateBookingDetailsField(field, value)),
    actionUpdateBookingListField: (field, value) =>
      dispatch(updateBookingListField(field, value)),
    actionResetBookingDetails: () => dispatch(resetBookingDetails()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BookingDetails);
