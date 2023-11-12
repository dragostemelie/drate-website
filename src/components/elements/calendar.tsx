import React from 'react';
import { format } from 'date-fns';

import { Stack, Typography as Text, useTheme } from '@mui/material';
import { CalendarOutlined } from '../../assets/icons';

interface Props {
  date: string;
}

export const Calendar = ({ date }: Props) => {
  const { palette: colors } = useTheme();

  return (
    <Stack sx={{ color: colors.gray, flexDirection: 'row', gap: '6px', alignItems: 'flex-end' }}>
      <CalendarOutlined size={16} />
      <Text variant="label">{`${format(new Date(date), 'MMMM do, yyyy')}`}</Text>
    </Stack>
  );
};
