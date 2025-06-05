/* eslint-disable @typescript-eslint/no-explicit-any */
import { Program } from "@coral-xyz/anchor";
import { useMemo } from "react";
import unichIdl from "../contracts/unich-presale-contract.json";
import type { UnichPresaleContract } from "../contracts/unich-presale-contract";
import { useAnchorProvider } from "./use-anchor-provider";

export const useUnichProgram = (): Program<UnichPresaleContract> | null => {
  const provider = useAnchorProvider();

  const program = useMemo(() => {
    if (!provider) return null;
    return new Program<UnichPresaleContract>(unichIdl as any, provider);
  }, [provider]);

  return program;
};
