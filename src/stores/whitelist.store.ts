import { persist } from "zustand/middleware";
import { create } from "zustand";
import { storageKey } from "@/constants/storage";
import type {
  CollectionNftType,
  NftInfoType,
} from "@/types/user/user.interface";

type WhitelistState = {
  nft: NftInfoType | null;
  collectionNft: CollectionNftType[];
};

type WhitelistAction = {
  setNft: (nft: NftInfoType | null) => void;
  setCollectionNft: (collectionNft: CollectionNftType[]) => void;
};

const initialWhitelist: WhitelistState = {
  nft: null,
  collectionNft: [],
};

export const useNftStore = create<WhitelistState & WhitelistAction>()(
  persist(
    (set) => ({
      ...initialWhitelist,
      setNft: (nft) => set({ nft }),
      setCollectionNft: (collectionNft) => set({ collectionNft }),
    }),
    {
      name: storageKey.whitelist,
    }
  )
);
