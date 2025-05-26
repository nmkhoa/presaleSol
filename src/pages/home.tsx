import { Box } from "@chakra-ui/react";
import HeroSection from "../components/pages/home/hero-section";
import Products from "../components/pages/home/products";
import CryptoAlliance from "../components/pages/home/crypto-alliance";
import FooterHome from "../components/pages/home/footer";
import { navKey } from "@/constants/home";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

const Home = () => {
  const [searchParams] = useSearchParams();
  const affiliateCode = searchParams.get("affiliateCode");

  const { setReferrerCode } = useAuthStore();

  useEffect(() => {
    if (affiliateCode) {
      setReferrerCode(affiliateCode);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <Box
        id={navKey.benefit}
        h={"806px"}
        mt={"64px"}
        backgroundImage={"url(/images/token_utilities.svg)"}
        backgroundSize={"auto 100%"}
        backgroundPosition={"center"}
      />
      <Products />
      <CryptoAlliance />
      <FooterHome />
    </>
  );
};

export default Home;
