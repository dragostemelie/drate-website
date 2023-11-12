import React, { Suspense } from 'react';
import { Stack, Typography as Text, useTheme } from '@mui/material';

import { Spacer } from '../components/elements/spacer';
import { PostList } from '../components/posts/post-list';
import { PublicNav } from '../components/navigation/public-nav';
import { Spinner } from '../components/elements/spinner';

import { useAppSelector } from '../store';
import { selectSaved } from '../store/selectors/data';

const Saved = () => {
  const { posts } = useAppSelector(selectSaved);
  const { palette: colors } = useTheme();

  document.title = 'Saved articles';
  return (
    <Suspense fallback={<Spinner />}>
      <Stack
        sx={{ padding: '20px', width: '100%', maxWidth: 800, margin: 'auto', minHeight: '100%', color: colors.white }}
      >
        <Spacer height={24} />
        <Text variant="h1">Saved articles</Text>
        <Spacer height={24} />
        {posts.length === 0 && (
          <Text variant="text" sx={{ paddingLeft: '8px', color: colors.gray }}>
            You have no articles saved.
          </Text>
        )}
        <PostList posts={posts} />
      </Stack>
      <PublicNav />
    </Suspense>
  );
};

export default Saved;
