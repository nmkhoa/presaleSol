/* eslint-disable @typescript-eslint/no-explicit-any */
import { persist, type PersistStorage } from "zustand/middleware";
import { create } from "zustand";
import Cookies from "js-cookie";
import { storageKey } from "@/constants/storage";
import type { User } from "@/types/user/user.interface";
import { nodeEnv } from "@/constants/environment";

const cookieStorage: PersistStorage<any> = {
  getItem: (name) => {
    const cookie = Cookies.get(name);
    return cookie ? JSON.parse(cookie) : null;
  },
  setItem: (name, value) => {
    Cookies.set(name, JSON.stringify(value), {
      secure: nodeEnv === "production",
      sameSite: "Strict",
      expires: 7,
      path: "/",
    });
  },
  removeItem: (name) => {
    Cookies.remove(name);
  },
};

type AuthState = {
  accessToken: string | "";
  user: User | null;
  referrerCode?: string | null;
};

type AuthAction = {
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;

  setReferrerCode: (referrerCode: string | null) => void;
  resetAuthStore: () => void;
};

const initialAuth: AuthState = {
  accessToken: "",
  user: null,
};

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      ...initialAuth,
      setAccessToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      setReferrerCode: (referrerCode) => set({ referrerCode }),
      resetAuthStore: () => {
        set(initialAuth);
        Cookies.remove(storageKey.auth);
      },
    }),
    {
      name: storageKey.auth,
      storage: cookieStorage,
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    }
  )
);
