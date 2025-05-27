/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getSolSaleAccount, getSolUserAccount } from "../services/sol.service";
import type { SaleAccountInfoType, UserAccountInfoType } from "@/types/home";
import type { PublicKey } from "@solana/web3.js";

export const useSolUser = () => {
  return useMutation<
    void,
    AxiosError,
    {
      program: any;
      publicKey: PublicKey;
      callBack: (solSaleAccountInfo: UserAccountInfoType) => void;
    }
  >({
    mutationKey: ["useSolUser"],
    mutationFn: getSolUserAccount,
  });
};

export const useSolSale = () => {
  return useMutation<
    void,
    AxiosError,
    { program: any; callBack: (info: SaleAccountInfoType) => void }
  >({
    mutationKey: ["useSolSale"],
    mutationFn: getSolSaleAccount,
  });
};
