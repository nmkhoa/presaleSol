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
  const { connected } = useWallet();
  const { solUserAccountInfo, solSaleAccountInfo } = useTokenStore();
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
  const usdEarned = useMemo(() => {
    if (!solUserAccountInfo || !solSaleAccountInfo) return 0;
    const earned =
      solUserAccountInfo.tokenRefEarned * solSaleAccountInfo.firstRoundPrice;
    return getNumberFixed(earned);
  }, [solSaleAccountInfo, solUserAccountInfo]);

  return (
    <Box>
      <Flex
        w={"fit-content"}
        gap={"20px"}
        mx={"auto"}
        mt={"160px"}
        alignItems={"center"}
      >
        <Box
          w={"505px"}
          p={"20px"}
          background={"url(/images/invite_bg.svg)"}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          borderRadius={"12px"}
        >
          <Flex gap={"40px"}>
            <Text fontSize={"28px"} fontWeight={700} color={"#FFFFFF"}>
              Invite friends & earn up to
            </Text>
            <Text fontSize={"64px"} fontWeight={700} color={"#FFFFFF"}>
              11%
            </Text>
          </Flex>
          <Flex gap={"10px"} mt={"38px"}>
            <Input
              h={"58px"}
              background={"rgba(0, 0, 0, 0.95)"}
              color={"#FFEED6"}
              borderRadius={"8px"}
              disabled
              opacity={1}
              value={user ? `${user.affiliateCode}` : ""}
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
                    h={"58px"}
                    p={"12px"}
                    background="#FFFFFF"
                    rounded={"8px"}
                    color={"#1A1001"}
                    fontWeight={700}
                    fontSize={"14px"}
                    _hover={{ filter: "brightness(1.3)" }}
                  >
                    <Clipboard.CopyText />
                  </Button>
                </Clipboard.Trigger>
              </Clipboard.Root>
            ) : (
              <Button
                h={"58px"}
                fontWeight={700}
                borderRadius={"8px"}
                onClick={() => setShowModal(true)}
              >
                Connect wallet
              </Button>
            )}
          </Flex>
        </Box>
        <Box
          w={"715px"}
          minH={"100%"}
          p={"20px"}
          background={
            "linear-gradient(143.45deg, #17191F 10.97%, #1B1D24 56.87%)"
          }
          borderRadius={"12px"}
        >
          <Flex
            gap={"12px"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"24px"} fontWeight={700}>
              Total Balance
            </Text>
            <Flex gap={"12px"} alignItems={"center"}>
              <Image
                src="/images/token.svg"
                w={"32px"}
                h={"32px"}
                alt="token"
              />
              <Text fontSize={"36px"} lineHeight={"42px"} fontWeight={700}>
                {solUserAccountInfo
                  ? formatAmount(
                      getNumberFixed(
                        solUserAccountInfo?.publicTokensPurchased +
                          solUserAccountInfo?.whitelistTokensPurchased,
                        2
                      )
                    )
                  : "-.--"}
              </Text>
            </Flex>
          </Flex>
          <Box h={"1px"} mt={"24px"} background={"white"} opacity={"0.1"} />
          <Box mt={"67px"} className="grid grid-cols-3 gap-[12px]">
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
                <Text fontSize={"24px"} fontWeight={700} lineHeight={"28px"}>
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
                fontSize={"24px"}
                fontWeight={700}
                lineHeight={"28px"}
              >
                $
                {usdEarned
                  ? formatAmount(getNumberFixed(usdEarned, 2))
                  : "-.--"}
              </Text>
            </Box>
            <Link
              to={ROUTES.REFERRAL}
              onClick={checkConnected}
              className="btn-gradient-secondary"
            >
              <div>Go to dashboard</div>
            </Link>
          </Box>
        </Box>
      </Flex>
      {connected && (
        <Box
          maxW={"1240px"}
          mx={"auto"}
          mt={"20px"}
          py={"20px"}
          h={"500px"}
          background={
            "linear-gradient(143.45deg, #17191F 10.97%, #1B1D24 56.87%)"
          }
          borderRadius={"12px"}
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
            <Box py={"24px"} className="grid grid-cols-6" pr={"10px"}>
              <Text px={"16px"} fontWeight={500} color={"#6E758A"}>
                Tx Hash
              </Text>
              <Text px={"16px"} fontWeight={500} color={"#6E758A"}>
                Amount
              </Text>
              <Text px={"16px"} fontWeight={500} color={"#6E758A"}>
                Currrency
              </Text>
              <Text px={"16px"} fontWeight={500} color={"#6E758A"}>
                Price
              </Text>
              <Text
                className="col-span-2"
                px={"16px"}
                fontWeight={500}
                color={"#6E758A"}
                textAlign={"right"}
              >
                Time
              </Text>
            </Box>
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
                      background={"#15171F"}
                      borderRadius={"8px"}
                      className="grid grid-cols-6"
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
                        {getNumberFixed(data.tokenamount, 2)}
                      </Flex>
                      <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                        {data.currency.toUpperCase()}
                      </Text>
                      <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                        ${getNumberFixed(data.currencyprice, 2)}
                      </Text>
                      <Text
                        className="col-span-2"
                        px={"16px"}
                        fontWeight={500}
                        color={"#C7CCD9"}
                        textAlign={"right"}
                      >
                        {formatTimeAgo(data.blocktime)}
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
      )}
    </Box>
  );
};

export default InviteAndEarn;
