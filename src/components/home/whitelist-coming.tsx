import { Box, Flex, Grid, Image, Link, Text } from "@chakra-ui/react";

const WhiteListComing = () => {
  return (
    <Box pt={"28px"} px={"12px"}>
      <Box
        textAlign={"center"}
        fontSize={"28px"}
        fontWeight={700}
        color={"var(--coming-soon-color)"}
      >
        Coming Soon!
      </Box>
      <Text mt={"54px"} fontWeight={700} color={"white"}>
        Perks for NFT Holders:
      </Text>
      <Grid mt={"12px"} gap={"12px"}>
        <Flex gap={"8px"} alignItems={"center"}>
          <Image
            src="/images/checked.svg"
            w={"20px"}
            h={"20px"}
            minW={"20px"}
            alt="checked"
          />
          <Text fontWeight={500} color={"white"}>
            Burn NFT for a{" "}
            <span
              className="!font-bold"
              style={{ color: "var(--text-primary-link-color)" }}
            >
              25%
            </span>{" "}
            discount on price.
          </Text>
        </Flex>
        <Flex gap={"8px"} alignItems={"center"}>
          <Image
            src="/images/checked.svg"
            w={"20px"}
            h={"20px"}
            minW={"20px"}
            alt="checked"
          />
          <Text fontWeight={500} color={"white"}>
            Buy up to{" "}
            <span
              className="!font-bold"
              style={{ color: "var(--text-primary-link-color)" }}
            >
              $500
            </span>{" "}
            worth of $UN per NFT.
          </Text>
        </Flex>
        <Flex gap={"8px"} alignItems={"center"}>
          <Image
            src="/images/checked.svg"
            w={"20px"}
            h={"20px"}
            minW={"20px"}
            alt="checked"
          />
          <Text fontWeight={500} color={"white"}>
            Use max{" "}
            <span
              className="!font-bold"
              style={{ color: "var(--text-primary-link-color)" }}
            >
              5 NFTs
            </span>{" "}
            per purchase.
          </Text>
        </Flex>
      </Grid>
      <Text
        maxW={"263px"}
        mt={"54px"}
        mx={"auto"}
        fontWeight={500}
        fontSize={"16px"}
        lineHeight={"20px"}
        textAlign={"center"}
        color={"white"}
      >
        Whitelist will be available in just a few days!{" "}
        <Link
          href=""
          color={"var(--coming-soon-color)"}
          textDecoration={"underline"}
          target="_blank"
        >
          Learn more
        </Link>
      </Text>
    </Box>
  );
};

export default WhiteListComing;
