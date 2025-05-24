import { Box, Flex } from "@chakra-ui/react";
import ConnectWalletButton from "../wallet-custom/connect-wallet-button";
import { navbarItems } from "../../../constants/home";

const Header = () => {
  const onScrollIntoView = (key: string) => {
    const element = document.getElementById(key);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Flex
      px={"98px"}
      py={"24px"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <a href="https://unich.com/en" target="_blank">
        <img src="/images/logo.svg" className="w-[140px] h-[35px]" alt="logo" />
      </a>
      <Flex
        gap={"28px"}
        px={"20px"}
        py={"8px"}
        bg={"rgba(255, 255, 255, 0.06)"}
        borderRadius={"24px"}
      >
        {navbarItems?.map((item) => {
          return (
            <Box
              cursor={"pointer"}
              className="!p-2 !font-semibold !leading-[130%] hover:!text-[#FFA60C]"
              onClick={() => onScrollIntoView(item.key)}
            >
              {item.name}
            </Box>
          );
        })}
      </Flex>
      <ConnectWalletButton />
    </Flex>
  );
};

export default Header;
