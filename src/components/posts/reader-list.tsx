import React from 'react';

import { Avatar, IconButton, Stack, SxProps, Typography as Text, useTheme } from '@mui/material';
import { Calendar, Caret } from '../../assets/icons';

import { Reader } from '../../models/author';
import { format } from 'date-fns';
import { LocationOutlined } from '../../assets/icons';
import { ViewFilled } from '../../assets/icons';
import { CommentOutlined } from '../../assets/icons';
import { HeartOutlined } from '../../assets/icons';
import { Android, Ipad, Iphone, Linux, Mac, Other, Windows } from '../../assets/icons/system';
import { Chrome, Edge, Firefox, InternetExplorer, Safari, Unknown } from '../../assets/icons/browser';

interface Props {
  readers: Reader[];
}

export const ReaderList = ({ readers }: Props) => {
  const { palette: colors } = useTheme();

  return (
    <Stack>
      {readers.map((reader, index) => (
        <Stack
          key={index}
          sx={{
            paddingBlock: '20px',
            gap: '16px',
            flexDirection: 'row',
            alignItems: 'flex-start',
            borderBottom: `1px solid ${colors.dark}`,
          }}
        >
          <Avatar src={reader.avatar} alt={reader.displayName} sx={{ width: 64, height: 64 }} />
          <Stack sx={{ gap: '8px', flex: 1 }}>
            <Text variant="h5">{reader.displayName}</Text>
            <Stack sx={{ color: colors.gray, flexDirection: 'row', gap: '4px', alignItems: 'center' }}>
              <Calendar size={14} />
              <Text variant="small">{`${format(new Date(reader.lastSeen), 'MMMM do, yyyy')}`}</Text>
            </Stack>
            <Stack sx={{ flexDirection: 'row', gap: '10px' }}>
              <Stack sx={{ color: colors.gray }}>
                {reader.os === 'Windows' && <Windows size={18} />}
                {reader.os === 'Mac' && <Mac size={18} />}
                {reader.os === 'iPhone' && <Iphone size={18} />}
                {reader.os === 'iPad' && <Ipad size={18} />}
                {reader.os === 'Android' && <Android size={18} />}
                {reader.os === 'Linux' && <Linux size={18} />}
                {reader.os === 'Other' && <Other size={18} />}
              </Stack>
              <Stack sx={{ color: colors.gray }}>
                {reader.browser === 'Firefox' && <Firefox size={18} />}
                {reader.browser === 'Edge' && <Edge size={18} />}
                {reader.browser === 'Safari' && <Safari size={18} />}
                {reader.browser === 'Chrome' && <Chrome size={18} />}
                {reader.browser === 'Internet Explorer' && <InternetExplorer size={18} />}
                {reader.browser === 'Other' && <Unknown size={18} />}
              </Stack>
              <Stack sx={{ color: colors.gray, flexDirection: 'row', gap: '2px' }}>
                <LocationOutlined size={18} />
                <Text variant="small">{reader.country}</Text>
              </Stack>
              <Stack sx={{ color: colors.gray, flexDirection: 'row', gap: '2px' }}>
                <ViewFilled size={18} />
                <Text variant="small">{reader.visits}</Text>
              </Stack>
              <Stack sx={{ color: colors.gray, flexDirection: 'row', gap: '2px' }}>
                <CommentOutlined size={18} />
                <Text variant="small">{reader.comments}</Text>
              </Stack>
              <Stack sx={{ color: colors.gray, flexDirection: 'row', gap: '2px' }}>
                <HeartOutlined size={18} />
                <Text variant="small">{reader.likes}</Text>
              </Stack>
            </Stack>
          </Stack>
          <IconButton sx={{ marginBlock: 'auto', position: 'relative' }}>
            <Caret style={{ color: colors.gray }} open={false} />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  );
};
