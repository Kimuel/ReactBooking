/* eslint-disable indent */
/**
 *
 * Table.js
 *
 */

import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import { ROWS_PER_PAGE_DEFAULT } from 'utils/constants';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Skeleton from '@mui/material/Skeleton';

import TableCell from 'components/Mui/TableCell';
import TableRow from 'components/Mui/TableRow';

import Row from './Components/Row';

const TableComponent = ({
  tableConfig,
  loading,
  loadingRowCount,
  TableContainerProps,
  TableProps,
  RowProps,
  onSortBy,
}) => {
  const tableData = useMemo(
    () => (loading ? Array(loadingRowCount).fill({}) : tableConfig.data),
    [loading, loadingRowCount, tableConfig.data],
  );

  const tableColumns = useMemo(
    () =>
      loading
        ? tableConfig.columns.map((column) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : tableConfig.columns,
    [loading, loadingRowCount, tableConfig.columns],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { ...tableConfig, columns: tableColumns, data: tableData },
      useSortBy,
    );

  const getSortIcon = (column) => {
    if (column.isSorted) {
      return column.isSortedDesc ? (
        <ArrowDownwardIcon
          sx={{ verticalAlign: 'middle', mr: 0.5 }}
          fontSize="small"
        />
      ) : (
        <ArrowUpwardIcon
          sx={{ verticalAlign: 'middle', mr: 0.5 }}
          fontSize="small"
        />
      );
    }
    return '';
  };

  return (
    <TableContainer {...TableContainerProps}>
      <Table {...TableProps} {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow head {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  onClick={() => {
                    if (column.canSort) {
                      onSortBy(column.id, !column.isSortedDesc);
                    }
                  }}
                >
                  {getSortIcon(column)}
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(
            (row, index) =>
              prepareRow(row) || (
                <Row
                  // eslint-disable-next-line react/no-array-index-key
                  key={`row-${index}`}
                  row={row}
                  index={index}
                  RowProps={RowProps}
                />
              ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableComponent.defaultProps = {
  currentPage: 1,
  rowsPerPage: ROWS_PER_PAGE_DEFAULT,
  loadingRowCount: ROWS_PER_PAGE_DEFAULT,
  onSortBy: () => {},
};

const columnProperties = {
  id: PropTypes.string,
  isVisible: PropTypes.bool,
  render: PropTypes.func,
  totalLeft: PropTypes.number,
  totalWidth: PropTypes.number,
  getHeaderProps: PropTypes.func,
  getFooterProps: PropTypes.func,
  toggleHidden: PropTypes.func,
  getToggleHiddenProps: PropTypes.func,
};

TableComponent.propTypes = {
  rowsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  loading: PropTypes.bool,
  loadingRowCount: PropTypes.number,
  TableContainerProps: PropTypes.object,
  TableProps: PropTypes.object,
  RowProps: PropTypes.func,
  onSortBy: PropTypes.func,

  // Link Reference: https://react-table.tanstack.com/docs/api/useTable
  tableConfig: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        id: PropTypes.string,
        columns: PropTypes.arrayOf(PropTypes.shape(columnProperties)),
        Header: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func,
          PropTypes.node,
        ]),
        Footer: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func,
          PropTypes.node,
        ]),
        Cell: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        width: PropTypes.number,
        minWidth: PropTypes.number,
        maxWidth: PropTypes.number,
      }),
    ).isRequired,
    data: PropTypes.array.isRequired,
    initialState: PropTypes.shape({
      hiddenColumns: PropTypes.arrayOf(PropTypes.string),
    }),
    autoResetHiddenColumns: PropTypes.bool,
    stateReducer: PropTypes.func,
    useControlledState: PropTypes.func,
    defaultColumn: PropTypes.object,
    getSubRows: PropTypes.func,
    getRowId: PropTypes.func,
  }),
};

export default TableComponent;
