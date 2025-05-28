export type Pagination = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};
export type LeaderboardDataItem = {
  walletAddress: string;
  referralCount: string;
  totalReward: number;
};
