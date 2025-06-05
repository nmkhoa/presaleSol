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
import { request } from "@/config/request";

export const useLogin = () => {
  const { setAccessToken, setUser } = useAuthStore();

  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationKey: ["useLogin"],
    mutationFn: login,
    onSuccess: (res) => {
      request.setAuthorizationToken(res.accessToken);
      setAccessToken(res.accessToken);
      setUser(res.user);

      toaster.create({
        description: "Login successfully!",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("error", error);
      toaster.create({
        description: "Login failed!",
        type: "error",
      });
    },
  });
};

export const useGetNonce = () => {
  return useMutation<NonceResponse, AxiosError, NonceRequest>({
    mutationKey: ["useGetNonce"],
    mutationFn: getNonce,
    onError: (error) => {
      console.error("Error signing message:", error);
      toaster.create({
        description: "Oops! Server error occurred, please try again later.",
        type: "error",
      });
    },
  });
};
