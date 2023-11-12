import React from 'react';

import { Avatar, IconButton, Stack, Typography as Text, useTheme } from '@mui/material';
import { Caret, DeleteOutlined } from '../../assets/icons';

import { Message } from '../../models/author';
import { Markdown } from '../markdown/markdown';
import { withDate } from '../../utils/strings';

interface Props {
  messages: Message[];
}

export const MessageList = ({ messages }: Props) => {
  const { palette: colors } = useTheme();

  return (
    <Stack>
      {messages.map((message, index) => (
        <Stack
          key={index}
          sx={{
            width: '100%',
            paddingBlock: '14px 10px',
            gap: '4px',
            borderBottom: `1px solid ${index < messages.length - 1 ? colors.dark : colors.black}`,
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                gap: '8px',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Avatar src={message.avatar} alt={message.displayName} sx={{ width: 32, height: 32 }} />
              <Text variant="h6" sx={{ color: colors.white }}>
                {message.displayName}
              </Text>
              <Text variant="small" sx={{ color: colors.gray, paddingTop: '3px' }}>
                {withDate(message.created)}
              </Text>
            </Stack>
            <IconButton sx={{ color: colors.red, padding: '4px' }}>
              <DeleteOutlined size={22} />
            </IconButton>
          </Stack>
          <Stack sx={{ marginTop: '-6px' }}>
            <Markdown>{message.message}</Markdown>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
