import type { ReactNode } from "react";
import ReferralHeader from "./referral-header";
import { Box } from "@chakra-ui/react";

export default function ReferralLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      background={`
    radial-gradient(126.39% 85.09% at 0.52% -0.76%, var(--referral-layout-light) 0%, var(--referral-layout-bg) 60%),
    radial-gradient(53.48% 143.58% at 102.6% -3.49%, var(--referral-layout-light) 0%, var(--referral-layout-bg) 60%),
    linear-gradient(0deg, var(--bg-color), var(--bg-color))
  `}
      minH="100vh"
    >
      <ReferralHeader />
      <Box
        as="main"
        pt={"100px"}
        px="12px"
        lg={{ px: "24px" }}
        xl={{ px: "77px" }}
      >
        <Box maxW={"1280px"} mx={"auto"}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
