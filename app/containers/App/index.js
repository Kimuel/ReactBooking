/**
 *
 * App.js
 *
 */

import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import paths from 'utils/paths';

import BookingPage from 'containers/BookingPage/Loadable';
import BookingDetailsPage from 'containers/BookingDetailsPage/Loadable';
import BookingRoomPage from 'containers/BookingRoomPage/Loadable';

import '../../css/style.css';

const App = () => {
  const routes = [
    {
      path: '/',
      element: <Navigate to={paths.bookingList} />,
    },
    {
      path: paths.bookingList,
      element: <BookingPage />,
    },
    {
      path: paths.bookingDetails,
      element: <BookingDetailsPage />,
    },
    {
      path: paths.bookingRoom,
      element: <BookingRoomPage />,
    },
  ];

  const router = useRoutes(routes);

  return <React.StrictMode>{router}</React.StrictMode>;
};

export default App;
