import type { Pagination } from "../leaderboard/leaderboard.interface";

export interface referralInfo {
  referral: string;
  totalreward: number;
  blocktime: string;
}

export interface ReferralRequest {
  page: number;
  limit?: number;
}

export interface ReferralResponse {
  data: referralInfo[];
  pagination: Pagination;
}
