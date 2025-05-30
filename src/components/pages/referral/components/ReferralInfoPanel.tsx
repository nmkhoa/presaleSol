import { useAuthStore } from "@/stores/auth.store";
import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Clipboard,
  Image,
  Grid,
  Flex,
} from "@chakra-ui/react";
import IconSOL from "@assets/icon/icon_SOL.svg";
import { formatTimeAgo, getAddressFormat, getNumberFixed } from "@/utils";
import { useReferralInfo } from "@/core/hook/useUsers";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
export default function ReferralInfoPanel() {
  const { user, accessToken } = useAuthStore();

  const { ref, inView } = useInView();
  const {
    data: referralInfo,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useReferralInfo(
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

  return (
    <Box w={"full"} h={"full"} minH={{ base: "0", md: "720px" }}>
      <Stack gap={"12px"}>
        <Box
          w={"full"}
          minH={"136px"}
          p={"20px"}
          background={"url(/images/invite_bg2.svg)"}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          borderRadius={"12px"}
          display={{ base: "none", md: "block" }}
        >
          <Stack>
            <Text
              fontSize={{ base: "18px", md: "20px", "2xl": "24px" }}
              fontWeight={700}
              color={"#FFFFFF"}
            >
              Your Network = Your Reward!
            </Text>

            <Flex
              gap={"12px"}
              flexDirection={{ base: "column", xl: "row" }}
              justifyContent={"start"}
            >
              <Box flex={"1 1 50%"}>
                <Text
                  fontSize={{ base: "12px", md: "14px", "2xl": "16px" }}
                  color={"#06070A"}
                  fontWeight={500}
                  textAlign={"left"}
                >
                  Earn 3% in $UN + 8% in USD based on total purchases of your
                  invitees.
                </Text>
              </Box>
              <Box flex={"1 1 50%"}>
                <Flex gap={"10px"}>
                  <Box
                    w={{ base: "100%", xl: "317px" }}
                    h={"40px"}
                    background={"#000000"}
                    rounded={"8px"}
                    border={"1px solid #40475C"}
                    px={"16px"}
                    display="flex"
                    alignItems="center"
                  >
                    <Text fontSize={"12px"} color={"#FFEED6"} fontWeight={500}>
                      {user
                        ? `${window.location.origin}/?affiliateCode=${user.affiliateCode}`
                        : ""}
                    </Text>
                  </Box>
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
                        w={"62px"}
                        p={"12px"}
                        background="#FFFFFF"
                        rounded={"8px"}
                        color={"#1A1001"}
                        fontWeight={700}
                        fontSize={{ base: "12px", xl: "14px" }}
                        _hover={{ filter: "brightness(1.3)" }}
                      >
                        <Clipboard.CopyText />
                      </Button>
                    </Clipboard.Trigger>
                  </Clipboard.Root>
                </Flex>
              </Box>
            </Flex>
          </Stack>
        </Box>
        <Box
          background={
            "linear-gradient(143.45deg, #17191F 10.97%, #1B1D24 56.87%)"
          }
          w="full"
          h="600px"
          borderRadius="12px"
          color="white"
          p={{ base: "16px", md: "20px" }}
        >
          <Stack gap={"18px"}>
            <Text
              fontWeight={700}
              fontSize={{ base: "14px", md: "18px" }}
              color={"#FFFFFF"}
            >
              Your wallet for claiming rewards
            </Text>
            <Box
              w={"full"}
              h={"50px"}
              background={"#050507"}
              rounded={"8px"}
              display={"flex"}
              alignItems={"center"}
              px={"16px"}
            >
              <HStack gap={"8px"}>
                <Image
                  src={IconSOL}
                  w={{ base: "20px", md: "28px" }}
                  h={{ base: "20px", md: "28px" }}
                />
                <Text
                  fontWeight={500}
                  fontSize={{ base: "14px", md: "16px", xl: "18px" }}
                  color={"#6E758A"}
                >
                  {user ? getAddressFormat(user.walletAddress) : ""}
                </Text>
              </HStack>
            </Box>
          </Stack>
          <Box maxW={"1240px"} mx={"auto"} mt={"24px"}>
            <HStack px={"20px"}>
              <Image
                src="/images/hand.svg"
                w={{ base: "28px", md: "36px" }}
                h={{ base: "28px", md: "36px" }}
              />
              <Text fontSize={"24px"} fontWeight={700} lineHeight={"24px"}>
                My Referral
              </Text>
            </HStack>
            <Box pl={"20px"} pr={"3px"}>
              <Box py={"24px"} className="grid grid-cols-4" pr={"17px"}>
                <Text
                  px={"12px"}
                  fontWeight={500}
                  fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                  color={"#6E758A"}
                >
                  Address
                </Text>

                <Text
                  px={"12px"}
                  fontWeight={500}
                  color={"#6E758A"}
                  fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                  textAlign={"left"}
                >
                  Earning
                </Text>
                <Text
                  px={"12px"}
                  fontWeight={500}
                  color={"#6E758A"}
                  fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                  textAlign={"left"}
                >
                  Currrency
                </Text>
                <Text
                  px={"12px"}
                  fontWeight={500}
                  color={"#6E758A"}
                  textAlign={"right"}
                  fontSize={{ base: "12px", md: "14px", xl: "16px" }}
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
                  <Box
                    textAlign="center"
                    py="20px"
                    color="gray.500"
                    fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                  >
                    Loading...
                  </Box>
                )}
                {!isLoading && referralInfo.length === 0 && (
                  <Box
                    textAlign="center"
                    py="20px"
                    color="gray.500"
                    fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                  >
                    No data found.
                  </Box>
                )}
                {referralInfo &&
                  referralInfo.map((data, index) => {
                    return (
                      <Box
                        key={index}
                        py={"18px"}
                        background={"#15171F"}
                        borderRadius={"8px"}
                        fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                        className="grid grid-cols-4"
                        wordBreak="break-word"
                      >
                        <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                          {getAddressFormat(data.referral) || "-"}
                        </Text>
                        <Flex
                          gap={"2px"}
                          px={"16px"}
                          fontWeight={500}
                          color={"#C7CCD9"}
                        >
                          {getNumberFixed(
                            data.totalTokenReward,
                            data.currency === "SOL" ? 4 : 2
                          ) || "-"}
                        </Flex>
                        <Flex
                          gap={"2px"}
                          px={"16px"}
                          fontWeight={500}
                          color={"#C7CCD9"}
                        >
                          {data.currency || "-"}
                        </Flex>

                        <Text
                          px={"16px"}
                          fontWeight={500}
                          color={"#C7CCD9"}
                          textAlign={"right"}
                        >
                          {formatTimeAgo(data.blockTime) || "-"}
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
      </Stack>
    </Box>
  );
}
