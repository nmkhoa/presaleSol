import { useAuthStore } from "./auth.store";
import { useTokenStore } from "./token.store";

export const resetAllStores = () => {
  useAuthStore.getState().resetAuthStore();
  useTokenStore.getState().resetTokenStore();
};
