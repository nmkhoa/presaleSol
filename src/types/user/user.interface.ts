export interface User {
  id: string;
  walletAddress: string;
  affiliateCode: string;
  referrerCode: string | null;
  referrer: string | null;
}
