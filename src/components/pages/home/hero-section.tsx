/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Image } from "@chakra-ui/react";
import Header from "../global/header";
import TokenSold from "../../home/token-sold";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import PublicSale from "../../home/public-sale";
import Whitelist from "../../home/whitelist";
import InviteAndEarn from "../../home/invite-earn";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useUnichProgram } from "@/hooks/use-program";
import {
  baseNumbSolValue,
  baseNumbTokenValue,
  baseNumbUsdValue,
  SALE_ACCOUNT_SEED,
  USER_ACCOUNT_SEED,
} from "@/constants/contract";
import type { SaleAccountInfoType, UserAccountInfoType } from "@/types/home";
import { navKey, paymentMethods } from "@/constants/home";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";

const HeroSection = () => {
  const [tab, setTab] = useState(0);
  const { wallet, publicKey } = useWallet();
  const [userAccountInfo, setUserAccountInfo] =
    useState<UserAccountInfoType | null>(null);
  const [saleAccountInfo, setSaleAccountInfo] =
    useState<SaleAccountInfoType | null>(null);
  const program = useUnichProgram();
  const [tokenBalanceSol, setTokenBalanceSol] = useState(0);
  const [tokenBalanceUsdc, setTokenBalanceUsdc] = useState(0);
  const [tokenBalanceUsdt, setTokenBalanceUsdt] = useState(0);
  const { connection } = useConnection();

  const getBalance = useCallback(
    async (
      token: string,
      baseNumb: number,
      callBack: React.Dispatch<React.SetStateAction<number>>
    ) => {
      if (!publicKey || !token) return;
      const ata = await getAssociatedTokenAddress(
        new PublicKey(token),
        publicKey
      );
      const accountInfo = await getAccount(connection, ata);
      const humanBalance = Number(accountInfo.amount) / baseNumb;
      callBack(humanBalance);
    },
    [connection, publicKey]
  );

  useEffect(() => {
    getBalance(paymentMethods[0].token, baseNumbSolValue, setTokenBalanceSol);
    getBalance(paymentMethods[1].token, baseNumbUsdValue, setTokenBalanceUsdc);
    getBalance(paymentMethods[2].token, baseNumbUsdValue, setTokenBalanceUsdt);
  }, [publicKey, connection, getBalance]);

  const fetchUserAccount = useCallback(async () => {
    if (!wallet || !wallet.adapter.publicKey || !publicKey) return;
    try {
      const [account] = PublicKey.findProgramAddressSync(
        [Buffer.from(USER_ACCOUNT_SEED), publicKey.toBuffer()],
        program.programId
      );
      const accountData = await program.account.userAccount.fetch(account);
      setUserAccountInfo({
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
      });
    } catch (err) {
      console.error("Error fetch userAccount:", err);
    }
  }, [program, publicKey, wallet]);

  const fetchSaleAccount = useCallback(async () => {
    if (!wallet || !wallet.adapter.publicKey || !publicKey) return;
    try {
      const [saleAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from(SALE_ACCOUNT_SEED)],
        program.programId
      );
      const saleAccountData = await program.account.saleAccount.fetch(
        saleAccount
      );
      setSaleAccountInfo({
        currentRound: saleAccountData.currentRound,
        denominator: saleAccountData.denominator.toString(),
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
      });
    } catch (err) {
      console.error("Error fetch userAccount:", err);
    }
  }, [program, publicKey, wallet]);
  console.log("saleAccountInfo", saleAccountInfo, userAccountInfo);

  useEffect(() => {
    fetchSaleAccount();
    fetchUserAccount();
  }, [wallet, publicKey, program, fetchSaleAccount, fetchUserAccount]);

  return (
    <div id={navKey.buy} className="relative">
      <div className="absolute hero-section !h-[1450px] w-full" />
      <section className="relative">
        <Header />
        <div className="text-primary w-fit !mx-auto !mt-[74px] !text-[84px] !font-medium !leading-[84px]">
          FREEDOM
        </div>
        <div className="text-secondary w-fit !mx-auto !text-[84px] !font-extrabold !leading-[84px]">
          STARTS WITH $UN
        </div>
        <div className="max-w-[800px] !mt-10 !mx-auto text-center !text-lg text-[#B4C1D1] !font-medium">
          Be early, be empowered. Secure Unich's token before launch to unlock
          your investment journey, access low-cost OTC trading, and shape the
          future of Pre-TGE Finance.
        </div>
        <Flex
          w={"fit-content"}
          mt={"40px"}
          mx={"auto"}
          p={"16px"}
          gap={"12px"}
          borderRadius={"28px"}
          background={
            "linear-gradient(180deg, rgba(255, 252, 252, 0.04) 0%, rgba(255, 255, 255, 0) 100%),radial-gradient(267.84% 97.01% at 58.6% 100%, rgba(65, 116, 186, 0.091) 12.68%, rgba(17, 104, 221, 0.154) 45.68%, rgba(0, 39, 93, 0.021) 82.57%, rgba(0, 8, 18, 0.035) 100%)"
          }
          backdropFilter={"blur(16.1px)"}
          border={"1px solid rgba(255, 255, 255, 0.15)"}
        >
          <Box
            w={"322px"}
            p={"20px"}
            borderRadius={"20px"}
            background={
              "linear-gradient(152.22deg, #14161B 38.95%, #15161C 96.26%)"
            }
          >
            <TokenSold saleAccountInfo={saleAccountInfo} />
          </Box>
          <Box
            w={"419px"}
            p={"20px"}
            borderRadius={"20px"}
            background={
              "linear-gradient(152.22deg, #14161B 38.95%, #15161C 96.26%)"
            }
          >
            <Box
              className="grid grid-cols-2 gap-1 !p-[2px]"
              background={"rgba(0, 0, 0, 0.7)"}
              borderRadius={"24px"}
            >
              <button
                className={clsx(
                  "w-full !py-2 h-[36px] !rounded-[120px] !font-semibold",
                  !tab ? "!text-[#FF9A0D] !bg-[#1A1001]" : "!text-[#9EA5BA]"
                )}
                onClick={() => setTab(0)}
              >
                Public sale
              </button>
              <button
                className={clsx(
                  "w-full !py-2 h-[36px] !rounded-[120px] !font-semibold",
                  tab ? "!text-[#FF9A0D] !bg-[#1A1001]" : "!text-[#9EA5BA]"
                )}
                onClick={() => setTab(1)}
              >
                Whitelist
              </button>
            </Box>
            <div>
              {!tab && (
                <PublicSale
                  saleAccountInfo={saleAccountInfo}
                  tokenBalanceSol={tokenBalanceSol}
                  tokenBalanceUsdc={tokenBalanceUsdc}
                  tokenBalanceUsdt={tokenBalanceUsdt}
                />
              )}
              {!!tab && <Whitelist />}
            </div>
          </Box>
        </Flex>
        <Box
          mt={"47px"}
          textAlign={"center"}
          fontSize={"14px"}
          fontWeight={500}
        >
          Audited by
        </Box>
        <Image
          src="/images/logo_softstack.svg"
          w={"170px"}
          height={"28px"}
          mx={"auto"}
          mt={"7px"}
          align="logo"
        />
        <InviteAndEarn />
      </section>
    </div>
  );
};

export default HeroSection;
