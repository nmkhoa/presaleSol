/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import Header from "../global/header";
import TokenSold from "../../home/token-sold";
import { useCallback, useEffect, useState } from "react";
import PublicSale from "../../home/public-sale";
import Whitelist from "../../home/whitelist";
import InviteAndEarn from "../../home/invite-earn";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useUnichProgram } from "@/hooks/use-program";
import {
  baseNumbSolValue,
  baseNumbUsdValue,
  basePriceValue,
} from "@/constants/contract";
import { navKey, paymentMethods } from "@/constants/home";
import {
  getAccount,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useTokenStore } from "@/stores/token.store";
import { request } from "@/config/request";
import { feedIdSolana } from "@/constants/environment";
import { useNftStore } from "@/stores/whitelist.store";
import { useSolSale, useSolUser } from "@/core/hook/use-sol-user";
import { PublicKey } from "@solana/web3.js";
import { getUnichNFT } from "@/core/services/sol.service";
import { useAuthStore } from "@/stores/auth.store";
import type { CollectionNftType } from "@/types/user/user.interface";

const HeroSection = () => {
  const [tab, setTab] = useState(0);
  const { user } = useAuthStore();
  const { wallet, publicKey, connected } = useWallet();
  const { setSolUserAccountInfo, setSolSaleAccountInfo } = useTokenStore();
  const program = useUnichProgram();
  const { connection } = useConnection();
  const {
    setTokensPrice,
    setTokenBalanceSol,
    setTokenBalanceUsdc,
    setTokenBalanceUsdt,
  } = useTokenStore();
  const { collectionNft, setCollectionNft } = useNftStore();
  const { mutateAsync: getSolSaleAccount } = useSolSale();
  const { mutateAsync: getSolUserAccount } = useSolUser();

  useEffect(() => {
    if (!connected && !!tab) {
      setTab(0);
    }
  }, [connected]);

  const getPriceData = useCallback(async () => {
    const results = await Promise.all([
      request.get(
        `https://hermes.pyth.network/api/latest_price_feeds?ids[]=${feedIdSolana}`
      ),
    ]);
    const priceSol = (results as any)?.[0]?.data?.[0]?.price?.price || 0;
    setTokensPrice({
      sol: (priceSol || 0) / basePriceValue,
      usdc: 1,
      usdt: 1,
    });
  }, []);

  const getAllNft = async () => {
    if (!publicKey) return;
    try {
      const response = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );
      if (response?.value?.length) {
        const result = response.value
          .map((accountInfo) => {
            return {
              publicKey: accountInfo?.pubkey?.toBase58() || "",
              mint: accountInfo?.account?.data?.parsed?.info?.mint || "",
              owner: accountInfo?.account?.data?.parsed?.info?.owner || "",
              decimals: +(
                accountInfo?.account?.data?.parsed?.info?.tokenAmount
                  ?.decimals || 0
              ),
              amount: +(
                accountInfo?.account?.data?.parsed?.info?.tokenAmount?.amount ||
                0
              ),
            };
          })
          ?.filter(
            (accountInfo) => !accountInfo?.decimals && accountInfo?.amount
          );
        let param = "";
        result?.forEach((data, index) => {
          if (!index) {
            param += data.mint;
          } else {
            param += `;${data.mint}`;
          }
        });
        const res = await getUnichNFT(param);
        let lastNftOwned: CollectionNftType[] = [];
        if (res?.length) {
          lastNftOwned = result?.filter((nft) =>
            res?.some((value) => value?.nftAddress === nft?.mint)
          );
        }
        setCollectionNft(lastNftOwned);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setCollectionNft([]);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getAllNft();
    } else if (collectionNft) {
      setCollectionNft([]);
    }
  }, [publicKey, connection, user]);

  useEffect(() => {
    getPriceData();
  }, [connected]);

  const getBalance = useCallback(
    async (
      token: string,
      baseNumb: number,
      callBack: (value: number) => void
    ) => {
      if (!publicKey || !token) return;
      try {
        const ata = await getAssociatedTokenAddress(
          new PublicKey(token),
          publicKey
        );
        const accountInfo = await getAccount(connection, ata);
        const humanBalance = Number(accountInfo.amount) / baseNumb;
        callBack(humanBalance);
      } catch (error) {
        callBack(0);
        console.error("Error fetching token balance:", error);
      }
    },
    [connection, publicKey]
  );

  const fetchBalance = async () => {
    if (!publicKey) return;
    try {
      const lamports = await connection.getBalance(publicKey);
      setTokenBalanceSol(lamports / baseNumbSolValue);
    } catch (error) {
      setTokenBalanceSol(0);
      console.error("Error fetching token balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
    getBalance(paymentMethods[1].token, baseNumbUsdValue, setTokenBalanceUsdc);
    getBalance(paymentMethods[2].token, baseNumbUsdValue, setTokenBalanceUsdt);
  }, [publicKey, connection, getBalance]);

  const fetchUserAccount = useCallback(async () => {
    if (!wallet || !wallet.adapter.publicKey || !publicKey) return;
    try {
      await getSolUserAccount({
        program,
        publicKey,
        callBack: setSolUserAccountInfo,
      });
    } catch (err) {
      console.error("Error fetch userAccount:", err);
    }
  }, [program, publicKey, wallet]);

  const fetchSaleAccount = useCallback(async () => {
    try {
      await getSolSaleAccount({
        program: program,
        callBack: setSolSaleAccountInfo,
      });
    } catch (err) {
      console.error("Error fetch userAccount:", err);
    }
  }, [program]);

  useEffect(() => {
    fetchSaleAccount();
  }, [wallet]);

  useEffect(() => {
    fetchUserAccount();
  }, [wallet, publicKey]);

  return (
    <Box
      position={"relative"}
      id={navKey.buy}
      xl={{
        px: 0,
      }}
    >
      <Box
        position={"absolute"}
        w={"100%"}
        h={"1280px"}
        className="hero-section"
        xl={{
          h: "1450px",
        }}
      />
      <Box position={"relative"} px={"12px"} pt={{ base: "62px", xl: "100px" }}>
        <Header />
        <Text
          w={"fit-content"}
          mx={"auto"}
          mt={"17px"}
          fontSize={"28px"}
          fontWeight={700}
          lineHeight={"28px"}
          className="text-primary"
          md={{
            mt: "68px",
            fontSize: "64px",
            lineHeight: "64px",
            fontWeight: 500,
          }}
          xl={{
            mt: "74px",
            fontSize: "84px",
            lineHeight: "84px",
          }}
        >
          FREEDOM
        </Text>
        <Text
          w={"fit-content"}
          mx={"auto"}
          fontSize={"28px"}
          fontWeight={900}
          lineHeight={"28px"}
          className="text-secondary"
          md={{
            fontSize: "64px",
            lineHeight: "64px",
          }}
          xl={{
            fontSize: "84px",
            lineHeight: "84px",
          }}
        >
          STARTS WITH $UN
        </Text>
        <Text
          mt={"16px"}
          mx={"auto"}
          textAlign={"center"}
          fontSize={"14px"}
          color={"var(--hero-des-text-color)"}
          fontWeight={500}
          md={{
            maxW: "582px",
            mt: "28px",
            fontSize: "16px",
          }}
          xl={{
            maxW: "800px",
            mt: "40px",
            fontSize: "18px",
          }}
        >
          Be early, be empowered. Secure Unich's token before launch to unlock
          your investment journey, access low-cost OTC trading, and shape the
          future of Pre-TGE Finance.
        </Text>
        <Flex
          w={"fit-content"}
          mt={"40px"}
          mx={"auto"}
          p={"12px"}
          gap={"8px"}
          borderRadius={"28px"}
          background={
            "linear-gradient(180deg, var(--hero-linear-bg-light) 0%, var(--hero-linear-bg-normal) 100%),radial-gradient(267.84% 97.01% at 58.6% 100%, var(--hero-radial-bg-light) 12.68%, var(--hero-radial-bg-normal) 45.68%, var(--hero-radial-bg-semi) 82.57%, var(--hero-radial-bg-extra) 100%)"
          }
          backdropFilter={"blur(16.1px)"}
          border={"1px solid var(--hero-border-color)"}
          flexDirection={"column-reverse"}
          md={{
            mt: "28px",
            p: "16px",
            gap: "12px",
            flexDirection: "row",
          }}
          xl={{
            mt: "40px",
          }}
        >
          <Box
            w={"100%"}
            p={"16px"}
            borderRadius={"20px"}
            background={
              "linear-gradient(152.22deg, var(--bg-sold-light) 38.95%, var(--bg-sold-normal) 96.26%)"
            }
            md={{
              w: "276px",
            }}
            xl={{
              w: "322px",
              p: "20px",
            }}
          >
            <TokenSold />
          </Box>
          <Box
            w={"100%"}
            minH={"380px"}
            p={"16px"}
            borderRadius={"20px"}
            background={
              "linear-gradient(152.22deg, var(--bg-sold-light) 38.95%, var(--bg-sold-normal) 96.26%)"
            }
            md={{
              w: "360px",
              minH: "380px",
            }}
            xl={{
              w: "419px",
              minH: "450px",
              p: "20px",
            }}
          >
            <Grid
              className="grid-cols-2"
              gap={"4px"}
              p={"2px"}
              background={"var(--bg-dark)"}
              borderRadius={"24px"}
            >
              <Button
                w={"100%"}
                h={"36px"}
                py={"6px"}
                borderRadius={"120px"}
                fontWeight={600}
                fontSize={"14px"}
                background={!tab ? "var(--btn-white-color)" : "transparent"}
                color={
                  !tab
                    ? "var(--text-primary-link-color)"
                    : "var(--tab-active-color)"
                }
                md={{
                  py: "8px",
                  fontSize: "16px",
                }}
                onClick={() => setTab(0)}
              >
                Public Sale
              </Button>
              <Button
                w={"100%"}
                h={"36px"}
                py={"6px"}
                borderRadius={"120px"}
                fontWeight={600}
                fontSize={"14px"}
                background={tab ? "var(--btn-white-color)" : "transparent"}
                color={
                  tab
                    ? "var(--text-primary-link-color)"
                    : "var(--tab-active-color)"
                }
                md={{
                  py: "8px",
                  fontSize: "16px",
                }}
                onClick={() => setTab(1)}
              >
                Whitelist
              </Button>
            </Grid>
            <Box>
              {!tab && (
                <PublicSale
                  fetchSaleAccount={fetchSaleAccount}
                  fetchUserAccount={fetchUserAccount}
                />
              )}
              {!!tab && (
                <Whitelist
                  getMyNft={getAllNft}
                  fetchSaleAccount={fetchSaleAccount}
                  fetchUserAccount={fetchUserAccount}
                />
              )}
            </Box>
          </Box>
        </Flex>
        <Flex justifyContent={"center"}>
          <Text
            mt={"16px"}
            mx={"auto"}
            textAlign={"center"}
            fontSize={"12px"}
            fontWeight={500}
            xl={{
              mt: "36px",
              fontSize: "14px",
            }}
            // target="_blank"
            color={"var(--normal-text-color)"}
          >
            Audited by
          </Text>
        </Flex>
        <Image
          cursor={"pointer"}
          id="total-balance"
          src="/images/logo_softstack.svg"
          w={"121px"}
          h={"20px"}
          mx={"auto"}
          mt={"4px"}
          xl={{
            w: "170px",
            h: "28px",
            mt: "7px",
          }}
          align="logo"
          onClick={() =>
            window.open(
              "https://github.com/softstack/Smart-Contract-Security-Audits/blob/master/Unich/Softstack_EVM_Smart_Contract_Solana_Program_Audit_Unich_OTC_11032025.pdf"
            )
          }
        />
        <InviteAndEarn />
      </Box>
    </Box>
  );
};

export default HeroSection;
