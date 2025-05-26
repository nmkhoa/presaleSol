import { ROUTES } from "@/constants/router";
import { ConnectWalletContext } from "@/contexts/connect-wallet-context";
import { useAuthStore } from "@/stores/auth.store";
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
import { useContext } from "react";
import { Link } from "react-router-dom";

const InviteAndEarn = () => {
  const { connected } = useWallet();
  const { user } = useAuthStore();
  const { setShowModal } = useContext(ConnectWalletContext);

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
              value={user?.affiliateCode || ""}
              placeholder="Connect wallet to see your code"
            />
            {connected ? (
              <Clipboard.Root
                value={user ? `unich.com/${user?.affiliateCode}` : ""}
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
                -.--
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
                  -.--
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text fontSize={"14px"} fontWeight={500} color={"#C7CCD9"}>
                $UN Earned
              </Text>
              <Text
                mt={"4px"}
                fontSize={"24px"}
                fontWeight={700}
                lineHeight={"28px"}
              >
                $-.--
              </Text>
            </Box>
            <Link to={ROUTES.REFERRAL} className="btn-gradient-secondary">
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
          p={"20px"}
          background={
            "linear-gradient(143.45deg, #17191F 10.97%, #1B1D24 56.87%)"
          }
          borderRadius={"12px"}
        >
          <Text fontSize={"24px"} fontWeight={700} lineHeight={"28px"}>
            Transaction History
          </Text>
          <Box h={"1px"} mt={"24px"} background={"white"} opacity={"0.1"} />
          <Box>
            <Box py={"24px"} className="grid grid-cols-6">
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
            <Grid gap={"8px"}>
              {[...Array(5)].map((_, index) => {
                return (
                  <Box
                    key={index}
                    py={"18px"}
                    background={"#15171F"}
                    borderRadius={"8px"}
                    className="grid grid-cols-6"
                  >
                    <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                      d28zsa38s
                    </Text>
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
                      503.24
                    </Flex>
                    <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                      USDC
                    </Text>
                    <Text px={"16px"} fontWeight={500} color={"#C7CCD9"}>
                      $0.05
                    </Text>
                    <Text
                      className="col-span-2"
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
      )}
    </Box>
  );
};

export default InviteAndEarn;
