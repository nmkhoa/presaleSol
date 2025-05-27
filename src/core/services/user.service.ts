import { request } from "@/config/request";
import { ENDPOINTS } from "@/constants/apiEndpoints";
import type { TransactionRequest, TransactionResponse } from "@/types/home";
import type {
  LeaderboardRequest,
  LeaderboardResponse,
} from "@/types/leaderboard/leaderboard.interface";
import type {
  ReferralRequest,
  ReferralResponse,
} from "@/types/Referral/referral.interface";
import type { User } from "@/types/user/user.interface";
import type { AxiosError } from "axios";

export const getMe = async (): Promise<User> => {
  return await request
    .get<User>(ENDPOINTS.Users.GET_ME)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data || error;
    });
};

export const getLeaderboard = async (
  leaderboardRequest: LeaderboardRequest
): Promise<LeaderboardResponse> => {
  return await request
    .get<LeaderboardResponse>(ENDPOINTS.Users.LEADERBOARD, {
      params: {
        page: leaderboardRequest.page || 1,
        limit: leaderboardRequest.limit || 10,
      },
    })
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data || error;
    });
};

export const getTransaction = async (
  transactionRequest: TransactionRequest
): Promise<TransactionResponse> => {
  return await request
    .get<TransactionResponse>(ENDPOINTS.TOKEN.TRANSACTIONL, {
      params: {
        page: transactionRequest.page || 1,
        limit: transactionRequest.limit || 10,
      },
    })
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data || error;
    });
};

export const getReferralInfo = async (
  referralRequest: ReferralRequest
): Promise<ReferralResponse> => {
  return await request
    .get<ReferralResponse>(ENDPOINTS.REFERRAL.REWARD_SUMMARY, {
      params: {
        page: referralRequest.page || 1,
        limit: referralRequest.limit || 10,
      },
    })
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data || error;
    });
};
