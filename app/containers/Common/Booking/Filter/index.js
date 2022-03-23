/**
 *
 * BookingFilter
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { DATE_FORMAT } from 'utils/constants';
import { bookingFilter } from 'enums/booking.enum';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import TextField from 'components/Mui/TextField';
import Select from 'components/Mui/Select';

import { BookingListPropTypes } from '../List/store/reducer';

import messages from './messages';

const BookingFilter = ({
  rooms,
  filterBy,
  filterValue,
  onClearFilter,
  search,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [initialfilterBy, setInitialFilterBy] = useState(bookingFilter.NONE);
  const [initialfilterValue, setInitialFilterByValue] = useState('');
  const [initialSearch, setInitialSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const intl = useIntl();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [initialSearch]);

  useEffect(() => {
    setInitialSearch(search || '');
  }, [search]);

  useEffect(() => {
    setInitialFilterBy(filterBy);
  }, [filterBy]);

  useEffect(() => {
    setInitialFilterByValue(filterValue);
  }, [filterValue]);

  const handleSearch = () => {
    const urlParams = new URLSearchParams(location.search);
    if (initialSearch) {
      urlParams.set('search', initialSearch);
    } else {
      urlParams.delete('search');
    }
    navigate({
      pathname: location.pathname,
      search: `?${urlParams}`,
    });
  };

  const handleFilter = () => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('filterBy', initialfilterBy);
    urlParams.set('filterValue', initialfilterValue);
    navigate({
      pathname: location.pathname,
      search: `?${urlParams}`,
    });
  };

  const handleMenuClick = (value) => {
    setInitialFilterBy(value);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFilterLabel = () => {
    if (initialfilterBy === bookingFilter.DATE)
      return intl.formatMessage(messages.filterMenuDate);
    if (initialfilterBy === bookingFilter.ROOM)
      return intl.formatMessage(messages.filterMenuRoom);
    return intl.formatMessage(messages.filterMenuNone);
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ px: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              placeholder="Search Item"
              size="small"
              fullWidth
              onChange={(e) => setInitialSearch(e.target.value)}
            />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Stack
          sx={{ px: 2 }}
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="body2">
                {intl.formatMessage(messages.filterLabel)}:
              </Typography>
              <Button
                id="filterBy-by"
                aria-controls={open ? 'filterBy-by-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<ExpandMoreIcon />}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: (theme) => theme.typography.fontWeightBold,
                  }}
                  color="primary"
                >
                  {getFilterLabel()}
                </Typography>
              </Button>
              <Menu
                id="filterBy-by-menu"
                aria-labelledby="filterBy-by-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem
                  selected={initialfilterBy === bookingFilter.NONE}
                  onClick={() => handleMenuClick(bookingFilter.NONE)}
                >
                  {intl.formatMessage(messages.filterMenuNone)}
                </MenuItem>
                <MenuItem
                  selected={initialfilterBy === bookingFilter.ROOM}
                  onClick={() => handleMenuClick(bookingFilter.ROOM)}
                >
                  {intl.formatMessage(messages.filterMenuRoom)}
                </MenuItem>
                <MenuItem
                  selected={initialfilterBy === bookingFilter.DATE}
                  onClick={() => handleMenuClick(bookingFilter.DATE)}
                >
                  {intl.formatMessage(messages.filterMenuDate)}
                </MenuItem>
              </Menu>
            </Stack>

            {initialfilterBy === bookingFilter.DATE && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2">
                  {intl.formatMessage(messages.filterDateLabel)}:
                </Typography>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    inputFormat="MM/DD/yyyy"
                    value={initialfilterValue}
                    onChange={(val) => {
                      setInitialFilterByValue(val?.format(DATE_FORMAT));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </LocalizationProvider>
              </Stack>
            )}

            {initialfilterBy === bookingFilter.ROOM && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2">
                  {intl.formatMessage(messages.filterRoomLabel)}:
                </Typography>
                <Select
                  size="small"
                  value={initialfilterValue || ''}
                  onChange={(event) =>
                    setInitialFilterByValue(event.target.value)
                  }
                >
                  {rooms.map((item) => (
                    <MenuItem key={item.name} value={item.id?.toString()}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={handleFilter}
            >
              {intl.formatMessage(messages.btnFilter)}
            </Button>
            <Button size="small" disableElevation onClick={onClearFilter}>
              {intl.formatMessage(messages.btnClearFilter)}
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

BookingFilter.propTypes = {
  rooms: BookingListPropTypes.rooms,
  onClearFilter: PropTypes.func,
  search: PropTypes.string,
  filterBy: PropTypes.string,
  filterValue: PropTypes.string,
};

export default BookingFilter;
