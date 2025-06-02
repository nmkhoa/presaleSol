import { landingPageLink, navKey } from "@/constants/home";
import { Box, Flex, Image, Link, Stack, Text } from "@chakra-ui/react";

const Products = () => {
  return (
    <Box id={navKey.products} px={"12px"} md={{ px: 0 }}>
      <Flex
        w={"fit-content"}
        gap={"20px"}
        mx={"auto"}
        mt={"96px"}
        alignItems={"center"}
        flexDirection={"column"}
        xl={{
          mt: "130px",
          flexDirection: "row",
        }}
      >
        <Box
          w={"100%"}
          textAlign={"left"}
          md={{
            textAlign: "center",
          }}
          xl={{
            w: "410px",
            textAlign: "left",
          }}
        >
          <Flex
            gap={"8px"}
            flexDirection={"column"}
            md={{
              flexDirection: "row",
              justifyContent: "center",
            }}
            xl={{
              gap: "0",
              flexDirection: "column",
              justifyContent: "start",
            }}
          >
            <Text
              className="text-secondary"
              fontSize={"36px"}
              fontWeight={300}
              lineHeight={"36px"}
              md={{
                fontSize: "56px",
                lineHeight: "56px",
              }}
              xl={{
                fontSize: "64px",
              }}
            >
              UNICH
            </Text>
            <Text
              className="text-secondary"
              fontSize={"36px"}
              fontWeight={700}
              lineHeight={"36px"}
              md={{
                fontSize: "56px",
                lineHeight: "56px",
              }}
              xl={{
                fontSize: "64px",
              }}
            >
              ECOSYSTEM
            </Text>
          </Flex>
          <Text
            maxW={"600px"}
            mt={"16px"}
            mx={"auto"}
            color={"#C7CCD9"}
            fontWeight={500}
            fontSize={"14px"}
            md={{
              fontSize: "16px",
            }}
            xl={{
              maxW: "100%",
              mt: "20px",
            }}
          >
            More than a trading platform, Unich pioneers new paths in
            decentralized finance and empowers you to Catch Your Freedom!
          </Text>
          <Flex
            mt={"20px"}
            gap={"9px"}
            alignItems={"end"}
            justifyContent={"start"}
            md={{
              justifyContent: "center",
            }}
            xl={{
              mt: "36px",
              justifyContent: "start",
            }}
          >
            <Text
              fontSize={"24px"}
              fontWeight={700}
              color={"#FFA915"}
              lineHeight={"28px"}
            >
              4,000,000+
            </Text>
            <Text
              fontSize={"18px"}
              fontWeight={700}
              color={"#C7CCD9"}
              lineHeight={"24px"}
            >
              User
            </Text>
          </Flex>
        </Box>

        <Flex
          w={"100%"}
          background={"linear-gradient(143.45deg, #111423 100%, #0A0C15 100%)"}
          borderRadius={"16px"}
          flexDirection={"column"}
          md={{
            w: "720px",
            flexDirection: "row",
          }}
          xl={{
            w: "825px",
          }}
        >
          <Box p={"24px 12px"} md={{ w: "50%", p: "24px" }} xl={{ w: "45%" }}>
            <Text
              className="text-secondary"
              fontSize={"20px"}
              fontWeight={700}
              md={{ fontSize: "28px" }}
              xl={{ fontSize: "36px" }}
            >
              Web3 Wallet
            </Text>
            <Flex
              gap={"4px"}
              alignItems={"center"}
              mt={"8px"}
              md={{ mt: "12px" }}
            >
              <Text
                fontSize={"16px"}
                fontWeight={"700"}
                color={"#FFAF40"}
                md={{ fontSize: "20px" }}
                xl={{ fontSize: "24px" }}
              >
                200,000+
              </Text>
              <Text
                fontSize={"12px"}
                fontWeight={700}
                color={"#C7CCD9"}
                md={{ fontSize: "16px" }}
                xl={{ fontSize: "18px" }}
              >
                Total Downloads
              </Text>
            </Flex>
            <Text
              mt={"16px"}
              fontWeight={500}
              fontSize={"12px"}
              md={{ mt: "24px" }}
              xl={{
                mt: "36px",
                fontSize: "16px",
              }}
            >
              Your secured gateway to trading early, earning more, and unlocking
              real Web3 utilities.
            </Text>
            <Box
              display={"flex"}
              gap={"4px"}
              alignItems={"start"}
              md={{ display: "block" }}
            >
              <Flex gap={{ base: "7px", xl: "20px" }} mt={"12px"}>
                <Stack>
                  <Text
                    mt={"12px"}
                    fontSize={"10px"}
                    md={{ fontSize: "12px" }}
                    xl={{
                      mt: "90px",
                      fontSize: "14px",
                    }}
                  >
                    Available on
                  </Text>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.unichlabs.unich.prd.android&pli=1"
                    target="_blank"
                  >
                    <Image
                      src="/images/google_play.svg"
                      w={"122px"}
                      h={"36px       "}
                      alt="google play"
                      md={{
                        w: "133px",
                        h: "39px",
                      }}
                    />
                  </Link>
                </Stack>
                <Stack>
                  <Text
                    mt={"12px"}
                    fontSize={"10px"}
                    md={{ fontSize: "12px" }}
                    xl={{
                      mt: "90px",
                      fontSize: "14px",
                    }}
                  >
                    Coming soon
                  </Text>
                  <Link href="#" target="_blank">
                    <Image
                      src="/images/app_store.svg"
                      w={"108px"}
                      h={"36px"}
                      alt="google play"
                      md={{
                        w: "118px",
                        h: "39px",
                      }}
                    />
                  </Link>
                </Stack>
              </Flex>
            </Box>
          </Box>
          <Flex
            px={"24px"}
            justifyContent={"start"}
            alignItems={"end"}
            md={{ w: "50%", pr: "30px", pl: "0" }}
            xl={{ w: "55%" }}
          >
            <Image src="/images/my_assets.svg" w={"100%"} h={"auto"} />
          </Flex>
        </Flex>
      </Flex>
      <Box
        maxW={"720px"}
        h={"282px"}
        mx={"auto"}
        mt={"20px"}
        pt={"44px"}
        background={"linear-gradient(143.45deg, #111423 100%, #0A0C15 100%)"}
        borderRadius={"16px"}
        md={{ h: "346px" }}
        xl={{
          maxW: "1240px",
          h: "426px",
          px: 0,
        }}
      >
        <Flex
          h={"100%"}
          alignItems={"end"}
          backgroundImage={"url(/images/pre_market_tablet.png)"}
          backgroundSize={"90%"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center top"}
          md={{
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
          xl={{
            backgroundImage: "url(/images/pre_market.png)",
          }}
        >
          <Flex
            w={"100%"}
            padding={"20px 16px 16px"}
            background={
              "linear-gradient(0deg, #05060C 20%, rgba(0, 0, 0, 0) 95%)"
            }
            gap={"0px"}
            borderRadius={"16px"}
            alignItems={"end"}
            flexDirection={"column"}
            md={{
              p: "30px 24px 24px",
              flexDirection: "row",
              gap: "100px",
            }}
          >
            <Box>
              <Box display={"flex"} md={{ display: "block" }}>
                <Text
                  minW={"200px"}
                  className="text-secondary"
                  fontSize={"24px"}
                  fontWeight={700}
                  md={{ minW: 0, fontSize: "28px" }}
                  xl={{ fontSize: "36px" }}
                >
                  Pre-Market
                </Text>
                <Flex
                  gap={"4px"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  md={{ flexDirection: "row" }}
                >
                  <Text
                    fontSize={"12px"}
                    fontWeight={700}
                    whiteSpace={"nowrap"}
                    md={{ fontSize: "14px" }}
                    xl={{ fontSize: "18px" }}
                  >
                    Total Volume:
                  </Text>
                  <Text
                    fontSize={"16px"}
                    fontWeight={700}
                    color={"#FFAF40"}
                    md={{ fontSize: "20px" }}
                    xl={{ fontSize: "24px" }}
                  >
                    $1,944,900
                  </Text>
                </Flex>
              </Box>
              <Text
                fontWeight={500}
                fontSize={"12px"}
                xl={{
                  fontSize: "16px",
                }}
              >
                Trade tokens from high-quality projects even before TGE!
              </Text>
            </Box>
            <Flex
              w={"100%"}
              mt={"16px"}
              justifyContent={"start"}
              md={{ mt: 0 }}
            >
              <Link
                href={`${landingPageLink}/otc/market`}
                className="btn-gradient-secondary"
                target="_blank"
              >
                <Flex
                  className="flex gap-1"
                  padding={"10px 20px"}
                  color={"white"}
                  fontWeight={700}
                  fontSize={"12px"}
                  xl={{
                    p: "12px 20px",
                    fontSize: "16px",
                  }}
                >
                  Visit Market
                  <Image
                    src="/images/arrow_right.svg"
                    w={"20px"}
                    h={"20px"}
                    alt="arrow"
                  />
                </Flex>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Box
        maxW={"720px"}
        h={"282px"}
        mx={"auto"}
        mt={"20px"}
        pt={"44px"}
        background={"linear-gradient(143.45deg, #111423 100%, #0A0C15 100%)"}
        borderRadius={"16px"}
        md={{ h: "346px" }}
        xl={{
          maxW: "1240px",
          h: "426px",
          px: 0,
        }}
      >
        <Flex
          h={"100%"}
          alignItems={"end"}
          backgroundImage={"url(/images/pre_order_tablet.png)"}
          backgroundSize={"90%"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center top"}
          md={{ backgroundSize: "contain", backgroundPosition: "center" }}
          xl={{
            backgroundImage: "url(/images/pre_order.png)",
          }}
        >
          <Flex
            w={"100%"}
            padding={"20px 16px 16px"}
            background={
              "linear-gradient(0deg, #05060C 20%, rgba(0, 0, 0, 0) 95%)"
            }
            gap={"0px"}
            borderRadius={"16px"}
            alignItems={"end"}
            flexDirection={"column"}
            md={{ p: "30px 24px 24px", flexDirection: "row", gap: "100px" }}
          >
            <Box>
              <Box display={"flex"} md={{ display: "block" }}>
                <Text
                  minW={"200px"}
                  className="text-secondary"
                  fontSize={"24px"}
                  fontWeight={700}
                  md={{ minW: 0, fontSize: "28px" }}
                  xl={{ fontSize: "36px" }}
                >
                  Pre-Order
                </Text>
                <Flex
                  gap={"4px"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  md={{ flexDirection: "row" }}
                >
                  <Text
                    fontSize={"12px"}
                    fontWeight={700}
                    whiteSpace={"nowrap"}
                    md={{ fontSize: "14px" }}
                    xl={{ fontSize: "18px" }}
                  >
                    Total Volume:
                  </Text>
                  <Text
                    fontSize={"16px"}
                    fontWeight={700}
                    color={"#FFAF40"}
                    md={{ fontSize: "20px" }}
                    xl={{ fontSize: "24px" }}
                  >
                    $1,944,900
                  </Text>
                </Flex>
              </Box>
              <Text
                fontWeight={500}
                fontSize={"12px"}
                xl={{
                  fontSize: "16px",
                }}
              >
                Pre-buy & pre-sell tokens at any price and profit within the
                day!
              </Text>
            </Box>
            <Flex
              w={"100%"}
              mt={"16px"}
              justifyContent={"start"}
              md={{ mt: 0 }}
            >
              <Link
                href={`${landingPageLink}/otc/market`}
                className="btn-gradient-secondary"
                target="_blank"
              >
                <Flex
                  className="flex gap-1"
                  padding={"10px 20px"}
                  fontSize={"12px"}
                  color={"white"}
                  fontWeight={700}
                  xl={{
                    p: "12px 20px",
                    fontSize: "16px",
                  }}
                >
                  Visit Market
                  <Image
                    src="/images/arrow_right.svg"
                    w={"20px"}
                    h={"20px"}
                    alt="arrow"
                  />
                </Flex>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Products;
