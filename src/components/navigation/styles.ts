import { styled } from '@mui/material/styles';
import { IconButton, Stack } from '@mui/material';

export const NavContainer = styled(Stack)(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  borderTop: `1px solid ${theme.palette.dark}`,
  background: theme.palette.black,
}));

export const Center = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: 600,
});

export const NavItem = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active }: { active: string }) => ({
  padding: '26px',
  borderRadius: '4px',
  color: active,
}));

export const PostNavItem = styled(IconButton)(({ theme }) => ({
  padding: '26px',
  gap: '8px',
  color: theme.palette.gray,
  borderRadius: '4px',
}));

export const AuthorNavContainer = styled(Stack)(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  borderTop: `1px solid ${theme.palette.dark}`,
  background: theme.palette.black,
  gap: '8px',
  alignItems: 'center',
  color: theme.palette.gray,
}));

export const NewPost = styled(IconButton)(({ theme }) => ({
  alignSelf: 'center',
  padding: '14px',
  borderRadius: '50%',
  backgroundColor: theme.palette.purple,
  color: theme.palette.white,
  '&:hover': {
    backgroundColor: theme.palette.purple,
  },
}));
