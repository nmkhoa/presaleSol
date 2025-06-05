/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  baseNumbSolValue,
  baseNumbTokenValue,
  baseNumbUsdValue,
  saleAccountSeed,
  userAccountSeed,
} from "@/constants/contract";
import type { SaleAccountInfoType, UserAccountInfoType } from "@/types/home";
import { PublicKey } from "@solana/web3.js";
import type { UnichPresaleContract } from "../../contracts/unich-presale-contract";
import type { Program } from "@coral-xyz/anchor";

export const getSolSaleAccount = async ({
  program,
  callBack,
}: {
  program: Program<UnichPresaleContract> | null;
  callBack: (solSaleAccountInfo: SaleAccountInfoType) => void;
}): Promise<void> => {
  if (!program) return;
  const [saleAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from(saleAccountSeed)],
    program.programId
  );
  const saleAccountData = await program.account.saleAccount.fetch(saleAccount);
  let currentPrice = 0;
  if (saleAccountData.currentRound === 1) {
    currentPrice =
      saleAccountData.firstRoundPrice.toString() / baseNumbTokenValue;
  } else if (saleAccountData.currentRound === 2) {
    currentPrice =
      saleAccountData.secondRoundPrice.toString() / baseNumbTokenValue;
  }
  callBack({
    currentRound: saleAccountData.currentRound,
    denominator: +saleAccountData.denominator.toString(),
    endTime: +saleAccountData.endTime.toString(),
    firstRoundPrice:
      saleAccountData.firstRoundPrice.toString() / baseNumbTokenValue,
    isActive: saleAccountData.isActive,
    maxUsdAmount: +saleAccountData.maxUsdAmount.toString(),
    minUsdAmount: +saleAccountData.minUsdAmount.toString(),
    secondRoundPrice:
      saleAccountData.secondRoundPrice.toString() / baseNumbTokenValue,
    startTime: +saleAccountData.startTime.toString(),
    tokensForSale:
      saleAccountData.tokensForSale.toString() / baseNumbTokenValue,
    tokensSold: saleAccountData.tokensSold.toString() / baseNumbTokenValue,
    whitelistDiscount:
      saleAccountData.whitelistDiscount.toString() / baseNumbTokenValue,
    isCompleted: saleAccountData.isCompleted,
    refCurrencyRate: +saleAccountData.refCurrencyRate.toString(),
    refTokenRate: +saleAccountData.refTokenRate.toString(),
    usdRaised: +saleAccountData.usdRaised.toString() / baseNumbUsdValue,
    usdcRaised: +saleAccountData.usdcRaised.toString() / baseNumbUsdValue,
    usdtRaised: +saleAccountData.usdtRaised.toString() / baseNumbUsdValue,
    currentPrice: currentPrice,
  });
};

export const getSolUserAccount = async ({
  program,
  publicKey,
  callBack,
}: {
  program: Program<UnichPresaleContract> | null;
  publicKey: PublicKey;
  callBack: (solSaleAccountInfo: UserAccountInfoType) => void;
}) => {
  if (!program) return;
  const [account] = PublicKey.findProgramAddressSync(
    [Buffer.from(userAccountSeed), publicKey.toBuffer()],
    program?.programId
  );
  const accountData = await program.account.userAccount.fetch(account);
  callBack({
    publicTokensPurchased:
      accountData.publicTokensPurchased.toString() / baseNumbTokenValue,
    referrer: accountData.referrer.toString(),
    solSpent: accountData.solSpent.toString() / baseNumbSolValue,
    tokensPurchased:
      accountData.tokensPurchased.toString() / baseNumbTokenValue,
    usdSpent: accountData.usdSpent.toString() / baseNumbUsdValue,
    usdcSpent: accountData.usdcSpent.toString() / baseNumbUsdValue,
    usdtSpent: accountData.usdtSpent.toString() / baseNumbUsdValue,
    whitelistTokensPurchased:
      accountData.whitelistTokensPurchased.toString() / baseNumbTokenValue,
    solRefClaimed: accountData.solRefClaimed.toString() / baseNumbSolValue,
    solRefEarned: accountData.solRefEarned.toString() / baseNumbSolValue,
    usdcRefClaimed: accountData.usdcRefClaimed.toString() / baseNumbUsdValue,
    usdcRefEarned: accountData.usdcRefEarned.toString() / baseNumbUsdValue,
    usdtRefClaimed: accountData.usdtRefClaimed.toString() / baseNumbUsdValue,
    usdtRefEarned: accountData.usdtRefEarned.toString() / baseNumbUsdValue,
    tokenRefEarned: accountData.tokenRefEarned.toString() / baseNumbTokenValue,
  });
};
