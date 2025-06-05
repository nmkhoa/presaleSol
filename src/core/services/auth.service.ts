import { request } from "@/config/request";
import { endpoints } from "@/constants/api-endpoint";
import { resetAllStores } from "@/stores/clear-all.store";
import type {
  LoginRequest,
  LoginResponse,
  NonceRequest,
  NonceResponse,
} from "@/types/auth/auth.interface";
import type { CurrentRankResponse } from "@/types/Referral/referral.interface";
import type { AxiosError } from "axios";

export const login = async (
  loginRequest: LoginRequest
): Promise<LoginResponse> => {
  return await request
    .post<LoginResponse>(endpoints.AUTH.LOGIN, loginRequest)
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
export const logout = () => {
  resetAllStores();
  request.removeAuthorizationToken();
  return;
};

export const getNonce = async (
  nonceRequest: NonceRequest
): Promise<NonceResponse> => {
  return await request
    .get<NonceResponse>(endpoints.AUTH.NONCE, { params: nonceRequest })
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

export const getCurrentRank = async (): Promise<CurrentRankResponse> => {
  return await request
    .get<CurrentRankResponse>(endpoints.REFERRAL.CURRENT_RANK)
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
