import ReferralLeaderboard from "@/components/pages/referral/referral-leaderboard";
import GoHomeButton from "../components/pages/global/GoHomeButton";
import ReferralLayout from "../components/pages/referral/layout/ReferralLayout";
import ReferralSummaryPanel from "../components/pages/referral/ReferralSummaryPanel";
import { Stack } from "@chakra-ui/react";

const Referral = () => {
  return (
    <ReferralLayout>
      <GoHomeButton />
      <Stack gap={"12px"}>
        <ReferralSummaryPanel />
        <ReferralLeaderboard />
      </Stack>
    </ReferralLayout>
  );
};

export default Referral;
