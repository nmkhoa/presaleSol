import type {
  SaleAccountInfoType,
  TokenPriceType,
  UserAccountInfoType,
} from "@/types/home";
import { persist } from "zustand/middleware";
import { create } from "zustand";
import { STORAGE_KEY } from "@/constants/storage";

type TokenState = {
  tokensPrice: TokenPriceType | null;
  solUserAccountInfo: UserAccountInfoType | null;
  solSaleAccountInfo: SaleAccountInfoType | null;
  tokenBalanceSol: number;
  tokenBalanceUsdc: number;
  tokenBalanceUsdt: number;
};

type TokenAction = {
  setTokensPrice: (tokensPrice: TokenPriceType) => void;
  setSolUserAccountInfo: (solUserAccountInfo: UserAccountInfoType) => void;
  setSolSaleAccountInfo: (solSaleAccountInfo: SaleAccountInfoType) => void;
  setTokenBalanceSol: (tokenBalanceSol: number) => void;
  setTokenBalanceUsdc: (tokenBalanceUsdc: number) => void;
  setTokenBalanceUsdt: (tokenBalanceUsdt: number) => void;
};

const initialToken: TokenState = {
  tokensPrice: null,
  solUserAccountInfo: null,
  solSaleAccountInfo: null,
  tokenBalanceSol: 0,
  tokenBalanceUsdc: 0,
  tokenBalanceUsdt: 0,
};

export const useTokenStore = create<TokenState & TokenAction>()(
  persist(
    (set) => ({
      ...initialToken,
      setTokensPrice: (tokensPrice) => set({ tokensPrice }),
      setSolUserAccountInfo: (solUserAccountInfo) =>
        set({ solUserAccountInfo }),
      setSolSaleAccountInfo: (solSaleAccountInfo) =>
        set({ solSaleAccountInfo }),
      setTokenBalanceSol: (tokenBalanceSol) => set({ tokenBalanceSol }),
      setTokenBalanceUsdc: (tokenBalanceUsdc) => set({ tokenBalanceUsdc }),
      setTokenBalanceUsdt: (tokenBalanceUsdt) => set({ tokenBalanceUsdt }),
    }),
    {
      name: STORAGE_KEY.tokenPrice,
    }
  )
);
