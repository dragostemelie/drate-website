import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

export const MarkdownWrapper = styled(Stack)(({ theme }) => ({
  color: theme.palette.white,
  '& img': {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
    margin: '4px auto 8px auto',
  },
  '& pre': { marginBlock: '8px 0' },
  '& hr': {
    width: '90%',
    border: 0,
    borderTop: `1px solid ${theme.palette.dark}`,
    marginBlock: '24px 16px',
  },
  '& blockquote': {
    margin: '12px 6px 0 6px',
    padding: '12px ',
    borderRadius: '4px',
    background: theme.palette.dark,
    borderLeft: `5px solid ${theme.palette.blue}`,
    fontStyle: 'italic',
    '& p': {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      padding: 0,
    },
  },
  '& ul': {
    color: theme.palette.gray,
    margin: 0,
    padding: '6px 0 0 24px',
    '& code': {
      padding: '1px 4px',
      borderRadius: '2px',
      color: 'rgba(255,255,255,0.6)',
      background: theme.palette.teal,
      fontSize: 15,
      fontWeight: 500,
      lineHeight: 1,
    },
  },
  '& ol': {
    color: theme.palette.gray,
    margin: 0,
    padding: '6px 0 0 24px',
  },
  '& li::marker': {
    color: theme.palette.gray,
  },
  '& li:not(:first-of-type)': {
    paddingTop: '8px',
    '& p': {
      padding: 0,
    },
  },
}));

export const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '18px',
});
