import {
  getLeaderboard,
  getMe,
  getReferralInfo,
  getTransaction,
} from "../services/user.service";

import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type { User } from "@/types/user/user.interface";
import type { AxiosError } from "axios";
import type { TransactionRequest } from "@/types/home";
import type {
  CurrentRankResponse,
  ReferralRequest,
} from "@/types/Referral/referral.interface";
import type { LeaderboardDataItem } from "@/types/leaderboard/leaderboard.interface";
import { getCurrentRank } from "../services";

export const useGetMe = () => {
  return useMutation<User, AxiosError>({
    mutationKey: ["useGetMe"],
    mutationFn: getMe,
  });
};

export const useCurrentRank = (token: string) => {
  return useQuery<CurrentRankResponse, AxiosError>({
    queryKey: ["useCurrentRank"],
    queryFn: getCurrentRank,
    enabled: !!token,
    retry: 3,
    refetchInterval: 60 * 60 * 1000, // 1 hour
  });
};

export const useLeaderboard = (token: string) => {
  return useQuery<LeaderboardDataItem[], AxiosError>({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
    enabled: !!token,
    retry: 3,
    refetchInterval: 60 * 60 * 1000, // 1 hour
  });
};

export const useGetTransaction = (
  transactionRequest: TransactionRequest,
  token: string
) => {
  const query = useInfiniteQuery({
    queryKey: ["getTransaction", transactionRequest],
    enabled: !!token,
    retry: 3,
    refetchInterval: 5000, // 5 seconds

    queryFn: async ({ pageParam }) =>
      await getTransaction({
        page: pageParam.page,
        limit: transactionRequest.limit,
      }),
    initialPageParam: { page: 1 },

    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const { page, totalPages } = lastPage.pagination;
      if (page >= totalPages) return undefined;
      return { page: page + 1 };
    },
  });

  const allData = query.data?.pages.flatMap((page) => page.data) || [];
  const pagination = query.data?.pages[query.data.pages.length - 1]
    ?.pagination || {
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 1,
  };

  return {
    ...query,
    data: allData,
    pagination,
  };
};

export const useReferralInfo = (
  referralRequest: ReferralRequest,
  token: string
) => {
  const query = useInfiniteQuery({
    queryKey: ["getReferralInfo", referralRequest],
    enabled: !!token,
    retry: 3,
    refetchInterval: 5000, // 5 seconds

    queryFn: async ({ pageParam }) =>
      await getReferralInfo({
        page: pageParam.page,
        limit: referralRequest.limit,
      }),
    initialPageParam: { page: 1 },

    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const { page, totalPages } = lastPage.pagination;
      if (page >= totalPages) return undefined;
      return { page: page + 1 };
    },
  });

  const allData = query.data?.pages.flatMap((page) => page.data) || [];
  const pagination = query.data?.pages[query.data.pages.length - 1]
    ?.pagination || {
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 1,
  };

  return {
    ...query,
    data: allData,
    pagination,
  };
};
