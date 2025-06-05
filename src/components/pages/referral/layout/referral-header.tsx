import { Box, Flex, Heading, Image, Link } from "@chakra-ui/react";

import ConnectWalletButton from "../../wallet-custom/connect-wallet-button";
import { landingPageLink } from "@/constants/home";
import { useEffect } from "react";

const ReferralHeader = () => {
  const onScrollHeader = () => {
    const header = document.getElementById("header");
    if (header) {
      if (window.scrollY > 80) {
        header.classList.remove("header-transparent");
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
        header.classList.add("header-transparent");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollHeader);
    return () => window.removeEventListener("scroll", onScrollHeader);
  }, []);

  return (
    <Box
      id="header"
      position={"fixed"}
      w={"100%"}
      top={0}
      left={0}
      px={{ base: "12px", md: "24px", xl: "77px" }}
      py={"24px"}
      className="header-transparent"
      zIndex={100}
    >
      <Flex
        maxW={"1280px"}
        mx={"auto"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link href={landingPageLink} target="_blank">
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
        </Link>
        <Heading
          as="h1"
          fontSize={{ base: "16px", md: "28px", xl: "36px", "2xl": "48px" }}
          textTransform="uppercase"
          fontWeight="bold"
          color={"#FFFFFF"}
        >
          FREEDOM REFERRAL HUB
        </Heading>

        <ConnectWalletButton />
      </Flex>
    </Box>
  );
};

export default ReferralHeader;
