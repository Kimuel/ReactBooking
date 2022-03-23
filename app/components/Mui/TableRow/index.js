/**
 *
 * TableRow.js
 *
 */
import { styled, alpha } from '@mui/system';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'head',
})(({ head, theme }) => ({
  borderRadius: theme.shape.borderRadius,
  ...(head && {
    backgroundColor: theme.palette.mode === 'dark' ? '#292C34' : '#F5F7FB',
  }),
  [`&.${tableRowClasses.hover}`]: {
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default StyledTableRow;
