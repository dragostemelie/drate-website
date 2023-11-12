import React from 'react';
import { Stack, Typography as Text } from '@mui/material';
import { Sort } from '../../assets/icons';

interface Props {
  label: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const SortBy = ({ label, children, onClick }: Props) => (
  <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <Text variant="h5">{label}</Text>
    <Stack
      sx={{
        cursor: 'pointer',
        flexDirection: 'row',
        gap: '6px',
        alignItems: 'center',
        userSelect: 'none',
        paddingBottom: '8px',
      }}
      onClick={onClick}
    >
      <Text variant="label">Sort By</Text>
      <Sort size={16} />
    </Stack>
    {children}
  </Stack>
);
