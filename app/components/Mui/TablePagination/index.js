/**
 *
 * TablePagination.js
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';

import { ROWS_PER_PAGE_LIST } from 'utils/constants';

import TablePagination, {
  tablePaginationClasses,
} from '@mui/material/TablePagination';

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  [`& .${tablePaginationClasses.selectLabel},& .${tablePaginationClasses.select},& .${tablePaginationClasses.displayedRows}`]:
    {
      ...theme.typography.body1,
    },
}));

const TablePaginationComponent = ({ rowsPerPage, ...rest }) => (
  <StyledTablePagination
    rowsPerPageOptions={ROWS_PER_PAGE_LIST}
    rowsPerPage={rowsPerPage}
    component="div"
    {...rest}
  />
);

TablePaginationComponent.propTypes = {
  rowsPerPage: PropTypes.number,
};

export default TablePaginationComponent;
