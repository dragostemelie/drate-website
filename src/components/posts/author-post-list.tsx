import React from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton, Stack, Typography as Text, useTheme } from '@mui/material';
import { DeleteOutlined, EditFilled, Published, Unpublished } from '../../assets/icons';
import slugify from 'slugify';

import { Post } from '../../models/author';
import { ViewFilled } from '../../assets/icons';
import { CommentOutlined } from '../../assets/icons';
import { HeartOutlined } from '../../assets/icons';
import { useAppDispatch } from '../../store';
import { updatePost } from '../../store/thunks/author';

interface Props {
  posts: Post[];
}

export const AuthorPostList = ({ posts }: Props) => {
  const { palette: colors } = useTheme();
  const dispatch = useAppDispatch();

  const handlePublish = (post: Post) => {
    dispatch(updatePost({ ...post, is_published: !post.is_published }));
  };

  return (
    <Stack>
      {posts.map((post, index) => (
        <Stack
          key={index}
          sx={{
            paddingBlock: '14px 10px',
            gap: '8px',
            borderBottom: `1px solid ${index < posts.length - 1 ? colors.dark : colors.black}`,
          }}
        >
          <Stack sx={{ gap: '16px', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            {post.is_published ? (
              <Link to={`/post/${slugify(post.title)}`} style={{ textDecoration: 'none', flex: 1 }}>
                <Text variant="h4" sx={{ cursor: 'pointer', color: colors.white }}>
                  {post.title}
                </Text>
              </Link>
            ) : (
              <Text variant="h4" sx={{ flex: 1, color: colors.white }}>
                {post.title}
              </Text>
            )}
            <IconButton sx={{ color: colors.gray, padding: '4px', alignSelf: 'flex-start' }}>
              <EditFilled />
            </IconButton>
          </Stack>
          <Stack sx={{ gap: '16px', flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
            <Button variant="outlined" sx={{ height: '18px', gap: '4px' }} onClick={() => handlePublish(post)}>
              {post.is_published ? (
                <Published color={colors.purple} size={18} />
              ) : (
                <Unpublished color={colors.gray} size={18} />
              )}
              <Text variant="description" sx={{ color: colors.gray }}>
                Published
              </Text>
            </Button>
            <Stack sx={{ gap: '4px', flexDirection: 'row', alignItems: 'center' }}>
              <ViewFilled color={colors.gray} size={18} />
              <Text variant="description" sx={{ color: colors.gray }}>
                {post.visits}
              </Text>
            </Stack>
            <Stack sx={{ gap: '4px', flexDirection: 'row', alignItems: 'center' }}>
              <CommentOutlined color={colors.gray} size={18} />
              <Text variant="description" sx={{ color: colors.gray }}>
                {post.comments}
              </Text>
            </Stack>
            <Stack sx={{ gap: '4px', flexDirection: 'row', alignItems: 'center' }}>
              <HeartOutlined color={colors.gray} size={18} />
              <Text variant="description" sx={{ color: colors.gray }}>
                {post.likes}
              </Text>
            </Stack>
            <IconButton sx={{ color: colors.red, marginLeft: 'auto', padding: '5px' }}>
              <DeleteOutlined size={22} />
            </IconButton>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
