import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

import { Box, IconButton, Stack, SxProps, Typography as Text, useTheme } from '@mui/material';

import type { Post } from '../../models/post';
import { Calendar } from '../elements/calendar';
import { BookmarkFilled, BookmarkOutlined } from '../../assets/icons';

import { useAppDispatch, useAppSelector } from '../../store';
import { selectUi } from '../../store/selectors/ui';
import { savePost } from '../../store/thunks/ui';

interface Props {
  posts: Post[];
  onClick?: () => void;
}

export const PostList = ({ posts }: Props) => {
  const { saved } = useAppSelector(selectUi);
  const dispatch = useAppDispatch();
  const { palette: colors } = useTheme();

  const handleSavePost = (id: number) => {
    dispatch(savePost(id));
  };
  return (
    <Stack>
      {posts.map((post, index) => (
        <React.Fragment key={post.id}>
          <Box sx={{ height: 4 }} />
          <Stack sx={{ flexDirection: 'row', gap: '16px', alignItems: 'flex-start' }}>
            <Stack sx={{ flex: 1 }}>
              <Link to={`/post/${slugify(post.title)}`} style={{ textDecoration: 'none' }}>
                <Text
                  variant="h2"
                  sx={{
                    ...eclipseText,
                    cursor: 'pointer',
                    color: colors.white,
                  }}
                >
                  {post.title}
                </Text>
                <Box sx={{ height: 8 }} />
                <Calendar date={post.created} />
              </Link>
            </Stack>
            <IconButton
              onClick={() => handleSavePost(post.id)}
              sx={{ color: saved.includes(post.id) ? colors.yellow : colors.gray }}
            >
              {saved.includes(post.id) ? <BookmarkFilled size={28} /> : <BookmarkOutlined size={28} />}
            </IconButton>
          </Stack>
          <Box sx={{ height: 16 }} />
          <Link to={`/post/${slugify(post.title)}`} style={{ textDecoration: 'none' }}>
            <Text variant="text" sx={{ ...eclipseText, color: colors.gray, WebkitLineClamp: '8' }}>
              {post.excerpt}
            </Text>
          </Link>
          {index !== posts.length - 1 && <Box sx={{ height: 20, borderBottom: `1px solid ${colors.dark}` }} />}
          <Box sx={{ height: 24 }} />
        </React.Fragment>
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
