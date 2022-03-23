/**
 *
 * ContainerContent
 *
 */

import { styled } from '@mui/system';
import { SIDEBAR_WIDTH } from 'utils/constants';

const ContainerContent = styled('div')(({ theme }) => ({
  flex: '1 1 auto',
  width: '100%',
  position: 'relative',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  },
}));

export default ContainerContent;
