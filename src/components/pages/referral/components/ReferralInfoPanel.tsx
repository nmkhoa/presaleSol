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
import { getAddressFormat } from "@/utils";
export default function ReferralInfoPanel() {
  const { user } = useAuthStore();

  return (
    <Box w={"full"} h={"full"}>
      <Stack gap={"12px"}>
        <Box
          w={"full"}
          h={"136px"}
          p={"20px"}
          background={"url(/images/invite_bg2.svg)"}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          borderRadius={"12px"}
        >
          <Stack>
            <Text fontSize={"24px"} fontWeight={700} color={"#FFFFFF"}>
              Your Network = Your Reward!
            </Text>

            <HStack>
              <Box flex={"1 1 50%"}>
                <Text fontSize={"16px"} color={"#06070A"} fontWeight={500}>
                  Earn 3% in $UN + 8% in USD based on total purchases of your
                  invitees.
                </Text>
              </Box>
              <Box flex={"1 1 50%"}>
                <HStack gap={"10px"}>
                  <Box
                    w={"317px"}
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
                    value={user ? `${window.location.origin}/?affiliateCode=${user.affiliateCode}` : ""}
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
                        fontSize={"14px"}
                        _hover={{ filter: "brightness(1.3)" }}
                      >
                        <Clipboard.CopyText />
                      </Button>
                    </Clipboard.Trigger>
                  </Clipboard.Root>
                </HStack>
              </Box>
            </HStack>
          </Stack>
        </Box>
        <Box
          background={
            "linear-gradient(143.45deg, #17191F 10.97%, #1B1D24 56.87%)"
          }
          w="full"
          h="full"
          borderRadius="12px"
          color="white"
          p="20px"
        >
          <Stack gap={"18px"}>
            <Text fontWeight={700} fontSize={"18px"} color={"#FFFFFF"}>
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
                <Image src={IconSOL} w={"28px"} h={"28px"} />
                <Text fontWeight={500} fontSize={"18px"} color={"#6E758A"}>
                  {user ? getAddressFormat(user.walletAddress) : ""}
                </Text>
              </HStack>
            </Box>
          </Stack>
          <Box maxW={"1240px"} mx={"auto"} mt={"24px"}>
            <HStack>
              <Image src="/images/hand.svg" w={"36px"} h={"36px"} />
              <Text fontSize={"24px"} fontWeight={700} lineHeight={"24px"}>
                My Referral
              </Text>
            </HStack>
            <Box>
              <Box py={"24px"} className="grid grid-cols-3">
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
                  Earning
                </Text>
                <Text
                  px={"16px"}
                  fontWeight={500}
                  color={"#6E758A"}
                  textAlign={"right"}
                  fontSize={"16px"}
                >
                  Time
                </Text>
              </Box>
              <Grid gap={"8px"}>
                {[...Array(5)].map((_, index) => {
                  return (
                    <Box
                      key={index}
                      py={"18px"}
                      background={"#15171F"}
                      borderRadius={"8px"}
                      className="grid grid-cols-3"
                    >
                      <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                        {user ? getAddressFormat(user.walletAddress) : ""}
                      </Text>
                      <Flex
                        gap={"2px"}
                        px={"16px"}
                        fontWeight={500}
                        color={"#C7CCD9"}
                      >
                        $503.24
                      </Flex>

                      <Text
                        px={"16px"}
                        fontWeight={500}
                        color={"#C7CCD9"}
                        textAlign={"right"}
                      >
                        2h ago
                      </Text>
                    </Box>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
