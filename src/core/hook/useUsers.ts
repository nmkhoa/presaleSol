import { getMe } from "../services/user.service";

import { useMutation } from "@tanstack/react-query";
import type { User } from "@/types/user/user.interface";
import type { AxiosError } from "axios";

export const useGetMe = () => {
  return useMutation<User, AxiosError>({
    mutationKey: ["useGetMe"],
    mutationFn: getMe,
  });
};
