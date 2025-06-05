import ReferralLeaderboard from "@/components/pages/referral/referral-leaderboard";
import ReferralLayout from "../components/pages/referral/layout/referral-layout";
import ReferralSummaryPanel from "../components/pages/referral/referral-summary-panel";
import { Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import GoHomeButton from "@/components/pages/global/go-home-button";

const Referral = () => {
  useEffect(() => {
    document.title = "More invites - more $UN!";

    // Tạo hoặc cập nhật thẻ meta description
    const description = "More invites - more $UN!";
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      (metaDesc as HTMLMetaElement).name = "description";
      document.head.appendChild(metaDesc);
    }
    (metaDesc as HTMLMetaElement).content = description;
  }, []);

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
