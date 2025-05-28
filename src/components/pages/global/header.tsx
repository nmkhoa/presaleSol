import { Box, Flex, Image } from "@chakra-ui/react";
import ConnectWalletButton from "../wallet-custom/connect-wallet-button";
import { landingPageLink, navbarItems } from "../../../constants/home";

const Header = () => {
  const onScrollIntoView = (key: string) => {
    const element = document.getElementById(key);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Flex
      px={"16px"}
      py={"12px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      md={{
        px: "36px",
        py: "16px",
      }}
      xl={{
        px: "98px",
        py: "24px",
      }}
    >
      <a href={landingPageLink} target="_blank">
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
      </a>
      <Flex
        gap={"28px"}
        px={"20px"}
        py={"8px"}
        bg={"rgba(255, 255, 255, 0.06)"}
        borderRadius={"24px"}
        display={"none"}
        xl={{
          display: "flex",
        }}
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
