import type { Pagination } from "./leaderboard/leaderboard.interface";

export type UserAccountInfoType = {
  publicTokensPurchased: number;
  referrer: string;
  solRefClaimed: number;
  solRefEarned: number;
  solSpent: number;
  tokenRefEarned: number;
  tokensPurchased: number;
  usdSpent: number;
  usdcRefClaimed: number;
  usdcRefEarned: number;
  usdcSpent: number;
  usdtRefClaimed: number;
  usdtRefEarned: number;
  usdtSpent: number;
  whitelistTokensPurchased: number;
};

export type SaleAccountInfoType = {
  currentRound: number;
  denominator: number;
  endTime: number;
  firstRoundPrice: number;
  isActive: boolean;
  isCompleted: boolean;
  maxUsdAmount: number;
  minUsdAmount: number;
  refCurrencyRate: number;
  refTokenRate: number;
  secondRoundPrice: number;
  startTime: number;
  tokensForSale: number;
  tokensSold: number;
  usdRaised: number;
  usdcRaised: number;
  usdtRaised: number;
  whitelistDiscount: number;
  currentPrice: number;
};

export type TokenPriceType = {
  sol: number;
  usdc: number;
  usdt: number;
};

export interface Transaction {
  signature: string;
  tokenAmount: number;
  currency: string;
  currencyAmount: string;
  currencyPrice: number;
  blockTime: string;
}

export interface TransactionRequest {
  page: number;
  limit?: number;
}
export type TransactionResponse = {
  data: Transaction[];
  pagination: Pagination;
};

export type NFTResponse = {
  blockTime: string;
  id: string;
  isBurned: boolean;
  nftAddress: string;
};
