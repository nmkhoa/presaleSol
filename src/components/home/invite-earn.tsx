import { ROUTES } from "@/constants/router";
import { ConnectWalletContext } from "@/contexts/connect-wallet-context";
import { useAuthStore } from "@/stores/auth.store";
import { useTokenStore } from "@/stores/token.store";
import {
  formatAmount,
  getNumberFixed,
  formatTimeAgo,
  getTxHashLink,
} from "@/utils";
import {
  Box,
  Button,
  Clipboard,
  Flex,
  Grid,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { toaster } from "../ui/toaster";
import { useGetTransaction } from "@/core/hook/useUsers";
import { useInView } from "react-intersection-observer";

const InviteAndEarn = () => {
  const { connected, publicKey } = useWallet();
  const { solUserAccountInfo, solSaleAccountInfo, tokensPrice } =
    useTokenStore();
  const { user, accessToken } = useAuthStore();
  const { setShowModal } = useContext(ConnectWalletContext);

  const checkConnected = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!accessToken) {
      e.preventDefault();
      toaster.create({
        description: "Please connect your wallet first!",
        type: "warning",
      });
    }
  };

  const { ref, inView } = useInView();
  const {
    data: transaction,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetTransaction(
    {
      page: 1,
      limit: 10,
    },
    accessToken
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const rewardRate = useMemo(() => {
    if (!solSaleAccountInfo || !solSaleAccountInfo?.denominator) return 0;
    return (
      ((solSaleAccountInfo.refCurrencyRate + solSaleAccountInfo.refTokenRate) *
        100) /
      solSaleAccountInfo.denominator
    );
  }, [solSaleAccountInfo]);

  const myRewards = useMemo(() => {
    const availableSol =
      (solUserAccountInfo?.solRefEarned || 0) -
      (solUserAccountInfo?.solRefClaimed || 0);
    const availableUsdc =
      (solUserAccountInfo?.usdcRefEarned || 0) -
      (solUserAccountInfo?.usdcRefClaimed || 0);
    const availableUsdt =
      (solUserAccountInfo?.usdtRefEarned || 0) -
      (solUserAccountInfo?.usdtRefClaimed || 0);

    return [
      {
        value: availableSol,
        price: availableSol * (tokensPrice?.sol || 0),
      },
      {
        value: availableUsdc,
        price: availableUsdc * (tokensPrice?.usdc || 0),
      },
      {
        value: availableUsdt,
        price: availableUsdt * (tokensPrice?.usdt || 0),
      },
    ];
  }, [solUserAccountInfo, tokensPrice, publicKey]);

  const earnedValues = useMemo(() => {
    let totalUNEarned = 0;
    let totalUSDEarned = 0;
    myRewards?.forEach((reward) => {
      totalUNEarned += reward.value;
      totalUSDEarned += reward.price;
    });
    return { totalUNEarned, totalUSDEarned };
  }, [myRewards]);

  const totalBalance = useMemo(() => {
    return solUserAccountInfo
      ? formatAmount(
          getNumberFixed(
            solUserAccountInfo?.publicTokensPurchased +
              solUserAccountInfo?.whitelistTokensPurchased +
              earnedValues?.totalUNEarned || 0,
            2
          )
        )
      : "-.--";
  }, [earnedValues?.totalUNEarned, solUserAccountInfo]);

  return (
    <Box>
      <Flex
        w={"fit-content"}
        gap={"16px"}
        mx={"auto"}
        mt={"70px"}
        alignItems={"center"}
        flexDirection={"column"}
        md={{
          px: "44px",
          mt: "110px",
        }}
        xl={{
          gap: "20px",
          flexDirection: "row",
          mt: "160px",
          px: "0",
        }}
      >
        <Box
          w={"100%"}
          p={"8px"}
          background={"url(/images/invite_bg.svg)"}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          borderRadius={"12px"}
          display={"flex"}
          alignItems={"end"}
          md={{
            w: "680px",
            p: "20px",
          }}
          xl={{
            display: "block",
            w: "505px",
          }}
        >
          <Box w={"100%"}>
            <Flex gap={"4px"} alignItems={"center"} md={{ gap: "40px" }}>
              <Text
                fontSize={"16px"}
                fontWeight={700}
                color={"#FFFFFF"}
                md={{ fontSize: "20px" }}
                xl={{ fontSize: "28px" }}
              >
                Invite friends & earn up to
              </Text>
              <Text
                fontSize={"16px"}
                fontWeight={700}
                color={"#FFFFFF"}
                display={"block"}
                md={{ display: "none", fontSize: "64px" }}
                xl={{ display: "block" }}
              >
                {rewardRate}%
              </Text>
            </Flex>
            <Flex gap={"10px"} mt={"12px"} xl={{ mt: "38px" }}>
              <Input
                h={"40px"}
                background={"rgba(0, 0, 0, 0.95)"}
                color={"#FFEED6"}
                borderRadius={"8px"}
                disabled
                opacity={1}
                value={
                  user
                    ? `${window.location.origin}/?affiliateCode=${user.affiliateCode}`
                    : ""
                }
                xl={{
                  h: "58px",
                }}
                placeholder="Connect wallet to see your code"
              />
              {connected ? (
                <Clipboard.Root
                  value={
                    user
                      ? `${window.location.origin}/?affiliateCode=${user.affiliateCode}`
                      : ""
                  }
                  timeout={1000}
                >
                  <Clipboard.Trigger asChild>
                    <Button
                      w={"80px"}
                      h={"42px"}
                      p={"12px"}
                      background="#FFFFFF"
                      rounded={"8px"}
                      color={"#1A1001"}
                      fontWeight={700}
                      fontSize={"12px"}
                      xl={{
                        h: "58px",
                      }}
                      md={{ fontSize: "14px" }}
                      _hover={{ filter: "brightness(1.3)" }}
                    >
                      <Clipboard.CopyText />
                    </Button>
                  </Clipboard.Trigger>
                </Clipboard.Root>
              ) : (
                <Button
                  h={"42px"}
                  px={"8px"}
                  fontWeight={700}
                  borderRadius={"8px"}
                  xl={{
                    h: "58px",
                  }}
                  fontSize={"12px"}
                  md={{ px: "16px", fontSize: "16px" }}
                  onClick={() => setShowModal(true)}
                >
                  Connect wallet
                </Button>
              )}
            </Flex>
          </Box>
          <Text
            minW={"200px"}
            fontSize={"84px"}
            lineHeight={"84px"}
            fontWeight={700}
            color={"#FFFFFF"}
            display={"none"}
            textAlign={"right"}
            md={{
              display: "block",
            }}
            xl={{ display: "none" }}
          >
            {rewardRate}%
          </Text>
        </Box>
        <Box
          w={"100%"}
          minH={"100%"}
          p={"12px"}
          background={
            "linear-gradient(143.45deg, #17191F 10.97%, #1B1D24 56.87%)"
          }
          borderRadius={"12px"}
          md={{
            w: "680px",
            p: "20px",
          }}
          xl={{
            w: "715px",
          }}
        >
          <Flex
            gap={"12px"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Text
              fontSize={"16px"}
              fontWeight={700}
              md={{ fontSize: "20px" }}
              xl={{ fontSize: "24px" }}
            >
              Total Balance
            </Text>
            <Flex gap={"12px"} alignItems={"center"}>
              <Image
                src="/images/token.svg"
                w={"28px"}
                h={"28px"}
                md={{
                  w: "32px",
                  h: "32px",
                }}
                alt="token"
              />
              <Text
                fontSize={"20px"}
                lineHeight={"42px"}
                fontWeight={700}
                md={{ fontSize: "28px" }}
                xl={{ fontSize: "36px" }}
              >
                {totalBalance}
              </Text>
            </Flex>
          </Flex>
          <Box
            h={"1px"}
            mt={"16px"}
            background={"white"}
            opacity={"0.1"}
            xl={{ mt: "24px" }}
          />
          <Box
            mt={"16px"}
            className="grid gap-[12px]"
            gridTemplateColumns={"repeat(2, minmax(0, 1fr))"}
            md={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
            xl={{ mt: "67px" }}
          >
            <Box>
              <Text fontSize={"14px"} fontWeight={500} color={"#C7CCD9"}>
                $UN Earned
              </Text>
              <Flex gap={"6px"} mt={"4px"}>
                <Image
                  src="/images/token.svg"
                  w={"24px"}
                  h={"24px"}
                  alt="token"
                />
                <Text
                  fontSize={"20px"}
                  fontWeight={700}
                  lineHeight={"28px"}
                  xl={{ fontSize: "24px" }}
                >
                  {solUserAccountInfo?.tokenRefEarned
                    ? formatAmount(
                        getNumberFixed(solUserAccountInfo?.tokenRefEarned, 2)
                      )
                    : "-.--"}
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text fontSize={"14px"} fontWeight={500} color={"#C7CCD9"}>
                USD Earned
              </Text>
              <Text
                mt={"4px"}
                fontSize={"20px"}
                fontWeight={700}
                lineHeight={"28px"}
                xl={{ fontSize: "24px" }}
              >
                $
                {earnedValues?.totalUSDEarned
                  ? formatAmount(
                      getNumberFixed(earnedValues?.totalUSDEarned, 2)
                    )
                  : "-.--"}
              </Text>
            </Box>
            <Link
              to={ROUTES.REFERRAL}
              onClick={checkConnected}
              className="btn-gradient-secondary"
            >
              <Box p={"10px"}>Go to dashboard</Box>
            </Link>
          </Box>
        </Box>
      </Flex>
      {connected && (
        <Box borderRadius={"12px"} overflow={"hidden"}>
          <Box overflow={"auto"} borderRadius={"12px"}>
            <Box
              minW={"680px"}
              mx={"auto"}
              mt={"20px"}
              py={"20px"}
              background={
                "linear-gradient(143.45deg, #17191F 10.97%, #1B1D24 56.87%)"
              }
              borderRadius={"12px"}
              xl={{ maxW: "1240px" }}
            >
              <Text
                fontSize={"24px"}
                fontWeight={700}
                lineHeight={"28px"}
                px={"20px"}
              >
                Transaction History
              </Text>
              <Box h={"1px"} mt={"24px"} background={"white"} opacity={"0.1"} />
              <Box pl={"20px"} pr={"3px"}>
                <Grid
                  py={"24px"}
                  pr={"10px"}
                  gridTemplateColumns={"repeat(5, minmax(0, 1fr))"}
                  xl={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}
                >
                  <Text px={"16px"} fontWeight={500} color={"#6E758A"}>
                    Tx Hash
                  </Text>
                  <Text px={"16px"} fontWeight={500} color={"#6E758A"}>
                    Amount
                  </Text>
                  <Text px={"16px"} fontWeight={500} color={"#6E758A"}>
                    Total Spent
                  </Text>
                  <Text px={"16px"} fontWeight={500} color={"#6E758A"}>
                    Price
                  </Text>
                  <Text
                    px={"16px"}
                    fontWeight={500}
                    color={"#6E758A"}
                    textAlign={"right"}
                    xl={{ gridColumn: "span 2 / span 2" }}
                  >
                    Time
                  </Text>
                </Grid>
                <Grid
                  gap={"8px"}
                  maxH={"340px"}
                  overflowY="auto"
                  className="custom-scrollbar"
                >
                  {isLoading && (
                    <Box textAlign="center" py="20px" color="gray.500">
                      Loading...
                    </Box>
                  )}
                  {!isLoading && transaction && transaction.length === 0 && (
                    <Box textAlign="center" py="20px" color="gray.500">
                      No data found.
                    </Box>
                  )}
                  {transaction &&
                    transaction.map((data, index) => {
                      return (
                        <Box
                          key={index}
                          py={"18px"}
                          display={"grid"}
                          background={"#15171F"}
                          borderRadius={"8px"}
                          gridTemplateColumns={"repeat(5, minmax(0, 1fr))"}
                          xl={{
                            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                          }}
                        >
                          <a
                            href={getTxHashLink(data.signature)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Text
                              px="16px"
                              fontWeight={500}
                              color="#C7CCD9"
                              _hover={{ textDecoration: "underline" }}
                              cursor="pointer"
                              className="truncate"
                            >
                              {data.signature.slice(0, 9)}
                            </Text>
                          </a>
                          <Flex
                            gap={"2px"}
                            px={"16px"}
                            fontWeight={500}
                            color={"#C7CCD9"}
                          >
                            <Image
                              src="/images/token.svg"
                              w={"20px"}
                              h={"20px"}
                              alt="token"
                            />
                            {getNumberFixed(data.tokenAmount, 2)}
                          </Flex>
                          <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                            {data.currencyAmount} {data.currency.toUpperCase()}
                          </Text>
                          <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                            ${getNumberFixed(data.currencyPrice, 2)}
                          </Text>
                          <Text
                            xl={{ gridColumn: "span 2 / span 2" }}
                            px={"16px"}
                            fontWeight={500}
                            color={"#C7CCD9"}
                            textAlign={"right"}
                          >
                            {formatTimeAgo(data.blockTime) || "N/A"}
                          </Text>
                        </Box>
                      );
                    })}
                  {hasNextPage && (
                    <div ref={ref} className="flex justify-center py-4">
                      <div className="flex flex-col items-center">
                        <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 border-solid rounded-full border-blue-600 border-t-transparent" />
                        <p className="mt-2 text-sm text-gray-600">
                          Loading more...
                        </p>
                      </div>
                    </div>
                  )}
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default InviteAndEarn;
