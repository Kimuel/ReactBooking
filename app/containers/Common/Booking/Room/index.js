/**
 *
 * BookingRoom
 *
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, useLocation, useNavigate, generatePath } from 'react-router-dom';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  DAEMON,
  DATE_FORMAT,
  ROWS_PER_PAGE_DEFAULT,
  TIME_FORMAT,
} from 'utils/constants';
import { styled } from '@mui/system';
import { sortList, getComparator } from 'helpers/sortHelper';
import { bookingDuration } from 'enums/booking.enum';
import paths from 'utils/paths';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import SectionContainer from 'components/Container/Section';
import Table from 'components/Table';
import TablePagination from 'components/Mui/TablePagination';
import Tooltip from 'components/Mui/Tooltip';

import BookingDeleteButton from 'containers/Common/Booking/DeleteButton/Loadable';

import img from 'images/meeting-room.jpg';

import KEY from '../List/store/constants';
import { loadBookingList } from '../List/store/actions';
import {
  makeSelectBookingList,
  makeSelectBookingListLoaded,
  makeSelectBookingRooms,
  makeSelectBookingListLoading,
} from '../List/store/selectors';
import BookingListReducer, {
  BookingListPropTypes,
  initialState,
} from '../List/store/reducer';
import BookingListSaga from '../List/store/saga';
import messages from './messages';

const StackItem = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
}));

const BookingRoom = ({
  actionLoadBookingList,
  bookingList,
  roomName,
  rooms,
  loading,
  loaded,
}) => {
  // Inject Reducer/Saga
  useInjectReducer({ key: KEY, reducer: BookingListReducer });
  useInjectSaga({ key: KEY, saga: BookingListSaga, mode: DAEMON });

  // State and Hooks declarations
  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();
  const [initialBookingList, setInitialBookingList] = useState(
    initialState.bookingList,
  );

  // Load List if not loaded
  useEffect(() => {
    if (!loaded) {
      actionLoadBookingList();
    }
  }, []);

  // set reducer list to state list
  useEffect(() => {
    setInitialBookingList(bookingList);
  }, [bookingList]);

  // Reset to Page 1 if invalid page
  useEffect(() => {
    if (initialBookingList.length > 0) {
      if (!loading && currentPage > totalPage) {
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('page', 1);
        navigate({
          pathname: location.pathname,
          search: `?${urlParams}`,
        });
      }
    }
  }, [currentPage, totalPage, loading, initialBookingList]);

  // onChangePage callback
  const handleChangePage = useCallback(
    (newPage) => {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('page', newPage + 1);
      navigate({
        pathname: location.pathname,
        search: `?${urlParams}`,
      });
    },
    [location],
  );

  // onChangeRowsPerPage callback
  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const rowsPerPage = parseInt(event.target.value, 10);
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('rowsPerPage', rowsPerPage);
      urlParams.set('page', 1);
      navigate({
        pathname: location.pathname,
        search: `?${urlParams}`,
      });
    },
    [location],
  );

  // onSortBy callback
  const handleSortBy = useCallback(
    (id, isDesc) => {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('sortBy', id);
      urlParams.set('sortDir', isDesc ? 'desc' : 'asc');
      navigate({
        pathname: location.pathname,
        search: `?${urlParams}`,
      });
    },
    [location],
  );

  // get current page
  const currentPage = useMemo(() => {
    const curPage = new URLSearchParams(location.search).get('page');
    return parseInt(curPage, 10) || 1;
  }, [location]);

  // get rows per page
  const rowsPerPage = useMemo(() => {
    const row = new URLSearchParams(location.search).get('rowsPerPage');
    return parseInt(row, 10) || ROWS_PER_PAGE_DEFAULT;
  }, [location]);

  // get total page
  const totalPage = useMemo(() => {
    const totalItems = initialBookingList.length;
    if (totalItems > rowsPerPage) {
      return Math.ceil(totalItems / rowsPerPage);
    }

    return 1;
  }, [location, rowsPerPage, initialBookingList]);

  // get sort by
  const sortBy = useMemo(
    () => new URLSearchParams(location.search).get('sortBy') || 'bookingDate',
    [location],
  );

  // get sort direction
  const sortDir = useMemo(
    () => new URLSearchParams(location.search).get('sortDir') || 'asc',
    [location],
  );

  // construct react-table columns
  const columns = useMemo(
    () => [
      {
        Header: intl.formatMessage(messages.tableId),
        accessor: 'id',
        minWidth: 100,
      },
      {
        Header: intl.formatMessage(messages.tableRoomName),
        accessor: 'roomId',
        Cell: ({
          row: {
            values: { roomId },
          },
        }) => rooms.find((item) => item.id === roomId)?.name || '',
        minWidth: 150,
      },
      {
        Header: intl.formatMessage(messages.tableHostName),
        accessor: 'hostName',
        minWidth: 150,
      },
      {
        Header: intl.formatMessage(messages.tableGuestName),
        accessor: 'guestsName',
        Cell: ({
          row: {
            values: { guestsName },
          },
        }) =>
          useMemo(() => (
            <Stack direction="row" alignItems="center" flexWrap="wrap">
              {guestsName.map((guest) => (
                <StackItem key={guest}>
                  <Chip label={guest} size="small" color="default" />
                </StackItem>
              ))}
            </Stack>
          )),
        minWidth: 250,
      },
      {
        Header: intl.formatMessage(messages.tableDateOfBooking),
        accessor: 'bookingDate',
        Cell: ({
          row: {
            values: { bookingDate },
          },
        }) => moment(bookingDate).format(DATE_FORMAT),
        minWidth: 170,
      },
      {
        Header: intl.formatMessage(messages.tableTimeStart),
        accessor: 'bookingTimeStart',
        Cell: ({
          row: {
            values: { bookingTimeStart },
          },
        }) => moment(bookingTimeStart).format(TIME_FORMAT),
        minWidth: 120,
      },
      {
        Header: intl.formatMessage(messages.tableTimeEnd),
        accessor: 'duration',
        Cell: ({
          row: {
            values: { duraton, bookingTimeStart },
          },
        }) => {
          if (duraton === bookingDuration.HOUR) {
            return moment(bookingTimeStart).add(1, 'h').format(TIME_FORMAT);
          }

          return moment(bookingTimeStart).add(30, 'm').format(TIME_FORMAT);
        },
        minWidth: 120,
      },
      {
        Header: intl.formatMessage(messages.tableActions),
        disableSortBy: true,
        Cell: ({
          row: {
            values: { id },
          },
        }) =>
          useCallback(
            <>
              <Tooltip title={intl.formatMessage(messages.tableActionsEdit)}>
                <IconButton
                  to={generatePath(paths.bookingDetails, {
                    id,
                  })}
                  LinkComponent={Link}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <BookingDeleteButton redirect={false} id={id}>
                <Tooltip
                  title={intl.formatMessage(messages.tableActionsDelete)}
                >
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </BookingDeleteButton>
            </>,
          ),
        minWidth: 120,
      },
    ],
    [moment, rooms],
  );

  // get the constructed data
  const getConstructedData = useCallback(() => {
    const endIndex = currentPage * rowsPerPage;
    const startIndex = endIndex - rowsPerPage;

    return sortList(initialBookingList, getComparator(sortDir, sortBy)).slice(
      startIndex,
      endIndex,
    );
  }, [currentPage, rowsPerPage, sortBy, sortDir, rooms, initialBookingList]);

  return (
    <Card elevation={0}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Avatar
              variant="rounded"
              sx={{ width: '100%', height: 'auto' }}
              src={img}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <SectionContainer>
              <Typography variant="h4">{roomName}</Typography>
            </SectionContainer>
            <SectionContainer>
              <Typography>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry`s standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </SectionContainer>
          </Grid>
        </Grid>
      </CardContent>

      <Table
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        tableConfig={{
          columns,
          data: getConstructedData(),
          initialState: {
            hiddenColumns: ['id', 'roomId'],
            sortBy: [{ id: sortBy, desc: sortDir === 'desc' }],
          },
        }}
        loading={loading}
        TableContainerProps={{
          sx: {
            px: 2,
          },
        }}
        onSortBy={handleSortBy}
      />
      {!loading && (
        <TablePagination
          count={initialBookingList.length}
          rowsPerPage={rowsPerPage}
          page={currentPage - 1}
          onPageChange={(_event, page) => handleChangePage(page)}
          onRowsPerPageChange={(event) => handleChangeRowsPerPage(event)}
        />
      )}
    </Card>
  );
};

BookingRoom.propTypes = {
  roomName: PropTypes.string,
  actionLoadBookingList: PropTypes.func,
  bookingList: BookingListPropTypes.bookingList,
  rooms: BookingListPropTypes.rooms,
  loaded: BookingListPropTypes.loaded,
  loading: BookingListPropTypes.loading,
};

const mapStateToProps = createStructuredSelector({
  bookingList: makeSelectBookingList(),
  rooms: makeSelectBookingRooms(),
  loaded: makeSelectBookingListLoaded(),
  loading: makeSelectBookingListLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    actionLoadBookingList: () => dispatch(loadBookingList()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BookingRoom);
