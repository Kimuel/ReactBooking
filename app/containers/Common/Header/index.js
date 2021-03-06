/**
 *
 * AppBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = ({ action, title, menu, disableGutters, ...rest }) => (
  <AppBar {...rest}>
    <Toolbar disableGutters={disableGutters}>
      <>
        {menu}
        {title && (
          <Typography sx={{ flex: 1 }} variant="h5">
            {title}
          </Typography>
        )}
        {action}
      </>
    </Toolbar>
  </AppBar>
);

Header.defaultProps = {
  disableGutters: false,
};

Header.propTypes = {
  menu: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]),
  action: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]),
  disableGutters: PropTypes.bool,
  title: PropTypes.node,
};

export default Header;
