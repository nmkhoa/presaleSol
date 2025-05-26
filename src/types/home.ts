export type UserAccountInfoType = {
  publicTokensPurchased: number;
  referrer: string;
  solSpent: number;
  tokensPurchased: number;
  usdSpent: number;
  usdcSpent: number;
  usdtSpent: number;
  whitelistTokensPurchased: number;
};

export type SaleAccountInfoType = {
  currentRound: number;
  denominator: string;
  endTime: number;
  firstRoundPrice: number;
  isActive: boolean;
  maxUsdAmount: number;
  minUsdAmount: number;
  secondRoundPrice: number;
  startTime: number;
  tokensForSale: number;
  tokensSold: number;
  whitelistDiscount: number;
};

export type TokenPriceType = {
  sol: number;
  usdc: number;
  usdt: number;
};
