import { ShortUser } from './user';

export type Post = {
  id: number;
  created: string;
  author: ShortUser;
  title: string;
  excerpt: string;
  content: string;
  topic: string;
  tag: string;
  likes: string[];
  comments: Comment[];
  post_parent: number | null;
};

export type Comment = {
  id: number;
  created: string;
  post: number;
  user: string;
  comment: string;
  repliedTo: number | null;
  likes: string[];
  replies: {
    id: number;
    created: string;
    post: number;
    user: string;
    comment: string;
    repliedTo: number | null;
  }[];
};
