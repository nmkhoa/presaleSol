const basePaths = {
  AUTH: "/auth",
  Users: "/users",
  TOKEN: "/token-purchased",
  referral: "/referral",
};
export const endpoints = {
  AUTH: {
    LOGIN: `${basePaths.AUTH}/login`,
    NONCE: `${basePaths.AUTH}/nonce`,
  },
  Users: {
    GET_ME: `${basePaths.Users}/me`,
  },
  TOKEN: {
    TRANSACTIONL: `${basePaths.TOKEN}/transactions`,
  },
  REFERRAL: {
    REWARD_SUMMARY: `${basePaths.referral}/referrer-reward-summary`,
    CURRENT_RANK: `${basePaths.referral}/referrer-reward-rank`,
    LEADERBOARD: `${basePaths.referral}/referrer-reward-leaderboard`,
  },
};
