import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Stack, SwipeableDrawer, Typography as Text, useTheme } from '@mui/material';

import { Puller } from '../elements/puller';
import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  PaperPlaneFilled,
  ReplyOutlined,
  ThreeDots,
} from '../../assets/icons';
import { Comment } from '../../models/post';
import { User } from '../../models/user';
import { AddComment, CommentAction, CommentsContainer } from './styles';
import { useAppSelector } from '../../store';
import { selectUi } from '../../store/selectors/ui';
import { Markdown } from '../markdown/markdown';
import { withDate } from '../../utils/strings';
import { CommentContextMenu } from '../menus/comment-menu';

interface Props {
  open: boolean;
  comments: Comment[];
  users: User[];
  onClose: () => void;
  onLikeComment: (commentId: number) => void;
  onReplyComment: (commentId: number) => void;
  onWriteComment: (comment?: Comment) => void;
  onDeleteComment: (comment: Comment) => void;
}

export const CommentsDrawer = ({
  open,
  comments,
  users,
  onClose,
  onWriteComment,
  onReplyComment,
  onLikeComment,
  onDeleteComment,
}: Props) => {
  const [contextMenuAnchor, setContextMenuAnchor] = useState<HTMLElement | null>(null);
  const [contextComment, setContextComment] = useState<Comment | null>(null);

  const navigate = useNavigate();
  const { settings } = useAppSelector(selectUi);
  const { palette: colors } = useTheme();
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleShowContextMenu = (event: React.MouseEvent<HTMLElement>, comment: Comment) => {
    setContextMenuAnchor(event.currentTarget);
    setContextComment(comment);
  };

  const handleCloseContextMenu = () => {
    setContextMenuAnchor(null);
    setContextComment(null);
  };

  const handleEditComment = () => {
    onWriteComment(contextComment ? contextComment : undefined);
    setContextMenuAnchor(null);
    setContextComment(null);
  };

  const handleDeleteComment = () => {
    contextComment && onDeleteComment(contextComment);
    setContextMenuAnchor(null);
    setContextComment(null);
  };

  return (
    <SwipeableDrawer
      id="drawer"
      open={open}
      onOpen={() => {}}
      onClose={onClose}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <Puller />
      <CommentsContainer id="comments">
        {comments.map((comment, index) => {
          const user = users.find((item) => item.uuid === comment.user);
          const isLiked = comment.likes.includes(settings.uuid);
          return (
            <Stack
              key={comment.id}
              sx={{
                width: '100%',
                paddingBottom: '16px',

                borderBottom: `1px solid ${index < comments.length - 1 ? colors.dark : colors.black}`,
              }}
            >
              <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Stack
                  onClick={() => comment.user === settings.uuid && navigate('/settings')}
                  sx={{
                    flexDirection: 'row',
                    gap: '8px',
                    alignItems: 'center',
                    '&:hover': {
                      cursor: comment.user === settings.uuid ? 'pointer' : 'default',
                    },
                  }}
                >
                  <Avatar src={user?.avatar} alt={user?.displayName} sizes="28px" />
                  <Text variant="h6" sx={{ color: colors.white }}>
                    {user?.displayName}
                  </Text>
                  <Text variant="small" sx={{ color: colors.gray, paddingTop: '3px' }}>
                    {withDate(comment.created)}
                  </Text>
                </Stack>
                {comment.user === settings.uuid && (
                  <CommentAction onClick={(event) => handleShowContextMenu(event, comment)}>
                    <ThreeDots size={24} />
                  </CommentAction>
                )}
              </Stack>
              <Stack sx={{ marginTop: '-6px' }}>
                <Markdown>{comment.comment}</Markdown>
              </Stack>
              <Stack sx={{ flexDirection: 'row', gap: '16px' }}>
                <CommentAction
                  onClick={() => comment.user !== settings.uuid && onLikeComment(comment.id)}
                  disableRipple={comment.user === settings.uuid}
                  sx={{
                    '&:hover': {
                      cursor: comment.user === settings.uuid ? 'default' : 'pointer',
                    },
                  }}
                >
                  {isLiked ? <HeartFilled color={colors.red} size={20} /> : <HeartOutlined size={20} />}
                  <Text variant="description">{comment.likes.length.toString()}</Text>
                </CommentAction>
                <CommentAction disableRipple sx={{ mr: 'auto', cursor: 'default' }}>
                  <CommentOutlined size={20} />
                  <Text variant="description">
                    {comment.replies.length === 0
                      ? '0'
                      : comment.replies.length === 1
                      ? '1 Reply'
                      : comment.replies.length.toString() + ' Replies'}
                  </Text>
                </CommentAction>
                <CommentAction sx={{ ml: 'auto' }} onClick={() => onReplyComment(comment.id)}>
                  <ReplyOutlined size={20} />
                  <Text variant="description">Reply</Text>
                </CommentAction>
              </Stack>
              {comment.replies.map((reply) => {
                const replyUser = users.find((item) => item.uuid === reply.user);
                return (
                  <Stack
                    key={reply.id}
                    sx={{
                      width: '100%',
                      padding: '16px 0 0 32px',
                    }}
                  >
                    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Stack
                        onClick={() => reply.user === settings.uuid && navigate('/settings')}
                        sx={{
                          flexDirection: 'row',
                          gap: '8px',
                          alignItems: 'center',
                          '&:hover': {
                            cursor: reply.user === settings.uuid ? 'pointer' : 'default',
                          },
                        }}
                      >
                        <Avatar src={replyUser?.avatar} alt={replyUser?.displayName} sx={{ width: 28, height: 28 }} />
                        <Text variant="h6">{replyUser?.displayName}</Text>
                        <Text variant="small" sx={{ color: colors.gray, paddingTop: '3px' }}>
                          {withDate(reply.created)}
                        </Text>
                      </Stack>
                      {reply.user === settings.uuid && (
                        <CommentAction onClick={(event) => handleShowContextMenu(event, reply as Comment)}>
                          <ThreeDots size={20} />
                        </CommentAction>
                      )}
                    </Stack>
                    <Stack sx={{ marginTop: '-6px', '& .MuiTypography-text': { fontSize: 16 } }}>
                      <Markdown>{reply.comment}</Markdown>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          );
        })}
        <CommentContextMenu
          anchorEl={contextMenuAnchor}
          open={Boolean(contextMenuAnchor)}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
          onClose={handleCloseContextMenu}
        />
      </CommentsContainer>

      {/* ADD COMMENT */}
      <AddComment onClick={() => onWriteComment()}>
        <Text variant="text">Write a comment</Text>
        <PaperPlaneFilled />
      </AddComment>
    </SwipeableDrawer>
  );
};
