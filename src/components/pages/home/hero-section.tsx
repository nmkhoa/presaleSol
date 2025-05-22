import { Box, Flex, Image } from "@chakra-ui/react";
import Header from "../global/header";
import TokenSold from "../../home/token-sold";
import { useState } from "react";
import clsx from "clsx";
import PublicSale from "../../home/public-sale";
import Whitelist from "../../home/whitelist";
import InviteAndEarn from "../../home/invite-earn";

const HeroSection = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="relative">
      <div className="absolute hero-section !h-[1450px] w-full" />
      <section className="relative">
        <Header />
        <div className="text-primary w-fit !mx-auto !mt-[74px] !text-[84px] !font-medium !leading-[84px]">
          FREEDOM
        </div>
        <div className="text-secondary w-fit !mx-auto !text-[84px] !font-extrabold !leading-[84px]">
          STARTS WITH $UN
        </div>
        <div className="max-w-[800px] !mt-10 !mx-auto text-center !text-lg text-[#B4C1D1] !font-medium">
          Be early, be empowered. Secure Unich's token before launch to unlock
          your investment journey, access low-cost OTC trading, and shape the
          future of Pre-TGE Finance.
        </div>
        <Flex
          w={"fit-content"}
          mt={"40px"}
          mx={"auto"}
          p={"16px"}
          gap={"12px"}
          borderRadius={"28px"}
          background={
            "linear-gradient(180deg, rgba(255, 252, 252, 0.04) 0%, rgba(255, 255, 255, 0) 100%),radial-gradient(267.84% 97.01% at 58.6% 100%, rgba(65, 116, 186, 0.091) 12.68%, rgba(17, 104, 221, 0.154) 45.68%, rgba(0, 39, 93, 0.021) 82.57%, rgba(0, 8, 18, 0.035) 100%)"
          }
          backdropFilter={"blur(16.1px)"}
          border={"1px solid rgba(255, 255, 255, 0.15)"}
        >
          <Box
            w={"322px"}
            p={"20px"}
            borderRadius={"20px"}
            background={
              "linear-gradient(152.22deg, #14161B 38.95%, #15161C 96.26%)"
            }
          >
            <TokenSold />
          </Box>
          <Box
            w={"419px"}
            p={"20px"}
            borderRadius={"20px"}
            background={
              "linear-gradient(152.22deg, #14161B 38.95%, #15161C 96.26%)"
            }
          >
            <Box
              className="grid grid-cols-2 gap-1 !p-[2px]"
              background={"rgba(0, 0, 0, 0.7)"}
              borderRadius={"24px"}
            >
              <button
                className={clsx(
                  "w-full !py-2 h-[36px] !rounded-[120px] !font-semibold",
                  !tab ? "!text-[#FF9A0D] !bg-[#1A1001]" : "!text-[#9EA5BA]"
                )}
                onClick={() => setTab(0)}
              >
                Public sale
              </button>
              <button
                className={clsx(
                  "w-full !py-2 h-[36px] !rounded-[120px] !font-semibold",
                  tab ? "!text-[#FF9A0D] !bg-[#1A1001]" : "!text-[#9EA5BA]"
                )}
                onClick={() => setTab(1)}
              >
                Whitelist
              </button>
            </Box>
            <div>
              {!tab && <PublicSale />}
              {!!tab && <Whitelist />}
            </div>
          </Box>
        </Flex>
        <Box
          mt={"47px"}
          textAlign={"center"}
          fontSize={"14px"}
          fontWeight={500}
        >
          Audited by
        </Box>
        <Image
          src="/images/logo_softstack.svg"
          w={"170px"}
          height={"28px"}
          mx={"auto"}
          mt={"7px"}
          align="logo"
        />
        <InviteAndEarn />
      </section>
    </div>
  );
};

export default HeroSection;
