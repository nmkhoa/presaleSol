import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import {
  footerLinks,
  footerSocialLinks,
  policyLink,
} from "../../../constants/home";

const FooterHome = () => {
  return (
    <Box pt={"40px"} md={{ pt: "70px" }} xl={{ pt: "180px" }}>
      <Image
        src="/images/unich.svg"
        w={"90%"}
        h={"auto"}
        mx={"auto"}
        alt="unich"
        md={{
          w: "768px",
          h: "170px",
        }}
        xl={{
          w: "1229px",
          h: "269px",
        }}
      />
      <Flex
        h={"auto"}
        pb={"20px"}
        alignItems={"end"}
        background={"url(/images/footer_m.svg)"}
        backgroundSize={"cover"}
        backgroundPosition={"center top !important"}
        backgroundRepeat={"no-repeat"}
        md={{
          h: "306px",
          backgroundSize: "cover",
          backgroundPosition: "center !important",
          background: "url(/images/footer.svg)",
          backgroundRepeat: "no-repeat",
        }}
        xl={{ h: "411px", pb: "24px" }}
      >
        <Box w={"100%"}>
          <Flex
            maxW={"1240px"}
            mx={"auto"}
            pt={"46px"}
            px={"12px"}
            alignItems={"center"}
            justifyContent={"space-between"}
            md={{ py: "16px" }}
            xl={{ px: "0", pb: "24px" }}
          >
            <Image
              src="/images/logo.svg"
              w={"140px"}
              h={"35px"}
              display={"none"}
              md={{
                display: "block",
              }}
              alt="logo"
            />
            <Image
              src="/images/logo_only_icon.svg"
              w={"28px"}
              h={"35px"}
              md={{
                display: "none",
              }}
              alt="logo"
            />
            <Flex
              gap={"4px"}
              xl={{ gap: "27px" }}
              display={"grid"}
              textAlign={"right"}
              gridTemplateColumns={"repeat(2, minmax(0, 1fr))"}
              md={{ display: "flex", gap: "20px", textAlign: "left" }}
            >
              {footerLinks.map((item) => {
                return (
                  <Link
                    href={item.url}
                    key={item.title}
                    p={"8px"}
                    fontSize={"12px"}
                    xl={{
                      fontSize: "16px",
                    }}
                    outline={"none"}
                    target="_blank"
                    color={"#FAFAFA"}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </Flex>
          </Flex>
          <Box w={"100%"} h={"1px"} background={"#FAFAFA"} opacity={"10%"} />
          <Flex
            maxW={"1240px"}
            mx={"auto"}
            py={"16px"}
            px={"12px"}
            gap={"16px"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            md={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            xl={{ py: "24px", px: "0" }}
          >
            <Flex
              gap={"16px"}
              fontSize={"12px"}
              flexWrap={"wrap"}
              justifyContent={"center"}
              xl={{ fontSize: "14px" }}
            >
              <Link
                href={policyLink.privacyPolicy}
                fontWeight={500}
                target="_blank"
                outline={"none"}
                color={"#FAFAFA"}
              >
                Privacy Policy
              </Link>
              <Link
                href={policyLink.termAndConditions}
                fontWeight={500}
                target="_blank"
                outline={"none"}
                color={"#FAFAFA"}
              >
                Terms and Conditions
              </Link>
              <Link
                href={`mailto:${policyLink.privacyPolicy}`}
                fontWeight={500}
                outline={"none"}
                color={"#FAFAFA"}
              >
                <Flex gap={"4px"} fontWeight={500}>
                  Contact
                  <Text color={"#FF9A0D"}>hi@unich.com</Text>
                </Flex>
              </Link>
            </Flex>
            <Image
              src="/images/build_solana.svg"
              w={"163px"}
              h={"28px"}
              mx={"auto"}
              md={{ mx: "0" }}
              xl={{ w: "171px", h: "36px" }}
            />
          </Flex>
          <Box w={"100%"} h={"1px"} background={"#FAFAFA"} opacity={"10%"} />
          <Flex
            maxW={"1240px"}
            mx={"auto"}
            py={"16px"}
            px={"12px"}
            gap={"24px"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            md={{
              justifyContent: "space-between",
              flexDirection: "row",
              gap: "12px",
            }}
            xl={{ px: 0 }}
          >
            <Text fontSize={"12px"} fontWeight={500}>
              © Copyright 2025 by Unich. All rights reserved
            </Text>
            <Flex gap={"12px"} alignItems={"center"}>
              {footerSocialLinks?.map((item, index) => {
                return (
                  <Link key={index} href={item.link} target="_blank">
                    <Image
                      src={item.icon}
                      w={"24px"}
                      h={"24px"}
                      alt={item.title}
                    />
                  </Link>
                );
              })}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default FooterHome;
