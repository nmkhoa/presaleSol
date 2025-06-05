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
    document.title = "Unich Token: Freedom starts with $UN | Public Sale now LIVE";

    // Tạo hoặc cập nhật thẻ meta description
    const description =
      "Unich Token: Freedom starts with $UN | Public Sale now LIVE";
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      (metaDesc as HTMLMetaElement).name = "description";
      document.head.appendChild(metaDesc);
    }
    (metaDesc as HTMLMetaElement).content = description;
  }, []);

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
        h={"610px"}
        mt={"64px"}
        backgroundImage={"url(/images/token_utilities_mobile.svg)"}
        backgroundSize={"auto 100%"}
        backgroundPosition={"center"}
        backgroundRepeat={"no-repeat"}
        md={{
          background: "url(/images/token_utilities_tablet.svg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        xl={{
          h: "806px",
          backgroundImage: "url(/images/token_utilities.svg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Products />
      <CryptoAlliance />
      <FooterHome />
    </>
  );
};

export default Home;
