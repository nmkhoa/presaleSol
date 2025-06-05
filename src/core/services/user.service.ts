import { request } from "@/config/request";
import { endpoints } from "@/constants/api-endpoint";
import type { TransactionRequest, TransactionResponse } from "@/types/home";
import type { LeaderboardDataItem } from "@/types/leaderboard/leaderboard.interface";

import type {
  ReferralRequest,
  ReferralResponse,
} from "@/types/Referral/referral.interface";
import type { User } from "@/types/user/user.interface";
import type { AxiosError } from "axios";

export const getMe = async (): Promise<User> => {
  return await request
    .get<User>(endpoints.Users.GET_ME)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      console.error("API Error:", error);
      throw {
        message: "An error occurred during authentication",
        status: error.response?.status || 500,
        // Sanitized error info for frontend
      };
    });
};

export const getLeaderboard = async (): Promise<LeaderboardDataItem[]> => {
  return await request
    .get<LeaderboardDataItem[]>(endpoints.REFERRAL.LEADERBOARD)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      console.error("API Error:", error);
      throw {
        message: "An error occurred during authentication",
        status: error.response?.status || 500,
        // Sanitized error info for frontend
      };
    });
};

export const getTransaction = async (
  transactionRequest: TransactionRequest
): Promise<TransactionResponse> => {
  return await request
    .get<TransactionResponse>(endpoints.TOKEN.TRANSACTIONL, {
      params: {
        page: transactionRequest.page || 1,
        limit: transactionRequest.limit || 10,
      },
    })
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      console.error("API Error:", error);
      throw {
        message: "An error occurred during authentication",
        status: error.response?.status || 500,
        // Sanitized error info for frontend
      };
    });
};

export const getReferralInfo = async (
  referralRequest: ReferralRequest
): Promise<ReferralResponse> => {
  return await request
    .get<ReferralResponse>(endpoints.REFERRAL.REWARD_SUMMARY, {
      params: {
        page: referralRequest.page || 1,
        limit: referralRequest.limit || 10,
      },
    })
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      console.error("API Error:", error);
      throw {
        message: "An error occurred during authentication",
        status: error.response?.status || 500,
        // Sanitized error info for frontend
      };
    });
};
