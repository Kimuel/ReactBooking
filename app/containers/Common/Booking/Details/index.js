/**
 *
 * BookingDetails
 *
 */

import React, { useEffect, useState, useMemo } from 'react';
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
import useMediaQuery from '@mui/material/useMediaQuery';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import SectionContainer from 'components/Container/Section';
import FieldBookingName from 'containers/Common/Fields/Booking/RoomName';
import FieldBookingHostName from 'containers/Common/Fields/Booking/HostName';
import FieldBookingGuestsName from 'containers/Common/Fields/Booking/GuestsName';
import FieldBookingDate from 'containers/Common/Fields/Booking/Date';

import BookingDetailsSchema, { getInitialValues } from './form/schema';
import KEY_DETAILS from './store/constants';
import { loadBookingDetails, updateBookingDetailsField } from './store/actions';
import {
  makeSelectBookingDetails,
  makeSelectBookingDetailsLoading,
} from './store/selectors';
import BookingDetailsReducer, {
  BookingDetailsPropTypes,
  initialState,
} from './store/reducer';

import KEY_LIST from '../List/store/constants';
import { loadBookingList } from '../List/store/actions';
import { makeSelectBookingList } from '../List/store/selectors';
import BookingListReducer, {
  BookingListPropTypes,
} from '../List/store/reducer';
import BookingListSaga from '../List/store/saga';

import messages from './messages';

const BookingDetails = ({
  actionLoadBookingList,
  actionUpdateBookingDetailsField,
  bookingDetails,
  bookingList,
  id,
  loading,
}) => {
  useInjectReducer({ key: KEY_DETAILS, reducer: BookingDetailsReducer });
  useInjectReducer({ key: KEY_LIST, reducer: BookingListReducer });
  useInjectSaga({ key: KEY_LIST, saga: BookingListSaga, mode: DAEMON });
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const intl = useIntl();
  const [initialBookingDetails, setInitialDetailsData] = useState(
    initialState.bookingDetails,
  );
  const form = useForm({
    mode: 'onChange',
    defaultValues: useMemo(() => getInitialValues(), []),
    resolver: yupResolver(BookingDetailsSchema),
  });

  useEffect(() => {
    if (bookingList.length === 0) {
      actionLoadBookingList();
    }
  }, []);

  useEffect(() => {
    const details = bookingList.find((item) => item.id === id);
    if (details) {
      actionUpdateBookingDetailsField('bookingDetails', details);
    }
  }, [bookingList, id]);

  useEffect(() => {
    form.reset(
      getInitialValues({
        roomId: initialBookingDetails.roomId,
        hostName: initialBookingDetails.hostName,
        guestsName: initialBookingDetails.guestsName,
        date: initialBookingDetails.bookingDate,
        timeStart: initialBookingDetails.bookingTimeStart,
        timeEnd: initialBookingDetails.bookingTimeEnd,
      }),
    );
  }, [initialBookingDetails]);

  useEffect(() => {
    setInitialDetailsData(bookingDetails);
  }, [bookingDetails]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <SectionContainer>
              <FieldBookingName disabled={loading} fullWidth />
            </SectionContainer>

            <SectionContainer>
              <FieldBookingHostName disabled={loading} fullWidth />
            </SectionContainer>

            <SectionContainer>
              <FieldBookingGuestsName disabled={loading} fullWidth />
            </SectionContainer>

            <SectionContainer>
              <FieldBookingDate disabled={loading} fullWidth />
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
  id: PropTypes.any,
  isNew: PropTypes.bool,
  actionLoadBookingDetails: PropTypes.func,
  actionLoadBookingList: PropTypes.func,
  actionUpdateBookingDetailsField: PropTypes.func,
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
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BookingDetails);
