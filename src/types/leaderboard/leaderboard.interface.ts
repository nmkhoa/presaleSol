export type Pagination = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};
type LeaderboardDataItem = {
  walletAddress: string;
  referralCount: string;
  totalReward: number;
};

export type LeaderboardRequest = {
  page: number;
  limit?: number;
};

export type LeaderboardResponse = {
  data: LeaderboardDataItem[];
  pagination: Pagination;
};
