import type {
  LoginRequest,
  LoginResponse,
  NonceRequest,
  NonceResponse,
} from "@/types/auth/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getNonce, login } from "../services";
import { toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/stores/auth.store";

export const useLogin = () => {
  const { setAccessToken, setUser } = useAuthStore();

  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationKey: ["useLogin"],
    mutationFn: login,
    onSuccess: (res) => {
      setAccessToken(res.accessToken);
      setUser(res.user);
      toaster.create({
        description: "Login successplly!",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("error", error);
      toaster.create({
        description: "login failed",
        type: "error",
      });
    },
  });
};

export const useGetNonce = () => {
  return useMutation<NonceResponse, AxiosError, NonceRequest>({
    mutationKey: ["useGetNonce"],
    mutationFn: getNonce,
  });
};
