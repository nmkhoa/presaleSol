import { useLeaderboard } from "@/core/hook/useUsers";
import { getAddressFormat, getNumberFixed } from "@/utils";
import { Box, Flex, Grid, HStack, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function ReferralLeaderboard() {
  const { ref, inView } = useInView();
  const {
    data: leaderboard,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useLeaderboard({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <Box
      background={"linear-gradient(143.45deg, #17191F 10.97%, #1B1D24 56.87%)"}
      w="full"
      h="full"
      minH={"480px"}
      borderRadius="12px"
      color="white"
      mb={"40px"}
      py={"20px"}
    >
      <Box>
        <HStack px={"20px"}>
          <Image src="/images/icon_leaderboard.svg" w={"36px"} h={"36px"} />
          <Text fontSize={"20px"} fontWeight={700} lineHeight={"24px"}>
            Leaderboard
          </Text>
        </HStack>
        <Box pl={"20px"} pr={"3px"}>
          <Box py={"24px"} pr={"17px"} className="grid grid-cols-4">
            <Text
              px={"16px"}
              fontWeight={500}
              fontSize={"16px"}
              color={"#6E758A"}
            >
              Rank
            </Text>
            <Text
              px={"16px"}
              fontWeight={500}
              fontSize={"16px"}
              color={"#6E758A"}
            >
              Address
            </Text>

            <Text
              px={"16px"}
              fontWeight={500}
              color={"#6E758A"}
              textAlign={"left"}
            >
              Referrals
            </Text>
            <Text
              px={"16px"}
              fontWeight={500}
              color={"#6E758A"}
              textAlign={"right"}
              fontSize={"16px"}
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
              <Box textAlign="center" py="20px" color="gray.500">
                Loading...
              </Box>
            )}
            {!isLoading && leaderboard.length === 0 && (
              <Box textAlign="center" py="20px" color="gray.500">
                No data found.
              </Box>
            )}
            {leaderboard &&
              leaderboard.map((data, index) => {
                const bgImage =
                  index === 0
                    ? "url('/images/bg_rank1.svg')"
                    : index === 1
                    ? "url('/images/bg_rank2.svg')"
                    : index === 2
                    ? "url('/images/bg_rank3.svg')"
                    : undefined;

                const bgColor = index > 2 ? "#15171F" : undefined;
                return (
                  <Box
                    key={index}
                    py={"18px"}
                    backgroundImage={bgImage}
                    backgroundColor={bgColor}
                    backgroundSize="cover"
                    borderRadius={"8px"}
                    className="grid grid-cols-4"
                  >
                    <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                      {index + 1}
                    </Text>
                    <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                      {getAddressFormat(data.walletAddress)}
                    </Text>
                    <Flex
                      gap={"2px"}
                      px={"16px"}
                      fontWeight={500}
                      color={"#C7CCD9"}
                    >
                      {data.referralCount}
                    </Flex>

                    <Text
                      px={"16px"}
                      fontWeight={500}
                      color={"#C7CCD9"}
                      textAlign={"right"}
                    >
                      ${getNumberFixed(data.totalReward, 2)}
                    </Text>
                  </Box>
                );
              })}
            {hasNextPage && (
              <div ref={ref} className="flex justify-center py-4">
                <div className="flex flex-col items-center">
                  <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 border-solid rounded-full border-blue-600 border-t-transparent" />
                  <p className="mt-2 text-sm text-gray-600">Loading more...</p>
                </div>
              </div>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
