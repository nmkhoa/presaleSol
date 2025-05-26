/* eslint-disable @typescript-eslint/no-explicit-any */
import { persist, type PersistStorage } from "zustand/middleware";
import { create } from "zustand";
import Cookies from "js-cookie";
import { STORAGE_KEY } from "@/constants/storage";
import type { User } from "@/types/user/user.interface";

const cookieStorage: PersistStorage<any> = {
  getItem: (name) => {
    const cookie = Cookies.get(name);
    return cookie ? JSON.parse(cookie) : null;
  },
  setItem: (name, value) => {
    Cookies.set(name, JSON.stringify(value), {
      secure: false,
      sameSite: "Lax",
    });
  },
  removeItem: (name) => {
    Cookies.remove(name);
  },
};

type AuthState = {
  accessToken: string | "";
  user: User | null;
};

type AuthAction = {
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
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
      resetAuthStore: () => {
        set(initialAuth);
        Cookies.remove(STORAGE_KEY.auth);
      },
    }),
    {
      name: STORAGE_KEY.auth,
      storage: cookieStorage,
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    }
  )
);
