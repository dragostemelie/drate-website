import React, { useState, useEffect, Suspense } from 'react';
import { Avatar, Stack, Typography as Text, useTheme } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../store';
import { selectAuthor } from '../store/selectors/data';
import { selectUi } from '../store/selectors/ui';

import { AppDialog } from '../components/elements/dialog';
import { AuthorNav } from '../components/navigation/author-nav';
import { Header } from '../components/navigation/header';
import { MessageDrawer } from '../components/drawers/message-drawer';
import { Spacer } from '../components/elements/spacer';
import { Spinner } from '../components/elements/spinner';
import { Markdown } from '../components/markdown/markdown';
import { api } from '../api';

const Author = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams<{ slug: string }>();

  const { settings, status } = useAppSelector(selectUi);
  const author = useAppSelector((state) => selectAuthor(state, params.slug));
  const { palette: colors } = useTheme();

  const handleShowDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleSubmit = async (message: string) => {
    try {
      await api.messages.postMessage(settings.guid, author?.uuid as string, message);
    } catch (err) {
      console.error(err);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDrawerOpen(false);
    setDialogOpen(false);
  };

  useEffect(() => {
    if (!author && status !== 'loading') navigate('/', { replace: true });
  }, [status]);

  useEffect(() => {
    if (author) {
      document.title = author.displayName;
    }
  }, [author]);

  return (
    <Suspense fallback={<Spinner />}>
      {author && (
        <Stack
          sx={{
            padding: '0 20px 20px',
            width: '100%',
            maxWidth: 800,
            margin: 'auto',
            minHeight: '100%',
            color: colors.white,
          }}
        >
          <Header title={`@${author.displayName.toLowerCase().replaceAll(' ', '')}`} />
          <Spacer height={18} />
          <Stack sx={{ flexDirection: 'row', gap: '18px' }}>
            <Avatar src={author.avatar} alt={author.displayName} sx={{ width: 128, height: 128 }} />
            <Stack
              sx={{
                flexDirection: 'row',
                paddingInline: '16px',
                flex: 1,
                justifyContent: 'space-between',
                maxWidth: '360px',
              }}
            >
              <Stack sx={{ gap: '6px', justifyContent: 'center' }}>
                <Text variant="h6" align="center">
                  {author.posts}
                </Text>
                <Text variant="small" sx={{ color: colors.gray }}>
                  Posts
                </Text>
              </Stack>
              <Stack sx={{ gap: '6px', justifyContent: 'center' }}>
                <Text variant="h6" align="center">
                  {author.topics}
                </Text>
                <Text variant="small" sx={{ color: colors.gray }}>
                  Topics
                </Text>
              </Stack>
              <Stack sx={{ gap: '6px', justifyContent: 'center' }}>
                <Text variant="h6" align="center">
                  {author.comments}
                </Text>
                <Text variant="small" sx={{ color: colors.gray }}>
                  Comments
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Spacer height={16} />
          <Stack sx={{ gap: '6px' }}>
            <Text variant="h1">{author.displayName}</Text>
            <Text variant="text" sx={{ color: colors.gray }}>
              {author.title}
            </Text>
          </Stack>
          <Spacer height={24} />
          <Stack sx={{ gap: '6px' }}>
            <Text variant="h5">ABOUT ME</Text>
            <Markdown>{author.about}</Markdown>
          </Stack>
        </Stack>
      )}

      <MessageDrawer open={drawerOpen} title="Leave a message" onClose={handleCloseDrawer} onSubmit={handleSubmit} />
      <AppDialog
        open={dialogOpen}
        onConfirm={handleCloseDialog}
        title="Message sent"
        text="Your message was sent to the author."
      />
      <AuthorNav onClick={handleShowDrawer} />
    </Suspense>
  );
};

export default Author;
