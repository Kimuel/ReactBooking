/**
 *
 * TableCell.js
 *
 */

import { styled } from '@mui/system';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: 'none',
  '&:first-of-type': {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
  },
  '&:last-of-type': {
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
  [`&.${tableCellClasses.head}`]: {
    ...theme.typography.body2,
    fontWeight: theme.typography.fontWeightBold,
  },
  [`&.${tableCellClasses.body}`]: {
    ...theme.typography.body1,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export default StyledTableCell;
