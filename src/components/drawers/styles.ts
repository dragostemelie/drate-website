import { Theme, styled } from '@mui/material/styles';
import { IconButton, Stack } from '@mui/material';

export const MessageHeader = styled(Stack)(({ theme }) => ({
  padding: '0 10px',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.dark}`,
  zIndex: 101,
}));

export const MessageInput = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'faded',
})(({ theme, faded }: { theme: Theme; faded: boolean }) => ({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-start',
  overflowY: 'auto',
  height: 'calc(100% - 43px)',
  '& .MuiInputBase-root': {
    height: '100%',
    '& textarea': {
      overflow: 'auto !important',
      height: '100% !important',
      color: faded ? theme.palette.gray : theme.palette.white,
      marginInline: '-10px',
      padding: '10px',
    },
  },
}));

export const CommentsContainer = styled(Stack)(({ theme }) => ({
  padding: '0 20px',
  marginInline: '-10px',
  alignItems: 'center',
  gap: '24px',
  borderBottom: `1px solid ${theme.palette.dark}`,
  zIndex: 101,
  height: '100%',
  overflowY: 'auto',
  color: theme.palette.white,
}));

export const CommentAction = styled(IconButton)(({ theme }) => ({
  gap: '4px',
  color: theme.palette.gray,
  borderRadius: '4px',
  justifyContent: 'flex-start',
}));

export const AddComment = styled(Stack)(({ theme }) => ({
  position: 'sticky',
  left: 0,
  right: 0,
  bottom: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  background: theme.palette.black,
  gap: '8px',
  alignItems: 'center',
  color: theme.palette.gray,
  padding: '16px 20px 16px',
  zIndex: 110,
  '& > p:first-of-type': {
    flex: 1,
  },
}));
