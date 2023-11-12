import React from 'react';
import slugify from 'slugify';
import { Link } from 'react-router-dom';

import { Avatar, Stack, Typography as Text, useTheme } from '@mui/material';
import { Calendar } from '../elements/calendar';

interface Props {
  avatar?: string;
  displayName?: string;
  date?: string;
}

export const PostAuthor = ({ avatar, displayName, date }: Props) => {
  const { palette: colors } = useTheme();

  return (
    <Link to={`/author/${slugify(displayName || '')}`} style={{ textDecoration: 'none' }}>
      <Stack sx={{ flexDirection: 'row', gap: '12px', alignItems: 'center', color: colors.white }}>
        <Avatar src={avatar} alt={displayName} sx={{ width: 68, height: 68 }} />
        <Stack sx={{ gap: '12px' }}>
          <Text variant="h4">{displayName}</Text>
          {date && <Calendar date={date} />}
        </Stack>
      </Stack>
    </Link>
  );
};
