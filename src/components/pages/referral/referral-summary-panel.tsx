import { Box, Flex } from "@chakra-ui/react";
import RewardClaimPanel from "./components/reward-claim-panel";
import ReferralInfoPanel from "./components/referral-into-panel";

const ReferralSummaryPanel = () => {
  return (
    <Flex gap="12px" mt="26px" flexDirection={{ base: "column", md: "row" }}>
      <Box flex="1 1 35%">
        <RewardClaimPanel />
      </Box>

      <Box flex="1 1 75%">
        <ReferralInfoPanel />
      </Box>
    </Flex>
  );
};

export default ReferralSummaryPanel;
