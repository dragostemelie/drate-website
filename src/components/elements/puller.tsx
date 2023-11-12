import { Box, styled } from '@mui/material';

export const Puller = styled(Box)(({ theme }) => ({
  width: 64,
  height: 6,
  backgroundColor: theme.palette.dark,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 32px)',
}));
