import React, { Suspense } from 'react';
import { Stack, Typography as Text, useTheme } from '@mui/material';

import { Spacer } from '../../components/elements/spacer';
import { Spinner } from '../../components/elements/spinner';
import { PrivateNav } from '../../components/navigation/private-nav';

import { useAppSelector } from '../../store';
import { selectMessages } from '../../store/selectors/author';
import { MessageList } from '../../components/posts/message-list';

const Messages = () => {
  const { messages } = useAppSelector(selectMessages);
  const { palette: colors } = useTheme();

  document.title = 'Messages';
  return (
    <Suspense fallback={<Spinner />}>
      <Stack
        sx={{ padding: '20px', width: '100%', maxWidth: 600, margin: 'auto', minHeight: '100%', color: colors.white }}
      >
        <Spacer height={24} />
        <Text variant="h1">Messages</Text>
        <Spacer height={24} />
        {messages.length === 0 && (
          <Text variant="text" sx={{ paddingLeft: '8px', color: colors.gray }}>
            You have no messages.
          </Text>
        )}
        <MessageList messages={messages} />
      </Stack>
      <PrivateNav />
    </Suspense>
  );
};

export default Messages;
