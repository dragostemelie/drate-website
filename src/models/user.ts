export interface User extends ShortUser {
  id: number;
  created: string;
  email: string;
  title: string;
  about: string;
  isAuthor: boolean;
  posts: number;
  topics: number;
  comments: number;
  lastSeen: string;
}

export type ShortUser = {
  uuid: string;
  guid?: string;
  displayName: string;
  avatar: string;
};

export type Settings = {
  uuid: string;
  guid: string;
  avatar: string;
  displayName: string;
  title: string;
  about: string;
  theme: string;
};

export type Author = {
  guid: string;
  avatar: string;
  displayName: string;
  title: string;
  about: string;
  message: string;
  token: string;
  expireAt: string;
};
