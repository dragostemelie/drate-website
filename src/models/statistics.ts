export type Statistic = {
  guid: string;
  avatar: string;
  displayName: string;
  lastSeen: string;
  ip: string;
  os: string;
  country: string;
  history: {
    createdAt: string;
    url: string;
    browser: string;
  }[];
};
