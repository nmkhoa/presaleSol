import type { User } from "../user/user.interface";

export interface LoginRequest {
  walletAddress: string;
  signature: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface NonceRequest {
  walletAddress: string;
}

export interface NonceResponse {
  nonce: string;
}
