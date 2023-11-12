import React, { Suspense, useEffect, useState } from 'react';
import { Stack, Typography as Text, useTheme } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store';
import { selectSinglePost } from '../store/selectors/data';
import { selectUi } from '../store/selectors/ui';

import { PostAuthor } from '../components/posts/post-author';
import { Header } from '../components/navigation/header';
import { SinglePostNav } from '../components/navigation/post-nav';
import { PostContextMenu } from '../components/menus/post-menu';
import { Spacer } from '../components/elements/spacer';
import { addComment, likeComment, likePost, updateComment, deleteComment as delComment } from '../store/thunks/data';
import { CommentsDrawer } from '../components/drawers/comments-drawer';
import { MessageDrawer as AddCommentDrawer } from '../components/drawers/message-drawer';
import { Comment } from '../models/post';
import { Markdown } from '../components/markdown/markdown';
import { AppDialog } from '../components/elements/dialog';
import { savePost } from '../store/thunks/ui';
import { Spinner } from '../components/elements/spinner';

const SinglePost = () => {
  const [contextMenuAnchor, setContextMenuAnchor] = useState<HTMLElement | null>(null);
  const [showAddComment, setShowAddComment] = useState(false);
  const [editComment, setEditComment] = useState<Comment | null>(null);
  const [deleteComment, setDeleteComment] = useState<Comment | null>(null);
  const [replyComment, setReplyComment] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(false);

  const navigate = useNavigate();
  const params = useParams<{ slug: string }>();
  const { palette: colors } = useTheme();

  const { saved, status, settings } = useAppSelector(selectUi);
  const { post, users } = useAppSelector((state) => selectSinglePost(state, params.slug));
  const dispatch = useAppDispatch();

  const handleShowContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    setContextMenuAnchor(event.currentTarget);
  };

  const handleSelectContextMenu = (option: string) => {
    if (post) {
      switch (option) {
        case 'Save':
          dispatch(savePost(post.id));
          break;
        case 'Like':
          dispatch(likePost(post.id));
          break;
        case 'Comment':
          setShowAddComment(true);
          break;
        default:
          break;
      }
      setContextMenuAnchor(null);
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenuAnchor(null);
  };

  const handleShowComments = () => {
    if (post?.comments.length !== 0) setShowComments(true);
    else setShowAddComment(true);
  };

  const handleAddComment = (comment?: Comment) => {
    if (comment) {
      setEditComment(comment);
      setReplyComment(comment.repliedTo);
    } else {
      setEditComment(null);
      setReplyComment(null);
    }
    setShowAddComment(true);
  };

  const handleDeleteComment = (comment: Comment) => {
    setDeleteComment(comment);
  };

  const handleConfirmDelete = () => {
    if (deleteComment !== null) {
      dispatch(delComment({ postId: post?.id || 0, newComment: deleteComment }));
      setDeleteComment(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteComment(null);
  };

  const handleReplyComment = (commentId: number) => {
    setShowAddComment(true);
    setReplyComment(commentId);
  };

  const handleLikeComment = (commentId: number) => {
    dispatch(likeComment({ postId: post?.id || 0, commentId }));
  };

  const handleCloseComments = () => {
    setShowComments(false);
  };

  const handleCloseAddComment = () => {
    setShowAddComment(false);
    setEditComment(null);
    setReplyComment(null);
  };

  const handleSubmitComment = async (message: string) => {
    const comment = {
      id: editComment ? editComment.id : -1,
      created: editComment ? editComment.created : new Date().toISOString(),
      post: post?.id || 0,
      user: settings.uuid,
      comment: message.trim(),
      repliedTo: replyComment,
      likes: editComment ? editComment.likes : [],
      replies: editComment ? editComment.replies : [],
    } as Comment;
    setShowAddComment(false);
    if (replyComment) {
      if (editComment) {
        dispatch(updateComment({ postId: post?.id || 0, editedComment: comment }));
      } else {
        dispatch(addComment({ postId: post?.id || 0, newComment: comment }));
      }
      setReplyComment(null);
    } else {
      if (editComment) {
        dispatch(updateComment({ postId: post?.id || 0, editedComment: comment }));
      } else {
        await dispatch(addComment({ postId: post?.id || 0, newComment: comment }));
        const commentsEl = document.querySelector('#comments') as HTMLElement | undefined;
        commentsEl?.scrollTo(0, commentsEl.scrollHeight);
      }
    }
  };

  useEffect(() => {
    if (!post && status !== 'loading') navigate('/', { replace: true });
  }, [status]);

  useEffect(() => {
    if (post) {
      document.title = post.title;
    }
  }, [post]);

  return (
    <Suspense fallback={<Spinner />}>
      {post && (
        <>
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
            <Header title={post.topic} onOpenMenu={handleShowContextMenu} />
            <PostContextMenu
              anchorEl={contextMenuAnchor}
              open={Boolean(contextMenuAnchor)}
              onClose={handleCloseContextMenu}
              onSelect={handleSelectContextMenu}
              isSaved={saved.includes(post.id)}
              isLiked={post.likes.includes(settings.uuid)}
            />
            <Spacer height={18} />
            {/* <PostAuthor avatar={post.author.avatar} displayName={post.author.displayName} date={post.created} />
            <Spacer height={24} /> */}
            <Text variant="h1" sx={{ color: colors.white }}>
              {post.title}
            </Text>
            <Spacer height={8} />
            <Markdown>{post.content}</Markdown>
          </Stack>
          <CommentsDrawer
            open={showComments}
            comments={post.comments}
            users={users}
            onClose={handleCloseComments}
            onReplyComment={handleReplyComment}
            onWriteComment={handleAddComment}
            onLikeComment={handleLikeComment}
            onDeleteComment={handleDeleteComment}
          />
          <AddCommentDrawer
            id="comment-drawer"
            open={showAddComment}
            title={editComment ? 'Update your comment' : replyComment ? 'Reply to comment' : 'Write a new comment'}
            initialValue={editComment ? editComment.comment : undefined}
            onClose={handleCloseAddComment}
            onSubmit={handleSubmitComment}
          />
          <AppDialog
            open={deleteComment !== null}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            title="Delete comment?"
            text="Are you sure you want to delete this comment?"
            cancelLabel="No"
            confirmLabel="Yes"
          />
          <SinglePostNav
            post={post}
            onCommentsClick={handleShowComments}
            onAddCommentClick={() => setShowAddComment(true)}
          />
        </>
      )}
    </Suspense>
  );
};

export default SinglePost;
