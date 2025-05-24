import { navKey } from "@/constants/home";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";

const Products = () => {
  return (
    <Box id={navKey.products}>
      <Flex
        w={"fit-content"}
        gap={"20px"}
        mx={"auto"}
        mt={"130px"}
        alignItems={"center"}
      >
        <Box w={"395px"}>
          <Text
            className="text-secondary"
            fontSize={"64px"}
            fontWeight={300}
            lineHeight={"56px"}
          >
            UNICH'S
          </Text>
          <Text
            className="text-secondary"
            fontSize={"64px"}
            fontWeight={700}
            lineHeight={"56px"}
          >
            PRODUCTS
          </Text>
          <Text mt={"20px"} color={"#C7CCD9"} fontWeight={500}>
            Earn, Grow, and Lead! Secure $UN Before Launch, Unlock +148% APY
            Staking, and Shape the Future of the Metaverse!
          </Text>
          <Flex mt={"36px"} gap={"9px"} alignItems={"end"}>
            <Text
              fontSize={"24px"}
              fontWeight={700}
              color={"#FFA915"}
              lineHeight={"28px"}
            >
              954.900
            </Text>
            <Text
              fontSize={"18px"}
              fontWeight={700}
              color={"#C7CCD9"}
              lineHeight={"24px"}
            >
              Total User
            </Text>
          </Flex>
        </Box>
        <Flex
          w={"825px"}
          background={
            "linear-gradient(143.45deg, #111423 10.97%, #0A0C15 56.87%)"
          }
          borderRadius={"16px"}
        >
          <Box w={"45%"} p={"24px"}>
            <Text className="text-secondary" fontSize={"36px"} fontWeight={700}>
              Web3 Wallet
            </Text>
            <Flex gap={"4px"} alignItems={"center"} mt={"12px"}>
              <Text fontSize={"18px"} fontWeight={700} color={"#C7CCD9"}>
                Total downloads:
              </Text>
              <Text fontSize={"24px"} fontWeight={"700"} color={"#FFAF40"}>
                944.900
              </Text>
            </Flex>
            <Text mt={"36px"} fontWeight={500}>
              Secure your assets and offer Airdrop Program with appealing
              rewards
            </Text>
            <Text mt={"90px"} fontSize={"14px"}>
              Download on
            </Text>
            <Flex gap={"7px"} mt={"12px"}>
              <Link href="" target="_blank">
                <Image
                  src="/images/google_play.svg"
                  w={"133px"}
                  h={"39px"}
                  alt="google play"
                />
              </Link>
              <Link href="" target="_blank">
                <Image
                  src="/images/app_store.svg"
                  w={"118px"}
                  h={"39px"}
                  alt="google play"
                />
              </Link>
            </Flex>
          </Box>
          <Flex
            w={"55%"}
            pr={"30px"}
            justifyContent={"start"}
            alignItems={"end"}
          >
            <Image src="/images/my_assets.svg" w={"100%"} h={"auto"} />
          </Flex>
        </Flex>
      </Flex>
      <Box
        maxW={"1240px"}
        h={"426px"}
        mx={"auto"}
        mt={"20px"}
        pt={"44px"}
        background={
          "linear-gradient(143.45deg, #111423 10.97%, #0A0C15 56.87%)"
        }
        borderRadius={"16px"}
      >
        <Flex
          h={"100%"}
          alignItems={"end"}
          backgroundImage={"url(/images/pre_market.png)"}
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center"}
        >
          <Flex
            w={"100%"}
            padding={"30px 24px 24px"}
            background={
              "linear-gradient(0deg, #05060C 3.5%, rgba(0, 0, 0, 0) 83.59%)"
            }
            borderRadius={"16px"}
            alignItems={"end"}
          >
            <Box w={"319px"}>
              <Text
                className="text-secondary"
                fontSize={"36px"}
                fontWeight={700}
              >
                Pre-Market
              </Text>
              <Flex gap={"4px"} alignItems={"center"}>
                <Text fontSize={"18px"} fontWeight={700}>
                  Total Volume:
                </Text>
                <Text fontSize={"24px"} fontWeight={700} color={"#FFAF40"}>
                  $1,944,900
                </Text>
              </Flex>
              <Text fontWeight={500}>
                Secure your assets and offer Airdrop Program with appealing
                rewards
              </Text>
            </Box>
            <Link
              href="https://unich.com/en/otc/market"
              className="btn-gradient-secondary"
              target="_blank"
            >
              <Text
                className="flex gap-1"
                padding={"12px 20px"}
                color={"white"}
                fontWeight={700}
              >
                Visit Market
                <Image
                  src="/images/arrow_right.svg"
                  w={"20px"}
                  h={"20px"}
                  alt="arrow"
                />
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Box>
      <Box
        maxW={"1240px"}
        h={"426px"}
        mx={"auto"}
        mt={"20px"}
        pt={"44px"}
        background={
          "linear-gradient(143.45deg, #111423 10.97%, #0A0C15 56.87%)"
        }
        borderRadius={"16px"}
      >
        <Flex
          h={"100%"}
          alignItems={"end"}
          backgroundImage={"url(/images/pre_order.png)"}
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center"}
        >
          <Flex
            w={"100%"}
            padding={"30px 24px 24px"}
            background={
              "linear-gradient(0deg, #05060C 3.5%, rgba(0, 0, 0, 0) 83.59%)"
            }
            borderRadius={"16px"}
            alignItems={"end"}
          >
            <Box w={"319px"}>
              <Text
                className="text-secondary"
                fontSize={"36px"}
                fontWeight={700}
              >
                Pre-Order
              </Text>
              <Flex gap={"4px"} alignItems={"center"}>
                <Text fontSize={"18px"} fontWeight={700}>
                  Total Volume:
                </Text>
                <Text fontSize={"24px"} fontWeight={700} color={"#FFAF40"}>
                  $1,944,900
                </Text>
              </Flex>
              <Text fontWeight={500}>
                Pre-buy & pre-sell tokens at any price and profit within the
                day!
              </Text>
            </Box>
            <Link
              href="https://unich.com/en/otc/market"
              className="btn-gradient-secondary"
              target="_blank"
            >
              <Text
                className="flex gap-1"
                padding={"12px 20px"}
                color={"white"}
                fontWeight={700}
              >
                Visit Market
                <Image
                  src="/images/arrow_right.svg"
                  w={"20px"}
                  h={"20px"}
                  alt="arrow"
                />
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Products;
