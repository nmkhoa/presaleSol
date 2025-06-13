/* eslint-disable @typescript-eslint/no-explicit-any */
import { Program } from "@coral-xyz/anchor";
import { useMemo } from "react";
import unichIdl from "../contracts/unich-presale-contract.json";
import type { UnichPresaleContract } from "../contracts/unich-presale-contract";
import { useAnchorProvider } from "./use-anchor-provider";

export const useUnichProgram = (): Program<UnichPresaleContract> | null => {
  const provider = useAnchorProvider();
  const programId = import.meta.env.VITE_PROGRAM_ID;

  const program = useMemo(() => {
    if (!provider) return null;
    if (!programId) return null;
    return new Program<UnichPresaleContract>(
      {
        ...unichIdl,
        metadata: { address: programId },
        address: programId,
      } as any,
      provider
    );
  }, [provider, programId]);

  return program;
};
