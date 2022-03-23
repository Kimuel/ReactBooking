/**
 *
 * BookingPage
 *
 */

import React from 'react';
import { useIntl } from 'react-intl';

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
        />
      </SectionContainer>

      <BookingList />
    </ContentContainer>
  );
};

export default BookingPage;
