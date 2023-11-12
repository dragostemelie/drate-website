import React, { Suspense } from 'react';
import { Stack, Typography as Text, useTheme } from '@mui/material';

import { Spacer } from '../../components/elements/spacer';
import { Spinner } from '../../components/elements/spinner';
import { PrivateNav } from '../../components/navigation/private-nav';
import { ReaderList } from '../../components/posts/reader-list';

import { useAppSelector } from '../../store';
import { selectPosts } from '../../store/selectors/author';
import { AuthorPostList } from '../../components/posts/author-post-list';

const Posts = () => {
  const { posts } = useAppSelector(selectPosts);
  const { palette: colors } = useTheme();

  document.title = 'Posts';
  return (
    <Suspense fallback={<Spinner />}>
      <Stack
        sx={{ padding: '20px', width: '100%', maxWidth: 600, margin: 'auto', minHeight: '100%', color: colors.white }}
      >
        <Spacer height={24} />
        <Text variant="h1">Posts</Text>
        <Spacer height={24} />
        {posts.length === 0 && (
          <Text variant="text" sx={{ paddingLeft: '8px', color: colors.gray }}>
            You have no posts.
          </Text>
        )}
        <AuthorPostList posts={posts} />
      </Stack>
      <PrivateNav />
    </Suspense>
  );
};

export default Posts;
