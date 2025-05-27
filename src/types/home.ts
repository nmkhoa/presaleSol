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
};

export type TokenPriceType = {
  sol: number;
  usdc: number;
  usdt: number;
};
