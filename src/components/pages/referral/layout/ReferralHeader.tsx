import { Flex, Heading, Image } from "@chakra-ui/react";

import ConnectWalletButton from "../../wallet-custom/connect-wallet-button";

const ReferralHeader = () => {
  return (
    <Flex
      px={"98px"}
      py={"24px"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Image w={"140px"} h={"35px"} src="/images/logo.svg" alt="logo" />
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
