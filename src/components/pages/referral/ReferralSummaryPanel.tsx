import { Box, Flex } from "@chakra-ui/react";
import RewardClaimPanel from "./components/RewardClaimPanel";
import ReferralInfoPanel from "./components/ReferralInfoPanel";

const ReferralSummaryPanel = () => {
  return (
    <Flex gap="12px" mt="26px">
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
