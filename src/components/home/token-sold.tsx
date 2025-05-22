import { Box } from "@chakra-ui/react";
import { socialLinks } from "../../constants/home";

const TokenSold = () => {
  return (
    <div>
      <div className="relative !bg-[#06070A] !p-1 rounded-2xl">
        <Box
          w={"50%"}
          h={"34px"}
          background={
            "linear-gradient(235.88deg, #FFDE91 8.35%, #FFAE00 45.69%, #ED6E00 98.76%)"
          }
          borderRadius={"14px"}
        />
        <div className="absolute top-1/2 left-4 -translate-y-1/2 !font-bold">
          30% Sold
        </div>
      </div>
      <div className="!mt-[36px] !text-sm !text-[#C7CCD9] !font-medium">
        Token Sold
      </div>
      <div className="!mt-1 flex gap-1 !items-end">
        <img src="/images/token.svg" className="w-[24px] h-[24px] !mb-1" alt="token" />
        <span className="!text-2xl !leading-[28px] !font-bold">12,278,390</span>
        <span className="!text-sm text-[#6E758A] !font-medium">
          /5,663,345,390
        </span>
      </div>
      <div className="h-[1px] !mt-5 bg-white opacity-10" />
      <div className="!mt-5 !text-sm !text-[#C7CCD9] !font-medium">
        Total Raised
      </div>
      <div className="!mt-1 flex gap-1 !items-end">
        <span className="!text-2xl !leading-[28px] !font-bold">12,278,390</span>
        <span className="!text-sm text-[#6E758A] !font-medium">
          /5,663,345,390
        </span>
      </div>
      <div className="h-[1px] !mt-5 bg-white opacity-10" />
      <div className="!mt-7 !text-sm !text-[#C7CCD9] !font-medium">Price</div>
      <div className="!mt-1 flex gap-1 !items-center justify-between flex-wrap">
        <div className="flex gap-1 items-center">
          <img src="/images/token.svg" className="w-[24px] h-[24px]" alt="token" />
          <span className="!text-lg !leading-[28px] text-[#FF9A0D] !font-bold">
            1 $UN = $0.25
          </span>
        </div>
        <div>
          <span className="!text-sm text-[#C7CCD9] !font-medium">
            Next Price:
          </span>
          <span className="!text-sm !font-bold !ml-1">$0.27</span>
        </div>
      </div>
      <div className="flex gap-2 !pt-4 items-center">
        {socialLinks?.map((item) => {
          return (
            <a key={item.title} href={item.link} target="_blank">
              <Box
                p={"1px"}
                background={
                  "linear-gradient(180deg, #22293B -11%, rgba(14, 21, 37, 0) 135%)"
                }
                borderRadius={"8px"}
              >
                <Box className="!p-3 bg-[#202127]">
                  <img
                    src={item.icon}
                    className="!w-[24px] !h-[24px]"
                    alt={item.title}
                  />
                </Box>
              </Box>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default TokenSold;
