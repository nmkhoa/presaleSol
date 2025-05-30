const BASE_PATHS = {
  AUTH: "/auth",
  Users: "/users",
  TOKEN: "/token-purchased",
  referral: "/referral",
};
export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_PATHS.AUTH}/login`,
    NONCE: `${BASE_PATHS.AUTH}/nonce`,
  },
  Users: {
    GET_ME: `${BASE_PATHS.Users}/me`,
  },
  TOKEN: {
    TRANSACTIONL: `${BASE_PATHS.TOKEN}/transactions`,
  },
  REFERRAL: {
    REWARD_SUMMARY: `${BASE_PATHS.referral}/referrer-reward-summary`,
    CURRENT_RANK: `${BASE_PATHS.referral}/referrer-reward-rank`,
    LEADERBOARD: `${BASE_PATHS.referral}/referrer-reward-leaderboard`,
  },
};
