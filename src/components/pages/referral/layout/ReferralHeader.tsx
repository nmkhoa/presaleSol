import { Flex, Heading } from "@chakra-ui/react";

import ConnectWalletButton from "../../wallet-custom/connect-wallet-button";

const ReferralHeader = () => {
  return (
    <Flex
      px={"98px"}
      py={"24px"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <img src="/logo.svg" className="w-[140px] h-[35px]" alt="logo" />
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
