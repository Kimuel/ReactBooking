/**
 *
 * BookingRoomPage
 *
 */

import React, { useMemo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useIntl } from 'react-intl';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import {
  generatePath,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import paths from 'utils/paths';

import Button from '@mui/material/Button';

import GoBack from 'components/GoBack';
import SectionContainer from 'components/Container/Section';
import ContentContainer from 'components/Container/Content';
import Header from 'containers/Common/Header/Loadable';
import BookingRoom from 'containers/Common/Booking/Room/Loadable';

import KEY from 'containers/Common/Booking/List/store/constants';
import { loadBookingList } from 'containers/Common/Booking/List/store/actions';
import {
  makeSelectBookingList,
  makeSelectBookingRooms,
  makeSelectBookingListLoading,
} from 'containers/Common/Booking/List/store/selectors';
import BookingListReducer, {
  BookingListPropTypes,
} from 'containers/Common/Booking/List/store/reducer';
import BookingListSaga from 'containers/Common/Booking/List/store/saga';
import messages from './messages';

const BookingRoomPage = ({ rooms }) => {
  // Inject Reducer/Saga
  useInjectReducer({ key: KEY, reducer: BookingListReducer });
  useInjectSaga({ key: KEY, saga: BookingListSaga, mode: DAEMON });

  // State and Hooks declarations
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // get the selected room name
  const roomName = useMemo(
    () =>
      rooms.find((room) => room.id === parseInt(id, 10))?.name ||
      intl.formatMessage(messages.headerTitle),
    [rooms],
  );

  const handleNewMeeting = () => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('roomId', parseInt(id, 10));
    navigate({
      pathname: generatePath(paths.bookingDetails, {
        id: 'new',
      }),
      search: `?${urlParams}`,
    });
  };

  return (
    <ContentContainer>
      <SectionContainer>
        <Header
          menu={<GoBack path={paths.bookingList} />}
          position="static"
          color="inherit"
          elevation={0}
          title={roomName}
          action={
            <Button
              variant="contained"
              disableElevation
              onClick={handleNewMeeting}
            >
              {intl.formatMessage(messages.btnNewBooking)}
            </Button>
          }
        />
      </SectionContainer>

      <BookingRoom roomName={roomName} />
    </ContentContainer>
  );
};

BookingRoomPage.propTypes = {
  rooms: BookingListPropTypes.rooms,
};

const mapStateToProps = createStructuredSelector({
  bookingList: makeSelectBookingList(),
  rooms: makeSelectBookingRooms(),
  loading: makeSelectBookingListLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    actionLoadBookingList: () => dispatch(loadBookingList()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BookingRoomPage);
