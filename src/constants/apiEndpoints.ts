const BASE_PATHS = {
  AUTH: "/auth",
  Users: "/users",
};
export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_PATHS.AUTH}/login`,
    NONCE: `${BASE_PATHS.AUTH}/nonce`,
  },
  Users: {
    GET_ME: `${BASE_PATHS.Users}/me`,
  },
};
