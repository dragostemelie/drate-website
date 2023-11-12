import React from 'react';
import { useScrolling } from '../../hooks/useScrolling';

import {
  BookmarkOutlined,
  BookmarkFilled,
  HeartFilled,
  HeartOutlined,
  CommentOutlined,
  PaperPlaneOutlined,
  PaperPlaneFilled,
} from '../../assets/icons';
import { NavContainer, Center, PostNavItem } from './styles';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectUi } from '../../store/selectors/ui';
import { Typography, useTheme } from '@mui/material';
import { likePost } from '../../store/thunks/data';
import { Post } from '../../models/post';
import { savePost } from '../../store/thunks/ui';

interface Props {
  post: Post;
  onCommentsClick: () => void;
  onAddCommentClick: () => void;
}

export const SinglePostNav = ({ post, onCommentsClick, onAddCommentClick }: Props) => {
  const direction = useScrolling();
  const { saved, settings } = useAppSelector(selectUi);
  const dispatch = useAppDispatch();
  const { palette: colors } = useTheme();

  const isSaved = saved.includes(post.id);
  const isLiked = post.likes.includes(settings.uuid);
  const commentsCount = post.comments.reduce((total, comment) => {
    let count = total;
    if (comment.user === settings.uuid) count++;
    let replyCount = 0;
    if (comment.replies.length !== 0) {
      replyCount = comment.replies.reduce((rTotal, reply) => {
        let rCount = rTotal;
        if (reply.user === settings.uuid) rCount++;
        return rCount;
      }, 0);
    }
    count += replyCount;
    return count;
  }, 0);

  const handleLike = () => {
    dispatch(likePost(post.id));
  };

  const handleSavePost = () => {
    dispatch(savePost(post.id));
  };

  return (
    <>
      <NavContainer sx={{ position: direction === 'DOWN' ? 'relative' : 'sticky' }}>
        <Center>
          <PostNavItem onClick={handleLike} title="Likes">
            {isLiked ? <HeartFilled color={colors.red} size={28} /> : <HeartOutlined size={28} />}
            <Typography variant="h6">{post.likes.length.toString()}</Typography>
          </PostNavItem>
          <PostNavItem onClick={onCommentsClick} title="All comments">
            <CommentOutlined size={28} color={colors.gray} />
            <Typography variant="h6">{post.comments.length.toString()}</Typography>
          </PostNavItem>
          <PostNavItem onClick={onAddCommentClick} title="My comments">
            {commentsCount !== 0 ? (
              <PaperPlaneFilled color={colors.purple} size={28} />
            ) : (
              <PaperPlaneOutlined size={28} />
            )}
            <Typography variant="h6">{commentsCount}</Typography>
          </PostNavItem>
          <PostNavItem onClick={handleSavePost} title="Save article">
            {isSaved ? <BookmarkFilled color={colors.yellow} size={28} /> : <BookmarkOutlined size={28} />}
          </PostNavItem>
        </Center>
      </NavContainer>
    </>
  );
};
