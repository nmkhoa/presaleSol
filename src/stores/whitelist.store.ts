import { persist } from "zustand/middleware";
import { create } from "zustand";
import { STORAGE_KEY } from "@/constants/storage";
import type { NftInfoType } from "@/types/user/user.interface";

type WhitelistState = {
  nft: NftInfoType | null;
};

type WhitelistAction = {
  setNft: (nft: NftInfoType | null) => void;
};

const initialWhitelist: WhitelistState = {
  nft: null,
};

export const useNftStore = create<WhitelistState & WhitelistAction>()(
  persist(
    (set) => ({
      ...initialWhitelist,
      setNft: (nft) => set({ nft }),
    }),
    {
      name: STORAGE_KEY.whitelist,
    }
  )
);
