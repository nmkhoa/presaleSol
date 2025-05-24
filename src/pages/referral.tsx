import GoHomeButton from "../components/pages/global/GoHomeButton";
import ReferralLayout from "../components/pages/referral/layout/ReferralLayout";
import ReferralSummaryPanel from "../components/pages/referral/ReferralSummaryPanel";

const Referral = () => {
  return (
    <ReferralLayout>
      <GoHomeButton />
      <ReferralSummaryPanel />
    </ReferralLayout>
  );
};

export default Referral;
