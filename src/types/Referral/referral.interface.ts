import type { Pagination } from "../leaderboard/leaderboard.interface";

export interface referralInfo {
  referral: string;
  currency: string;
  totalTokenReward: number;
  blockTime: string;
}

export interface ReferralRequest {
  page: number;
  limit?: number;
}

export interface ReferralResponse {
  data: referralInfo[];
  pagination: Pagination;
}

export interface CurrentRankResponse {
  currentRank: number;
  walletAddress: string;
  referralCount: number;
  totalReward: number;
}
