/**
 *
 * BookingDetailsPage
 *
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import paths from 'utils/paths';

import GoBack from 'components/GoBack';
import SectionContainer from 'components/Container/Section';
import ContentContainer from 'components/Container/Content';
import Header from 'containers/Common/Header/Loadable';
import BookingDetails from 'containers/Common/Booking/Details/Loadable';

import messages from './messages';

const BookingDetailsPage = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id && id !== 'new') {
    navigate(-1);
  }

  return (
    <ContentContainer>
      <SectionContainer>
        <Header
          position="static"
          color="inherit"
          elevation={0}
          menu={<GoBack edge="start" />}
          title={intl.formatMessage(messages.headerTitle)}
        />
      </SectionContainer>

      <SectionContainer sx={{ px: 2 }}>
        <BookingDetails
          id={id !== 'new' ? parseInt(id, 10) : null}
          isNew={id === 'new'}
        />
      </SectionContainer>
    </ContentContainer>
  );
};

export default BookingDetailsPage;
