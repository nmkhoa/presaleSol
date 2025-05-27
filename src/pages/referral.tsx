import ReferralLeaderboard from "@/components/pages/referral/referral-leaderboard";
import GoHomeButton from "../components/pages/global/GoHomeButton";
import ReferralLayout from "../components/pages/referral/layout/ReferralLayout";
import ReferralSummaryPanel from "../components/pages/referral/ReferralSummaryPanel";
import { Stack } from "@chakra-ui/react";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";

const Referral = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    navigate("/");
    return null;
  }

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
