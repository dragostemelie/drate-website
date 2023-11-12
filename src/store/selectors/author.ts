import { RootState } from '..';
import { Post, Reader } from '../../models/author';

export const selectAuthor = (state: RootState) => {
  const author = state.author;
  return author;
};

export const selectReaders = (state: RootState) => {
  const { displayName: authorName } = state.ui.settings;
  const { sort } = state.author.ui.readers;

  let readers = state.author.readers;

  // Sort
  readers = [...readers].sort(byNewestReader);
  if (sort === 'Comments') readers = [...readers].sort(byComment);
  if (sort === 'Page count') readers = [...readers].sort(byVisitCount);

  // Exclude author
  readers = [...readers].filter((reader) => reader.displayName !== authorName);

  return { readers, sort };
};

export const selectMessages = (state: RootState) => {
  const { messages } = state.author;
  return { messages };
};

export const selectPosts = (state: RootState) => {
  const { posts } = state.author;

  return { posts: [...posts].sort(byNewestPost) };
};

// SORT HELPER FUNCTIONS

const byNewestReader = (a: Reader, b: Reader) => {
  if (a.lastSeen > b.lastSeen) return -1;
  if (a.lastSeen < b.lastSeen) return 1;
  return 0;
};

const byNewestPost = (a: Post, b: Post) => {
  if (a.created > b.created) return -1;
  if (a.created < b.created) return 1;
  return 0;
};

const byComment = (a: Reader, b: Reader) => {
  if (a.comments > b.comments) return 1;
  if (a.comments < b.comments) return -1;
  return 0;
};

const byVisitCount = (a: Reader, b: Reader) => {
  if (a.visits > b.visits) return 1;
  if (a.visits < b.visits) return -1;
  return 0;
};
