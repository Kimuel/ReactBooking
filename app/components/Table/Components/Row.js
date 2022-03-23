/**
 *
 * Row.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import TableCell from 'components/Mui/TableCell';
import TableRow from 'components/Mui/TableRow';

const Row = ({ row, index, RowProps, ...rest }) => (
  <TableRow {...row.getRowProps(RowProps)} {...rest}>
    {row.cells.map((cell) => (
      <TableCell
        {...cell.getCellProps({
          style: {
            minWidth: cell.column.minWidth,
            width: cell.column.width,
            maxWidth: cell.column.maxWidth,
          },
        })}
      >
        {cell.render('Cell')}
      </TableCell>
    ))}
  </TableRow>
);

Row.propTypes = {
  row: PropTypes.object,
  RowProps: PropTypes.func,
  index: PropTypes.number,
};

export default Row;
