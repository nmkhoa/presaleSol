import { request } from "@/config/request";
import { ENDPOINTS } from "@/constants/apiEndpoints";
import { resetAllStores } from "@/stores/clearAll.store";
import type {
  LoginRequest,
  LoginResponse,
  NonceRequest,
  NonceResponse,
} from "@/types/auth/auth.interface";
import type { AxiosError } from "axios";

export const login = async (
  loginRequest: LoginRequest
): Promise<LoginResponse> => {
  return await request
    .post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, loginRequest)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data || error;
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
    .get<NonceResponse>(ENDPOINTS.AUTH.NONCE, { params: nonceRequest })
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data || error;
    });
};
