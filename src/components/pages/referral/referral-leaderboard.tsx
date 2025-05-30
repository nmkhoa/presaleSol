import { useCurrentRank, useLeaderboard } from "@/core/hook/useUsers";
import { useAuthStore } from "@/stores/auth.store";
import { getAddressFormat, getNumberFixed } from "@/utils";
import { Box, Flex, Grid, HStack, Image, Text } from "@chakra-ui/react";

export default function ReferralLeaderboard() {
  const { accessToken } = useAuthStore();
  const { data: leaderboard, isLoading } = useLeaderboard(accessToken);
  const { data: currentRank } = useCurrentRank(accessToken);

  return (
    <Box
      background={"linear-gradient(143.45deg, #17191F 10.97%, #1B1D24 56.87%)"}
      w="full"
      h="full"
      minH={"480px"}
      borderRadius="12px"
      color="white"
      mb={"40px"}
    >
      <Box mt={"20px"}>
        <HStack px={"20px"}>
          <Image
            src="/images/icon_leaderboard.svg"
            w={{ base: "28px", md: "36px" }}
            h={{ base: "28px", md: "36px" }}
          />
          <Text fontSize={{ base: "16px", md: "20px" }} fontWeight={700} lineHeight={"24px"}>
            Leaderboard
          </Text>
        </HStack>
        <Box pl={"20px"} pr={"3px"}>
          <Box py={"24px"} pr={"17px"} className="grid grid-cols-4">
            <Text
              px={"16px"}
              fontWeight={500}
              fontSize={{ base: "12px", md: "14px", xl: "16px" }}
              color={"#6E758A"}
            >
              Rank
            </Text>
            <Text
              px={"16px"}
              fontWeight={500}
              fontSize={{ base: "12px", md: "14px", xl: "16px" }}
              color={"#6E758A"}
            >
              Address
            </Text>

            <Text
              px={"16px"}
              fontWeight={500}
              color={"#6E758A"}
              textAlign={"left"}
              fontSize={{ base: "12px", md: "14px", xl: "16px" }}
            >
              Referrals
            </Text>
            <Text
              px={"16px"}
              fontWeight={500}
              color={"#6E758A"}
              textAlign={"right"}
              fontSize={{ base: "12px", md: "14px", xl: "16px" }}
            >
              Reward
            </Text>
          </Box>
          <Grid gap={"8px"} maxH={"340px"} overflowY="auto" className="custom-scrollbar">
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
            {!isLoading && leaderboard && leaderboard.length === 0 && (
              <Box
                textAlign="center"
                py="20px"
                color="gray.500"
                fontSize={{ base: "12px", md: "14px", xl: "16px" }}
              >
                No data found.
              </Box>
            )}
            {leaderboard &&
              leaderboard.map((data, index) => {
                const currentRank = Number(data.currentRank);
                const bgImage =
                  currentRank === 1
                    ? "url('/images/bg_rank1.svg')"
                    : currentRank === 2
                    ? "url('/images/bg_rank2.svg')"
                    : currentRank === 3
                    ? "url('/images/bg_rank3.svg')"
                    : undefined;

                const bgColor = currentRank > 2 ? "#15171F" : undefined;
                return (
                  <Box
                    key={index}
                    py={"18px"}
                    backgroundImage={bgImage}
                    backgroundColor={bgColor}
                    backgroundSize="cover"
                    borderRadius={"8px"}
                    fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                    className="grid grid-cols-4"
                  >
                    <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                      {currentRank || "-"}
                    </Text>
                    <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                      {getAddressFormat(data.walletAddress) || "-"}
                    </Text>
                    <Flex gap={"2px"} px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                      {data.referralCount || "-"}
                    </Flex>

                    <Text px={"16px"} fontWeight={500} color={"#C7CCD9"} textAlign={"right"}>
                      ${getNumberFixed(data.totalReward, 2)}
                    </Text>
                  </Box>
                );
              })}
          </Grid>
        </Box>
        {currentRank && (
          <Box
            py={{
              base: "16px",
              md: "15px",
              xl: "24px",
              "2xl": "24px",
            }}
            px={"32px"}
            mt={"8px"}
            background="linear-gradient(89.88deg, #19FFAC -40.26%, #1A1F27 97.08%)"
            borderBottomRadius={"8px"}
            fontSize={{ base: "12px", md: "14px", xl: "16px" }}
            className="grid grid-cols-4"
          >
            <Text fontWeight={500} color={"#C7CCD9"}>
              {currentRank.currentRank || "-"}
            </Text>
            <Text px={"10px"} fontWeight={500} color={"#C7CCD9"}>
              You
            </Text>
            <Flex gap={"2px"} px={"16px"} fontWeight={500} color={"#C7CCD9"}>
              {currentRank.referralCount || "-"}
            </Flex>

            <Text px={"5px"} fontWeight={500} color={"#C7CCD9"} textAlign={"right"}>
              ${getNumberFixed(currentRank.totalReward, 2)}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
