export interface User {
  id: string;
  walletAddress: string;
  affiliateCode: string;
  referrerCode: string | null;
  referrer: User | null;
}

export interface NftInfoAmountType {
  amount: string;
  decimals: number;
  uiAmount: number;
  uiAmountString: string;
}

export interface NftInfoType {
  isNative: boolean;
  mint: string;
  owner: string;
  state: string;
  tokenAmount: NftInfoAmountType;
}
