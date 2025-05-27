import { Flex, Heading, Image, Link } from "@chakra-ui/react";

import ConnectWalletButton from "../../wallet-custom/connect-wallet-button";
import { landingPageLink } from "@/constants/home";

const ReferralHeader = () => {
  return (
    <Flex
      px={"98px"}
      py={"24px"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Link href={landingPageLink} target="_blank">
        <Image w={"140px"} h={"35px"} src="/images/logo.svg" alt="logo" />
      </Link>
      <Heading
        as="h1"
        fontSize="48px"
        textTransform="uppercase"
        fontWeight="bold"
        color={"#FFFFFF"}
      >
        Referral Dashboard
      </Heading>

      <ConnectWalletButton />
    </Flex>
  );
};

export default ReferralHeader;
