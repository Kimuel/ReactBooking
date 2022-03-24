/**
 *
 * BookingPage
 *
 */

import React from 'react';
import { useIntl } from 'react-intl';
import { generatePath, Link } from 'react-router-dom';
import paths from 'utils/paths';

import Button from '@mui/material/Button';

import SectionContainer from 'components/Container/Section';
import ContentContainer from 'components/Container/Content';
import Header from 'containers/Common/Header/Loadable';
import BookingList from 'containers/Common/Booking/List/Loadable';

import messages from './messages';

const BookingPage = () => {
  const intl = useIntl();

  return (
    <ContentContainer>
      <SectionContainer>
        <Header
          position="static"
          color="inherit"
          elevation={0}
          title={intl.formatMessage(messages.headerTitle)}
          action={
            <Button
              to={generatePath(paths.bookingDetails, {
                id: 'new',
              })}
              variant="contained"
              disableElevation
              LinkComponent={Link}
            >
              {intl.formatMessage(messages.btnNewBooking)}
            </Button>
          }
        />
      </SectionContainer>

      <BookingList />
    </ContentContainer>
  );
};

export default BookingPage;
