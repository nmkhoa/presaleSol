import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { socialLinks } from "../../constants/home";
import { formatAmount, getNumberFixed } from "@/utils";
import { useMemo } from "react";
import { useTokenStore } from "@/stores/token.store";

const TokenSold = () => {
  const { solSaleAccountInfo, tokensPrice } = useTokenStore();
  const totalSoldPerAll = useMemo(() => {
    if (!solSaleAccountInfo?.tokensForSale || !solSaleAccountInfo) return 0;
    return (
      ((solSaleAccountInfo.tokensSold || 0) * 100) /
      solSaleAccountInfo.tokensForSale
    );
  }, [solSaleAccountInfo]);

  const priceData = useMemo(() => {
    if (solSaleAccountInfo?.currentRound === 2) {
      return {
        current: solSaleAccountInfo.currentPrice,
        next: 0,
      };
    } else {
      return {
        current: solSaleAccountInfo?.firstRoundPrice,
        next: solSaleAccountInfo?.secondRoundPrice,
      };
    }
  }, [solSaleAccountInfo]);

  const totalRaised = useMemo(() => {
    return (
      (solSaleAccountInfo?.solRaised || 0) * (tokensPrice?.sol || 0) +
      (solSaleAccountInfo?.usdcRaised || 0) * (tokensPrice?.usdc || 0) +
      (solSaleAccountInfo?.usdtRaised || 0) * (tokensPrice?.usdt || 0)
    );
  }, [solSaleAccountInfo, tokensPrice]);

  return (
    <Box>
      <Box
        position={"relative"}
        p={"4px"}
        backgroundColor={"var(--progress-out-bg)"}
        borderRadius={"16px"}
      >
        <Box
          w={totalSoldPerAll + "%"}
          maxW={"100%"}
          h={"34px"}
          background={
            "linear-gradient(235.88deg, var(--btn-yellow-normal) 8.35%, var(--btn-orange-light) 45.69%, var(--btn-orange-semi) 98.76%)"
          }
          borderRadius={"14px"}
        />
        <Text
          position={"absolute"}
          left={"16px"}
          color={"white"}
          fontWeight={700}
          className="absolute top-1/2 -translate-y-1/2"
          fontSize={"14px"}
          md={{
            fontSize: "16px",
          }}
        >
          {totalSoldPerAll < 1 ? "<1" : getNumberFixed(totalSoldPerAll, 2)}%
          Sold
        </Text>
      </Box>
      <Text
        mt={"36px"}
        fontSize={"12px"}
        color={"var(--normal-text-color)"}
        fontWeight={500}
        xl={{ fontSize: "14px" }}
      >
        Token Sold
      </Text>
      <Flex
        mt={"4px"}
        gap={"4px"}
        alignItems={"center"}
        md={{ alignItems: "end" }}
      >
        <Image
          src="/images/token.svg"
          w={"24px"}
          h={"24px"}
          mb={"4px"}
          alt="token"
        />
        <Text
          fontSize={"16px"}
          lineHeight={"16px"}
          fontWeight={700}
          md={{
            fontSize: "20px",
            lineHeight: "20px",
          }}
          xl={{ fontSize: "24px", lineHeight: "28px" }}
        >
          {formatAmount(Math.floor(solSaleAccountInfo?.tokensSold || 0))}
        </Text>
        <Text
          fontSize={"12px"}
          lineHeight={"16px"}
          color={"var(--table-head-color)"}
          fontWeight={500}
          xl={{
            fontSize: "14px",
            lineHeight: "18px",
          }}
        >
          /{formatAmount(solSaleAccountInfo?.tokensForSale || 0)}
        </Text>
      </Flex>
      <Box
        h={"1px"}
        mt={"16px"}
        bg={"white"}
        opacity={"0.1"}
        xl={{ mt: "20px" }}
      />
      <Text
        mt={"16px"}
        fontSize={"12px"}
        color={"var(--normal-text-color)"}
        fontWeight={500}
        xl={{ mt: "20px", fontSize: "14px" }}
      >
        Total Raised
      </Text>
      <Flex mt={"4px"} gap={"4px"} alignItems={"end"}>
        <Text
          fontSize={"16px"}
          lineHeight={"16px"}
          fontWeight={700}
          md={{
            fontSize: "20px",
            lineHeight: "20px",
          }}
          xl={{ fontSize: "24px", lineHeight: "28px" }}
        >
          ${formatAmount(Math.floor(totalRaised))}
        </Text>
        <Text
          fontSize={"12px"}
          lineHeight={"16px"}
          color={"var(--table-head-color)"}
          fontWeight={500}
          xl={{
            fontSize: "14px",
            lineHeight: "18px",
          }}
        >
          / ${formatAmount(15000000)}
        </Text>
      </Flex>
      <Box
        h={"1px"}
        mt={"16px"}
        bg={"white"}
        opacity={"0.1"}
        xl={{ mt: "20px" }}
      />
      <Text
        mt={"20px"}
        fontSize={"12px"}
        color={"var(--normal-text-color)"}
        fontWeight={500}
        xl={{ mt: "28px", fontSize: "14px" }}
      >
        Price
      </Text>
      <Flex
        mt={"4px"}
        gap={"4px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        <Flex gap={"4px"} alignItems={"center"}>
          <Image
            src="/images/token.svg"
            className="w-[24px] h-[24px]"
            alt="token"
          />
          <Text
            fontSize={"14px"}
            color={"var(--text-primary-link-color)"}
            fontWeight={700}
            md={{
              fontSize: "16px",
              lineHeight: "20px",
            }}
            xl={{
              fontSize: "18px",
              lineHeight: "18px",
            }}
          >
            1 $UN = ${priceData.current || 0}
          </Text>
        </Flex>
        {solSaleAccountInfo?.currentRound === 1 && (
          <Flex gap={"4px"} alignItems={"center"}>
            <Text
              fontSize={"12px"}
              color={"var(--normal-text-color)"}
              fontWeight={500}
              xl={{
                fontSize: "14px",
              }}
            >
              Next Price:
            </Text>
            <Text
              fontSize={"12px"}
              color={"var(--color-white)"}
              fontWeight={700}
              xl={{
                fontSize: "14px",
              }}
            >
              ${priceData.next || 0}
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex
        gap={"8px"}
        pt={"12px"}
        alignItems={"center"}
        xl={{
          pt: "16px",
        }}
      >
        {socialLinks?.map((item) => {
          return (
            <a key={item.title} href={item.link} target="_blank">
              <Box
                p={"1px"}
                background={
                  "linear-gradient(180deg, var(--social-border-color) -11%, var(--social-border-normal) 135%)"
                }
                borderRadius={"8px"}
              >
                <Box p={"8px"} bg={"var(--cocial-bg-color)"} md={{ p: "12px" }}>
                  <Image
                    src={item.icon}
                    w={"18px"}
                    h={"18px"}
                    xl={{
                      w: "24px",
                      h: "24px",
                    }}
                    alt={item.title}
                  />
                </Box>
              </Box>
            </a>
          );
        })}
      </Flex>
    </Box>
  );
};

export default TokenSold;
