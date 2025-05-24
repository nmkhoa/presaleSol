import { Box } from "@chakra-ui/react";
import HeroSection from "../components/pages/home/hero-section";
import Products from "../components/pages/home/products";
import CryptoAlliance from "../components/pages/home/crypto-alliance";
import FooterHome from "../components/pages/home/footer";
import { navKey } from "@/constants/home";

const Home = () => {
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
