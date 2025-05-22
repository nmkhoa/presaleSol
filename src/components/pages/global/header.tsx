import { Flex } from "@chakra-ui/react";
import ConnectWalletButton from "../wallet-custom/connect-wallet-button";
import { navbarItems } from "../../../constants/home";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Flex
      px={"98px"}
      py={"24px"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <img src="/images/logo.svg" className="w-[140px] h-[35px]" alt="logo" />
      <Flex
        gap={"28px"}
        px={"20px"}
        py={"8px"}
        bg={"rgba(255, 255, 255, 0.06)"}
        borderRadius={"24px"}
      >
        {navbarItems?.map((item) => {
          return <Link to={item.link} className="!p-2 !font-semibold !leading-[130%]">{item.name}</Link>;
        })}
      </Flex>
      <ConnectWalletButton />
    </Flex>
  );
};

export default Header;
