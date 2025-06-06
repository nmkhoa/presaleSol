import { useCurrentRank, useLeaderboard } from "@/core/hook/use-users";
import { useAuthStore } from "@/stores/auth.store";
import { getAddressFormat, getNumberFixed } from "@/utils";
import { Box, Flex, Grid, HStack, Image, Text } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";

export default function ReferralLeaderboard() {
  const { accessToken, user } = useAuthStore();
  const { data: leaderboard, isLoading } = useLeaderboard(accessToken);
  const { data: currentRank } = useCurrentRank(accessToken);

  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const setTargetRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();

    if (node) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.5 }
      );
      observer.current.observe(node);
    }
  }, []);

  const isUserInLeaderboard = leaderboard?.some(
    (item) => item.walletAddress === user?.walletAddress
  );
  const shouldShowStickyUser = isUserInLeaderboard && !isVisible && currentRank;

  const shouldShowFallbackUser = !isUserInLeaderboard && currentRank;

  return (
    <Box
      background={
        "linear-gradient(143.45deg, var(--card-bg-light) 10.97%, var(--card-bg-normal) 56.87%)"
      }
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
          <Text
            fontSize={{ base: "16px", md: "20px" }}
            fontWeight={700}
            lineHeight={"24px"}
          >
            Leaderboard
          </Text>
        </HStack>
        <Box pl={"20px"} pr={"3px"}>
          <Box py={"24px"} pr={"17px"} className="grid grid-cols-4">
            <Text
              px={"16px"}
              fontWeight={500}
              fontSize={{ base: "12px", md: "14px", xl: "16px" }}
              color={"var(--table-head-color)"}
            >
              Rank
            </Text>
            <Text
              px={"16px"}
              fontWeight={500}
              fontSize={{ base: "12px", md: "14px", xl: "16px" }}
              color={"var(--table-head-color)"}
            >
              Address
            </Text>

            <Text
              px={"16px"}
              fontWeight={500}
              color={"var(--table-head-color)"}
              textAlign={"left"}
              fontSize={{ base: "12px", md: "14px", xl: "16px" }}
            >
              Referrals
            </Text>
            <Text
              px={"16px"}
              fontWeight={500}
              color={"var(--table-head-color)"}
              textAlign={"right"}
              fontSize={{ base: "12px", md: "14px", xl: "16px" }}
            >
              Reward
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
                const isUser = user?.walletAddress === data.walletAddress;
                const currentRank = Number(data.currentRank);
                const bgImage =
                  currentRank === 1
                    ? "url('/images/bg_rank1.svg')"
                    : currentRank === 2
                    ? "url('/images/bg_rank2.svg')"
                    : currentRank === 3
                    ? "url('/images/bg_rank3.svg')"
                    : undefined;

                const bgColor = isUser
                  ? "linear-gradient(89.88deg, var(--leaderboard-bg-light) -40.26%, var(--leaderboard-bg-dark) 97.08%)"
                  : currentRank > 3
                  ? "var(--transaction-bg)"
                  : undefined;

                return (
                  <Box
                    key={index}
                    py={"18px"}
                    backgroundImage={bgImage}
                    background={bgColor}
                    backgroundSize="cover"
                    borderRadius={"8px"}
                    fontSize={{ base: "12px", md: "14px", xl: "16px" }}
                    className="grid grid-cols-4"
                    ref={isUser ? setTargetRef : null}
                  >
                    <Text
                      px={"16px"}
                      fontWeight={500}
                      color={"var(--normal-text-color)"}
                    >
                      {currentRank || "-"}
                    </Text>
                    <Text
                      px={"16px"}
                      fontWeight={500}
                      color={"var(--normal-text-color)"}
                    >
                      {isUser
                        ? "You"
                        : getAddressFormat(data.walletAddress) || "-"}
                    </Text>
                    <Flex
                      gap={"2px"}
                      px={"16px"}
                      fontWeight={500}
                      color={"var(--normal-text-color)"}
                    >
                      {data.referralCount || "-"}
                    </Flex>

                    <Text
                      px={"16px"}
                      fontWeight={500}
                      color={"var(--normal-text-color)"}
                      textAlign={"right"}
                    >
                      ${getNumberFixed(data.totalReward, 2)}
                    </Text>
                  </Box>
                );
              })}
          </Grid>
        </Box>
        {(shouldShowStickyUser || shouldShowFallbackUser) && (
          <Box
            py={{
              base: "16px",
              md: "15px",
              xl: "24px",
              "2xl": "24px",
            }}
            px={"32px"}
            mt={"8px"}
            background="linear-gradient(89.88deg, var(--leaderboard-bg-light) -40.26%, var(--leaderboard-bg-dark) 97.08%)"
            borderBottomRadius={"8px"}
            fontSize={{ base: "12px", md: "14px", xl: "16px" }}
            className="grid grid-cols-4"
          >
            <Text fontWeight={500} color={"var(--normal-text-color)"}>
              {currentRank.currentRank || "-"}
            </Text>
            <Text
              px={"10px"}
              fontWeight={500}
              color={"var(--normal-text-color)"}
            >
              You
            </Text>
            <Flex
              gap={"2px"}
              px={"16px"}
              fontWeight={500}
              color={"var(--normal-text-color)"}
            >
              {currentRank.referralCount || "-"}
            </Flex>
            <Text
              px={"5px"}
              fontWeight={500}
              color={"var(--normal-text-color)"}
              textAlign={"right"}
            >
              ${getNumberFixed(currentRank.totalReward, 2)}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
