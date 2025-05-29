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
