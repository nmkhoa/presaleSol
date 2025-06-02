/* eslint-disable react-hooks/exhaustive-deps */
import { useGetNonce, useLogin } from "@/core/hook/useAuth";
import { useAuthStore } from "@/stores/auth.store";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import bs58 from "bs58";
import { toaster } from "../ui/toaster";
import { logout } from "@/core/services";
import { SignMessageModal } from "../modals/sign-message-modal ";
import { useGetMe } from "@/core/hook/useUsers";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isConnectingWallet, setIsConnectingWallet] = useState<boolean>(false);
  const [isSigned, setIsSigned] = useState<boolean>(false);

  const { connected, connecting, publicKey, signMessage, disconnect } =
    useWallet();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const { mutateAsync: getNonce } = useGetNonce();
  const { mutateAsync: login } = useLogin();
  const { mutateAsync: getMe } = useGetMe();

  const { accessToken, user, setUser, referrerCode } = useAuthStore();

  useEffect(() => {
    if (
      publicKey?.toBase58() &&
      user?.walletAddress &&
      publicKey?.toBase58() !== user?.walletAddress
    ) {
      handleLogin();
    }
  }, [publicKey, user]);

  useEffect(() => {
    if (connecting) {
      setIsConnectingWallet(true);
    }
  }, [connecting]);

  useEffect(() => {
    if (!isConnectingWallet) {
      return;
    }
    if (!connected || !walletAddress) {
      setIsSigned(false);
      if (accessToken) {
        logout();
        return;
      }
      return;
    }

    if (connected && accessToken) {
      if (user) return;
      getMe()
        .then((user) => {
          setUser(user);
        })
        .catch(async () => {
          disconnect();
          logout();
          toaster.create({
            description: "Please reconnect!",
            type: "warning",
            meta: {
              closable: true,
              showProgress: true,
            },
          });
        });
    }
    if (connected && !accessToken) {
      handleLogin();
    }
  }, [connected, accessToken]);

  const handleLogin = async () => {
    if (!signMessage || !publicKey || !connected || !walletAddress) {
      toaster.create({
        description: "Wallet is not connected or does not support signMessage",
        type: "error",
        meta: {
          closable: true,
          showProgress: true,
        },
      });
      return;
    }

    try {
      setIsSigned(true);
      const { nonce } = await getNonce({ walletAddress });
      const message = new TextEncoder().encode(`Nonce: ${nonce}`);

      const signature = await signMessage(message);
      await login({
        walletAddress,
        signature: bs58.encode(signature),
        affiliateCode: referrerCode || undefined,
      });
    } catch (err) {
      console.error("Error signing message:", err);
      disconnect();
      logout();
    } finally {
      setIsSigned(false);
    }
  };
  return (
    <>
      <SignMessageModal showModal={isSigned} />
      {children}
    </>
  );
}
