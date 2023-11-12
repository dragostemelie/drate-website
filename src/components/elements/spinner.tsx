import { CircularProgress, Stack, useTheme } from '@mui/material';

interface Props {
  size?: number;
}

export const Spinner = ({ size }: Props) => {
  const { palette: colors } = useTheme();

  return (
    <Stack
      sx={{
        position: 'absolute',
        zIndex: 100,
        inset: 0,
        background: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={size} />
    </Stack>
  );
};
