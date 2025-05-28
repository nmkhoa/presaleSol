/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnchorProvider } from "@coral-xyz/anchor";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

export const createATAInstruction = async (
  token: any,
  publicKey: PublicKey,
  connection: Connection,
  provider: AnchorProvider
) => {
  const transaction = new Transaction();
  const usdcMint = new PublicKey(token);
  const ata = getAssociatedTokenAddressSync(
    usdcMint,
    publicKey,
    false,
    TOKEN_PROGRAM_ID
  );
  const accountInfo = await connection.getAccountInfo(ata);
  if (!accountInfo) {
    const createAssociateInstruction =
      await createAssociatedTokenAccountInstruction(
        publicKey,
        ata,
        publicKey,
        usdcMint,
        TOKEN_PROGRAM_ID
      );
    transaction.add(createAssociateInstruction);
    await provider!.sendAndConfirm(transaction, []);
  }
};
