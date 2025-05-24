/* eslint-disable @typescript-eslint/no-explicit-any */
import { Program } from "@coral-xyz/anchor";
import { useMemo } from "react";
import unichIdl from "../contracts/unich_presale_contract.json";
import { useAnchorProvider } from "./use-anchor-provider";

export const useUnichProgram = (): any | null => {
  const provider = useAnchorProvider();

  const program = useMemo(() => {
    if (!provider) return null;
    return new Program<any>(unichIdl as any, provider);
  }, [provider]);

  return program;
};
