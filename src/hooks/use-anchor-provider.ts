/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

export function useAnchorProvider() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  return useMemo(() => {
    if (!wallet) return undefined;
    const anchorProvider = new AnchorProvider(
      connection as any,
      wallet as any,
      {
        commitment: "confirmed",
      }
    );
    return anchorProvider;
  }, [connection, wallet]);
}
