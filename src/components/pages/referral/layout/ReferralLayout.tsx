import type { ReactNode } from "react";
import ReferralHeader from "./ReferralHeader";
import { Box } from "@chakra-ui/react";

export default function ReferralLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      background={`
    radial-gradient(126.39% 85.09% at 0.52% -0.76%, #1E324B 0%, rgba(0, 0, 1, 0) 60%),
    radial-gradient(53.48% 143.58% at 102.6% -3.49%, #1E324B 0%, rgba(0, 0, 1, 0) 60%),
    linear-gradient(0deg, #000000, #000000)
  `}
      minH="100vh"
    >
      <ReferralHeader />
      <Box as="main" px="98px">
        {children}
      </Box>
    </Box>
  );
}
