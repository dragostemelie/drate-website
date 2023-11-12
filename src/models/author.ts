export type Message = {
  created: string;
  avatar: string;
  displayName: string;
  from: string;
  to: string;
  message: string;
};

export type Reader = {
  avatar: string;
  displayName: string;
  lastSeen: string;
  browser: string;
  os: string;
  country: string;
  visits: number;
  comments: number;
  likes: number;
  history: {
    createdAt: string;
    url: string;
    browser: string;
  }[];
};

export type Post = {
  id: number;
  created: string;
  author: string;
  title: string;
  excerpt: string;
  content: string;
  topic: string;
  tag: string;
  post_parent: number | null;
  is_published: boolean;
  visits: number;
  comments: number;
  likes: number;
};
