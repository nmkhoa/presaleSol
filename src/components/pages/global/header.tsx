import { Box, Flex, Image } from "@chakra-ui/react";
import ConnectWalletButton from "../wallet-custom/connect-wallet-button";
import { landingPageLink, navbarItems } from "../../../constants/home";
import { useTokenStore } from "@/stores/token.store";
import { useMemo } from "react";
import { formatAmount, getNumberFixed } from "@/utils";
import { useWallet } from "@solana/wallet-adapter-react";

const Header = () => {
  const { publicKey } = useWallet();
  const { solUserAccountInfo, tokensPrice } = useTokenStore();

  const onScrollIntoView = (key: string) => {
    const element = document.getElementById(key);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const myRewards = useMemo(() => {
    const availableSol =
      (solUserAccountInfo?.solRefEarned || 0) -
      (solUserAccountInfo?.solRefClaimed || 0);
    const availableUsdc =
      (solUserAccountInfo?.usdcRefEarned || 0) -
      (solUserAccountInfo?.usdcRefClaimed || 0);
    const availableUsdt =
      (solUserAccountInfo?.usdtRefEarned || 0) -
      (solUserAccountInfo?.usdtRefClaimed || 0);

    return [
      {
        value: availableSol,
        price: availableSol * (tokensPrice?.sol || 0),
      },
      {
        value: availableUsdc,
        price: availableUsdc * (tokensPrice?.usdc || 0),
      },
      {
        value: availableUsdt,
        price: availableUsdt * (tokensPrice?.usdt || 0),
      },
    ];
  }, [solUserAccountInfo, tokensPrice, publicKey]);

  const earnedValues = useMemo(() => {
    let totalUNEarned = 0;
    let totalUSDEarned = 0;
    myRewards?.forEach((reward) => {
      totalUNEarned += reward.value;
      totalUSDEarned += reward.price;
    });
    return { totalUNEarned, totalUSDEarned };
  }, [myRewards]);

  const totalBalance = useMemo(() => {
    return solUserAccountInfo
      ? formatAmount(
          getNumberFixed(
            solUserAccountInfo?.publicTokensPurchased +
              solUserAccountInfo?.whitelistTokensPurchased +
              earnedValues?.totalUNEarned || 0,
            2
          )
        )
      : "-.--";
  }, [earnedValues?.totalUNEarned, solUserAccountInfo]);

  return (
    <Flex
      position={"fixed"}
      w={"100%"}
      px={"16px"}
      py={"12px"}
      top={0}
      left={0}
      justifyContent={"space-between"}
      alignItems={"center"}
      background={"rgba(0, 0, 0, 0.7)"}
      backdropFilter={"blur(18.5px)"}
      zIndex={100}
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
      <Flex gap={"4px"}>
        <Flex
          gap={"6px"}
          p={"8px 12px"}
          bg={"#15171F"}
          border={"1px solid #40475C"}
          borderRadius={"4px"}
          fontSize={"16px"}
          lineHeight={"20px"}
          fontWeight={700}
          cursor={"pointer"}
          onClick={() => onScrollIntoView("total-balance")}
        >
          <Image src="/images/token.svg" w={"20px"} h={"20px"} alt="token" />
          {totalBalance}
        </Flex>
        <ConnectWalletButton />
      </Flex>
    </Flex>
  );
};

export default Header;
