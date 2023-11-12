import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

import { Box, Stack, SxProps, Typography as Text, useTheme } from '@mui/material';

import type { Post } from '../../models/post';

interface Props {
  posts: Post[];
  onClick?: (postId: number) => void;
}

export const SearchList = ({ posts, onClick }: Props) => {
  const { palette: colors } = useTheme();

  return (
    <Stack sx={{ gap: '32px', paddingBlock: '24px' }}>
      {posts.map((post) => (
        <Link key={post.id} to={`/post/${slugify(post.title)}`} style={{ textDecoration: 'none' }}>
          <Stack onClick={() => onClick && onClick(post.id)}>
            <Text
              variant="h4"
              sx={{
                ...eclipseText,
                color: colors.white,
                WebkitLineClamp: '1',
              }}
            >
              {post.title}
            </Text>
            <Box sx={{ height: 10 }} />
            <Text variant="text" sx={{ ...eclipseText, color: colors.gray }}>
              {post.excerpt}
            </Text>
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};

const eclipseText: SxProps = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: '2',
  wordBreak: 'break-word',
};
