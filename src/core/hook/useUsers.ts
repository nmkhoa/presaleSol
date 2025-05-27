import {
  getLeaderboard,
  getMe,
  getReferralInfo,
  getTransaction,
} from "../services/user.service";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import type { User } from "@/types/user/user.interface";
import type { AxiosError } from "axios";
import type { LeaderboardRequest } from "@/types/leaderboard/leaderboard.interface";
import type { TransactionRequest } from "@/types/home";
import type { ReferralRequest } from "@/types/Referral/referral.interface";

export const useGetMe = () => {
  return useMutation<User, AxiosError>({
    mutationKey: ["useGetMe"],
    mutationFn: getMe,
  });
};

export const useLeaderboard = (leaderboardRequest: LeaderboardRequest) => {
  const query = useInfiniteQuery({
    queryKey: ["leaderboard", leaderboardRequest],

    queryFn: async ({ pageParam }) =>
      await getLeaderboard({
        page: pageParam.page,
        limit: leaderboardRequest.limit,
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

export const useGetTransaction = (transactionRequest: TransactionRequest) => {
  const query = useInfiniteQuery({
    queryKey: ["getTransaction", transactionRequest],

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

export const useReferralInfo = (referralRequest: ReferralRequest) => {
  const query = useInfiniteQuery({
    queryKey: ["getReferralInfo", referralRequest],

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
