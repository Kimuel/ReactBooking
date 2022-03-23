/**
 *
 * BookingDetailsPage
 *
 */

import React from 'react';
import { useIntl } from 'react-intl';

import SectionContainer from 'components/Container/Section';
import ContentContainer from 'components/Container/Content';
import Header from 'containers/Common/Header/Loadable';
import BookingDetails from 'containers/Common/Booking/Details/Loadable';

import messages from './messages';

const BookingDetailsPage = () => {
  const intl = useIntl();

  return (
    <ContentContainer>
      <SectionContainer>
        <Header
          position="static"
          color="inherit"
          elevation={0}
          title={intl.formatMessage(messages.headerTitle)}
        />
      </SectionContainer>

      <SectionContainer sx={{ px: 2 }}>
        <BookingDetails id={1} />
      </SectionContainer>
    </ContentContainer>
  );
};

export default BookingDetailsPage;
