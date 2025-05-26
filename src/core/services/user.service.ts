import { request } from "@/config/request";
import { ENDPOINTS } from "@/constants/apiEndpoints";
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
