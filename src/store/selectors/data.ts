import { RootState } from '..';
import { Post } from '../../models/post';
import slugify from 'slugify';

export const selectSinglePost = (state: RootState, slug?: string) => {
  let post = state.data.posts.find((post) => slugify(post.title) === slug);

  if (post) {
    post = { ...post };
    // sort comments
    post.comments = [...post.comments].sort((a, b) => {
      if (a.created > b.created) return 1;
      if (a.created < b.created) return -1;
      return 0;
    });
    // sort replies
    post.comments.map((comment) => {
      if (comment.replies.length !== 0) {
        const sorted = { ...comment };
        sorted.replies = [...comment.replies].sort((a, b) => {
          if (a.created > b.created) return -1;
          if (a.created < b.created) return 1;
          return 0;
        });
        return sorted;
      }
      return comment;
    });
  }

  // create users list
  const commentUsersId = [] as string[];
  post?.comments.forEach((comment) => {
    if (!commentUsersId.includes(comment.user)) commentUsersId.push(comment.user);
    if (comment.replies.length !== 0) {
      comment.replies.forEach((comment) => {
        if (!commentUsersId.includes(comment.user)) commentUsersId.push(comment.user);
      });
    }
  });

  const users = state.data.users.filter((user) => commentUsersId.includes(user.uuid));

  return { post, users };
};

export const selectAuthor = (state: RootState, slug?: string) => {
  const author = state.data.users.find((user) => slugify(user.displayName) === slug);
  return author;
};

export const selectSaved = (state: RootState) => {
  const ui = state.ui;
  const data = state.data;

  //Filter
  let posts = data.posts.filter((post) => ui.saved.includes(post.id));

  // Sort
  posts = [...posts].sort(byNewest);

  return { posts };
};

export const selectPosts = (state: RootState) => {
  const ui = state.ui;
  const data = state.data;

  //Filter
  let posts = ui.posts.filter === 'All tags' ? data.posts : data.posts.filter((post) => post.tag === ui.posts.filter);

  // Sort
  posts = [...posts].sort(byNewest);
  if (ui.posts.sort === 'Post title') posts = [...posts].sort(byTitle);
  if (ui.posts.sort === 'Topic') posts = [...posts].sort(byTopic);
  console.log('data.posts', data.posts);
  const categories = data.posts.reduce(
    (categories, next) => {
      if (!categories.includes(next.tag)) categories.push(next.tag);
      return categories;
    },
    ['All tags'],
  );

  return { posts, categories };
};

export const selectAvatars = (state: RootState) => {
  const avatars = state.data.avatars;

  return { avatars };
};

// SORT HELPER FUNCTIONS

const byNewest = (a: Post, b: Post) => {
  if (a.created > b.created) return -1;
  if (a.created < b.created) return 1;
  return 0;
};

const byTitle = (a: Post, b: Post) => {
  if (a.title > b.title) return 1;
  if (a.title < b.title) return -1;
  return 0;
};

const byTopic = (a: Post, b: Post) => {
  if (a.topic > b.topic) return 1;
  if (a.topic < b.topic) return -1;
  return 0;
};
